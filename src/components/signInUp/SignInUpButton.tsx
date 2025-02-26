import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { globalTranslate } from "@/helpers/helpersFunctions";

const LoginButton = styled(motion.button)({
  transition: "background 0.3s ease, opacity 0.3s ease",
});

type Props = {
  variant?: "primary" | "secondary";
  text: string;
  onClick?: (e: any) => void;
  sx?: any;
  disabled?: boolean;
};

export default function SignInUpButton({
  variant,
  text,
  onClick,
  sx,
  disabled,
}: Props) {
  const theme = useTheme();
  const primaryButtonStyle = {
    background: theme.apiTrail.signInUp.ButtonPrimary,
    color: theme.apiTrail.signInUp.TextPrimary,
    width: "100%",
    fontWeight: 500,
    fontSize: {
      // xl: globalTranslate("fontSize.md", "signInUpStyleConstants"),
      xs: globalTranslate("fontSize.xs", "signInUpStyleConstants"),
    },
    fontFamily: "Firasans-medium",
    borderRadius: "12px",
    padding: "12px",
    svg: {
      width: {
        xs: "1rem",
      },
      height: {
        xs: "1rem",
      },
    },
  };
  const secondaryButtonStyle = {
    background: theme.apiTrail.signInUp.ButtonSecondary,
    color: theme.apiTrail.signInUp.TextLink,
    width: "auto",
    fontWeight: 500,
    fontSize: {
      // xl: globalTranslate("fontSize.xs", "signInUpStyleConstants"),
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
        boxShadow: disabled
          ? "none"
          : "0px 4px 15px " + theme.apiTrail.signInUp.ButtonPrimaryBoxShadow,
      }}
      disabled={disabled || false}
      whileTap={{
        scale: disabled ? 1 : 0.95,
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
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...sx,
      }}
    >
      {text}
    </LoginButton>
  );
}
