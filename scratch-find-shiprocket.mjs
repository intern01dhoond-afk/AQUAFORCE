async function findShiprocketOrder() {
  const email = "hemanthk0804@gmail.com";
  const password = "9GW&KOtvjA@$9LT8t4ztD4KX%Z74IhYn";

  const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const authData = await authRes.json();
  const token = authData.token;

  console.log("Searching Shiprocket orders for channel_order_id 'order_Td93ss02xLZQX3' or phone '9440804233'...");

  const res = await fetch("https://apiv2.shiprocket.in/v1/external/orders?search=9440804233", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  console.log("Search Result Status:", res.status);
  console.log("Search Result Count:", data?.data?.length);

  if (data?.data && data.data.length > 0) {
    data.data.forEach((ord, index) => {
      console.log(`\n--- Order #${index + 1} ---`);
      console.log("Shiprocket Order ID:", ord.id);
      console.log("Channel Order ID:", ord.channel_order_id);
      console.log("Customer Name:", ord.customer_name);
      console.log("Customer Phone:", ord.customer_phone);
      console.log("Status:", ord.status);
      console.log("Status Code:", ord.status_code);
      console.log("Total Order Value:", ord.total);
      console.log("Payment Method:", ord.payment_method);
      console.log("Created At:", ord.created_at);
    });
  } else {
    console.log("Raw search data:", JSON.stringify(data, null, 2));
  }
}

findShiprocketOrder();
