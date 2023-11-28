import React from "react";
import Button from "../Button/Button";
import "./ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = ({ product, className, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
    console.log(product);
  };

  return (
    <div className="product flex flex-col gap-y-2 rounded-xl text-brown-accent w-[calc((100%_-_20px)_/_2)] xs:w-[187px] max-w-[187px] cursor-pointer">
      <Link to={`/product/${product.id}`} className="rounded-lg">
        <img className="rounded-[9px] min-h-[187px]" src={product.imageUrl} alt={product.name} />
      </Link>
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
