import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function GlobalCircularLoader({ open, noBackdrop }: any) {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          backgroundColor: noBackdrop ? "transparent" : "#0c070f78",
        }}
        open={open}
      >
        <CircularProgress
          style={{
            position: "relative",
            top: 0,
            bottom: 0,
            height: "30px",
            width: "30px",
            margin: "auto",
            zIndex: "9999999999999999999999",
            right: 0,
            left: 0,
            color: "#1976d2",
          }}
        />
      </Backdrop>
    </div>
  );
}
