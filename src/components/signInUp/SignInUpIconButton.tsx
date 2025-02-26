import React from "react";
import { motion } from "framer-motion";
import { styled, useTheme } from "@mui/material/styles";
import { globalTranslate } from "@/helpers/helpersFunctions";

const AnimatedButton = styled(motion.button)({
  padding: "5px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  background: "#4B31E0",
  color: "white",
  fontSize: "16px",
});
type Props = {
  variant?: "primary" | "secondary";
  icon: any;
  onClick?: () => void;
  sx?: any;
};
export default function SignInUpIconButton({
  variant,
  icon,
  onClick,
  sx,
}: Props) {
  const theme = useTheme();
  const primaryButtonStyle = {
    background: "transparent",
    color: theme.apiTrail.signInUp.TextPrimary,
    fontSize: globalTranslate("fontSize.md", "signInUpStyleConstants"),
    fontFamily: "Firasans-medium",
    border: `1px solid ${theme.apiTrail.signInUp.Border}`,
    svg: {
      width: { xs: "25px", xl: "30px" },
      height: { xs: "25px", xl: "30px" },
    },
  };
  const secondaryButtonStyle = {
    background: theme.apiTrail.signInUp.ButtonSecondary,
    color: theme.apiTrail.signInUp.TextLink,
    fontSize: globalTranslate("fontSize.xs", "signInUpStyleConstants"),
    fontFamily: "Firasans-medium",
  };
  return (
    <AnimatedButton
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 15px rgba(107, 71, 255, 0.3)",
      }}
      whileTap={{
        scale: 0.95,
        backgroundColor: "#4B31E0",
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 20,
      }}
      sx={{
        ...sx,
        ...(variant === "secondary"
          ? secondaryButtonStyle
          : primaryButtonStyle),
      }}
    >
      {icon}
    </AnimatedButton>
  );
}
