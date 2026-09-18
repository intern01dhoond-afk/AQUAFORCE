async function pushFreshOrder() {
  const email = "hemanthk0804@gmail.com";
  const password = "9GW&KOtvjA@$9LT8t4ztD4KX%Z74IhYn";

  const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const authData = await authRes.json();
  const token = authData.token;

  const freshOrderId = `ORD_LIVE_COD_${Date.now()}`;

  const payload = {
    order_id: freshOrderId,
    order_date: new Date().toISOString().replace("T", " ").substring(0, 16),
    pickup_location: "warehouse",
    channel_id: 12211988,
    comment: "Next.js Custom E-commerce Order",
    billing_customer_name: "TEST - Verification Live COD",
    billing_last_name: "",
    billing_address: "Plot 99, Road 10, Banjara Hills",
    billing_address_2: "Alt Phone: 9123456789",
    billing_city: "Hyderabad",
    billing_pincode: "500034",
    billing_state: "Telangana",
    billing_country: "India",
    billing_email: "live.cod@example.com",
    billing_phone: "9876543210",
    shipping_is_billing: true,
    order_items: [
      {
        name: "Cordless AquaForce 1400 High-pressure Washer System (Yellow)",
        sku: "AMEC-AQUAFORCE-1400",
        units: 1,
        selling_price: 37999,
        discount: 0,
        tax: 0,
        hsn: "84243000",
      },
    ],
    payment_method: "COD",
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: 0,
    sub_total: 34349,
    length: 60,
    breadth: 41,
    height: 41,
    weight: 8.5,
  };

  const res = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  console.log("Response Status:", res.status);
  const data = await res.json().catch(() => null);
  console.log("Response Data:", JSON.stringify(data, null, 2));

  if (res.ok && (data?.order_id || data?.shipment_id)) {
    console.log("\nForwarding order to live Purchase Sheet API...");
    const sheetRes = await fetch("https://promectools.in/aquaforceforautocare/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: freshOrderId,
        paymentId: `pay_${freshOrderId}`,
        fullName: payload.billing_customer_name,
        email: payload.billing_email,
        phone: payload.billing_phone,
        altPhone: "9123456789",
        deliveryAddress: payload.billing_address,
        city: payload.billing_city,
        state: payload.billing_state,
        pincode: payload.billing_pincode,
        gstNumber: "N/A",
        product: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
        quantity: 1,
        amount: 37999,
        paymentMethod: "10% Cash on Delivery",
        advanceAmount: 3799,
        codBalance: 34349,
        waybill: String(data.shipment_id || data.order_id),
        status: "10% Advance Paid - COD Balance Pending",
      }),
    });
    console.log("Sheet Log Status:", sheetRes.status);
    const sheetData = await sheetRes.json();
    console.log("Sheet Log Data:", JSON.stringify(sheetData, null, 2));
  }
}

pushFreshOrder();
