import React from "react";
import { styled } from "@mui/system";

const DoubleColorBarContainer = styled("div")({
  width: "100%",
  height: "5px",
  display: "flex",
});

const ColorBar = styled("div")({
  height: "100%",
  transition: "width 0.5s",
});

const DoubleColorBar = (props: any) => {
  const { color1, color2, value1, value2 } = props;
  const totalValue = parseInt(value1) + parseInt(value2);
  const normalizedValue1 = (value1 / totalValue) * 100;
  const normalizedValue2 = (value2 / totalValue) * 100;

  return (
    <DoubleColorBarContainer>
      <ColorBar
        className="me-1"
        style={{ width: `${normalizedValue1}%`, backgroundColor: color1 }}
      ></ColorBar>
      <ColorBar
        className=""
        style={{ width: `${normalizedValue2}%`, backgroundColor: color2 }}
      ></ColorBar>
    </DoubleColorBarContainer>
  );
};

export default DoubleColorBar;
