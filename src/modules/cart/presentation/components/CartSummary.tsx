import { formatPrice } from "@/shared/utils/formatPrice";
import { CartItemType } from "../../types/cart.types";

type CartSummaryProps = {
  cart: CartItemType[];
};

function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="w-full lg:w-5/12 rounded-lg border border-gray-100 p-8 shadow-lg h-max">
      <h2 className="mb-8 text-lg font-semibold">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Subtotal
          </span>

          <span className="font-medium">
            ${formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Discount
          </span>

          <span className="font-medium">
            $0.00
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            Shipping
          </span>

          <span className="font-medium">
            $10.00
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>

          <span>
            ${formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
