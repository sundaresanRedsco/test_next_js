import { globalTranslate } from "@/helpers/helpersFunctions";
import theme from "@/theme/theme";
import { Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {
  variant?: "xl" | "lg" | "md" | "sm" | "xs";
  text: string;
  sx?: any;
  color?: string;
  fontWeight?: "lg" | "md" | "sm" | "xs";
  fontSize?: any;
  fontFamily?: any;
  onClick?: () => void;
  isMixedText?: {
    start: string;
    text1: string;
    between: string;
    text2: string;
    link1: string;
    link2: string;
  };
};

export default function OnboardingTypography({
  text,
  variant,
  sx,
  color,
  fontWeight,
  fontSize,
  fontFamily,
  onClick,
  isMixedText,
}: Props) {
  const theme = useTheme();
  return (
    <Typography
      onClick={onClick}
      sx={{
        ...sx,
        color: color,
        fontFamily: fontFamily
          ? fontFamily
          : fontWeight === "lg"
          ? "FiraSans-bold"
          : fontWeight === "md"
          ? "FiraSans-medium"
          : fontWeight === "sm"
          ? "FiraSans-light"
          : "FiraSans-regular",
        fontSize: fontSize
          ? fontSize
          : variant === "xl"
          ? globalTranslate("fontSize.xl", "signInUpStyleConstants")
          : variant === "lg"
          ? globalTranslate("fontSize.lg", "signInUpStyleConstants")
          : variant === "md"
          ? globalTranslate("fontSize.md", "signInUpStyleConstants")
          : variant === "sm"
          ? globalTranslate("fontSize.sm", "signInUpStyleConstants")
          : globalTranslate("fontSize.xs", "signInUpStyleConstants"),
      }}
    >
      {isMixedText ? (
        <>
          {isMixedText.start}
          <Link
            href={isMixedText.link1}
            style={{
              color: theme.apiTrail.signInUp.TextLink,
              textDecoration: "none",
              fontFamily: "FiraSans-medium",
              fontSize: globalTranslate(
                "fontSize.sm",
                "signInUpStyleConstants"
              ),
            }}
          >
            {isMixedText.text1}
          </Link>
          {isMixedText.between}
          <Link
            href={isMixedText.link2}
            style={{
              color: theme.apiTrail.signInUp.TextLink,
              textDecoration: "none",
              fontFamily: "FiraSans-medium",
              fontSize: globalTranslate(
                "fontSize.sm",
                "signInUpStyleConstants"
              ),
            }}
          >
            {isMixedText.text2}
          </Link>
        </>
      ) : (
        text
      )}
    </Typography>
  );
}
