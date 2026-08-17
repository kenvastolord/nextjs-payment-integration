import Image from "next/image";

function PaymentMethods() {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="mb-3 text-sm font-medium text-gray-700">
        Accepted payment methods
      </p>

      <div className="mt-4 flex items-center gap-2">
        <Image
          src="/klarna.png"
          alt="Klarna"
          width={50}
          height={25}
          className="h-auto rounded-md"
        />

        <Image
          src="/cards.png"
          alt="Accepted cards"
          width={50}
          height={25}
          className="h-auto rounded-md"
        />

        <Image
          src="/stripe.png"
          alt="Stripe"
          width={50}
          height={25}
          className="h-auto rounded-md"
        />
      </div>
    </div>
  );
}

export default PaymentMethods;
