import { Position } from "reactflow";
import GButton from "../../Global/GlobalButton";
import CustomHandle from "../customHandle";
import { useTheme } from "@mui/material";

export default function StartButtonNode({ id }: any) {
  const theme = useTheme();

  return (
    <>
      <div>
        <GButton
          background={theme.palette.v2PrimaryColor.main}
          color={theme.palette.primaryWhite.main}
          label={"Start"}
          fontSize="0.6rem"
          padding="0px"
          margin="0"
        />

        <CustomHandle
          type="source"
          position={Position.Right}
          id={id + "_startHandle"}
          isConnectable={1}
          style={{ height: "15px", width: "2px", marginTop: "2px" }}
        />
      </div>
    </>
  );
}
