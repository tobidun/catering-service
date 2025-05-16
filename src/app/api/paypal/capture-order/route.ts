import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json();

    const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYPAL_SECRET_KEY}`,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    return NextResponse.json(
      { error: 'Failed to capture PayPal payment' },
      { status: 500 }
    );
  }
}