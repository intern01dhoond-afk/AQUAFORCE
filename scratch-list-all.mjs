async function listAllShiprocket() {
  const email = "hemanthk0804@gmail.com";
  const password = "9GW&KOtvjA@$9LT8t4ztD4KX%Z74IhYn";

  const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const authData = await authRes.json();
  const token = authData.token;

  console.log("Listing recent Shiprocket orders...");

  const res = await fetch("https://apiv2.shiprocket.in/v1/external/orders?per_page=20", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  console.log("Orders List Count:", data?.data?.length);

  if (data?.data && data.data.length > 0) {
    data.data.forEach((ord, index) => {
      console.log(`\n#${index + 1} | SR Order ID: ${ord.id} | Channel Order ID: ${ord.channel_order_id} | Customer: ${ord.customer_name} | Phone: ${ord.customer_phone} | Date: ${ord.created_at}`);
    });
  }
}

listAllShiprocket();
