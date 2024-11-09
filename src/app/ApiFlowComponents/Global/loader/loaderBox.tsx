import { Box } from "@mui/material";
import GlobalCircularLoader from "../GlobalCircularLoader";

export default function LoaderBox() {
  return (
    <Box sx={{ width: "100%", height: "400px", position: "relative" }}>
      <GlobalCircularLoader open={true} />
    </Box>
  );
}
