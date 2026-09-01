import { NextRequest, NextResponse } from "next/server";
import { stripeClient } from "@/config/providers/stripe.config";
import { stripeEnv } from "@/config/env/stripe.env";
import { container } from "@/infrastructure/container";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event;

  try {
    event = stripeClient.webhooks.constructEvent(
      body,
      signature,
      stripeEnv.webhookSecret,
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  const paymentIntent = event.data.object as { id: string; metadata: { orderId?: string } };
  const orderId = paymentIntent.metadata?.orderId;

  if (!orderId) {
    return NextResponse.json(
      { error: "Missing orderId in payment metadata" },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await container.orders.markOrderAsPaidUseCase.execute(orderId);
        break;

      case "payment_intent.payment_failed":
        await container.orders.markOrderAsFailedUseCase.execute(orderId);
        break;

      default:
        break;
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to process webhook event" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
