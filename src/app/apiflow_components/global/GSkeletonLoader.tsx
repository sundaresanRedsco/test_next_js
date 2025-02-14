import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { Skeleton } from "@mui/material";
import theme from "@/Theme/theme";

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
          color: theme.palette.signInUpPrimary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          backgroundColor: !backdrop
            ? "transparent"
            : theme.palette.backdrop.main,
        }}
        open={open}
      >
        <Skeleton
          variant="rectangular"
          sx={{
            width: width ? width : secondary ? "100%" : "90%",
            height: height || "25px",
            borderRadius: "5px",
            background: secondary
              ? theme.palette.skeletonPrimary.main
              : theme.palette.skeletonDefault.main,
          }}
          animation={animation ? animation : "wave"}
        ></Skeleton>
      </Backdrop>
    </div>
  );
}
