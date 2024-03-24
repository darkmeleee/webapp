import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";



const OrderItem = ({ order }) => {
    const history = useNavigate();

    //function onClick(id){
      // console.log(id);
       // history(`order/${id}`)
    //}

    function doRedir(id){
    //   if (props.to && !props.onClick) {
         history(`order/${id}`)
        console.log(id);
      ///}
    
  }
 
  return (
    <div className="product flex flex-col gap-y-2 rounded-xl text-brown-accent w-[calc((100%_-_20px)_/_2)] xs:w-[187px] max-w-[187px] cursor-pointer border-2">
      <Link to={`/order/${order.id}`} className="rounded-lg">
        
      </Link>
      <div className="text-[18px] ">{new Date(order.createdAt).toLocaleDateString()} | # {order.id} </div>
      <div className="text-[18px] ">{order.pickup == 1 ? "Самовывоз": "Доставка"}</div>
      <div className="text-[18px] ">{order.price}&nbsp;₽ </div>
      <div className="text-[18px] ">{order.statusOrder == "INWORK" ? "Готовится": "Выдан"}</div>
      <div className="spacer mt-auto"></div>
      <Button primary className="add-btn" onClick={() => doRedir(order.id)}>
        Посмотреть
      </Button>
    </div>
   
  );
};

export default OrderItem;
