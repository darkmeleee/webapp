import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import axios from "axios";
import ResponsiveAppBar from '../AppBar/appbar';
import SimpleBottomNavigation from '../cartBottom/cartBottom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
var usage = 0;
    

/*const products = [
    {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые', category: "cake"},
    {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая', category: "pirog"},
    {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые', category: "cake"},
    {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая', category: "pirog"},
    {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые', category: "cake"},
    {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая', category: "cake"},
    {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые', category: "pirog"},
    {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая', category: "pirog"},
]*/


//const products = axios.get(`http://80.90.186.129:3000/api/dish/getAll`);
//console.log(products);








const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const history = useNavigate();
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();
    const [products, setProducts] = useState([]);

    async function initProducts() {
        if(usage == 1) return;
        else{
        await fetch(`https://backend-trcq.onrender.com/api/dish/getAll`)
            .then(response => response.json())
            .then(response => {
                setProducts(response);
              //  console.log(response);
            }
            )
            usage = 1;
        }
            
          
    }
    


    initProducts();


    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        history("/form", {state: data});
       /*fetch('https://webapp-bot.onrender.com/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })*/
        
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }


    return (
        <div>
         <div className='nav'>
            <ResponsiveAppBar/>
        </div> 
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
       
        </div>
=
        </div>

    );
};

export default ProductList;
