import React from "react";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { globalTranslate } from "@/helpers/helpersFunctions";
import theme from "../../theme/theme";

const LoginButton = styled(motion.button)({
  transition: "background 0.3s ease",
});

type Props = {
  variant?: "primary" | "secondary";
  text: string;
  onClick?: () => void;
  sx?: any;
};

export default function SignInUpButton({ variant, text, onClick, sx }: Props) {
  const primaryButtonStyle = {
    background: theme.apiTrail.signInUp.ButtonPrimary,
    color: theme.apiTrail.signInUp.TextPrimary,
    width: "100%",
    fontWeight: 500,
    fontSize: {
      xl: globalTranslate("fontSize.md", "signInUpStyleConstants"),
      xs: globalTranslate("fontSize.xs", "signInUpStyleConstants"),
    },
    fontFamily: "Firasans-medium",
    borderRadius: "12px",
    padding: "12px",
    svg: {
      width: {
        lg: "1rem", // large screens
      },
      height: {
        lg: "1rem", // large screens
      },
    },
  };
  const secondaryButtonStyle = {
    background: theme.apiTrail.signInUp.ButtonSecondary,
    color: theme.apiTrail.signInUp.TextLink,
    width: "auto",
    fontWeight: 500,
    fontSize: {
      xl: globalTranslate("fontSize.xs", "signInUpStyleConstants"),
      xs: globalTranslate("fontSize.xs3", "signInUpStyleConstants"),
    },
    fontFamily: "Firasans-bold",
    borderRadius: "10px",
    padding: "8px 24px",
  };
  return (
    <LoginButton
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 15px rgba(107, 71, 255, 0.3)",
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 20,
      }}
      onClick={onClick}
      sx={{
        ...(variant === "secondary"
          ? secondaryButtonStyle
          : primaryButtonStyle),
        border: "none",
        cursor: "pointer",
        ...sx,
      }}
    >
      {text}
    </LoginButton>
  );
}
