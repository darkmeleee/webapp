export const userColumns = [
  {
    field: "name",
    headerName: "Имя",
    width: 230,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.name}</div>;
    },
  },
  {
    field: "price",
    headerName: "Цена",
    width: 100,
  },
];

//temporary da
