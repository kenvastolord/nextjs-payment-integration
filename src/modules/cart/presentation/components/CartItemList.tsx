import CartItem from "@/modules/cart/presentation/components/CartItem";
import { CartItemType } from "@/modules/cart/types/cart.types";

type CartItemsListProps = {
  items: CartItemType[];
  onRemove: (item: CartItemType) => void;
};

const CartItemsList = ({ items, onRemove }: CartItemsListProps) => {
  return (
    <>
      {items.map((item) => (
        <CartItem
          key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
          item={item}
          onRemove={onRemove}
        />
      ))}
    </>
  );
};

export default CartItemsList;
