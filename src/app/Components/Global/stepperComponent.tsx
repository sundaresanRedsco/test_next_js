import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import theme from "../../../Theme/theme";

export default function StepperComponent(props: any) {
  const { steps, activeStep } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        sx={{
          "& .MuiStepIcon-root": {
            color: "#CBD5E1",
          },
          "& .MuiStepIcon-root.Mui-active": {
            color: theme.palette.primaryPurple.main,
          },
          "& .MuiStepIcon-root.Mui-completed": {
            color: theme.palette.primaryPurple.main,
          },

          "& .MuiStepConnector-root": {
            background: "#CBD5E1",
          },
          "& .MuiStepConnector-root.Mui-completed": {
            background: theme.palette.primaryPurple.main,
          },
        }}
        activeStep={activeStep}
      >
        {steps?.map((label: any, index: number) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    color: "#94A3B8",
                    fontFamily: "Inter-Regular",
                    fontWeight: "500",
                  },
                  "& .MuiStepLabel-label.Mui-active": {
                    color: theme.palette.primaryBlack.main,
                  },
                  "& .MuiStepLabel-label.Mui-completed": {
                    color: theme.palette.primaryBlack.main,
                  },
                }}
                {...labelProps}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
