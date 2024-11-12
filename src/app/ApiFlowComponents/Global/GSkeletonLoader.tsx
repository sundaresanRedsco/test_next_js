import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { Skeleton } from "@mui/material";

export default function GSkeletonLoader({
  backdrop,
  open,
  secondary,
  width,
  animation,
  height,
}: any) {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          backgroundColor: !backdrop ? "transparent" : "#0c070f78",
        }}
        open={open}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: width ? width : secondary ? "100%" : "90%",
            height: height || "25px",
            borderRadius: "5px",
            background: secondary ? "#2f2935" : "#473d51",
          }}
          animation={animation ? animation : "wave"}
        ></Skeleton>
      </Backdrop>
    </div>
  );
}
