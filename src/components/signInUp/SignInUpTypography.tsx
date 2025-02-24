import { globalTranslate } from "@/helpers/helpersFunctions";
import { StyledLink } from "@/styles/signInUp";
import theme from "@/theme/theme";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
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
  lineHeight?: any;
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

export default function SignInUpTypography({
  text,
  variant,
  sx,
  color,
  fontWeight,
  fontSize,
  fontFamily,
  lineHeight,
  onClick,
  isMixedText,
}: Props) {
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
        lineHeight: lineHeight ?? "inherit",
      }}
    >
      {isMixedText ? (
        <>
          {isMixedText.start}
          <StyledLink href={isMixedText.link1}>{isMixedText.text1}</StyledLink>
          {isMixedText.between}
          <StyledLink href={isMixedText.link2}>{isMixedText.text2}</StyledLink>
        </>
      ) : (
        text
      )}
    </Typography>
  );
}
