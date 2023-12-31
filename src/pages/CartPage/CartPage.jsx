import Button from "../../components/Button/Button";
import * as React from "react";
import { CartContext } from "../../context/CartContext";
import ProductItem from "../../components/ProductItem/ProductItem";

export const CartPage = (props) => {
  const { cartItems, removeFromCart, getCartTotal } = React.useContext(CartContext);
  function removeHandler(item) {
    removeFromCart(item);
    console.log(item);
  }
  return (
    <div className="flex flex-col h-[calc(100vh_-_158px)] p-0 xxs:p-5 pb-8 px-4 gap-y-6 text-brown-accent font-medium">
      <div>
        <p className="text-[25px]">Корзина</p>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-5">
        {cartItems.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            canRemove={true}
            onRemove={() => removeHandler(item)}
          />
        ))}
      </div>
      <div className="spacer mt-auto"></div>
      <div>
        <Button primary to="/staging" className="w-full font-normal">
          Оформить заказ | { getCartTotal() } ₽
        </Button>
      </div>
    </div>
  );
};
