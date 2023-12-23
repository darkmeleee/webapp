
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';

export const OrderReadyPage = ({}) => {
  const { state } = useLocation();
  const { orderId } = state;

  return (
    <div className="flex flex-col min-h-[calc(100vh_-_158px)] p-3 pb-8 gap-y-5 text-brown-accent">
      <div className="w-full bg-[rgba(104,59,43,0.10)] backdrop-blur-[2.5px] rounded-[12px] py-7 text-[24px] flex flex-col gap-y-[8px] place-items-center">
        <CheckRoundedIcon className="stroke-brown-accent !w-[80px] !h-[68px]"/>
        <span className="font-medium text-[34px] py-2">Готово</span>
        <span className=" text-inherit">Спасибо за заказ!</span>
        <span className=" text-inherit">Номер заказа №{orderId}</span>
        <Button primary className="text-[17px] font-normal !px-8" to={`/status/${orderId}`}>Отслеживать</Button>
      </div>
    </div>
  );
};
