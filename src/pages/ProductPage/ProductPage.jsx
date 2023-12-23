import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Button from "../../components/Button/Button";
import { CenteredLoading } from "../../components/CenteredLoading/CenteredLoading";

export const ProductPage = (props) => {
  const { id } = useParams();
  const { isLoading, isSuccess, data, error } = useQuery(
    ["products", id],
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/dish/get?id=${id}`)
        .then((res) => res.data),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
  );

  if (isLoading) return <CenteredLoading/>;

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
        <p className="text-[18px] font-medium ">{product.description}</p>
      </div>
      <div className="spacer mt-auto"></div>
      <div className="w-full p-price">
        <span className="text-[25px] font-medium">
          Цена: {product.price}&nbsp;₽
        </span>
      </div>
      <div className="w-full p-btn">
        <Button className="w-full" primary>
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
};
