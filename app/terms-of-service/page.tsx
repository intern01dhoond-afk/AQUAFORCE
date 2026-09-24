import type { Metadata } from "next";
import ScrollNumberEditorialLayout, { PolicySection } from "@/components/ScrollNumberEditorialLayout";

export const metadata: Metadata = {
  title: "Terms of Service | PROMEC",
  description:
    "Review the Terms & Conditions and Terms of Service governing your access to and use of the PROMEC website and the purchase of products from PROMEC.",
};

const preamble = (
  <p>
    Welcome to the PROMEC website. These Terms &amp; Conditions govern your access to and use of our website and the purchase of products from PROMEC. By accessing our website or placing an order, you agree to these Terms &amp; Conditions. Please read them carefully before making a purchase.
  </p>
);

const sections: PolicySection[] = [
  {
    id: "section-01",
    number: "01",
    title: "About PROMEC",
    category: "COMPANY OVERVIEW",
    content: (
      <p>
        PROMEC is a brand engaged in providing cleaning equipment and related solutions for personal, commercial and professional use.
      </p>
    ),
  },
  {
    id: "section-02",
    number: "02",
    title: "Products & Product Information",
    category: "SPECIFICATIONS & CATALOG",
    content: (
      <>
        <p>
          We make reasonable efforts to ensure that product descriptions, specifications, images, prices and other information displayed on our website are accurate and up to date.
        </p>
        <p>
          Product images may differ slightly from the actual product due to photography, lighting, display settings or product updates.
        </p>
        <p>
          Specifications, accessories and product features may be changed or updated by the manufacturer where required.
        </p>
      </>
    ),
  },
  {
    id: "section-03",
    number: "03",
    title: "Product Pricing",
    category: "PRICING POLICY",
    content: (
      <>
        <p>
          All product prices displayed on the website are subject to change without prior notice.
        </p>
        <p>
          Any applicable taxes, shipping charges or other charges will be displayed during the purchase process wherever applicable.
        </p>
        <p>
          PROMEC reserves the right to correct pricing or product information errors. If an order has been placed based on an obvious pricing error, we may contact the customer before processing the order.
        </p>
      </>
    ),
  },
  {
    id: "section-04",
    number: "04",
    title: "Orders",
    category: "PURCHASE & ACCEPTANCE",
    content: (
      <>
        <p>
          An order placed through the website is considered a purchase request and is subject to acceptance and availability.
        </p>
        <p>
          After placing an order, customers may receive an order confirmation through email, SMS, WhatsApp or other available communication channels.
        </p>
        <p className="font-semibold text-black">
          PROMEC reserves the right to cancel an order in situations including, but not limited to:
        </p>
        <ul className="space-y-2 pt-1">
          {[
            "Product unavailability",
            "Incorrect or incomplete customer information",
            "Suspected fraudulent transactions",
            "Incorrect pricing or product information",
            "Delivery limitations",
            "Other circumstances beyond reasonable control",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="pt-2">
          If PROMEC cancels an order for which payment has already been received, the eligible amount will be refunded through the applicable payment method.
        </p>
      </>
    ),
  },
  {
    id: "section-05",
    number: "05",
    title: "Payments",
    category: "PAYMENT PROCESSING",
    content: (
      <>
        <p>
          Payments may be made through the payment methods available on the website, including online payment methods, Net Banking, cards, UPI, EMI and other available options.
        </p>
        <p>
          All online payments are processed through authorised payment gateway providers. PROMEC does not directly store customers’ complete card, banking or payment credentials.
        </p>
      </>
    ),
  },
  {
    id: "section-06",
    number: "06",
    title: "Cash on Delivery / Partial Payment",
    category: "PAYMENT MODES",
    content: (
      <>
        <p>
          Where Cash on Delivery or partial-payment options are available, the applicable payment terms will be clearly communicated during the order process.
        </p>
        <p>
          Customers are required to provide accurate contact and delivery information and remain available to receive the order.
        </p>
      </>
    ),
  },
  {
    id: "section-07",
    number: "07",
    title: "Shipping & Delivery",
    category: "FULFILLMENT & LOGISTICS",
    content: (
      <>
        <p>
          Orders are shipped to the delivery address provided by the customer during checkout.
        </p>
        <p>
          Estimated delivery timelines may vary depending on the delivery location, courier availability, product availability, weather, logistics conditions and other factors.
        </p>
        <p>
          PROMEC is not responsible for delays caused by courier partners, natural events, government restrictions or circumstances beyond our reasonable control.
        </p>
      </>
    ),
  },
  {
    id: "section-08",
    number: "08",
    title: "Product Inspection",
    category: "DELIVERY VERIFICATION",
    content: (
      <>
        <p>
          Customers are advised to inspect the package and product upon delivery.
        </p>
        <p>
          If the product is damaged, incorrect or with a visible issue, the customer should contact PROMEC support as soon as possible with relevant photographs/videos and order details.
        </p>
      </>
    ),
  },
  {
    id: "section-09",
    number: "09",
    title: "Warranty",
    category: "WARRANTY TERMS",
    content: (
      <>
        <p>
          Products may carry a manufacturer warranty or service warranty as specified on the respective product page, invoice or warranty documentation.
        </p>
        <p>
          Warranty coverage is subject to the applicable warranty terms and conditions.
        </p>
        <p>
          Warranty generally does not cover damage caused by misuse, negligence, unauthorised modification, accidents, improper installation, normal wear and tear or use contrary to the product instructions.
        </p>
      </>
    ),
  },
  {
    id: "section-10",
    number: "10",
    title: "Returns, Refunds & Cancellations",
    category: "POLICY LINKAGES",
    content: (
      <>
        <p>
          Returns, refunds and cancellations are governed by our separate Return/Refund Policy and Cancellation Policy published on this website.
        </p>
        <p>
          Customers should review those policies before placing an order.
        </p>
      </>
    ),
  },
  {
    id: "section-11",
    number: "11",
    title: "Customer Responsibilities",
    category: "CUSTOMER CONDUCT",
    content: (
      <>
        <p className="font-semibold text-black">Customers agree to:</p>
        <ul className="space-y-2 pt-1">
          {[
            "Provide accurate name, phone number, email and delivery details.",
            "Use the products according to the manufacturer’s instructions.",
            "Not misuse, modify or tamper with the products.",
            "Provide accurate information during checkout.",
            "Cooperate with delivery and verification requirements where applicable.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "section-12",
    number: "12",
    title: "Intellectual Property",
    category: "PROPRIETARY RIGHTS",
    content: (
      <p>
        All content available on the PROMEC website, including logos, product images, graphics, text, videos, designs and other materials, is owned by or licensed to PROMEC and may not be copied, reproduced or used without prior written permission.
      </p>
    ),
  },
  {
    id: "section-13",
    number: "13",
    title: "Website Availability",
    category: "SERVICE CONTINUITY",
    content: (
      <>
        <p>
          PROMEC makes reasonable efforts to keep the website available and functional. However, we do not guarantee uninterrupted or error-free access at all times.
        </p>
        <p>
          Website services may occasionally be unavailable due to maintenance, technical issues or circumstances beyond our control.
        </p>
      </>
    ),
  },
  {
    id: "section-14",
    number: "14",
    title: "Limitation of Liability",
    category: "LIABILITY",
    content: (
      <>
        <p>
          PROMEC will not be responsible for losses caused by circumstances beyond its reasonable control, including courier delays, technical failures, natural events, government restrictions or misuse of products.
        </p>
        <p>
          Nothing in these Terms &amp; Conditions is intended to limit any rights available to consumers under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "section-15",
    number: "15",
    title: "Governing Law",
    category: "JURISDICTION",
    content: (
      <p>
        These Terms &amp; Conditions shall be governed by the applicable laws of India.
      </p>
    ),
  },
  {
    id: "section-16",
    number: "16",
    title: "Contact Us",
    category: "CUSTOMER SUPPORT & ORDERS",
    content: (
      <div className="space-y-6">
        <p className="text-neutral-700">
          For questions, support or complaints regarding an order, please contact:
        </p>

        <div className="border border-black/15 p-6 sm:p-8 space-y-4 font-mono text-xs sm:text-sm bg-neutral-50">
          <div className="text-base sm:text-lg font-bold font-montserrat tracking-tight text-black uppercase">
            PROMEC
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

export default function TermsOfServicePage() {
  return (
    <ScrollNumberEditorialLayout
      pageTitle="TERMS OF SERVICE"
      metadataLabel="LEGAL DOCUMENT"
      lastUpdated="MARCH 2026"
      preamble={preamble}
      sections={sections}
    />
  );
}
