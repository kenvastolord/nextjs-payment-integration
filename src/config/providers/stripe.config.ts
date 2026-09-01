import Stripe from "stripe";
import { stripeEnv } from "../env/stripe.env";

export const stripeClient = new Stripe(stripeEnv.secretKey, {
  apiVersion: "2026-06-24.dahlia",
});
