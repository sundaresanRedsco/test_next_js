import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Stack } from "@mui/material";
import { PrimarySignInUPTypography } from "@/app/Styles/signInUp";
import { KeyboardArrowRight } from "@mui/icons-material";
import GlobalButton from "../global/GButton";
import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import useGPopup from "@/app/hooks/useGPopup";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";

type Props = {
  children: any;
  showNextButton?: boolean;
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
}: Props) {
  const scrollToEnd = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (scrollToEnd && scrollToEnd.current) {
  //     scrollToEnd.current.scrollTop = scrollToEnd.current.scrollHeight;
  //   }
  // }, [showNextButton, showBackButton]);
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
            color: "white",
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
          {isWorkflowModal ? "Create Workspace" : " API Flow Onboarding"}
        </PrimarySignInUPTypography>
      </Stack>
      <PopUpComponent height="86%" />

      <div
        ref={scrollToEnd}
        style={{
          height: isxs ? "auto" : "70vh",
          // height: isxs ? "auto" : isWorkflowModal ? "520px" : "400px",
          overflowY: isxs ? "hidden" : "auto",
          background: "#12121280",
          borderRadius: "10px",
          scrollBehavior: "smooth",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            padding: "15px",
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
                name: "Back",
                onClick: handleBack,
                isVisible: showBackButton,
                isDisabled:
                  (isWorkflowModal && activeStep == 2) ||
                  (!isWorkflowModal && (activeStep == 3 || activeStep == 1)),
              },
              {
                name: "Next",
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
                    // padding="4px 35px"
                    label={elem?.name}
                    iconPosition="end"
                    background={
                      elem?.name == "Back" ? "transparent" : "#7A43FE"
                    }
                    border={
                      elem?.name == "Back" ? "1.5px solid #FFFFFF80" : "none"
                    }
                    color="white"
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
                background={"#37265C"}
                border={"1px solid #F3F3F340"}
                color="white"
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
      </div>
    </form>
  );
}
