import { NextResponse } from "next/server";
import {
  fetchLiveRazorpayRawData,
  parseLiveOffers,
  buildLiveEmiBanks,
  buildLiveNetbankingBanks,
  EmiPlan,
  EmiBankItem,
  RazorpayOfferDisplayItem,
  NetbankingBankItem,
} from "@/lib/razorpayLiveOffers";

export type { EmiPlan, EmiBankItem, RazorpayOfferDisplayItem, NetbankingBankItem };

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const priceParam = searchParams.get("price");
    const refreshParam = searchParams.get("refresh");
    const totalPrice = priceParam ? Math.max(1, parseInt(priceParam, 10)) : 37999;
    const forceRefresh = refreshParam === "true" || refreshParam === "1";

    // 1. Fetch live raw data directly from Razorpay APIs (Offers & Methods)
    const { rawOffers, rawMethods } = await fetchLiveRazorpayRawData(forceRefresh);

    // 2. Dynamically parse all live active offers
    const displayOffers = parseLiveOffers(rawOffers, totalPrice);

    // 3. Dynamically build enabled EMI banks and zero-interest No Cost plans from live data
    const emiBanks = buildLiveEmiBanks(totalPrice, rawMethods, displayOffers);

    // 4. Dynamically build netbanking banks from live methods
    const netbankingList = buildLiveNetbankingBanks(rawMethods);

    return NextResponse.json({
      success: true,
      totalPrice,
      netbanking: netbankingList,
      emi: emiBanks,
      offers: displayOffers,
      offersCount: displayOffers.length,
      isLive: true,
    });
  } catch (err: any) {
    console.error("[Razorpay Methods API] Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch Razorpay methods" },
      { status: 500 }
    );
  }
}
