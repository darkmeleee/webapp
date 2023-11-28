import React from "react";
import Button from "../Button/Button";
// import "./ProductItem.css";

const ProductItem = ({ product, className, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
    console.log(product);
  };

  return (
    <div className="product flex flex-col gap-y-2 text-brown-accent max-w-[187px] cursor-pointer">
      <div className="rounded-lg">
        <img className="rounded-[9px] min-h-[187px]" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="text-[18px] ">{product.name}</div>
      <div className="spacer mt-auto"></div>
      <Button primary className="add-btn" onClick={onAddHandler}>
        {product.price}&nbsp;₽
      </Button>
    </div>
    //    <div className={'product ' + className}>
    //        <div className={'img'}><img src={product.imageUrl}></img>ssdsds</div>
    //         <div className={'title'}>{product.name}</div>
    //         <Button className={'add-btn'} onClick={onAddHandler}>
    //              {product.price} ₽
    //         </Button>

    //     </div>
  );
};

export default ProductItem;
