import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const reqBody = await request.json();
    const { amount } = reqBody;

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      submit_type: "donate",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            unit_amount: amount * 100,
            currency: "usd",
            product_data: {
              name: "Donation name",
              description: "Donation description",
            },
          },
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ err: errorMessage }, { status: 500 });
  }
}
