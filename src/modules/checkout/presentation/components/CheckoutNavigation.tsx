import { ArrowLeft, ArrowRight } from "lucide-react";

type CheckoutNavigationProps = {
  activeStep: number;

  onNextStep: () => void;
  onPreviousStep: () => void;
};

function CheckoutNavigation({
  activeStep,
  onNextStep,
  onPreviousStep,
}: CheckoutNavigationProps) {
  if (activeStep === 3) {
    return (
      <div className="flex justify-start">
        <button
          type="button"
          onClick={onPreviousStep}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 transition hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
    );
  }

  const nextLabel =
    activeStep === 1
      ? "Continue to Shipping"
      : "Continue to Payment";

  return (
    <div className="flex justify-between">
      {activeStep > 1 ? (
        <button
          type="button"
          onClick={onPreviousStep}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 transition hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={onNextStep}
        className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-white transition hover:bg-black"
      >
        {nextLabel}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default CheckoutNavigation;
