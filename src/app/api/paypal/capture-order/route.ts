import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();

    const response = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer EDGwN8PNIsqBWrWayE4yV_20MJJj7WfBe4gnJwkJ8yuYxcf853L-KUB7INA3mtgveihWfHwF1esud6fK`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error capturing PayPal payment:", error);
    return NextResponse.json(
      { error: "Failed to capture PayPal payment" },
      { status: 500 }
    );
  }
}
