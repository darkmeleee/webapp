import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CenteredLoading } from "../../components/CenteredLoading/CenteredLoading";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import moment from "moment";
import { Slider } from "../../components/Slider/Slider";

export const StatusPage = ({}) => {
  const { orderId } = useParams();
  const [time, setTime] = useState(0);
  let [timeText, setTimeText] = useState("00:00");
  // const { isLoading, data, error } = useQuery(["staus", id], () =>
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/api/status/${id}`)
  //     .then((res) => res.data)
  // );
  let isLoading = false;
  // useEffect(() => {
  //   timeSpan = moment.utc(time * 1000)
  // }, [time])

  if (isLoading) return <CenteredLoading />;


  useEffect(() => {
    const interval = setInterval(() => setTime(time => time + 1), 1000);
    return () => clearInterval(interval);
  }, [])

  // TODO handle errors

  return (
    <div className="flex flex-col min-h-[calc(100vh_-_158px)] p-3 pb-8 gap-y-5 text-brown-accent">
      <div>
        <p className="text-[25px] font-medium">Статус заказа</p>
      </div>
      <div className="infobox flex flex-col">
        <div className="info flex place-content-between text-[24px]">
          <span>
            Заказ №{orderId}
          </span>
          <span>
            {moment.utc(time * 1000).format("mm:ss")}
          </span>
        </div>
        <div className="slider w-full">
          <Slider disabled value={0} />
        </div>
        <div className="status-text text-[19px]">
          Принят
        </div>

      </div>
      <div>
        <Button rounded primary className=" !px-5 " to="/">
          Назад
        </Button>
      </div>
    </div>
  );
};
