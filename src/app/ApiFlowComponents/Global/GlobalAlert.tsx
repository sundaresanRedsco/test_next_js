import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import CloseV2New from "../../Assests/icons/CloseNew.svg";

interface GlobalAlertProps {
  name: string;
  AlertText: string;
  subClickText: string;
  onClickHandler?: () => void;
  onCloseClick?: () => void;
  type: "Error" | "Success";
}

const AlertBox = styled(Box)<{ type: "Error" | "Success" }>(({ type }) => ({
  backgroundColor: type === "Error" ? "#F6F9FF" : "#79F9AC",
  color: type === "Error" ? "#E50001" : "black",
  padding: "5px 15px",
  margin: "5px 10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: "7px",
  position: "fixed", // Fixed positioning
  top: 0, // Align to top
  width: "-webkit-fill-available", // Full width
  zIndex: 9999, // Ensure it's above other content
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Shadow for visibility
}));

const TextContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  gap: "10px",
  fontSize: "0.6rem",
});

const ClickableText = styled("span")<{ color: string }>(({ color }) => ({
  cursor: "pointer",
  textDecoration: "none",
  color: color,
  fontSize: "0.6rem",
  fontWeight: "600",
}));

const AlertSText = styled("span")({
  cursor: "pointer",
  textDecoration: "none",
  color: "#000000",
  fontSize: "0.75rem",
  fontFamily: "Inter-Medium",
});

const GlobalAlert: React.FC<GlobalAlertProps> = ({
  name,
  AlertText,
  subClickText,
  onClickHandler,
  onCloseClick,
  type,
}) => {
  const [startText, endText] = subClickText.split(/{.*?}/); // Split based on the "{}" with any content inside
  const middleText = subClickText.match(/{.*?}/)?.[0]?.slice(1, -1);
  // const [visible, setVisible] = useState(true); // Manage visibility

  // const handleCloseClick = () => {
  //   setVisible(false); // Hide the alert
  //   if (onCloseClick) onCloseClick(); // Call the optional onCloseClick prop if provided
  // };

  // if (!visible) return null; // Don't render the alert if it's not visible

  return (
    <AlertBox type={type}>
      <TextContainer>
        {type === "Error" ? (
          <>
            <AlertSText style={{ marginTop: "3px" }}>{name}</AlertSText>
            <AlertSText
              style={{
                fontSize: "0.6rem",
                alignContent: "flex-end",
                color: "#E50001",
              }}
            >
              {AlertText}
            </AlertSText>
            <ClickableText
              color="#E50001"
              onClick={onClickHandler}
              style={{ marginTop: "3.5px" }}
            >
              DETAILS &gt;
            </ClickableText>
          </>
        ) : (
          <>
            <AlertSText>{name}</AlertSText>
            <AlertSText
              style={{ fontSize: "0.6rem", alignContent: "flex-end" }}
            >
              {AlertText}
            </AlertSText>
            <AlertSText
              style={{
                fontSize: "0.6rem",
                alignContent: "flex-end",
                color: "#A4A8C9",
              }}
            >
              {startText}
              <ClickableText color="#282F79" onClick={onClickHandler}>
                {middleText}
              </ClickableText>
              {endText}
            </AlertSText>
          </>
        )}
      </TextContainer>
      <IconButton onClick={onCloseClick} style={{ color: "black" }}>
        <CloseV2New style={{ height: "10px" }} />
      </IconButton>
    </AlertBox>
  );
};

export default GlobalAlert;
