function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const stripeEnv = {
  secretKey: requireEnv("STRIPE_SECRET_KEY"),
  webhookSecret: requireEnv("STRIPE_WEBHOOK_SECRET"),
  publishableKey: requireEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
};
