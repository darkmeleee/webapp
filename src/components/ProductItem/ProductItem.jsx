import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
        console.log(product);
    }

    return (
        
       <div className={'product ' + className}>
        <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
           <div className={'img'}><img src={product.imageUrl}></img>ssdsds</div>
            <div className={'title'}>{product.name}</div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                 {product.price} ₽
            </Button>
            
        </div>

        
    );
};

export default ProductItem;
