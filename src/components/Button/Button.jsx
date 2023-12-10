import React from "react";
import "./Button.scss";
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
        " button rounded-xl text-[20px] " +
        (props?.primary ? " !bg-brown-accent !text-white " : " ")
      }
    />
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
};

export default Button;
