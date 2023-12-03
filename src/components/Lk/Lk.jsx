import React, {useEffect, useState} from 'react';
import './Lk.css';
import {useTelegram} from "../../hooks/useTelegram";
import 'react-dadata/dist/react-dadata.css';
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";

 //   .get(`https://backend-trcq.onrender.com/api/user/get?id=${user.id}`)

const Lk = () => {
    
   const { isLoading, isError, data, error, refetch, isFetched } = useQuery(["userdata"],  async () =>
        axios
            .get(`https://backend-trcq.onrender.com/api/user/get?id=0`)
            .then((res) => res.data)
        );
   const [username, setUsername] = useState();
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [adress, setAdress] = useState('');


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
        background-color: #683B2B;
        border-radius: 57px;
        color: white;
        font-size: 20px;
        padding: 10px 60px;
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
    const onChangeAdress = (e) => {
        setAdress(e.target.value)
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
             <input
                className={'input'}
                type="text"
                placeholder={'Адрес'}
                value={adress}
                onChange={onChangeAdress}
            />
            <p className='text1'>Бонусы: 125 баллов</p>
            <Button onClick={sellRabstvo}>
                Сохранить
            </Button>
        </div>
    );
};

export default Lk;