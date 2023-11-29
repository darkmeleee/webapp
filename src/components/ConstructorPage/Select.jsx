import * as React from "react";
import PropTypes from "prop-types";
import { Select as BaseSelect, selectClasses } from "@mui/base/Select";
import { Option as BaseOption } from "@mui/base/Option";
import { Popper as BasePopper } from "@mui/base/Popper";
import { styled } from "@mui/system";
import { ExpandMore } from "@mui/icons-material";

export const Select = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: Listbox,
    popper: Popper,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});
Select.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    popper: PropTypes.func,
    root: PropTypes.elementType,
  }),
};
const Option = styled(BaseOption)(
  ({ theme }) => `
      font-family: Montserrat, sans-serif;
      list-style: none;
      padding: 5px 8px;
      border-radius: 8px;
      cursor: default;
    
      &:last-of-type {
        border-bottom: none;
      }
      `
);
Select.Option = Option;
const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
const Button = React.forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <ExpandMore />
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};
const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => `
    font-family: Monserrat, sans-serif;
    font-size: 18px;
    box-sizing: border-box;
    width: 156px;
    padding: 10px;
    border-radius: 13px;
    text-align: left;
    line-height: normal;
    background: #683B2B;
    color: white;
    position: relative;
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
  
   
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }
  
    &.${selectClasses.focusVisible} {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[700] : blue[200]
      };
    }
  
    & > svg {
      font-size: 1rem;
      position: absolute;
      height: 100%;
      top: 0;
      right: 10px;
    }
    `
);

const Listbox = styled("ul")(
  ({ theme }) => `
    font-family: Montserrat, sans-serif;
    width: 156px;
    font-size: 18px;
    box-sizing: border-box;
    padding: 6px;
    border-radius: 13px;
    margin-top:-1px;
    
    overflow: auto;
    outline: 0px;
    background: #412319;
    color: white;
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
    };
    `
);

const Popper = styled(BasePopper)`
  z-index: 1;
`;
