import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import { Box } from "@mui/material";
import React from "react";
import GlobalButton from "../global/GButton";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";

type Props = {
  visible: boolean;
  isHeightIncreased: boolean;
  redoDisabled: boolean;
  undoDisabled: boolean;
  handleUndo: () => void;
  handleRedo: () => void;
};

export default function UndoRedo({
  handleUndo,
  handleRedo,
  visible,
  isHeightIncreased,
  undoDisabled,
  redoDisabled,
}: Props) {
  const { height } = useGlobalStore();
  const buttons = [
    {
      label: "Undo",
      icon: <BiUndo style={{ height: "15px", width: "15px" }} />,
      onClickHandler: handleUndo,
      disabled: undoDisabled,
    },
    {
      label: "Redo",
      icon: <BiRedo style={{ height: "15px", width: "15px" }} />,
      onClickHandler: handleRedo,
      disabled: redoDisabled,
    },
  ];
  return (
    <Box
      sx={{
        position: "sticky",
        width: "100%",
        display: visible ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        bottom: isHeightIncreased ? height + 20 : 20,
        pointerEvents: "none",
      }}
    >
      {buttons.map((elem: any, index: number) => (
        <GlobalButton
          key={index}
          label={elem.label}
          buttonType="primary"
          iconPosition="start"
          icon={elem.icon}
          onClickHandler={elem.disabled ? undefined : elem.onClickHandler}
          cursor={elem.disabled ? "not-allowed" : "pointer"}
          sx={{
            opacity: elem.disabled ? 0.5 : 1,
            pointerEvents: "all",
          }}
        />
      ))}
    </Box>
  );
}
