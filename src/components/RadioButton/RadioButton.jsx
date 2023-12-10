import { FormControlLabel, Radio, Typography } from "@mui/material";
import { useId } from "react";
import { styled } from "@mui/material/styles";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 23,
  height: 23,
  // boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: "#EAD0B9",
  // backgroundImage:'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  // 'input:hover ~ &': {
  //   backgroundColor: '#ebf1f5',
  // },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "#EAD0B9",
  },
}));
const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#EAD0B9",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 23,
    height: 23,
    backgroundImage: "radial-gradient(#683B2B,#683B2B 42%,transparent 48%)",
    content: '""',
  },
});

export const RadioButton = ({
  value,
  children,
  className,
  labelClassName,
  labelPlacement,
}) => {
  const id = useId();
  return (
    // <div className="flex flex-row gap-x-1 place-items-center place-conent-start text-[22px] text-brown-accent">
    //   <input className="w-6 h-6" id={id} name={name} type="radio" />
    //   <label for={id}> {children} </label>
    // </div>
    <FormControlLabel
      labelPlacement={labelPlacement}
      className={className}
      value={value}
      control={<CustomRadio />}
      label={
        <span className={"text-[22px] font-normal font-sans " + labelClassName}>
          {children}
        </span>
      }
    />
  );
};

function CustomRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
