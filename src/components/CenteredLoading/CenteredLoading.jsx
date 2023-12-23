import { CircularProgress } from "@mui/material";

export const CenteredLoading = ({}) => {
  return (
    <center className="h-[calc(100vh_-_168px)] text-brown-accent flex place-items-center place-content-center">
      <CircularProgress color="inherit" />
    </center>
  );
};
