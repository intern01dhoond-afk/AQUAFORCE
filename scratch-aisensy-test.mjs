async function sendAiSensyWhatsApp() {
  const aisensyApiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhOTgxMTQzNjYwZTk1MGU3ZDJlYTM0MyIsIm5hbWUiOiJQcm9tZWMgSW5kaWEiLCJhcHBOYW1lIjoiQWlTZW5zeSIsImNsaWVudElkIjoiNmE5ODExNDM2NjBlOTUwZTdkMmVhMzNlIiwiYWN0aXZlUGxhbiI6IkJBU0lDX01PTlRITFkiLCJpYXQiOjE3ODg3NTYzNDV9._N2prpFIwKpOsYjSUsSoOtu79upNaa72J0bRtYxgQYQ";
  const aisensyCampaign = "order_confirmation_2";

  const phone = "9440804233";
  const formattedPhone = phone.replace(/\D/g, "");
  const destination = formattedPhone.length === 10 ? `91${formattedPhone}` : formattedPhone;

  const fullName = "Sri Sai Potluri";
  const orderId = "order_Td93ss02xLZQX3";
  const product = "Cordless AquaForce® 1400 High-pressure Washer System (Yellow)";
  const quantity = "1";
  const fullAddress = "H.NO. 16-2-100/116, Plot no.116, road no.15B, PVR Indradhnu, Gopalnagar Society, Kukatpally., Hyderabad, Telangana - 500085";
  const estimatedDelivery = "23 Sep 2026";

  console.log(`Sending AiSensy WhatsApp template message to ${destination}...`);

  const payload = {
    apiKey: aisensyApiKey,
    campaignName: aisensyCampaign,
    destination: destination,
    userName: fullName,
    templateParams: [
      fullName,          // {1}
      product,           // {2}
      quantity,          // {3}
      orderId,           // {4}
      fullAddress,       // {5}
      estimatedDelivery, // {6}
    ],
    media: {
      url: "https://files.catbox.moe/jpksbs.png",
      filename: "Promec Tools WhatsApp Template Image.png",
    },
  };

  try {
    const res = await fetch("https://backend.aisensy.com/campaign/t1/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("AiSensy HTTP Status Code:", res.status);
    const text = await res.text();
    console.log("AiSensy Response:", text);
  } catch (err) {
    console.error("AiSensy Error:", err);
  }
}

sendAiSensyWhatsApp();
