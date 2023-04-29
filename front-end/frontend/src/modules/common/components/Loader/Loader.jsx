import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <Box className={classes.overlay}>
      <CircularProgress sx={{ color: "#2e5250" }} />
    </Box>
  );
};

export default Loader;
