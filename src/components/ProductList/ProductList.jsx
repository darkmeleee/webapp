import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import axios from "axios";
import ResponsiveAppBar from '../AppBar/appbar';
import SimpleBottomNavigation from '../cartBottom/cartBottom';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { useQuery } from "react-query";

import {
    BrowserRouter as Router,
    Switch, 
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
var usage = 0;
    
const queryClient = new QueryClient({});










const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const { isLoading, isError, data, error, refetch } = useQuery(["products"],  () =>
    axios
      .get("https://backend-trcq.onrender.com/api/dish/getAll")
      

      .then((res) => res.data)
      );

      
    const history = useNavigate();
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();
    const onSendData = useCallback(() => {
        const data1 = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        history("/form", {state: data1});
      
        
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])
    
 

  
 
  if (isLoading) return "Загрузка...";
 
  if (error){ return "An error has occurred: " + error.message; console.log}

 
    function idk() {
        axios
            .get("https://backend-trcq.onrender.com/api/dish/getSitnoe")
            .then((res) => res.data)
    }

    

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

        <div className="page">
         
        <div className={'list'}>
            {data.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
       
        </div>
                
        </div>
     

    );
};

export default ProductList;
