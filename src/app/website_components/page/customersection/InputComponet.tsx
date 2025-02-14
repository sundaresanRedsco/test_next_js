import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  text?: string;
  type?: string;
  icon: any;
};

export default function InputComponet({ text, icon, type }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: type == "password" ? "space-between" : "center",
        background: "#ffffff1a",
        borderRadius: "12px",
        height: "63px",
        border: "1px solid rgba(255,255,255,.12)",
        padding: "24px",
        width: "100%",
        flexDirection: type == "password" ? "row-reverse" : "row",
      }}
    >
      <Box
        component={"img"}
        src={icon}
        sx={{
          height: { xs: "14px", sm: "28px" },
          width: { xs: "14px", sm: "28px" },
        }}
      />
      {type == "password" ? (
        <Box sx={{ display: "flex", gap: "10px" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((elem, index) => {
            return (
              <span
                key={index}
                style={{
                  height: "13px",
                  width: "13px",
                  borderRadius: "50%",
                  background: "#ffffff80",
                }}
              ></span>
            );
          })}
        </Box>
      ) : (
        <Typography
          component={"p"}
          sx={{
            color: "#fffc",
            fontSize: "18px",
            lineHeight: "22px",
            fontWeight: "700",
            flexGrow: 1,
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
}
