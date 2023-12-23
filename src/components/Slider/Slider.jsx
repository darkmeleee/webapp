import { Slider as MaterialSlider } from "@mui/material";
import styled from "styled-components";

export const Slider = ({ disabled, value, defaultValue, onChange }) => {
  return <CustomSlider disabled={disabled} value={value} onChange={ onChange ? onChange : () => {} } defaultValue={defaultValue} />;
};

const CustomSlider = styled(MaterialSlider)(({ theme }) => ({
  color: "#3a8589",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
    backgroundColor: "#683B2B",
  },
  "& .MuiSlider-track": {
    height: 6,
    border: 0,
    backgroundColor: "#683B2B",
  },
  "& .MuiSlider-rail": {
    color: "#EAD0B9",
    opacity: 1,
    height: 6,
  },
}));
