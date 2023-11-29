import React, {useCallback, useEffect, useState} from 'react';
import './Order.css';
import {useTelegram} from "../../hooks/useTelegram";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';


import {
    useLocation
  } from "react-router-dom"; 
  // https://webapp-bot.onrender.com/

const Order = () => {
    const [street, setStreet] = useState('');
    const [time, setTime] = useState('');

    const [subject, setSubject] = useState('physical');
    const {tg} = useTelegram();

    const location = useLocation();
    const data11 = location.state;
    const totalPrice = data11.totalPrice;

    const onSendData = useCallback  (() => {
        const data = {
            street
        }
        tg.sendData(JSON.stringify(data));
        fetch('https://backend-trcq.onrender.com/api/order/create', {
            method: 'POST',
            body: JSON.stringify({
                    "price": totalPrice,
                    "pickup": 1,
                    "status": "INWORK",
                    "authorId": 1
            })

        })  
        alert("uspex");   
    })
    


    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Оплатить'
        })
    }, [])

    useEffect(() => {
        if(!street || !time) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [time, street])

   

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    const onChangeTime = (e) => {
        setTime(e.target.value)
    }

   const locations = {
        "city": "Екатеринбург"   
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <br></br>
            <AddressSuggestions token="69a955bf27ce46407c3c605bcd923a96458d519b" value={street} onChange={setStreet} filterLocations={locations}/>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Самовывоз</option>
                <option value={'legal'}>Доставка</option>
            </select>
            <input
                className={'input'}
                type="text"
                placeholder={'Время (временно в тексте)'}
                value={time}
                onChange={onChangeTime}
            />
            <br></br>
            <hr></hr>
            <br></br>
            <p>Итого к оплате: {totalPrice}Р</p>
        </div>
    );
};

export default Order;