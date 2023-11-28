import { useParams } from "react-router-dom";

export const ProductPage = (props) => {
  const { id } = useParams();
  const { isLoading, isSuccess, data, error } = useQuery(["products"], () =>
    axios
      .get(`https://backend-trcq.onrender.com/api/dish/get?id=${id}`)
      .then((res) => res.data)
  );

  if (isLoading)
    return <center>Загрузка...</center>

  return (
    <div>
      
    </div>
  );
};
