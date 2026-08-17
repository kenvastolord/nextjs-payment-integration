import { ShoppingCart } from "lucide-react";

type PaymentSubmitButtonProps = {
  isSubmitting: boolean;
};

function PaymentSubmitButton({
  isSubmitting,
}: PaymentSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 py-3 font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
    >
      <ShoppingCart className="h-4 w-4" />

      {isSubmitting
        ? "Processing..."
        : "Complete Order"}
    </button>
  );
}

export default PaymentSubmitButton;
