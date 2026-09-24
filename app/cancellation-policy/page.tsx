import type { Metadata } from "next";
import ScrollNumberEditorialLayout, { PolicySection } from "@/components/ScrollNumberEditorialLayout";

export const metadata: Metadata = {
  title: "Cancellation Policy | PROMEC",
  description:
    "Review PROMEC's order cancellation policy, process for cancellations before and after dispatch, refusal of delivery, and refund processing.",
};

const preamble = (
  <p>
    PROMEC understands that customers may occasionally need to cancel an order. This policy explains the process for requesting an order cancellation.
  </p>
);

const sections: PolicySection[] = [
  {
    id: "section-01",
    number: "01",
    title: "Cancellation Before Dispatch",
    category: "PRE-DISPATCH",
    content: (
      <>
        <p>
          Customers may request cancellation before the order has been dispatched.
        </p>
        <p>
          To request cancellation, contact PROMEC customer support with your order number and registered mobile number/email address.
        </p>
        <p>
          If the cancellation request is accepted before dispatch, any eligible amount already paid will be refunded according to our Refund Policy.
        </p>
      </>
    ),
  },
  {
    id: "section-02",
    number: "02",
    title: "Cancellation After Dispatch",
    category: "IN TRANSIT",
    content: (
      <>
        <p>
          Once an order has been dispatched, cancellation may not be possible through the normal cancellation process.
        </p>
        <p>
          In such cases, customers should contact our support team immediately. Depending on the shipment status, PROMEC may provide available options.
        </p>
      </>
    ),
  },
  {
    id: "section-03",
    number: "03",
    title: "Refusal of Delivery",
    category: "DELIVERY ATTEMPTS",
    content: (
      <>
        <p>
          Customers are requested not to refuse delivery without contacting our support team first.
        </p>
        <p>
          If a shipment is refused or remains undelivered, it may be returned to PROMEC by the logistics partner. Any refund, where applicable, will be processed according to the Refund Policy and applicable order terms.
        </p>
      </>
    ),
  },
  {
    id: "section-04",
    number: "04",
    title: "Partial Payment / Advance Orders",
    category: "PAYMENT TERMS",
    content: (
      <>
        <p>
          For orders where an advance or partial payment has been made, cancellation and refund eligibility will depend on the order status and applicable terms.
        </p>
        <p>
          Any eligible refund will be processed through the applicable payment method.
        </p>
      </>
    ),
  },
  {
    id: "section-05",
    number: "05",
    title: "Cancellation by PROMEC",
    category: "SELLER CANCELLATION",
    content: (
      <>
        <p className="font-semibold text-black">
          PROMEC may cancel an order in situations including:
        </p>
        <ul className="space-y-2 pt-1">
          {[
            "Product unavailability",
            "Incorrect or incomplete order information",
            "Pricing or technical errors",
            "Suspected fraudulent activity",
            "Delivery restrictions",
            "Customer verification issues",
            "Circumstances beyond reasonable control",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="pt-2">
          If PROMEC cancels an order after receiving payment, the eligible amount will be refunded to the customer.
        </p>
      </>
    ),
  },
  {
    id: "section-06",
    number: "06",
    title: "How to Request Cancellation",
    category: "SUPPORT PROCEDURES",
    content: (
      <>
        <p>To request an order cancellation, contact:</p>
        <div className="border border-black/15 p-5 space-y-2 font-mono text-xs sm:text-sm bg-neutral-50 my-2">
          <div className="font-bold text-black text-sm uppercase">PROMEC Customer Support</div>
          <div>
            <span className="text-neutral-500 uppercase tracking-wider text-[11px]">Email:</span>{" "}
            <a href="mailto:promec.india@gmail.com" className="text-black font-sans font-medium hover:underline">
              promec.india@gmail.com
            </a>
          </div>
          <div>
            <span className="text-neutral-500 uppercase tracking-wider text-[11px]">Phone / WhatsApp:</span>{" "}
            <a href="tel:+917387588963" className="text-black font-sans font-medium hover:underline">
              +91 73875 88963
            </a>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-neutral-500">
          Please provide your order number and registered contact details so that we can process your request efficiently.
        </p>
      </>
    ),
  },
  {
    id: "section-07",
    number: "07",
    title: "Refund After Cancellation",
    category: "SETTLEMENT TIMELINE",
    content: (
      <>
        <p>
          Where a cancellation qualifies for a refund, PROMEC will initiate the refund through the applicable payment method.
        </p>
        <p>
          The time taken for the refund to reflect in the customer’s account may depend on the payment gateway or bank.
        </p>
      </>
    ),
  },
  {
    id: "section-08",
    number: "08",
    title: "Contact Us",
    category: "CANCELLATION & DISPUTES",
    content: (
      <div className="space-y-6">
        <p className="text-neutral-700">
          To request an order cancellation or check status, our support team is available via direct communication channels:
        </p>

        <div className="border border-black/15 p-6 sm:p-8 space-y-4 font-mono text-xs sm:text-sm bg-neutral-50">
          <div className="text-base sm:text-lg font-bold font-montserrat tracking-tight text-black uppercase">
            PROMEC Customer Support
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-black/10 pt-3">
            <span className="text-neutral-500 uppercase tracking-widest text-[11px]">Email</span>
            <a
              href="mailto:promec.india@gmail.com"
              className="text-black hover:underline underline-offset-4 font-sans text-sm font-medium"
            >
              promec.india@gmail.com
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-black/10 pt-3">
            <span className="text-neutral-500 uppercase tracking-widest text-[11px]">Phone / WhatsApp</span>
            <a
              href="tel:+917387588963"
              className="text-black hover:underline underline-offset-4 font-sans text-sm font-medium"
            >
              +91 73875 88963
            </a>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2 border-t border-black/10 pt-3">
            <span className="text-neutral-500 uppercase tracking-widest text-[11px] shrink-0">Address</span>
            <span className="text-neutral-700 font-sans text-xs sm:text-sm text-left sm:text-right max-w-md leading-relaxed">
              13A, Plot No. 5A, beside Tata Motors Service Centre, M.I.D.C, MIDC, Hingna, Digdoh, Maharashtra 440016
            </span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function CancellationPolicyPage() {
  return (
    <ScrollNumberEditorialLayout
      pageTitle="CANCELLATION POLICY"
      metadataLabel="LEGAL DOCUMENT"
      lastUpdated="MARCH 2026"
      preamble={preamble}
      sections={sections}
    />
  );
}
