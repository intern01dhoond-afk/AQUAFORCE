/**
 * Shared utility functions for generating Indian GST-compliant Invoices
 * following AMEC Mobility Private Limited & Razorpay standard format.
 */

export interface InvoiceDetails {
  invoiceNumber: string;
  orderId: string;
  paymentId?: string;
  issueDate: string;
  expiryDate?: string;
  statusText: string;
  isPaid: boolean;
  isCod: boolean;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    billingAddress: string;
    shippingAddress: string;
    city: string;
    state: string;
    pincode: string;
    gstin?: string;
  };
  product: {
    name: string;
    variantName?: string;
    color?: string;
    hsn: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
  };
  pricing: {
    taxableBase: number;
    totalAmount: number;
    totalTax: number;
    isIntraState: boolean; // Same state: Maharashtra (MH)
    cgst: number;
    sgst: number;
    igst: number;
    advancePaid: number;
    balanceDue: number;
    amountDueDisplay: number;
  };
  inWords: string;
  customerNotes?: string;
  termsAndConditions?: string;
}

/**
 * Checks whether the customer's state is Maharashtra (Intra-state supply).
 * Intra-state applies CGST (9%) + SGST (9%).
 * Inter-state (outside Maharashtra) applies IGST (18%).
 */
export function isMaharashtraState(state?: string): boolean {
  if (!state) return false;
  const s = state.trim().toLowerCase();
  return (
    s === "maharashtra" ||
    s === "mh" ||
    s.includes("maharashtra") ||
    s.includes("maharastra") ||
    s === "27"
  );
}

/**
 * Calculates GST breakdown for 18% GST (Tax-inclusive pricing).
 * Intra-State (MH): CGST @ 9% + SGST @ 9%
 * Inter-State (Out of MH): IGST @ 18%
 */
export function calculateGstBreakup(totalAmount: number, isIntraState: boolean) {
  const taxableBase = Math.round((totalAmount / 1.18) * 100) / 100;
  const totalTax = Math.round((totalAmount - taxableBase) * 100) / 100;

  if (isIntraState) {
    const cgst = Math.round((totalTax / 2) * 100) / 100;
    const sgst = Math.round((totalTax - cgst) * 100) / 100;
    return {
      taxableBase,
      totalTax,
      cgst,
      sgst,
      igst: 0,
      isIntraState: true,
    };
  } else {
    return {
      taxableBase,
      totalTax,
      cgst: 0,
      sgst: 0,
      igst: totalTax,
      isIntraState: false,
    };
  }
}

/**
 * Converts numeric amount to Indian Rupee Words representation.
 * e.g. 37999 -> "Thirty Seven Thousand Nine Hundred Ninety Nine INR Only /-"
 */
export function numberToWordsINR(amount: number): string {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function convertLessThanThousand(n: number): string {
    if (n === 0) return "";
    if (n < 20) return ones[n];
    const t = tens[Math.floor(n / 10)];
    const o = ones[n % 10];
    return (t + (o ? " " + o : "")).trim();
  }

  function convert(n: number): string {
    if (n === 0) return "Zero";
    let result = "";

    const crore = Math.floor(n / 10000000);
    n %= 10000000;
    if (crore > 0) {
      result += convert(crore) + " Crore ";
    }

    const lakh = Math.floor(n / 100000);
    n %= 100000;
    if (lakh > 0) {
      result += convert(lakh) + " Lakh ";
    }

    const thousand = Math.floor(n / 1000);
    n %= 1000;
    if (thousand > 0) {
      result += convertLessThanThousand(thousand) + " Thousand ";
    }

    const hundred = Math.floor(n / 100);
    n %= 100;
    if (hundred > 0) {
      result += ones[hundred] + " Hundred ";
    }

    if (n > 0) {
      result += convertLessThanThousand(n) + " ";
    }

    return result.trim();
  }

  const rounded = Math.round(amount);
  return `${convert(rounded)} INR Only /-`;
}

/**
 * Returns clean sequential or order-based invoice number
 * e.g. "AQUA-R/INV-1"
 */
export function getInvoiceNumber(orderId: string, invoiceId?: string): string {
  if (invoiceId && invoiceId.startsWith("AQUA-")) return invoiceId;
  if (orderId.includes("TVWMNCnxp7pU2C")) return "AQUA-R/INV-1";
  if (orderId.includes("TYe1byjoJmIO4u")) return "AQUA-R/INV-2";
  if (orderId.includes("TZW8eddk4xAdMW")) return "AQUA-R/INV-3";
  if (orderId.includes("TcflUW0RnH33DW")) return "AQUA-R/INV-4";
  if (orderId.includes("Td93ss02xLZQX3")) return "AQUA-R/INV-5";
  if (orderId.includes("TemZHkAYJjzQ5G")) return "AQUA-R/INV-6";
  if (orderId.includes("1790417815914")) return "AQUA-R/INV-7";
  if (orderId.includes("TjOBeOPT9LsMrS") || orderId.includes("TjOBeqWCXWTtyY")) return "AQUA-R/INV-8";

  const clean = orderId.replace("PROMEC-ORD-", "").replace("order_", "");
  return `AQUA-R/INV-${clean.slice(-6).toUpperCase()}`;
}

/**
 * Formats invoice date to "Aug 29, 2026"
 */
export function formatInvoiceDate(dateInput?: string | Date): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(d.getTime())) return "Aug 29, 2026";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Converts PromecOrder entity to full InvoiceDetails structure.
 */
export function convertOrderToInvoiceDetails(order: any): InvoiceDetails {
  const state = order.customer?.state || "Maharashtra";
  const isIntraState = isMaharashtraState(state);
  const totalAmount = order.pricing?.finalTotalInINR || order.pricing?.subtotalInINR || 37999;
  const isCod = order.payment?.method === "COD_ADVANCE" || Number(order.payment?.amountDueInPaise) > 0;

  const taxes = calculateGstBreakup(totalAmount, isIntraState);

  const advancePaid = isCod
    ? Math.round(Number(order.payment?.amountPaidInPaise || 0) / 100) || Math.round(totalAmount * 0.1)
    : totalAmount;
  const balanceDue = isCod
    ? Math.round(Number(order.payment?.amountDueInPaise || 0) / 100) || (totalAmount - advancePaid)
    : 0;

  const primaryItem = (order.items && order.items[0]) || {};
  const productName = primaryItem.productName || "Cordless AquaForce® 1400 High-pressure Washer System (R)";

  const dateStr = order.createdAt || order.date || new Date().toISOString();

  return {
    invoiceNumber: getInvoiceNumber(order.id, order.payment?.razorpayInvoiceId || order.invoiceNumber),
    orderId: order.id,
    paymentId: order.payment?.razorpayPaymentId || order.paymentId || "pay_Captured_Live",
    issueDate: formatInvoiceDate(dateStr),
    expiryDate: "Expiry Date",
    statusText: isCod ? "10% ADVANCE PAID (COD)" : "PAID",
    isPaid: order.payment?.status === "captured" || !isCod,
    isCod,
    customer: {
      fullName: order.customer?.fullName || order.customer?.name || "Customer",
      phone: order.customer?.phone
        ? order.customer.phone.startsWith("+91")
          ? order.customer.phone
          : `+91 ${order.customer.phone}`
        : "",
      email: order.customer?.email || "",
      billingAddress: order.customer?.shippingAddress || order.customer?.address || "",
      shippingAddress: order.customer?.shippingAddress || order.customer?.address || "",
      city: order.customer?.city || "",
      state: order.customer?.state || state,
      pincode: order.customer?.pincode || "",
      gstin: order.customer?.gstNumber || order.customer?.gstin || "",
    },
    product: {
      name: productName,
      variantName: primaryItem.variantName,
      color: primaryItem.color,
      hsn: "8424",
      quantity: primaryItem.quantity || 1,
      unitPrice: primaryItem.unitPriceInINR || totalAmount,
      totalAmount: primaryItem.totalAmountInINR || totalAmount,
    },
    pricing: {
      ...taxes,
      totalAmount,
      advancePaid,
      balanceDue,
      amountDueDisplay: totalAmount,
    },
    inWords: numberToWordsINR(totalAmount),
    customerNotes: order.notes || "Add Customer Notes",
    termsAndConditions: "Add Terms and Conditions",
  };
}
