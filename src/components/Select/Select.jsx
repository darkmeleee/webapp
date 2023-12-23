import * as moment from "moment";
import { useMemo } from "react";

export const Select = ({ onChange, value, placeholder, className }) => {
  const timeAvailables = [];
  const today = new Date();
  const currSeconds = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();
  let time = today.getHours() * 3600;
  while (time < 20 * 3600) {
    time += 15 * 60;
    if (time > currSeconds) {
      timeAvailables.push(time);
    }
  }

  return (
    <select
      className={
        "input w-full border-solid border-[1px] border-brown-accent text-brown-accent text-[22px] bg-white rounded-[50px] py-[4px] pl-[15px] " +
        className
      }
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      {timeAvailables.map((el) => (
        <option key={el} value={el}>{moment.utc(el * 1000).format("HH:mm")}</option>
      ))}
    </select>
  );
};
