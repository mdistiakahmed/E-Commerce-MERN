import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useContext, useEffect, useState } from "react";

const ToastAlert = () => {
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (alert?.msg) {
      setOpen(true);
    }
  }, [alert]);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert?.type ?? "error"}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {alert?.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ToastAlert;
