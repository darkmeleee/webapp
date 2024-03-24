import React from "react";
import "./Button2.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const history = useNavigate();

  let doRedir;
  if (props.to && !props.onClick) {
    doRedir = () => {
      history(props.to);
    }
  }
  return (
    <button
      {...props}
      onClick={props?.onClick ?? ( props.to ? doRedir : ()=>{console.log('aboba')} )}
      className={
        props?.className +
        " button rounded-xl text-[20px] "
        + (props?.primary ? " !bg-brown-accent !text-white " : " !bg-transparent !text-black !outline !outline-2 !outline-offset-[-2px] !outline-brown-accent  ")
        + (props?.rounded ? " !rounded-[50px] " : "  ")
      }
    />
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
};

export default Button;
