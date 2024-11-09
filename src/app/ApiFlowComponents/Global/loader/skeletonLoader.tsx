import { Skeleton } from "@mui/material";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  animation?: "pulse" | "wave" | false;
  variant?: "text" | "rectangular" | "rounded" | "circular"; // Match MUI Skeleton variants
}

export default function SkeletonLoader({
  width = 40,
  height = 40,
  animation = "wave",
  variant = "circular",
}: SkeletonLoaderProps) {
  return (
    <Skeleton
      animation={animation}
      variant={variant}
      width={width}
      height={height}
    />
  );
}
