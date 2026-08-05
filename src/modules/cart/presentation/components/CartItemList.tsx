import CartItem from "@/modules/cart/presentation/components/CartItem";

import { CartItemType } from "@/modules/cart/types/cart.types";

type CartItemsListProps = {
  items: CartItemType[];
  onRemove: (item: CartItemType) => void;
  onIncreaseQuantity: (item: CartItemType) => void;
  onDecreaseQuantity: (item: CartItemType) => void;
};

function CartItemsList({
  items,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: CartItemsListProps) {
  return (
    <>
      {items.map((item) => (
        <CartItem
          key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
          item={item}
          onRemove={onRemove}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
        />
      ))}
    </>
  );
}

export default CartItemsList;
