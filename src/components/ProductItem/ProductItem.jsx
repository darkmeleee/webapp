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
           <div className={'img'}><img src={product.imageUrl}></img>ssdsds</div>
            <div className={'title'}>{product.name}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
            
        </div>

        
    );
};

export default ProductItem;
