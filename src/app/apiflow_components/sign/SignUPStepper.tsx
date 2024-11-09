import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { DoneRounded } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import { ActiveStepperBar, StepperBar } from "@/app/Assests/icons";
import { minHeight } from "@mui/system";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";

type Props = {
  steps: any;
  variant?: "slider";
};
const defaultStyle = (isActive: boolean) => {
  return {
    "&.MuiStepper-root ": {
      width: "100% ",
    },
    "& .MuiStepConnector-root": {
      margin: "0px 10px",
    },
    "& .MuiStepConnector-line": {
      borderWidth: "1px",
      borderColor: "#4F4F4F80",
      marginRight: { xl: 0, lg: 0, md: 0, sm: 0, xs: "30px" },
      minHeight: "17px",
    },
    "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
      borderColor: "#4F4F4F80",
    },
    // "& .Mui-active": {
    //   fontWeight: isActive ? "bold" : "",
    //   transition: ".6s",
    // },
    "& .MuiStepLabel-label.Mui-active": {
      color: isActive ? "white" : "#FFFFFF80",
    },
    marginTop: { sm: 7, md: 0, lg: 10 },
  };
};
const smallScreenStyle = (isSlider: boolean) => {
  return {
    width: "100%",
    "& .MuiStepConnector-root": {
      margin: "auto",
    },
    "& .MuiStepConnector-line": {
      borderWidth: isSlider ? 0 : "3px",
      borderColor: "#4F4F4F80",
      width: "100%",
      // borderColor: activeStep > 0 ? "#015578" : "",
      marginRight: isSlider ? 0 : "30px",
    },
    "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
      borderColor: "#4F4F4F80",
    },
    "& .Mui-active": {
      fontWeight: "bold",
      transition: ".6s",
    },

    "& .MuiStepLabel-label.Mui-active": {
      color: "white",
    },
  };
};
const defaultButtonStyle = (activeStep: number, index: number) => {
  return {
    "& .MuiStepLabel-label": {
      color: activeStep >= index ? "white" : "#FFFFFF80",
      fontFamily: activeStep == index ? "FiraSans-medium" : "FiraSans-regular",
      fontSize: "12px",
    },
    "& .MuiStepLabel-root": {
      width: "100%",
    },
  };
};
const smallScreenButtonStyle = (activeStep: number, index: number) => {
  return {
    "& .MuiStepLabel-label": {
      color: activeStep == index ? "white" : "#FFFFFF80",
      fontFamily: "FiraSans !important",
      fontSize: "12px",
    },
    "& .MuiStepLabel-iconContainer": {
      paddingRight: 0,
      marginLeft: "30px",
    },
    padding: 0,
  };
};
export default function SignUPStepper({ steps, variant }: Props) {
  const StepperIcon = ({ isActive, icon, isCompleted }: any) => {
    return (
      <>
        {variant == "slider" ? (
          isCompleted || isActive ? (
            <ActiveStepperBar />
          ) : (
            <StepperBar />
          )
        ) : (
          <Box
            sx={{
              color: isActive || isCompleted ? "white" : "#9A9A9A",
              background: isCompleted
                ? "#287444"
                : isActive
                ? "#7A43FE"
                : "#343434",
              padding: "5px",
              height: "20px",
              width: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            {isCompleted ? <DoneRounded sx={{ fontSize: "15px" }} /> : icon}
          </Box>
        )}
      </>
    );
  };
  const { activeStep, formDataStore } = useSignUpStore();

  const theme = useTheme();
  const isxs = useMediaQuery(theme.breakpoints.only("xs"));
  const showLabel = variant != "slider" && !isxs;
  const isActive = formDataStore?.currentPage != "Login";
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        marginTop: { xs: 2, sm: 0 },
      }}
    >
      <Stepper
        orientation={isxs || variant == "slider" ? "horizontal" : "vertical"}
        sx={
          isxs || variant == "slider"
            ? smallScreenStyle(variant == "slider")
            : defaultStyle(isActive)
        }
        nonLinear
        // activeStep={activeStep}
      >
        {steps.map((elem: any, index: number) => (
          <Step key={index}>
            <StepButton
              sx={
                isxs
                  ? smallScreenButtonStyle(activeStep, index)
                  : defaultButtonStyle(activeStep, index)
              }
              icon={
                <StepperIcon
                  icon={elem.icon}
                  isActive={activeStep == index && isActive}
                  isCompleted={index < activeStep}
                />
              }
              // onClick={handleStep(index)}
            >
              {/* {showLabel && elem?.label} */}
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {showLabel && elem?.label}
                <span
                  style={{
                    fontSize: "8px",
                    position: "absolute",
                    bottom: -11,
                    width: "100%",
                    color:
                      activeStep == index && isActive ? "#F3F3F3" : "#F3F3F380",
                    fontWeight: 400,
                    fontFamily: "FiraSans-regular",
                  }}
                >
                  {showLabel && elem?.description}
                </span>
              </span>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
