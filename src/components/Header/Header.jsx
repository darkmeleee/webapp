import React from 'react';
import icon from "../../icons/bak.svg"
import logo from "../../icons/logo.svg"
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import './Header.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";

const Header = () => {
    const {user, onClose} = useTelegram();
    const history = useNavigate();


    function onClickUsername() {
        history("/lk"   ); 
      //  alert(user.id);

        //{user?.username ? user?.username : "darkmeleee" }
        //             <Button className={'username'} onClick={onClickUsername}>Личный кабинет</Button>

    }

    function onReturnButtonClick(){
        history(-1);
    }

    return (
        <div className={'header'}>

            <div className='logo'>
                <img src={logo} onclick={onReturnButtonClick}></img>
            </div>

            <div className='right'>
                <a onClick={onReturnButtonClick}><img src={icon} className="username" onclick={onReturnButtonClick}></img></a>
            </div>
            

            
        </div>
    );
};

export default Header;
