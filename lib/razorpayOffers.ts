/**
 * Promec India PayLater - Razorpay Offers Engine & Fallbacks
 * 
 * Provides dynamic live fetching from Razorpay API with robust static fallbacks.
 */

import {
  getLiveActiveOfferIds as getLiveIdsFromEngine,
  fetchLiveRazorpayRawData,
  parseLiveOffers,
} from "./razorpayLiveOffers";

export * from "./razorpayLiveOffers";

export interface PromecOfferMeta {
  id: string;
  name: string;
  displayName: string;
  bankCode: string;
  bankName: string;
  cardType: "credit" | "debit";
  tenures: number[];
  minAmount: number;
  maxAmount: number;
  description: string;
  tnc: string;
  benefitType: "NO_COST_EMI";
}

export const PROMEC_PAYLATER_OFFERS_METADATA: PromecOfferMeta[] = [
  {
    id: "offer_TrKOSCeMPUMCl0",
    name: "Axis Bank",
    displayName: "Axis Bank No Cost EMI",
    bankCode: "UTIB",
    bankName: "Axis Bank Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrKDEka4eRe2Xx",
    name: "ICICI",
    displayName: "ICICI Bank No Cost EMI",
    bankCode: "ICIC",
    bankName: "ICICI Bank Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 50000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrKPkDTGQi70St",
    name: "Yes Bank",
    displayName: "Yes Bank No Cost EMI",
    bankCode: "YESB",
    bankName: "Yes Bank Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrKLd4IAqPXLk7",
    name: "Kotak Mahindra Bank",
    displayName: "Kotak Mahindra Bank No Cost EMI",
    bankCode: "KKBK",
    bankName: "Kotak Mahindra Bank Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrKKFnfJ2Cqq7Y",
    name: "INDUSIND Bank",
    displayName: "IndusInd Bank No Cost EMI",
    bankCode: "INDB",
    bankName: "IndusInd Bank Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrKIkRRRYiH5pc",
    name: "IDFB",
    displayName: "IDFC FIRST Bank No Cost EMI",
    bankCode: "IDFB",
    bankName: "IDFC FIRST Bank Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrKBPvFZZn3ABg",
    name: "HSBC",
    displayName: "HSBC No Cost EMI",
    bankCode: "HSBC",
    bankName: "HSBC Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrKN1ZsSGcrJtN",
    name: "Standard Chartered Bank",
    displayName: "Standard Chartered Bank No Cost EMI",
    bankCode: "SCBL",
    bankName: "Standard Chartered Bank Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrIHolSP6RZe8D",
    name: "Bank of Baroda",
    displayName: "Bank of Baroda No Cost EMI",
    bankCode: "BARB",
    bankName: "Bank of Baroda Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrK07DafTn3T00",
    name: "FDRL",
    displayName: "Federal Bank No Cost EMI",
    bankCode: "FDRL",
    bankName: "Federal Bank Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 4000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrF1VsESJ1z4kb",
    name: "AU Small Finance Bank",
    displayName: "AU Small Finance Bank No Cost EMI",
    bankCode: "AUBL",
    bankName: "AU Small Finance Bank Credit Card",
    cardType: "credit",
    tenures: [3, 6, 9, 12],
    minAmount: 3000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
  {
    id: "offer_TrK7uq6dBAclzQ",
    name: "HDFC Bank Debit Card",
    displayName: "HDFC Bank Debit Card No Cost EMI",
    bankCode: "HDFC_DC",
    bankName: "HDFC Bank Debit Card",
    cardType: "debit",
    tenures: [3, 6, 9, 12],
    minAmount: 6000,
    maxAmount: 500000,
    description: "Buy AquaForce on No Cost EMI. 100% interest subsidized by Promec India.",
    tnc: "The offer is applicable to AquaForce products purchased through our website.",
    benefitType: "NO_COST_EMI",
  },
];

export interface RealPaymentOfferMeta {
  id: string;
  bankCode: string;
  bankName: string;
  title: string;
  subtitle: string;
  cashbackPercent: number;
  maxBenefitRupees: number;
  minOrderRupees: number;
  logo: string;
  description: string;
  tnc: string;
}

export const REAL_RAZORPAY_CASHBACK_OFFERS: RealPaymentOfferMeta[] = [
  {
    id: "offer_TiYBMRbEeMiCk4",
    bankCode: "YESB",
    bankName: "Yes Bank",
    title: "5% Cashback on Yes Bank Credit Card EMI Transactions",
    subtitle: "5% Cashback on Yes Bank Credit Card EMI Transactions • T&Cs",
    cashbackPercent: 5.0,
    maxBenefitRupees: 1500,
    minOrderRupees: 5000,
    logo: "https://cashfreelogo.cashfree.com/assets_images/pg/nb/64/yes.png",
    description: "5% Cashback on Yes Bank Credit Card EMI Transactions. Max cashback: ₹1,500. Min cart: ₹5,000.",
    tnc: "5% Cashback with YES BANK Credit Card EMI Transactions. Minimum Transaction Amount: Rs. 5,000. Maximum Cashback: Rs. 1,500. Velocity: Once per card per merchant per month. Cashback will be posted by YES BANK 90 days after offer month.",
  },
  {
    id: "offer_TiYhWuqMTvDC3g",
    bankCode: "HSBC",
    bankName: "HSBC",
    title: "5% Cashback on Min Cart Value of Rs 5000 on HSBC Credit Card EMI Transactions",
    subtitle: "5% Cashback up to Rs 1000 on Min Cart Value of Rs 5000 on HSBC Credit Card EMI Transactions • T&Cs",
    cashbackPercent: 5.0,
    maxBenefitRupees: 1000,
    minOrderRupees: 5000,
    logo: "https://cashfreelogo.cashfree.com/assets_images/pg/nb/64/hsb.png",
    description: "5% Cashback up to ₹1,000 on Min Cart Value of ₹5,000 on HSBC Credit Card EMI Transactions.",
    tnc: "5% Cashback on HSBC Credit Card EMI Transactions. Minimum Transaction Amount: Rs. 5,000. Maximum Cashback: Rs. 1,000.",
  },
  {
    id: "offer_TiYk8pkfvaoOuD",
    bankCode: "UTIB",
    bankName: "AXIS Bank",
    title: "5% Cashback on Min Cart Value of Rs 5,000 on AXIS Bank Credit Card EMI Transactions",
    subtitle: "5% Cashback up to Rs 750 on Min Cart Value of Rs 5,000 on AXIS Bank Credit Card EMI Transactions • T&Cs",
    cashbackPercent: 5.0,
    maxBenefitRupees: 750,
    minOrderRupees: 5000,
    logo: "https://cashfreelogo.cashfree.com/assets_images/pg/nb/64/axis.png",
    description: "5% Cashback up to ₹750 on Min Cart Value of ₹5,000 on AXIS Bank Credit Card EMI Transactions.",
    tnc: "5% Cashback with Axis Bank Credit Card EMI Transactions. Minimum Transaction Amount: Rs. 5,000. Maximum Cashback: Rs. 750.",
  },
  {
    id: "offer_TieLmu4h87lIRz",
    bankCode: "IDFB",
    bankName: "IDFC FIRST Bank",
    title: "3.5% Cashback on Min Cart Value of Rs 5000 using IDFC FIRST Bank Credit Card EMI Transactions",
    subtitle: "3.5% Cashback up to Rs 3000 on Min Cart Value of Rs 5000 using IDFC FIRST Bank Credit Card EMI Transactions • T&Cs",
    cashbackPercent: 3.5,
    maxBenefitRupees: 3000,
    minOrderRupees: 5000,
    logo: "https://cashfreelogo.cashfree.com/assets_images/pg/nb/64/idfc.png",
    description: "3.5% Cashback up to ₹3,000 on Min Cart Value of ₹5,000 using IDFC FIRST Bank Credit Card EMI Transactions.",
    tnc: "3.5% Cashback using IDFC FIRST Bank Credit Card EMI Transactions. Minimum Transaction Amount: Rs. 5,000. Maximum Cashback: Rs. 3,000.",
  },
  {
    id: "offer_QPEhahmXZYrNL4",
    bankCode: "HDFC",
    bankName: "NeuCard",
    title: "Upto 1.5% savings with NeuCard on EMI/ non EMI trxns",
    subtitle: "Upto 1.5% savings with NeuCard on EMI/ non EMI trxns • T&Cs",
    cashbackPercent: 1.5,
    maxBenefitRupees: 1000,
    minOrderRupees: 0,
    logo: "https://cashfreelogo.cashfree.com/assets_images/pg/nb/64/hdfc.png",
    description: "1.5% back on Tata Neu HDFC Bank Infinity Credit Card & 1% back on Tata Neu HDFC Bank Plus Credit cards as NeuCoins.",
    tnc: "1.5% back on Tata Neu HDFC Bank Infinity Credit Card & 1% back on Tata Neu HDFC Bank Plus Credit cards as NeuCoins on all EMI and non-EMI spends.",
  },
];

export const DEFAULT_PROMEC_PAYLATER_OFFERS: string[] = [
  ...PROMEC_PAYLATER_OFFERS_METADATA.map((o) => o.id),
  ...REAL_RAZORPAY_CASHBACK_OFFERS.map((o) => o.id),
];

/**
 * Returns an array of clean, non-empty Razorpay offer_id strings.
 * Falls back to DEFAULT_PROMEC_PAYLATER_OFFERS.
 */
export function getPromecPayLaterOfferIds(): string[] {
  const envOffers =
    process.env.RAZORPAY_OFFER_IDS ||
    process.env.PROMEC_PAYLATER_OFFER_IDS ||
    process.env.NEXT_PUBLIC_RAZORPAY_OFFER_IDS ||
    "";

  const envList = envOffers
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  const combined = Array.from(
    new Set([...envList, ...DEFAULT_PROMEC_PAYLATER_OFFERS.map((s) => s.trim()).filter(Boolean)])
  );

  return combined;
}

/**
 * Checks if No Cost EMI offers are configured for the merchant
 */
export function hasPromecPayLaterOffers(): boolean {
  return getPromecPayLaterOfferIds().length > 0;
}

export interface RealCardOfferBenefit {
  cashbackAmount: number;
  cashbackText: string;
  cashbackOfferId?: string;
  interestSavedAmount: number;
  totalSavingsAmount: number;
  badgeText: string;
  highlightText: string;
  isNoCost: boolean;
}

/**
 * Calculate the exact real cashback & interest saved for a specific bank and cart total.
 */
export function calculateRealCardOffer(
  bankCode: string,
  cardType: "credit" | "debit",
  totalPrice: number
): RealCardOfferBenefit {
  const normalizedCode = bankCode.replace(/_DC$/, "");
  const cb = REAL_RAZORPAY_CASHBACK_OFFERS.find(
    (o) => o.bankCode === normalizedCode && cardType === "credit"
  );

  let cashbackAmount = 0;
  let cashbackText = "";
  let cashbackOfferId = cb?.id;

  if (cb && totalPrice >= cb.minOrderRupees) {
    const rawVal = Math.round((totalPrice * cb.cashbackPercent) / 100);
    cashbackAmount = Math.min(rawVal, cb.maxBenefitRupees);
    cashbackText = `${cb.cashbackPercent}% Cashback (Up to ₹${cb.maxBenefitRupees.toLocaleString("en-IN")})`;
  }

  const noCostOffer = PROMEC_PAYLATER_OFFERS_METADATA.find(
    (o) =>
      o.bankCode === bankCode ||
      (cardType === "debit" && o.cardType === "debit" && (o.bankCode === "HDFC_DC" || bankCode.includes("HDFC"))) ||
      (cardType === "credit" && o.cardType === "credit" && o.bankCode === normalizedCode)
  );

  const isNoCost = Boolean(
    noCostOffer &&
    totalPrice >= (noCostOffer.minAmount || 0) &&
    totalPrice <= (noCostOffer.maxAmount || 999999)
  );

  const interestSavedAmount = isNoCost ? Math.round(totalPrice * 0.15 * (6 / 12)) : 0;
  const totalSavingsAmount = cashbackAmount + interestSavedAmount;

  let badgeText = "";
  let highlightText = "";

  if (isNoCost && cashbackAmount > 0) {
    badgeText = "NO COST EMI";
    highlightText = `0% Interest No Cost EMI + ₹${cashbackAmount.toLocaleString("en-IN")} Cashback`;
  } else if (isNoCost) {
    badgeText = "NO COST EMI";
    highlightText = "0% Interest No Cost EMI";
  } else if (cashbackAmount > 0 && cb) {
    badgeText = `${cb.cashbackPercent}% CASHBACK`;
    highlightText = `${cb.cashbackPercent}% Cashback up to ₹${cb.maxBenefitRupees.toLocaleString("en-IN")}`;
  }

  return {
    cashbackAmount,
    cashbackText,
    cashbackOfferId,
    interestSavedAmount,
    totalSavingsAmount,
    badgeText,
    highlightText,
    isNoCost,
  };
}
