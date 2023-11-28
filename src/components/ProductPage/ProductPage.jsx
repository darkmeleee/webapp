import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Button from "../Button/Button";

export const ProductPage = (props) => {
  const { id } = useParams();
  const { isLoading, isSuccess, data, error } = useQuery(
    ["products", id],
    () =>
      axios
        .get(`https://backend-trcq.onrender.com/api/dish/get?id=${id}`)
        .then((res) => res.data),
    {
        refetchInterval: false,
        refetchIntervalInBackground: false,
    }
  );

  if (isLoading) return <center>Загрузка...</center>;

  const product = data;

  return (
    <div className="flex flex-col h-[calc(100vh_-_158px)] p-3 pb-8 gap-y-5 text-brown-accent">
      <div className="w-full p-img">
        <img className="rounded-[17px]" src={product.imageUrl} alt="" />
      </div>
      <div className="w-full p-name">
        <span className="text-[25px] font-medium">{product.name}</span>
      </div>
      <div className="w-full p-desc">
        <p className="text-[18px] font-medium ">
            {product.description}
        </p>
      </div>
      <div className="spacer mt-auto"></div>
      <div className="w-full p-price">
        <span className="text-[25px] font-medium">Цена: {product.price}&nbsp;₽</span>
      </div>
      <div className="w-full p-btn">
        <Button className="w-full" primary>Добавить в корзину</Button>
      </div>
    </div>
  );
};
