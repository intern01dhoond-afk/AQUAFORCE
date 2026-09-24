import type { Metadata } from "next";
import ScrollNumberEditorialLayout, { PolicySection } from "@/components/ScrollNumberEditorialLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | PROMEC",
  description:
    "Learn what information PROMEC collects, why we collect it, how we use it and how we protect it when using our website and purchasing our products.",
};

const preamble = (
  <p>
    PROMEC respects your privacy and is committed to protecting the personal information you provide while using our website and purchasing our products. This Privacy Policy explains what information we collect, why we collect it, how we use it and how we protect it.
  </p>
);

const sections: PolicySection[] = [
  {
    id: "section-01",
    number: "01",
    title: "Information We Collect",
    category: "DATA COLLECTION",
    content: (
      <>
        <p>
          When you use our website, place an order or contact us, we may collect information such as:
        </p>
        <ul className="space-y-2 pt-1">
          {[
            "Name",
            "Mobile number",
            "Email address",
            "Billing and delivery address",
            "Order and transaction details",
            "Payment-related information required to process your transaction",
            "Information provided to our customer support team",
            "Device, browser and website usage information",
            "Other information voluntarily provided by you",
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
    id: "section-02",
    number: "02",
    title: "How We Use Your Information",
    category: "PURPOSE & USAGE",
    content: (
      <>
        <p>We may use your information to:</p>
        <ul className="space-y-2 pt-1">
          {[
            "Process and deliver your orders",
            "Confirm and communicate order details",
            "Process payments",
            "Provide customer support",
            "Manage warranty and service requests",
            "Process returns, refunds and cancellations",
            "Send important service and transactional communications",
            "Improve our website, products and customer experience",
            "Prevent fraud, misuse and unauthorised transactions",
            "Comply with applicable legal and regulatory requirements",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="pt-2 text-neutral-800 font-medium">
          Where permitted by applicable law and based on the appropriate legal basis or consent, we may also use your contact information for promotional or marketing communications.
        </p>
      </>
    ),
  },
  {
    id: "section-03",
    number: "03",
    title: "Payment Information",
    category: "TRANSACTION SECURITY",
    content: (
      <>
        <p>
          Payments made through our website may be processed by third-party payment gateway providers.
        </p>
        <p>
          PROMEC does not intentionally store customers’ complete card numbers, CVV numbers, Net Banking credentials, UPI PINs or banking passwords.
        </p>
        <p>
          Payment information is handled by the relevant payment service provider according to its applicable privacy and security practices.
        </p>
      </>
    ),
  },
  {
    id: "section-04",
    number: "04",
    title: "Cookies",
    category: "TRACKING & ANALYTICS",
    content: (
      <>
        <p>Our website may use cookies and similar technologies to:</p>
        <ul className="space-y-2 pt-1">
          {[
            "Keep the website functioning properly",
            "Remember user preferences",
            "Understand website usage",
            "Improve website performance",
            "Measure advertising and marketing performance",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="pt-2">
          You may be able to control cookies through your browser settings. Disabling certain cookies may affect some website functionality.
        </p>
      </>
    ),
  },
  {
    id: "section-05",
    number: "05",
    title: "Sharing of Information",
    category: "THIRD PARTIES",
    content: (
      <>
        <p>
          We may share necessary information with trusted service providers when required to operate our business, including:
        </p>
        <ul className="space-y-2 pt-1">
          {[
            "Payment gateway providers",
            "Courier and logistics partners",
            "Technology and website service providers",
            "Customer support/service partners",
            "Marketing and analytics service providers, where applicable",
            "Government authorities or legal bodies when required by law",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="pt-2 font-semibold text-black">
          We do not sell your personal information as a product to third parties.
        </p>
      </>
    ),
  },
  {
    id: "section-06",
    number: "06",
    title: "Data Security",
    category: "PROTECTION",
    content: (
      <>
        <p>
          We take reasonable technical and organisational measures to protect personal information from unauthorised access, misuse, alteration, disclosure or loss.
        </p>
        <p>
          However, no electronic transmission or storage system can be guaranteed to be completely secure.
        </p>
      </>
    ),
  },
  {
    id: "section-07",
    number: "07",
    title: "Data Retention",
    category: "LIFECYCLE",
    content: (
      <p>
        We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including order processing, customer support, warranty/service requirements, legal obligations, accounting and dispute resolution.
      </p>
    ),
  },
  {
    id: "section-08",
    number: "08",
    title: "Your Rights",
    category: "USER CONTROL",
    content: (
      <>
        <p>
          Subject to applicable law, you may have rights relating to your personal information, including the right to request access to, correction of or deletion of certain personal information and the ability to withdraw consent where processing is based on consent.
        </p>
        <p>
          Requests can be made using the contact details provided below.
        </p>
      </>
    ),
  },
  {
    id: "section-09",
    number: "09",
    title: "Children’s Privacy",
    category: "AGE COMPLIANCE",
    content: (
      <>
        <p>
          Our website is intended for general consumers and is not specifically directed towards children.
        </p>
        <p>
          We do not knowingly request or collect personal information from children in circumstances where such collection is prohibited by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "section-10",
    number: "10",
    title: "Third-Party Websites",
    category: "EXTERNAL LINKS",
    content: (
      <p>
        Our website may contain links to third-party websites or services. PROMEC is not responsible for the privacy practices or content of third-party websites. Customers are advised to review their respective privacy policies.
      </p>
    ),
  },
  {
    id: "section-11",
    number: "11",
    title: "Changes to This Privacy Policy",
    category: "UPDATES",
    content: (
      <>
        <p>
          PROMEC may update this Privacy Policy from time to time to reflect changes in our business, technology or applicable laws.
        </p>
        <p>
          The updated policy will be published on this page with the revised effective date.
        </p>
      </>
    ),
  },
  {
    id: "section-12",
    number: "12",
    title: "Contact Us",
    category: "OFFICIAL SUPPORT",
    content: (
      <div className="space-y-6">
        <p className="text-neutral-700">
          For privacy-related questions, requests or concerns, please reach out to us:
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

export default function PrivacyPolicyPage() {
  return (
    <ScrollNumberEditorialLayout
      pageTitle="PRIVACY POLICY"
      metadataLabel="LEGAL DOCUMENT"
      lastUpdated="MARCH 2026"
      preamble={preamble}
      sections={sections}
    />
  );
}
