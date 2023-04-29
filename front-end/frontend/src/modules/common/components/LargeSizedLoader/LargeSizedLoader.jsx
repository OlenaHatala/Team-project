import CircularProgress from "@mui/material/CircularProgress";

import classes from "./LargeSizedLoader.module.css";

export const LargeSizedLoader = () => {
  return (
    <div className={classes["large-loder-wrapper"]}>
      <CircularProgress sx={{ marginBottom: "450px", marginInline: "auto" }} />
    </div>
  );
};
