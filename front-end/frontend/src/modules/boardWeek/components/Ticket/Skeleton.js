import Skeleton from "@mui/material/Skeleton";

import { useSelector } from "react-redux";
import { selectWeekMode } from "../../store/weekSlice";

export const TicketSkeleton = ({ height }) => {
  const mode = useSelector(selectWeekMode);

  return (
    <>
      <Skeleton
        variant="rectangular"
        height={`${height}%`}
        width="97%"
        sx={{
          borderRadius: "10px",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0",
          marginTop: "-135px",
          marginBottom: mode === "owner" ? "15px" : "90px",
          alignItems: 'center',
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            "background-color": "#ffffff",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
          height="20px"
          width="70%"
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            "background-color": "#ffffff",
            borderRadius: "10px",
          }}
          height="15px"
          width="50%"
        />
      </div>
      {mode === "owner" ? (
        <Skeleton
          variant="circular"
          animation="wave"
          sx={{
            "background-color": "#ffffff",
            marginLeft: "15px",
            marginBottom: "10px",
          }}
          height="40px"
          width="40px"
        />
      ) : null}
      {mode === "owner" ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            "background-color": "#ffffff",
            borderRadius: "10px",
            marginLeft: "15px",
            marginBottom: "10px",
          }}
          height="15px"
          width="65%"
        />
      ) : null}
    </>
  );
};

const iconSxStyles = { fontSize: "17px", color: "rgb(149, 149, 149)" };
