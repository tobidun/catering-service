import { NextResponse } from "next/server";
import { Buffer } from "buffer";

export async function POST(request: Request) {
  try {
    const { total } = await request.json();

    if (!total || isNaN(total)) {
      return NextResponse.json(
        { error: "Invalid total amount" },
        { status: 400 }
      );
    }

    // Step 1: Get access token from PayPal
    const auth = Buffer.from(
      `AbtSt71jXUTzBs4JxiUzs80U7OqNURaGjzJ7BURqJPoJ3F-GZpwLDkb7Ww2JVu52YdpDwVpTxiattig4:EDGwN8PNIsqBWrWayE4yV_20MJJj7WfBe4gnJwkJ8yuYxcf853L-KUB7INA3mtgveihWfHwF1esud6fK`
    ).toString("base64");

    const tokenRes = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error("Failed to fetch PayPal token:", tokenData);
      return NextResponse.json(
        { error: "PayPal auth failed" },
        { status: tokenRes.status }
      );
    }

    const accessToken = tokenData.access_token;

    // Step 2: Create PayPal order
    const orderRes = await fetch(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: Number(total).toFixed(2),
              },
              description: "University Catering Order",
            },
          ],
        }),
      }
    );

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      console.error("PayPal API error:", orderData);
      return NextResponse.json(
        { error: "PayPal API error" },
        { status: orderRes.status }
      );
    }

    return NextResponse.json(orderData);
  } catch (error) {
    console.error("Error creating PayPal order:", error);
    return NextResponse.json(
      { error: "Failed to create PayPal order" },
      { status: 500 }
    );
  }
}
