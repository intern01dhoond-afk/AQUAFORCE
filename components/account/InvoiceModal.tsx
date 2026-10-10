"use client";

import { X, Printer, ExternalLink } from "lucide-react";
import Link from "next/link";
import { PromecOrder } from "@/lib/orderStore";
import { convertOrderToInvoiceDetails } from "@/lib/invoiceUtils";
import RazorpayInvoiceSheet from "@/components/invoice/RazorpayInvoiceSheet";

interface InvoiceModalProps {
  order: PromecOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceModal({ order, isOpen, onClose }: InvoiceModalProps) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceDetails = convertOrderToInvoiceDetails(order);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-[780px] max-h-[94vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900 border border-slate-200">
        {/* Modal Controls Bar (Hidden during print) */}
        <div className="print:hidden flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
              Razorpay Tax Invoice
            </span>
            <span className="text-xs font-mono font-bold text-slate-800 tracking-wide bg-slate-200/80 px-2 py-0.5 rounded">
              #{invoiceDetails.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/invoices/${encodeURIComponent(order.id)}`}
              target="_blank"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              title="Open Invoice in new tab"
            >
              <ExternalLink size={13} />
              <span>Full Page</span>
            </Link>
            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2371ec] hover:bg-[#1a5bc7] text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Invoice Content */}
        <div className="overflow-y-auto p-2 sm:p-4 bg-slate-100/60 print:bg-white print:p-0 print:overflow-visible">
          <RazorpayInvoiceSheet invoice={invoiceDetails} />
        </div>
      </div>
    </div>
  );
}
