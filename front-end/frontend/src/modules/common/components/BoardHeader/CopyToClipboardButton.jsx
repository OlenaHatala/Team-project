import { useState } from "react";
import { Button, Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import classes from "./BoardHeader.module.css";

const CopyToClipboardButton = ({ link }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(link || window.location.toString());
  };

  return (
    <>
      <Button
        className={classes["link-btn"]}
        onClick={handleClick}
        color="primary"
      >
        <ContentCopyIcon />
        <span className={classes["copylink-text"]}>Copy board link</span>
      </Button>
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default CopyToClipboardButton;
