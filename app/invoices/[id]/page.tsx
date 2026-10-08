"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Printer, CheckCircle, ShieldCheck, ArrowLeft, ExternalLink, Truck } from "lucide-react";

interface InvoiceData {
  id: string;
  orderId: string;
  paymentId: string;
  date: string;
  time: string;
  status: "paid" | "partial" | "issued";
  statusText: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    gstin?: string;
  };
  product: {
    name: string;
    desc: string;
    hsn: string;
    qty: number;
    price: number;
  };
  pricing: {
    taxable: number;
    gstRate: number;
    cgst: number;
    sgst: number;
    igst: number;
    isIntraState: boolean;
    total: number;
    amountPaid: number;
    amountDue: number;
  };
  shipping: {
    partner: string;
    waybill?: string;
    status: string;
  };
}

const INVOICES_DATABASE: Record<string, InvoiceData> = {
  "order_TVWMNCnxp7pU2C": {
    id: "inv_TVWMNCnxp7pU2C",
    orderId: "order_TVWMNCnxp7pU2C",
    paymentId: "pay_TVWMau5gbuRWvA",
    date: "29 Aug 2026",
    time: "2:03 PM",
    status: "paid",
    statusText: "PAID",
    customer: {
      name: "Kilanbha Kynta",
      phone: "+91 8837041612",
      email: "pageskell@gmail.com",
      address: "Upper nongrim hills, behind landmark hotel, ub007",
      city: "Shillong",
      state: "Meghalaya",
      pincode: "793003",
    },
    product: {
      name: "Cordless AquaForce 1400 High-pressure Washer System (Yellow) [With Vacuum]",
      desc: "Includes 1-Year Comprehensive Warranty & Free Express Delivery",
      hsn: "84243000",
      qty: 1,
      price: 37999,
    },
    pricing: {
      taxable: 32202.54,
      gstRate: 18,
      cgst: 0,
      sgst: 0,
      igst: 5796.46,
      isIntraState: false,
      total: 37999,
      amountPaid: 37999,
      amountDue: 0,
    },
    shipping: {
      partner: "Delhivery Air Express",
      status: "Manual sent on WhatsApp & Email",
    },
  },
  "order_TYe1byjoJmIO4u": {
    id: "inv_TYe1byjoJmIO4u",
    orderId: "order_TYe1byjoJmIO4u",
    paymentId: "pay_TYe1jhUUnaHgRu",
    date: "06 Sep 2026",
    time: "11:30 AM",
    status: "partial",
    statusText: "ADVANCE PAID (10% COD)",
    customer: {
      name: "Kiran Mobarsa",
      phone: "+91 7021415368",
      email: "kiranmobarsa45@gmail.com",
      address: "Jawahar Nagar road no 18 plot no 345 room no A/17 near jai bhawani dairy goregaon west Mumbai",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400104",
    },
    product: {
      name: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
      desc: "Includes 1-Year Comprehensive Warranty & Free Express Delivery",
      hsn: "84243000",
      qty: 1,
      price: 37999,
    },
    pricing: {
      taxable: 32202.54,
      gstRate: 18,
      cgst: 2898.23,
      sgst: 2898.23,
      igst: 0,
      isIntraState: true,
      total: 37999,
      amountPaid: 3799,
      amountDue: 34200,
    },
    shipping: {
      partner: "Delhivery Express",
      status: "Manual sent on WhatsApp & Email",
    },
  },
  "order_TZW8eddk4xAdMW": {
    id: "inv_TZW8eddk4xAdMW",
    orderId: "order_TZW8eddk4xAdMW",
    paymentId: "pay_TZW9xuQrf41G8S",
    date: "08 Sep 2026",
    time: "4:28 PM",
    status: "paid",
    statusText: "PAID",
    customer: {
      name: "Nirmal Tamboli",
      phone: "+91 9723141220",
      email: "nirmal.tamboli2896@gmail.com",
      address: "D-1, Parsanbaa Nagar, B/s Amin Park, Nr. Avadhut fatak, Vishwamitri road, Manjalpur",
      city: "Vadodara",
      state: "Gujarat",
      pincode: "390011",
    },
    product: {
      name: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
      desc: "Includes 1-Year Comprehensive Warranty & Free Express Delivery",
      hsn: "84243000",
      qty: 1,
      price: 37999,
    },
    pricing: {
      taxable: 32202.54,
      gstRate: 18,
      cgst: 0,
      sgst: 0,
      igst: 5796.46,
      isIntraState: false,
      total: 37999,
      amountPaid: 37999,
      amountDue: 0,
    },
    shipping: {
      partner: "Delhivery Express",
      waybill: "AUTO_GENERATED",
      status: "Paid & Confirmed (WhatsApp & Email)",
    },
  },
  "order_TcflUW0RnH33DW": {
    id: "inv_TcflUW0RnH33DW",
    orderId: "order_TcflUW0RnH33DW",
    paymentId: "pay_TcflfFn8ToVezK",
    date: "16 Sep 2026",
    time: "3:49 PM",
    status: "partial",
    statusText: "ADVANCE PAID (10% COD)",
    customer: {
      name: "Ketan Mehta",
      phone: "+91 7506939771",
      email: "veerova555@gmail.com",
      address: "10 sai sneha estate, panchal road, near shiv sai temple, bhayander east, 401105",
      city: "Bhayander east",
      state: "Maharashtra",
      pincode: "401105",
    },
    product: {
      name: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
      desc: "Includes 1-Year Comprehensive Warranty & Free Express Delivery",
      hsn: "84243000",
      qty: 1,
      price: 37999,
    },
    pricing: {
      taxable: 32202.54,
      gstRate: 18,
      cgst: 2898.23,
      sgst: 2898.23,
      igst: 0,
      isIntraState: true,
      total: 37999,
      amountPaid: 3799,
      amountDue: 34200,
    },
    shipping: {
      partner: "Delhivery Surface",
      waybill: "64729710000081",
      status: "Dispatched & In Transit",
    },
  },
  "order_Td93ss02xLZQX3": {
    id: "inv_Td93ss02xLZQX3",
    orderId: "order_Td93ss02xLZQX3",
    paymentId: "pay_Td944AXsQn3Lwm",
    date: "17 Sep 2026",
    time: "8:29 PM",
    status: "partial",
    statusText: "ADVANCE PAID (B2B COMMERCIAL)",
    customer: {
      name: "Sri Sai Potluri",
      phone: "+91 9440804233",
      email: "saileshyd@gmail.com",
      address: "H.NO. 16-2-100/116, Plot no.116, road no.15B, PVR Indradhnu, Gopalnagar Society, Kukatpally",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500085",
      gstin: "36AACFL5575H1Z4",
    },
    product: {
      name: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
      desc: "Includes 1-Year Comprehensive Warranty & Free Express Delivery",
      hsn: "84243000",
      qty: 1,
      price: 37999,
    },
    pricing: {
      taxable: 32202.54,
      gstRate: 18,
      cgst: 0,
      sgst: 0,
      igst: 5796.46,
      isIntraState: false,
      total: 37999,
      amountPaid: 3799,
      amountDue: 34200,
    },
    shipping: {
      partner: "Delhivery Express",
      waybill: "AUTO_GENERATED",
      status: "Manual sent on WhatsApp & Email",
    },
  },
  "order_TemZHkAYJjzQ5G": {
    id: "inv_TemZHkAYJjzQ5G",
    orderId: "order_TemZHkAYJjzQ5G",
    paymentId: "pay_Temc6eOQOFJJZ6",
    date: "21 Sep 2026",
    time: "11:49 PM",
    status: "paid",
    statusText: "PAID",
    customer: {
      name: "Balaji Studio",
      phone: "+91 9123066336",
      email: "mallikventures.official@gmail.com",
      address: "Mallikk KSK Indian oil Petrol Pump Rudrapur HABRA",
      city: "North Delhi",
      state: "West Bengal",
      pincode: "743271",
    },
    product: {
      name: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
      desc: "Includes 1-Year Comprehensive Warranty & Free Express Delivery",
      hsn: "84243000",
      qty: 1,
      price: 37999,
    },
    pricing: {
      taxable: 32202.54,
      gstRate: 18,
      cgst: 0,
      sgst: 0,
      igst: 5796.46,
      isIntraState: false,
      total: 37999,
      amountPaid: 37999,
      amountDue: 0,
    },
    shipping: {
      partner: "Delhivery Air Express",
      status: "Manual sent on WhatsApp & Email",
    },
  },
  "PROMEC-ORD-1790417815914-5DQL": {
    id: "inv_1790417815914-5DQL",
    orderId: "PROMEC-ORD-1790417815914-5DQL",
    paymentId: "pay_Tgd58Cm0DxJpl8",
    date: "26 Sep 2026",
    time: "3:47 PM",
    status: "partial",
    statusText: "ADVANCE PAID (10% COD)",
    customer: {
      name: "Subhash Sing Dhami",
      phone: "+91 8800781865",
      email: "subhash.singh.dhami.ssd@gmail.com",
      address: "1522 Bhagirath palace Chandni chowk Delhi 110006",
      city: "Delhi",
      state: "Delhi",
      pincode: "110006",
    },
    product: {
      name: "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)",
      desc: "Includes 1-Year Comprehensive Warranty & Free Express Delivery",
      hsn: "84243000",
      qty: 1,
      price: 37999,
    },
    pricing: {
      taxable: 32202.54,
      gstRate: 18,
      cgst: 0,
      sgst: 0,
      igst: 5796.46,
      isIntraState: false,
      total: 37999,
      amountPaid: 3800,
      amountDue: 34199,
    },
    shipping: {
      partner: "Delhivery Express",
      status: "Manual sent on WhatsApp & Email (Followup call)",
    },
  },
  "inv_TjOBeOPT9LsMrS": {
    id: "inv_TjOBeOPT9LsMrS",
    orderId: "order_TjOBeqWCXWTtyY",
    paymentId: "pay_Captured_Live",
    date: "03 Oct 2026",
    time: "3:09 PM",
    status: "paid",
    statusText: "PAID",
    customer: {
      name: "Aashitosh",
      phone: "+91 9876543210",
      email: "aashitosh@amectechnology.com",
      address: "Nagpur, Maharashtra, India",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440016",
    },
    product: {
      name: "PROMEC Aquaforce® 1400 PSI Cordless High-Pressure Washer",
      desc: "Includes 1-Year Comprehensive Warranty & Free Express Delivery",
      hsn: "84243000",
      qty: 1,
      price: 35999,
    },
    pricing: {
      taxable: 30507.63,
      gstRate: 18,
      cgst: 2745.68,
      sgst: 2745.68,
      igst: 0,
      isIntraState: true,
      total: 35999,
      amountPaid: 35999,
      amountDue: 0,
    },
    shipping: {
      partner: "Delhivery Express",
      status: "Delivered",
    },
  },
};

export default function RazorpayHostedInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id;
  const decodedId = decodeURIComponent(rawId);

  // Find matching invoice key or default to first
  const invoice =
    INVOICES_DATABASE[decodedId] ||
    Object.values(INVOICES_DATABASE).find(
      (inv) => inv.id === decodedId || inv.orderId === decodedId
    ) ||
    INVOICES_DATABASE["order_TVWMNCnxp7pU2C"];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 font-sans pb-16">
      {/* Top Selector Navigation Bar (Hidden during print) */}
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
              Razorpay Hosted Invoice View
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-[#2371ec] hover:bg-[#1a5bc7] text-white text-xs font-bold rounded-md flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Printer size={13} />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Razorpay Invoice Card Container */}
      <main className="max-w-[720px] mx-auto mt-6 sm:mt-10 px-3 sm:px-0">
        <div className="bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200/80 overflow-hidden print:border-none print:shadow-none print:m-0">
          
          {/* Top Brand Banner Header */}
          <div className="bg-[#2371ec] text-white px-6 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl font-black tracking-wider text-white">PROMEC</span>
                  <span className="text-[11px] bg-white/20 text-white font-bold px-2 py-0.5 rounded tracking-widest uppercase">
                    OFFICIAL
                  </span>
                </div>
                <h1 className="text-sm font-bold tracking-tight text-white/95">
                  AMEC MOBILITY PRIVATE LIMITED
                </h1>
                <p className="text-xs text-white/80 mt-1 leading-relaxed max-w-[420px]">
                  Plot No. 5A, 13A MIDC, Beside Tata Motors Service Centre, Hingna MIDC, Nagpur, Maharashtra, India - 440016
                </p>
                <div className="text-[11px] text-white/70 mt-1 flex flex-wrap gap-x-3">
                  <span>CIN: U29256MH2021PTC358748</span>
                  <span>GSTIN: 27AAVCA0791L1Z0</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="sm:text-right">
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-md shadow-xs ${
                  invoice.status === "paid"
                    ? "bg-[#6DCA00] text-white"
                    : "bg-amber-400 text-slate-900"
                }`}>
                  <CheckCircle size={14} className="stroke-[3]" />
                  {invoice.statusText}
                </span>
                <p className="text-xs text-white/80 mt-1.5 font-mono">
                  {invoice.id}
                </p>
              </div>
            </div>
          </div>

          {/* Invoice Body */}
          <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-700">
            
            {/* Meta Row */}
            <div className="flex flex-wrap justify-between items-start border-b border-slate-100 pb-5 gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Billed To
                </span>
                <p className="text-sm font-bold text-slate-900">{invoice.customer.name}</p>
                <p className="text-slate-600 mt-0.5 leading-relaxed max-w-sm">
                  ${invoice.customer.address}<br />
                  <strong className="text-slate-800">{invoice.customer.city}, {invoice.customer.state} - {invoice.customer.pincode}</strong>
                </p>
                <p className="text-slate-500 mt-1">
                  Phone: <strong className="text-slate-700">{invoice.customer.phone}</strong> | Email: <strong className="text-slate-700">{invoice.customer.email}</strong>
                </p>
                {invoice.customer.gstin && (
                  <p className="text-emerald-700 font-bold mt-1">
                    GSTIN: {invoice.customer.gstin} (B2B Tax Credit Eligible)
                  </p>
                )}
              </div>

              <div className="sm:text-right space-y-1">
                <div>
                  <span className="text-slate-400">Invoice Date:</span>{" "}
                  <strong className="text-slate-900">{invoice.date}, {invoice.time}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Order Reference:</span>{" "}
                  <span className="font-mono text-slate-700 font-semibold">{invoice.orderId}</span>
                </div>
                <div>
                  <span className="text-slate-400">Razorpay Payment:</span>{" "}
                  <span className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                    {invoice.paymentId}
                  </span>
                </div>
                {invoice.shipping.waybill && (
                  <div>
                    <span className="text-slate-400">Delhivery Waybill:</span>{" "}
                    <span className="font-mono font-bold text-[#2371ec]">{invoice.shipping.waybill}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px]">
                    <th className="py-2.5 text-left font-bold">Item Description</th>
                    <th className="py-2.5 text-center font-bold">Qty</th>
                    <th className="py-2.5 text-right font-bold">Rate</th>
                    <th className="py-2.5 text-right font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-4 text-slate-900 font-medium">
                      <div className="font-bold text-sm text-slate-900">{invoice.product.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-normal">
                        {invoice.product.desc}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">HSN: {invoice.product.hsn}</div>
                    </td>
                    <td className="py-4 text-center font-bold text-slate-800">{invoice.product.qty}</td>
                    <td className="py-4 text-right font-mono text-slate-700">₹{invoice.product.price.toLocaleString("en-IN")}.00</td>
                    <td className="py-4 text-right font-mono font-bold text-slate-900">₹{invoice.product.price.toLocaleString("en-IN")}.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Summary & Tax Calculation Box */}
            <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between gap-6">
              <div className="space-y-2 text-slate-500 text-[11px] max-w-xs">
                <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <ShieldCheck size={14} className="text-[#2371ec]" />
                  <span>100% Verified PROMEC Tax Invoice</span>
                </div>
                <p>
                  This computer-generated tax invoice is compliant with Indian IT Act 2000. Includes 1-Year Comprehensive Doorstep Replacement Warranty.
                </p>
                <p className="text-slate-400">
                  Fulfillment Status: <strong className="text-slate-600">{invoice.shipping.status}</strong>
                </p>
              </div>

              {/* Amounts Table */}
              <div className="w-full sm:w-[280px] space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Taxable Base Value:</span>
                  <span className="font-mono">₹{invoice.pricing.taxable.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </div>

                {invoice.pricing.isIntraState ? (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span>Central GST (CGST 9%):</span>
                      <span className="font-mono">₹{invoice.pricing.cgst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>State GST (SGST 9%):</span>
                      <span className="font-mono">₹{invoice.pricing.sgst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-slate-600">
                    <span>Integrated GST (IGST 18%):</span>
                    <span className="font-mono">₹{invoice.pricing.igst.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-2 text-sm">
                  <span>Total Gross Value:</span>
                  <span className="font-mono text-[#2371ec]">₹{invoice.pricing.total.toLocaleString("en-IN")}.00</span>
                </div>

                <div className="bg-slate-50 rounded-lg p-2.5 space-y-1.5 border border-slate-200 mt-2">
                  <div className="flex justify-between font-semibold text-emerald-700">
                    <span>Amount Paid:</span>
                    <span className="font-mono">₹{invoice.pricing.amountPaid.toLocaleString("en-IN")}.00</span>
                  </div>
                  <div className="flex justify-between font-semibold text-slate-700">
                    <span>Balance Due:</span>
                    <span className="font-mono">₹{invoice.pricing.amountDue.toLocaleString("en-IN")}.00</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Razorpay Brand Footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <span>Secured by</span>
              <span className="font-bold text-[#2371ec] tracking-wide text-xs">Razorpay</span>
            </div>
            <div>
              &copy; 2026 AMEC MOBILITY PRIVATE LIMITED • Support: promec.india@gmail.com
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
