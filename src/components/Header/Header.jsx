import React, { useContext } from "react";
import icon from "../../icons/bak.svg";
import logo from "../../icons/logo.svg";
import Button from "../Button/Button";
import cart from "../../icons/cart.svg";
import { useTelegram } from "../../hooks/useTelegram";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CartContext } from "../../context/CartContext";
import { useLocation } from 'react-router-dom'


const Header = () => {
  const { cartItems } = useContext(CartContext);
  const history = useNavigate();
  const location = useLocation();


  function onClickUsername() {
    if(location.pathname != "/reg"){
      history("/");
    }
  }

  function onReturnButtonClick() {
    if(location.pathname != "/reg"){
      console.log(location.pathname);
      history(-1);
    }
  }
  function gotoCart() {
    if(location.pathname != "/reg"){
      history("/cart");
    }
  }
  function gotoLk() {
    if(location.pathname != "/reg"){
      history("/lk");
    }
  }

  return (
    <div className="flex flex-row w-screen justify-between md:justify-around place-items-center p-5">
      <div className="cursor-pointer w-[36px] h-[24px]">
        <a onClick={onReturnButtonClick}>
          <img
            src={icon}
            className="username"
            onClick={onReturnButtonClick}
          ></img>
        </a>
      </div>
      <div className="logo cursor-pointer h-[118px]">
        <img src={logo} onClick={onClickUsername}></img>
      </div>
      <div onClick={gotoLk} className="relative z-0 h-[36px] w-[36px] cursor-pointer text-brown-accent">
        <AccountCircleIcon color="inherit" className="!w-full !h-full"  />
      </div>
      <div className="cursor-pointer flex">
        <span className="absolute h-6 w-6 place-items-center place-content-center flex self-start ml-[22px] -mt-[4px] z-10 bg-brown-accent rounded-full border-[1px] text-white border-white">
          {cartItems.reduce((acc, item) => (acc += item.quantity), 0)}
        </span>
        <img src={cart} className="relative z-0" onClick={gotoCart} />
      </div>
    </div>
  );
};

export default Header;
