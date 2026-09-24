import { getProduct, Product, ProductVariant, ProductColor } from "./products";

export interface PricingCalculationInput {
  productId?: string;
  variantId?: "with-vacuum" | "without-vacuum" | string;
  colorName?: string;
  quantity?: number;
  paymentMethod: "FULL_ONLINE" | "COD_ADVANCE" | "EMI";
}

export interface PricingCalculationResult {
  product: Product;
  variant: ProductVariant;
  color: ProductColor;
  quantity: number;
  unitPriceInINR: number;
  unitMrpInINR: number;
  subtotalInINR: number;
  mrpSubtotalInINR: number;
  discountInINR: number;
  shippingFeeInINR: number;
  handlingFeeInINR: number;
  codFeeInINR: number;
  finalTotalInINR: number;
  currency: "INR";

  // Financial breakdown in paise for Razorpay
  amountRequiredInPaise: number; // What Razorpay charges right now
  amountDueInPaise: number;      // What customer owes later (for COD: 90%)
  advanceAmountInINR: number;
  codBalanceInINR: number;
}

export function calculateOrderPricing(
  input: PricingCalculationInput
): { success: true; data: PricingCalculationResult } | { success: false; error: string } {
  const productId = input.productId || "aquaforce-1400";
  const product = getProduct(productId);

  if (!product) {
    return { success: false, error: `Invalid product: '${productId}' not found in catalog.` };
  }

  const variantId = (input.variantId || product.defaultVariantId) as "with-vacuum" | "without-vacuum";
  const variant = product.variants[variantId];

  if (!variant) {
    return {
      success: false,
      error: `Invalid variant '${variantId}'. Available options: ${Object.keys(product.variants).join(", ")}.`,
    };
  }

  const requestedColor = input.colorName || "Yellow";
  const color = product.colors.find(
    (c) => c.name.toLowerCase() === requestedColor.toLowerCase()
  );

  if (!color) {
    return {
      success: false,
      error: `Color '${requestedColor}' not found for product '${product.name}'.`,
    };
  }

  if (!color.inStock) {
    return {
      success: false,
      error: `The ${color.name} edition is currently out of stock. Please select an in-stock edition.`,
    };
  }

  const rawQty = Number(input.quantity);
  const quantity = isNaN(rawQty) || rawQty < 1 ? 1 : Math.min(10, Math.floor(rawQty));

  const unitPriceInINR = variant.offerPriceInINR;
  const unitMrpInINR = variant.mrpInINR;
  const subtotalInINR = unitPriceInINR * quantity;
  const mrpSubtotalInINR = unitMrpInINR * quantity;
  const discountInINR = mrpSubtotalInINR - subtotalInINR;
  const shippingFeeInINR = product.shippingFeeInINR;
  const handlingFeeInINR = product.handlingFeeInINR;

  const isCod = input.paymentMethod === "COD_ADVANCE";
  const codFeeInINR = isCod ? product.codPolicy.codFeeInINR : 0;
  const finalTotalInINR = subtotalInINR + shippingFeeInINR + handlingFeeInINR + codFeeInINR;
  const finalTotalInPaise = finalTotalInINR * 100;

  let amountRequiredInPaise = finalTotalInPaise;
  let amountDueInPaise = 0;
  let advanceAmountInINR = finalTotalInINR;
  let codBalanceInINR = 0;

  if (isCod) {
    // 10% advance deposit rounded to nearest integer
    advanceAmountInINR = Math.round(finalTotalInINR * (product.codPolicy.advancePercentage / 100));
    codBalanceInINR = finalTotalInINR - advanceAmountInINR;
    amountRequiredInPaise = advanceAmountInINR * 100;
    amountDueInPaise = codBalanceInINR * 100;
  }

  return {
    success: true,
    data: {
      product,
      variant,
      color,
      quantity,
      unitPriceInINR,
      unitMrpInINR,
      subtotalInINR,
      mrpSubtotalInINR,
      discountInINR,
      shippingFeeInINR,
      handlingFeeInINR,
      codFeeInINR,
      finalTotalInINR,
      currency: "INR",
      amountRequiredInPaise,
      amountDueInPaise,
      advanceAmountInINR,
      codBalanceInINR,
    },
  };
}
