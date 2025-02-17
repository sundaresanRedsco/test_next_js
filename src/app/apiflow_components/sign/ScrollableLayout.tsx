import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Stack } from "@mui/material";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { KeyboardArrowRight } from "@mui/icons-material";
import GlobalButton from "../global/GButton";
import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import useGPopup from "@/app/hooks/useGPopup";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import theme from "@/Theme/theme";
import { translate } from "@/app/Helpers/helpersFunctions";

type Props = {
  children: any;
  showNextButton?: boolean | string;
  showBackButton?: boolean;
  additionalButton?: boolean;
  loadData?: any;
  handleNext: () => void;
  handleBack?: () => void;
  handleSubmit?: any | undefined;
  columnSpacing?: any;
  additionalButtonOnClick?: any;
  additionalButtonLabel?: any;
  isWorkflowModal?: boolean;
  height?: any;
  title?: any;
  description?: any;
  justifyContent?: any;
};

export default function ScrollableLayout({
  children,
  showBackButton,
  showNextButton,
  handleBack,
  handleNext,
  columnSpacing,
  handleSubmit,
  additionalButton,
  additionalButtonLabel,
  additionalButtonOnClick,
  loadData,
  isWorkflowModal,
  height,
  title,
  description,
  justifyContent,
}: Props) {
  const scrollToEnd = useRef<HTMLDivElement>(null);

  const { issm, isxs, isxl } = useMuiBreakpoints();
  const { PopUpComponent, handleOpen, open } = useGPopup();
  const { activeStep } = useSignUpStore();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      style={{
        width: "100%",
        height: "auto",
        padding: "15px",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "15px",
        }}
      >
        <PrimarySignInUPTypography
          sx={{
            color: theme.palette.signInUpPrimary.main,
            fontSize: {
              xs: "18px", // small screens
              sm: "20px", // medium screens
              md: "25px", // larger screens
              lg: "30px", // extra-large screens
            },
            "@media (min-width: 2120px)": {
              fontSize: "60px",
            },
          }}
        >
          {title
            ? title
            : isWorkflowModal
            ? `${translate("signUp.CREATE_WORKSPACE")}`
            : `${translate("signUp.APITRAIL_ONBOARDING")}`}
        </PrimarySignInUPTypography>
        {description && (
          <SecondarySignInUPTypography
            sx={{
              color: theme.palette.sigInUpStepperTextSecondary.main,
              marginTop: 1,
              fontSize: "14px",
              "@media (min-width: 2120px)": {
                fontSize: "20px",
              },
            }}
          >
            {description}
          </SecondarySignInUPTypography>
        )}
      </Stack>
      <PopUpComponent height="86%" />

      <Box
        ref={scrollToEnd}
        sx={{
          height: isxs ? "auto" : description ? "65vh" : "70vh",

          overflowY: isxs ? "hidden" : "auto",
          background: theme.palette.signInUpBackground.main,
          borderRadius: "10px",
          scrollBehavior: "smooth",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "@media (max-width: 1250px)": {
            height: description ? "63vh" : "66vh",
          },
          "@media (max-width: 1220px)": {
            height: description ? "60vh" : "65vh",
          },
          "@media (max-width: 950px)": {
            height: description ? "55vh" : "62vh",
          },
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            padding: "15px",
            height: issm ? "auto" : height || "auto",
            ...(justifyContent && {
              display: "flex",
              justifyContent: justifyContent,
              alignItems: "center",
            }),
          }}
          columnSpacing={columnSpacing}
        >
          {children}
        </Grid>
        {(showNextButton || showBackButton) && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: additionalButton
                ? { xs: "space-between", sm: "space-between", md: "center" }
                : showNextButton && showBackButton
                ? "space-between"
                : "flex-end",
              padding: "0px 15px",
              position: "relative",
              marginTop: "-17px",
            }}
          >
            {[
              {
                name: `${translate("button.BACK")}`,
                onClick: handleBack,
                isVisible: showBackButton,
                isDisabled:
                  (isWorkflowModal && activeStep == 2) ||
                  (!isWorkflowModal && activeStep == 3),
              },
              {
                name:
                  typeof showNextButton == "string"
                    ? showNextButton
                    : `${translate("button.NEXT")}`,
                onClick: handleNext,
                isVisible: showNextButton,
                isDisabled: false,
              },
            ].map((elem: any, index: number) => {
              if (elem?.isVisible) {
                return (
                  <GlobalButton
                    disabled={elem.isDisabled}
                    key={index}
                    label={elem?.name}
                    iconPosition="end"
                    background={
                      elem?.name == "Back"
                        ? "transparent"
                        : theme.palette.sigInUpStepperIconActive.main
                    }
                    border={
                      elem?.name == "Back"
                        ? `1.5px solid ${theme.palette.sigInUpStepperTextPrimary.main}`
                        : "none"
                    }
                    color={theme.palette.signInUpPrimary.main}
                    fontWeight={500}
                    type={"button"}
                    onClickHandler={elem?.onClick}
                    radius={"9px"}
                    padding="8px 35px"
                    fontSize="15px"
                  />
                );
              }
            })}
            {additionalButton && (
              <GlobalButton
                padding="5px 15px"
                label={additionalButtonLabel}
                iconPosition="end"
                background={theme.palette.sigInUpButtonPrimary.main}
                border={`1px solid ${theme.palette.sigInUpButtonBorder.main}`}
                color={theme.palette.signInUpPrimary.main}
                fontWeight={500}
                type={"button"}
                onClickHandler={additionalButtonOnClick}
                sx={{
                  position: { xs: "static", sm: "static", md: "absolute" },
                  right: { xs: "unset", sm: "unset", md: 20 },
                }}
                icon={<KeyboardArrowRight sx={{ fontSize: "18px" }} />}
              />
            )}
          </Box>
        )}
      </Box>
    </form>
  );
}
