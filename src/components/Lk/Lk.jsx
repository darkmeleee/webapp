import React, {useCallback, useEffect, useState} from 'react';
import './Lk.css';
import {useTelegram} from "../../hooks/useTelegram";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { useQuery } from "react-query";
import styled from "styled-components";
import axios from "axios";



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate,
    useLocation
  } from "react-router-dom"; 
  // https://webapp-bot.onrender.com/

const Lk = () => {
    
   const {user, tg} = useTelegram();
   const { isLoading, isError, data, error, refetch, isFetched } = useQuery(["userdata"],  async () =>
  await axios
     .get(`https://backend-trcq.onrender.com/api/user/get?id=${user.id}`)
     .then((res) => res.data)
     );
   const [username, setUsername] = useState();
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');

   function initData(){
        console.log(data.name);
        setUsername(data.name);
   }

   useEffect(() => {
    if(isFetched){
        console.log(data);
        setUsername(data.name);
        setPhone(data.number);
        setEmail(data.email);
    }
   }, [data])
   

     const Button = styled.button`
        background-color: black;
        color: white;
        font-size: 20px;
        padding: 10px 60px;
        border-radius: 5px;
        margin: 10px 0px;
        cursor: pointer;
    `; 






   const onChangeName = (e) => {
        setUsername(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangeEmail  = (e) => {
        setEmail(e.target.value)
    }

    if (isLoading) return "Загрузка...";

 
    if (error){ return "An error has occurred: " + error.message; console.log}

    function sellRabstvo(){
        console.log(data);
    }

    

    
    


   

   

   

    return (
        <div className={"form"}>
           <input
                className={'input'}
                type="text"
                placeholder={'Имя'}
                value={username}
                onChange={onChangeName}
            />
            <input
                className={'input'}
                type="tel"
                placeholder={'Телефон'}
                value={phone}
                onChange={onChangePhone}
            />
            <input
                className={'input'}
                type="email"
                placeholder={'Email'}
                value={email}
                onChange={onChangeEmail}
            />
            <Button onClick={sellRabstvo}>
                Сохранить
            </Button>
        </div>
    );
};

export default Lk;