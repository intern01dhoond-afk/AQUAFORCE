"use client";

import { X } from "lucide-react";

interface ReturnPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReturnPolicyModal({ isOpen, onClose }: ReturnPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 overflow-hidden overscroll-contain bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[680px] max-h-[85vh] flex flex-col bg-white rounded-[20px] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 bg-white shrink-0">
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-montserrat text-slate-900 tracking-tight">
              AquaForce® Return &amp; Refund Policy
            </h3>
            <p className="text-xs text-slate-500 font-open-sans mt-0.5">
              Official Return, Replacement &amp; Warranty Terms
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full flex items-center justify-center transition-colors focus:outline-none cursor-pointer shrink-0"
            aria-label="Close Return Policy"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 text-slate-800 font-open-sans text-xs sm:text-[13px] leading-relaxed no-scrollbar">
          {/* Preamble Card */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-slate-700 font-medium">
            At <strong className="font-bold text-[#0066cc]">AquaForce®</strong>, we ensure that every product is properly checked and packed before dispatch. Returns and refunds are accepted only under the conditions mentioned below.
          </div>

          {/* Return Period */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 font-open-sans">
              Return Period
            </h4>
            <ul className="pl-5 space-y-1.5 text-slate-600 list-disc">
              <li>Return requests must be raised within <strong>7 days</strong> of delivery.</li>
              <li>Returns are accepted only for damaged, defective, incorrect, or incomplete products.</li>
            </ul>
          </div>

          {/* Product Condition */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 font-open-sans">
              Product Condition
            </h4>
            <p className="pl-5 font-semibold text-slate-800">For a return to be accepted, the product must:</p>
            <ul className="pl-9 space-y-1.5 text-slate-600 list-disc">
              <li>Be unused or only tested for the reported issue.</li>
              <li>Have no scratches, dents, cracks, stains, or physical damage caused by the customer.</li>
              <li>Not be opened, dismantled, repaired, modified, or misused.</li>
              <li>Include all original parts, accessories, attachments, manuals, warranty card, and packaging.</li>
            </ul>
          </div>

          {/* Returns Not Accepted */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 font-open-sans">
              Returns Not Accepted
            </h4>
            <p className="pl-5 font-semibold text-slate-800">Returns will not be accepted for:</p>
            <ul className="pl-9 space-y-1.5 text-slate-600 list-disc">
              <li>Customer-caused damage or improper use.</li>
              <li>Scratches, dents, cracks, or signs of excessive use.</li>
              <li>Missing parts or accessories.</li>
              <li>Products that have been opened, modified, repaired, or dismantled.</li>
              <li>Normal wear and tear.</li>
              <li>Return requests made after the return period.</li>
            </ul>
          </div>

          {/* Mandatory Verification for Warranty, Claims & Replacements */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <h4 className="font-bold text-sm sm:text-base text-slate-900 font-open-sans">
                Mandatory for Warranty Registration, Claims & Replacements
              </h4>
            </div>
            <p className="pl-4 font-semibold text-slate-800 text-xs sm:text-sm">
              The following three verification items are strictly mandatory to activate warranty, file a claim, or request a replacement:
            </p>
            <ol className="pl-8 space-y-1.5 text-slate-600 list-decimal text-xs sm:text-sm">
              <li>
                <span className="font-semibold text-slate-800">Unboxing video</span> of the washer system showing seal integrity and package contents.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Testing video</span> of the washer system operated along with the vacuum unit.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Customer review & feedback</span> (video clip or detailed rating comment).
              </li>
            </ol>
            <p className="pl-4 text-[11px] text-amber-700 font-medium">
              * Requests submitted without these 3 verification proofs cannot be processed for claims or replacement.
            </p>
          </div>

          {/* Return Request */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 font-open-sans">
              Return Request
            </h4>
            <p className="pl-5 font-semibold text-slate-800">To request a return or replacement, submit via your Account Dashboard or Support with:</p>
            <ul className="pl-9 space-y-1.5 text-slate-600 list-disc">
              <li>Order number & registered contact details</li>
              <li>Reason for claim / replacement</li>
              <li>Mandatory unboxing and testing videos (Google Drive / YouTube / Cloud link or upload)</li>
              <li>Customer review & feedback verification</li>
            </ul>
            <p className="pl-5 text-xs text-slate-500 font-medium italic mt-1">
              All return and claim requests are subject to technical verification and approval.
            </p>
          </div>

          {/* Refund / Replacement */}
          <div className="space-y-2 border-b border-slate-100 pb-4">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 font-open-sans">
              Refund / Replacement
            </h4>
            <ul className="pl-9 space-y-1.5 text-slate-600 list-disc">
              <li>A replacement unit or component is dispatched upon technical verification approval.</li>
              <li>If a refund is approved, it will be processed through the original payment method.</li>
              <li>Refunds may be adjusted for missing accessories, customer-caused damage, or physical abuse.</li>
            </ul>
          </div>

          {/* Warranty */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm sm:text-base text-slate-900 font-open-sans">
              Warranty Coverage
            </h4>
            <p className="pl-5 text-slate-600 leading-relaxed">
              AquaForce® pressure washers carry a comprehensive 1-year manufacturer warranty covering motor, pump, and electrical failures when registered with mandatory unboxing and testing proof.
            </p>
          </div>

          {/* Reserved Rights Banner */}
          <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 font-medium leading-relaxed">
            AquaForce® reserves the right to approve or reject any return, replacement, or refund request based on product condition and verification.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#0066cc] hover:bg-[#0052b3] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-[8px] transition-colors cursor-pointer"
          >
            Close Policy
          </button>
        </div>
      </div>
    </div>
  );
}
