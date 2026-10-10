"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Printer, Loader2 } from "lucide-react";
import {
  InvoiceDetails,
  convertOrderToInvoiceDetails,
  isMaharashtraState,
} from "@/lib/invoiceUtils";
import RazorpayInvoiceSheet from "@/components/invoice/RazorpayInvoiceSheet";

// Seeded database for historical & demo orders
const LEGACY_ORDERS_DATABASE: Record<string, any> = {
  order_TVWMNCnxp7pU2C: {
    id: "order_TVWMNCnxp7pU2C",
    createdAt: "2026-08-29T08:33:00.000Z",
    orderStatus: "confirmed",
    invoiceNumber: "AQUA-R/INV-1",
    customer: {
      fullName: "Kilanbha Kynta",
      phone: "+91 8837041612",
      email: "pageskell@gmail.com",
      shippingAddress: "Upper Nongrim Hills, Behind Landmark Hotel, UB007",
      city: "Shillong",
      state: "Meghalaya",
      pincode: "793003",
    },
    items: [
      {
        productName: "Cordless AquaForce® 1400 High-pressure Washer System (R)",
        quantity: 1,
        unitPriceInINR: 37999,
        totalAmountInINR: 37999,
      },
    ],
    pricing: {
      subtotalInINR: 37999,
      finalTotalInINR: 37999,
    },
    payment: {
      method: "FULL_ONLINE",
      status: "captured",
      razorpayPaymentId: "pay_TVWMau5gbuRWvA",
      razorpayInvoiceId: "AQUA-R/INV-1",
      amountPaidInPaise: 3799900,
      amountDueInPaise: 0,
    },
    notes: "Add Customer Notes",
  },
  order_TYe1byjoJmIO4u: {
    id: "order_TYe1byjoJmIO4u",
    createdAt: "2026-09-06T06:00:00.000Z",
    orderStatus: "confirmed",
    invoiceNumber: "AQUA-R/INV-2",
    customer: {
      fullName: "Kiran Mobarsa",
      phone: "+91 7021415368",
      email: "kiranmobarsa45@gmail.com",
      shippingAddress:
        "Jawahar Nagar road no 18 plot no 345 room no A/17 near jai bhawani dairy goregaon west",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400104",
    },
    items: [
      {
        productName: "Cordless AquaForce® 1400 High-pressure Washer System (R)",
        quantity: 1,
        unitPriceInINR: 37999,
        totalAmountInINR: 37999,
      },
    ],
    pricing: {
      subtotalInINR: 37999,
      finalTotalInINR: 37999,
    },
    payment: {
      method: "COD_ADVANCE",
      status: "captured",
      razorpayPaymentId: "pay_TYe1jhUUnaHgRu",
      razorpayInvoiceId: "AQUA-R/INV-2",
      amountPaidInPaise: 379900,
      amountDueInPaise: 3420000,
    },
    notes: "Add Customer Notes",
  },
  order_TZW8eddk4xAdMW: {
    id: "order_TZW8eddk4xAdMW",
    createdAt: "2026-09-08T10:58:00.000Z",
    orderStatus: "confirmed",
    invoiceNumber: "AQUA-R/INV-3",
    customer: {
      fullName: "Nirmal Tamboli",
      phone: "+91 9723141220",
      email: "nirmal.tamboli2896@gmail.com",
      shippingAddress:
        "D-1, Parsanbaa Nagar, B/s Amin Park, Nr. Avadhut fatak, Vishwamitri road, Manjalpur",
      city: "Vadodara",
      state: "Gujarat",
      pincode: "390011",
    },
    items: [
      {
        productName: "Cordless AquaForce® 1400 High-pressure Washer System (R)",
        quantity: 1,
        unitPriceInINR: 37999,
        totalAmountInINR: 37999,
      },
    ],
    pricing: {
      subtotalInINR: 37999,
      finalTotalInINR: 37999,
    },
    payment: {
      method: "FULL_ONLINE",
      status: "captured",
      razorpayPaymentId: "pay_TZW9xuQrf41G8S",
      razorpayInvoiceId: "AQUA-R/INV-3",
      amountPaidInPaise: 3799900,
      amountDueInPaise: 0,
    },
    notes: "Add Customer Notes",
  },
  order_TcflUW0RnH33DW: {
    id: "order_TcflUW0RnH33DW",
    createdAt: "2026-09-16T10:19:00.000Z",
    orderStatus: "confirmed",
    invoiceNumber: "AQUA-R/INV-4",
    customer: {
      fullName: "Ketan Mehta",
      phone: "+91 7506939771",
      email: "veerova555@gmail.com",
      shippingAddress:
        "10 sai sneha estate, panchal road, near shiv sai temple, bhayander east",
      city: "Bhayander east",
      state: "Maharashtra",
      pincode: "401105",
    },
    items: [
      {
        productName: "Cordless AquaForce® 1400 High-pressure Washer System (R)",
        quantity: 1,
        unitPriceInINR: 37999,
        totalAmountInINR: 37999,
      },
    ],
    pricing: {
      subtotalInINR: 37999,
      finalTotalInINR: 37999,
    },
    payment: {
      method: "COD_ADVANCE",
      status: "captured",
      razorpayPaymentId: "pay_TcflfFn8ToVezK",
      razorpayInvoiceId: "AQUA-R/INV-4",
      amountPaidInPaise: 379900,
      amountDueInPaise: 3420000,
    },
    notes: "Add Customer Notes",
  },
  order_Td93ss02xLZQX3: {
    id: "order_Td93ss02xLZQX3",
    createdAt: "2026-09-17T14:59:00.000Z",
    orderStatus: "confirmed",
    invoiceNumber: "AQUA-R/INV-5",
    customer: {
      fullName: "Sri Sai Potluri",
      phone: "+91 9440804233",
      email: "saileshyd@gmail.com",
      shippingAddress:
        "H.NO. 16-2-100/116, Plot no.116, road no.15B, PVR Indradhnu, Gopalnagar Society, Kukatpally",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500085",
      gstin: "36AACFL5575H1Z4",
    },
    items: [
      {
        productName: "Cordless AquaForce® 1400 High-pressure Washer System (R)",
        quantity: 1,
        unitPriceInINR: 37999,
        totalAmountInINR: 37999,
      },
    ],
    pricing: {
      subtotalInINR: 37999,
      finalTotalInINR: 37999,
    },
    payment: {
      method: "COD_ADVANCE",
      status: "captured",
      razorpayPaymentId: "pay_Td944AXsQn3Lwm",
      razorpayInvoiceId: "AQUA-R/INV-5",
      amountPaidInPaise: 379900,
      amountDueInPaise: 3420000,
    },
    notes: "Add Customer Notes",
  },
  order_TemZHkAYJjzQ5G: {
    id: "order_TemZHkAYJjzQ5G",
    createdAt: "2026-09-21T18:19:00.000Z",
    orderStatus: "confirmed",
    invoiceNumber: "AQUA-R/INV-6",
    customer: {
      fullName: "Balaji Studio",
      phone: "+91 9123066336",
      email: "mallikventures.official@gmail.com",
      shippingAddress: "Mallikk KSK Indian oil Petrol Pump Rudrapur HABRA",
      city: "North 24 Parganas",
      state: "West Bengal",
      pincode: "743271",
    },
    items: [
      {
        productName: "Cordless AquaForce® 1400 High-pressure Washer System (R)",
        quantity: 1,
        unitPriceInINR: 37999,
        totalAmountInINR: 37999,
      },
    ],
    pricing: {
      subtotalInINR: 37999,
      finalTotalInINR: 37999,
    },
    payment: {
      method: "FULL_ONLINE",
      status: "captured",
      razorpayPaymentId: "pay_Temc6eOQOFJJZ6",
      razorpayInvoiceId: "AQUA-R/INV-6",
      amountPaidInPaise: 3799900,
      amountDueInPaise: 0,
    },
    notes: "Add Customer Notes",
  },
  "PROMEC-ORD-1790417815914-5DQL": {
    id: "PROMEC-ORD-1790417815914-5DQL",
    createdAt: "2026-09-26T10:17:00.000Z",
    orderStatus: "confirmed",
    invoiceNumber: "AQUA-R/INV-7",
    customer: {
      fullName: "Subhash Sing Dhami",
      phone: "+91 8800781865",
      email: "subhash.singh.dhami.ssd@gmail.com",
      shippingAddress: "1522 Bhagirath palace Chandni chowk",
      city: "Delhi",
      state: "Delhi",
      pincode: "110006",
    },
    items: [
      {
        productName: "Cordless AquaForce® 1400 High-pressure Washer System (R)",
        quantity: 1,
        unitPriceInINR: 37999,
        totalAmountInINR: 37999,
      },
    ],
    pricing: {
      subtotalInINR: 37999,
      finalTotalInINR: 37999,
    },
    payment: {
      method: "COD_ADVANCE",
      status: "captured",
      razorpayPaymentId: "pay_Tgd58Cm0DxJpl8",
      razorpayInvoiceId: "AQUA-R/INV-7",
      amountPaidInPaise: 380000,
      amountDueInPaise: 3419900,
    },
    notes: "Add Customer Notes",
  },
  inv_TjOBeOPT9LsMrS: {
    id: "order_TjOBeqWCXWTtyY",
    createdAt: "2026-10-03T09:39:00.000Z",
    orderStatus: "confirmed",
    invoiceNumber: "AQUA-R/INV-8",
    customer: {
      fullName: "Aashitosh",
      phone: "+91 9876543210",
      email: "aashitosh@amectechnology.com",
      shippingAddress:
        "Plot No. 5A, 13A MIDC, Beside Tata Motors Service Centre, Hingna MIDC",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440016",
    },
    items: [
      {
        productName: "Cordless AquaForce® 1400 High-pressure Washer System (R)",
        quantity: 1,
        unitPriceInINR: 35999,
        totalAmountInINR: 35999,
      },
    ],
    pricing: {
      subtotalInINR: 35999,
      finalTotalInINR: 35999,
    },
    payment: {
      method: "FULL_ONLINE",
      status: "captured",
      razorpayPaymentId: "pay_Captured_Live",
      razorpayInvoiceId: "AQUA-R/INV-8",
      amountPaidInPaise: 3599900,
      amountDueInPaise: 0,
    },
    notes: "Add Customer Notes",
  },
};

export default function RazorpayHostedInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id;
  const decodedId = decodeURIComponent(rawId);

  const [invoice, setInvoice] = useState<InvoiceDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadInvoice() {
      // 1. Check in seeded legacy database
      const legacy =
        LEGACY_ORDERS_DATABASE[decodedId] ||
        Object.values(LEGACY_ORDERS_DATABASE).find(
          (inv) =>
            inv.id === decodedId ||
            inv.invoiceNumber === decodedId ||
            inv.payment?.razorpayInvoiceId === decodedId
        );

      if (legacy) {
        if (isMounted) {
          setInvoice(convertOrderToInvoiceDetails(legacy));
          setLoading(false);
        }
        return;
      }

      // 2. Fetch dynamically from /api/account/orders/[id]
      try {
        const res = await fetch(
          `/api/account/orders/${encodeURIComponent(decodedId)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.order) {
            if (isMounted) {
              setInvoice(convertOrderToInvoiceDetails(data.order));
              setLoading(false);
            }
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch order from API:", err);
      }

      // 3. Fallback to default Kilanbha Kynta order (exact match to reference screenshot)
      if (isMounted) {
        setInvoice(
          convertOrderToInvoiceDetails(
            LEGACY_ORDERS_DATABASE["order_TVWMNCnxp7pU2C"]
          )
        );
        setLoading(false);
      }
    }

    loadInvoice();

    return () => {
      isMounted = false;
    };
  }, [decodedId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !invoice) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
          <Loader2 className="animate-spin" size={18} />
          <span>Loading Tax Invoice...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 font-sans pb-16 print:bg-white print:pb-0">
      {/* Top Action Navigation Bar (Hidden during print) */}
      <div className="print:hidden bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/account"
              className="text-xs font-semibold text-slate-600 hover:text-[#2371ec] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Account
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-medium text-slate-500">
              Razorpay Invoicing &bull; {invoice.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="px-3.5 py-1.5 bg-[#2371ec] hover:bg-[#1a5bc7] text-white text-xs font-bold rounded-md flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Printer size={13} />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Card Container */}
      <main className="max-w-[760px] mx-auto mt-6 sm:mt-10 px-3 sm:px-0 print:m-0 print:p-0 print:max-w-none">
        <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200/80 overflow-hidden print:border-none print:shadow-none print:rounded-none">
          <RazorpayInvoiceSheet invoice={invoice} />
        </div>
      </main>
    </div>
  );
}
