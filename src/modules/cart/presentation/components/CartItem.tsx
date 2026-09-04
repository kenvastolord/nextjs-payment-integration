import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";

import { CartItemType } from "../../types/cart.types";
import { formatPrice } from "@/shared/utils/formatPrice";

type CartItemProps = {
  item: CartItemType;
  preloadImage?: boolean;
  onRemove: (item: CartItemType) => void;
  onIncreaseQuantity: (item: CartItemType) => void;
  onDecreaseQuantity: (item: CartItemType) => void;
};

function CartItem({
  item,
  preloadImage,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartItemProps) {
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex gap-6 rounded-lg border border-gray-200 bg-white p-5">
      {/* Product Image */}
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={item.images[item.selectedColor]}
          alt={item.name}
          fill
          sizes="112px"
          preload={preloadImage}
          className="object-contain"
        />
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            {item.name}
          </h3>

          <button
            type="button"
            onClick={() => onRemove(item)}
            className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>

        {/* Attributes */}
        <div className="mt-3 space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Color:</span>{" "}
            {item.selectedColor}
          </p>

          <p>
            <span className="font-medium">Size:</span>{" "}
            {item.selectedSize}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            <p className="text-sm text-gray-500">Price</p>

            <p className="text-lg font-semibold">
              ${formatPrice(subtotal)}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Quantity</span>

            <div className="flex items-center rounded-md border border-gray-200">
              <button
                type="button"
                onClick={() => onDecreaseQuantity(item)}
                disabled={item.quantity === 1}
                className={`p-2 transition-colors ${item.quantity === 1
                  ? "cursor-not-allowed text-gray-300"
                  : "hover:bg-gray-100"
                  }`}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="min-w-10 text-center text-sm font-medium">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() => onIncreaseQuantity(item)}
                className="p-2 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
