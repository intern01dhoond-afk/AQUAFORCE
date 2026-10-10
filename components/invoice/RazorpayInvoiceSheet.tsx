"use client";

import React from "react";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { InvoiceDetails } from "@/lib/invoiceUtils";

interface RazorpayInvoiceSheetProps {
  invoice: InvoiceDetails;
  className?: string;
}

export default function RazorpayInvoiceSheet({ invoice, className = "" }: RazorpayInvoiceSheetProps) {
  const { customer, product, pricing } = invoice;
  const isMH = pricing.isIntraState;

  const formattedTotal = pricing.totalAmount.toLocaleString("en-IN");
  const formattedTaxable = pricing.taxableBase.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedTotalTax = pricing.totalTax.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedCgst = pricing.cgst.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedSgst = pricing.sgst.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedIgst = pricing.igst.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div
      className={`bg-white text-slate-800 p-6 sm:p-10 font-sans max-w-[760px] mx-auto rounded-lg shadow-sm print:shadow-none print:p-0 print:max-w-none print:rounded-none ${className}`}
    >
      {/* 1. Header: Company Brand on Left, Razorpay Badge on Right */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="flex items-start gap-3.5">
          <div className="relative w-11 h-11 shrink-0 pt-0.5">
            <Image
              src="/images/amec-shield-logo.png"
              alt="AMEC Mobility"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-[15px] sm:text-base font-extrabold text-slate-900 tracking-tight leading-snug">
              AMEC MOBILITY PRIVATE LIMITED
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              GSTIN - <span className="text-slate-700 font-semibold">27AAVCA0791L1Z0</span>
            </p>
            <p className="text-xs text-slate-500 font-medium">
              CIN - <span className="text-slate-700 font-semibold">U29256MH2021PTC358748</span>
            </p>
          </div>
        </div>

        {/* Razorpay Invoicing Badge */}
        <div className="flex flex-col items-end shrink-0">
          <div className="relative w-28 h-7">
            <Image
              src="/images/razorpay-logo.svg"
              alt="Razorpay"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 text-right leading-tight">
            Invoicing and payments
            <br />
            powered by <span className="text-[#0c2340] font-semibold">Razorpay</span>
          </p>
        </div>
      </div>

      {/* 2. Invoice Meta Title & Amount Due */}
      <div className="mt-7">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900">Invoice #</span>
          <span className="text-sm font-semibold text-slate-800 border-b border-slate-300 pb-0.5 px-1 min-w-[140px] tracking-wide font-mono">
            {invoice.invoiceNumber}
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed max-w-xl">
          Invoice to {customer.fullName} for {product.name}
        </p>
      </div>

      {/* 3. Amount Due Display */}
      <div className="mt-6">
        <div className="inline-block">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            AMOUNT DUE
          </span>
          <div className="w-7 h-[2.5px] bg-[#2563eb] mt-1 rounded-full"></div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
          ₹ {formattedTotal}
          <span className="text-lg sm:text-xl text-slate-500 font-semibold">.00</span>
        </div>
      </div>

      {/* 4. Customer Billing & Address Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-7 text-xs">
        {/* Left Column: Billing To & Dates */}
        <div className="space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              BILLING TO
            </span>
            <div className="font-semibold text-slate-900 text-sm">{customer.fullName}</div>
            {customer.phone && <div className="text-slate-600 mt-0.5">{customer.phone}</div>}
            {customer.email && <div className="text-slate-600 mt-0.5">{customer.email}</div>}
            {customer.gstin && (
              <div className="text-emerald-700 font-semibold mt-1">
                GSTIN: {customer.gstin}
              </div>
            )}
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 w-24">
                ISSUE DATE
              </span>
              <div className="flex items-center gap-2 text-slate-800 font-medium bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded">
                <span>{invoice.issueDate}</span>
                <Calendar size={13} className="text-slate-400" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 w-24">
                EXPIRY DATE
              </span>
              <div className="flex items-center gap-2 text-slate-400 font-medium bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded">
                <span>{invoice.expiryDate || "Expiry Date"}</span>
                <Calendar size={13} className="text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Billing Address, Shipping Address & Place of Supply */}
        <div className="space-y-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              BILLING ADDRESS
            </span>
            <div className="text-slate-700 leading-relaxed capitalize">
              {customer.billingAddress}
              <br />
              {customer.city}, {customer.state}, India ({customer.pincode})
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              SHIPPING ADDRESS
            </span>
            <div className="text-slate-700 leading-relaxed capitalize">
              {customer.shippingAddress}
              <br />
              {customer.city}, {customer.state}, India ({customer.pincode})
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              PLACE OF SUPPLY
            </span>
            <div className="font-semibold text-slate-900 text-xs">
              {customer.state || "Maharashtra"}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Itemized Table with State-dependent GST breakup */}
      <div className="mt-8">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/90 text-slate-500 uppercase font-bold text-[11px] border-y border-slate-200">
              <th className="py-2.5 px-3 text-left font-bold">DESCRIPTION</th>
              <th className="py-2.5 px-3 text-right font-bold">RATE/ITEM</th>
              <th className="py-2.5 px-3 text-center font-bold">QTY</th>
              <th className="py-2.5 px-3 text-right font-bold">TOTAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4 px-3 text-slate-900 align-top">
                <div className="font-semibold text-slate-900 text-xs sm:text-[13px] leading-snug">
                  {product.name}
                </div>
                <div className="text-slate-500 text-[11px] mt-1 font-semibold">
                  HSN - <span className="text-slate-700 font-bold">{product.hsn}</span>
                </div>
              </td>

              <td className="py-4 px-3 text-right align-top">
                <div className="font-mono text-slate-800 font-medium">
                  {product.unitPrice}
                </div>
                {/* Same State (MH) -> SGST/CGST */}
                {isMH ? (
                  <div className="mt-1 space-y-0.5">
                    <div className="text-slate-500 text-[11px] font-medium">CGST @ 9%</div>
                    <div className="text-slate-500 text-[11px] font-medium">SGST @ 9%</div>
                  </div>
                ) : (
                  /* Out of Maharashtra -> IGST @ 18% */
                  <div className="text-slate-500 text-[11px] mt-1 font-medium">
                    IGST @ 18%
                  </div>
                )}
              </td>

              <td className="py-4 px-3 text-center text-slate-800 font-semibold align-top">
                {product.quantity}
              </td>

              <td className="py-4 px-3 text-right align-top">
                <div className="font-mono font-bold text-slate-900">
                  ₹ {formattedTotal}.00
                </div>
                {isMH ? (
                  <div className="mt-1 space-y-0.5">
                    <div className="font-mono text-slate-600 text-[11px]">
                      ₹ {formattedCgst}
                    </div>
                    <div className="font-mono text-slate-600 text-[11px]">
                      ₹ {formattedSgst}
                    </div>
                  </div>
                ) : (
                  <div className="font-mono text-slate-600 text-[11px] mt-1">
                    ₹ {formattedIgst}
                  </div>
                )}
                <div className="text-[10px] text-slate-400 italic mt-0.5">
                  Tax Inclusive, Rounded-off
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 6. Subtotal & Totals Summary */}
      <div className="flex justify-end mt-6 border-t border-slate-200 pt-5">
        <div className="w-full sm:w-[320px] space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Sub Total</span>
            <span className="font-mono font-medium">₹ {formattedTotal}.00</span>
          </div>

          {isMH ? (
            <>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>CGST (9%)</span>
                <span className="font-mono">₹ {formattedCgst}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>SGST (9%)</span>
                <span className="font-mono">₹ {formattedSgst}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Tax</span>
                <span className="font-mono font-medium">₹ {formattedTotalTax}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between text-slate-600">
              <span>Total Tax</span>
              <span className="font-mono font-medium">₹ {formattedTotalTax}</span>
            </div>
          )}

          <div className="flex justify-between text-base font-extrabold text-slate-900 pt-3 border-t border-slate-200">
            <span>Total Amount</span>
            <span className="font-mono text-slate-900">₹ {formattedTotal}.00</span>
          </div>

          <div className="text-[11px] text-slate-500 text-right italic pt-1 leading-snug">
            (In Words) {invoice.inWords}
          </div>

          {/* COD Breakdown Note if applicable */}
          {invoice.isCod && (
            <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-200 space-y-1 mt-3 text-xs">
              <div className="flex justify-between text-amber-900 font-semibold">
                <span>10% Advance Paid Online:</span>
                <span className="font-mono">₹ {pricing.advancePaid.toLocaleString("en-IN")}.00</span>
              </div>
              <div className="flex justify-between text-amber-900 font-bold">
                <span>Balance Due on Delivery:</span>
                <span className="font-mono">₹ {pricing.balanceDue.toLocaleString("en-IN")}.00</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 7. Customer Notes & Terms and Conditions */}
      <div className="mt-10 pt-6 border-t border-slate-200 space-y-5 text-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            CUSTOMER NOTES
          </span>
          <p className="text-slate-500">
            {invoice.customerNotes || "Add Customer Notes"}
          </p>
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            TERMS AND CONDITIONS
          </span>
          <p className="text-slate-500">
            {invoice.termsAndConditions || "Add Terms and Conditions"}
          </p>
        </div>
      </div>

      {/* 8. Centered Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="font-bold text-slate-800">
          AMEC MOBILITY PRIVATE LIMITED
        </div>
        <div className="text-[11px] text-slate-400 mt-1">
          Plot No. 5A, 13A MIDC, Beside Tata Motors Service Centre, Hingna MIDC, Nagpur, Maharashtra, India - 440016
        </div>
      </div>
    </div>
  );
}
