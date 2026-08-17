import { Lock } from "lucide-react";

function PaymentSecurity() {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
      <Lock className="h-4 w-4" />

      <span>
        Your payment information is securely encrypted.
      </span>
    </div>
  );
}

export default PaymentSecurity;
