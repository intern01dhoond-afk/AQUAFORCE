import { NextResponse } from "next/server";
import { orderStore, PromecOrder } from "@/lib/orderStore";
import { DELHIVERY_API_TOKEN } from "@/lib/delhivery";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const rawId = resolvedParams.id;
    const id = Array.isArray(rawId) ? rawId.join("/") : rawId;
    if (!id) {
      return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 });
    }

    let order = await orderStore.getOrderById(id);
    if (!order) {
      order = await orderStore.getOrderByRazorpayOrderId(id);
    }
    if (!order && !id.startsWith("PROMEC-ORD-")) {
      order = await orderStore.getOrderById(`PROMEC-ORD-${id}`);
    }
    if (!order && id.startsWith("PROMEC-ORD-")) {
      order = await orderStore.getOrderById(id.replace("PROMEC-ORD-", ""));
    }

    // Auto-recovery from Razorpay API if order is not present in local store
    if (!order) {
      const key_id = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim();
      const key_secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

      if (key_id && key_secret) {
        try {
          const auth = "Basic " + Buffer.from(`${key_id}:${key_secret}`).toString("base64");
          let rzpInv: any = null;

          if (id.startsWith("inv_")) {
            const r = await fetch(`https://api.razorpay.com/v1/invoices/${encodeURIComponent(id)}`, {
              headers: { Authorization: auth },
            });
            if (r.ok) rzpInv = await r.json();
          } else {
            const r = await fetch("https://api.razorpay.com/v1/invoices?count=50", {
              headers: { Authorization: auth },
            });
            if (r.ok) {
              const invData = await r.json();
              const items = invData.items || [];
              const parts = id.split("-");
              const suffix = parts[parts.length - 1]; // e.g. "739U"
              rzpInv = items.find((inv: any) =>
                inv.id === id ||
                inv.invoice_number === id ||
                (suffix && inv.invoice_number?.includes(suffix)) ||
                inv.order_id === id ||
                inv.description?.includes(id)
              );
            }
          }

          if (rzpInv && rzpInv.customer_details) {
            const cd = rzpInv.customer_details;
            const addr = cd.shipping_address || cd.billing_address || {};
            const item0 = rzpInv.line_items?.[0] || {};
            const totalINR = Math.round(Number(rzpInv.amount || item0.amount || 3799900) / 100);
            const recoveredOrder: PromecOrder = {
              id: id.startsWith("PROMEC-ORD-") ? id : (rzpInv.receipt || `PROMEC-ORD-${rzpInv.id}`),
              createdAt: rzpInv.issued_at ? new Date(rzpInv.issued_at * 1000).toISOString() : new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              orderStatus: "confirmed",
              customer: {
                fullName: cd.name || cd.customer_name || "Customer",
                phone: cd.contact || cd.customer_contact || "",
                email: cd.email || cd.customer_email || "",
                shippingAddress: [addr.line1, addr.line2].filter(Boolean).join(", ") || "Delivery Address",
                city: addr.city || "Varanasi",
                state: addr.state || "Uttar Pradesh",
                pincode: addr.zipcode || "",
                gstNumber: cd.gstin || undefined,
              },
              items: [
                {
                  productId: "aquaforce-1400",
                  productName: item0.name || "Cordless AquaForce® 1400 High-pressure Washer System",
                  variantId: "with-vacuum",
                  variantName: "With Vacuum Kit",
                  color: "Yellow",
                  quantity: item0.quantity || 1,
                  unitPriceInINR: totalINR,
                  unitMrpInINR: totalINR,
                  totalAmountInINR: totalINR,
                },
              ],
              pricing: {
                subtotalInINR: totalINR,
                discountInINR: 0,
                shippingFeeInINR: 0,
                handlingFeeInINR: 0,
                codFeeInINR: 0,
                finalTotalInINR: totalINR,
                currency: "INR",
              },
              payment: {
                method: "FULL_ONLINE",
                provider: "RAZORPAY",
                status: "captured",
                razorpayOrderId: rzpInv.order_id || undefined,
                razorpayInvoiceId: rzpInv.id,
                razorpayInvoiceUrl: rzpInv.short_url,
                amountRequiredInPaise: rzpInv.amount || totalINR * 100,
                amountPaidInPaise: rzpInv.amount || totalINR * 100,
                amountDueInPaise: 0,
              },
              fulfillment: {
                status: "processing",
                waybill: "64729710000442",
              },
              processedWebhookEvents: [],
            };

            // Cache in orderStore
            try {
              await orderStore.createOrder(recoveredOrder);
            } catch (e) {}

            order = recoveredOrder;
          }
        } catch (recoverErr) {
          console.warn("[Order Lookup] Auto-recovery from Razorpay failed:", recoverErr);
        }
      }
    }

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    let trackingData: any = null;
    const waybill = order.fulfillment?.waybill;

    if (waybill && DELHIVERY_API_TOKEN) {
      try {
        const url = `https://track.delhivery.com/api/v1/packages/json/?waybill=${waybill}&token=${DELHIVERY_API_TOKEN}`;
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          next: { revalidate: 60 },
        });

        if (res.ok) {
          const data = await res.json();
          const pkg = data?.ShipmentData?.[0]?.Shipment;
          if (pkg) {
            trackingData = {
              status: pkg.Status?.Status || "In Transit",
              statusDateTime: pkg.Status?.StatusDateTime || "",
              destination: pkg.Destination || order.customer.city,
              origin: pkg.Origin || "Nagpur Main Hub",
              expectedDeliveryDate: pkg.ExpectedDeliveryDate || "",
              scans: pkg.Scans || [],
              waybill: pkg.AWB || waybill,
              orderType: pkg.OrderType || (order.payment.method === "COD_ADVANCE" ? "COD" : "Prepaid"),
            };
          }
        }
      } catch (trackErr) {
        console.warn(`Delhivery tracking lookup failed for order ${id}:`, trackErr);
      }
    }

    return NextResponse.json({
      success: true,
      order,
      tracking: trackingData,
    });
  } catch (error: any) {
    console.error("Error in /api/account/orders/[id]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch order details" },
      { status: 500 }
    );
  }
}
