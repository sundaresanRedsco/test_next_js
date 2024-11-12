import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Logo from "../global/Logo";
import SignUPStepper from "./SignUPStepper";
import GToggleButton from "../global/GToggleButton";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import GLoader from "../global/GLoader";
import useSignIn from "@/app/hooks/sign/useSignIn";
import GlobalButton from "../global/GButton";
import { AlertProvider } from "@/context/alertContext";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";

type Props = {
  children: any;
  completed?: any;
  steps: any;
  isWorkflowModal?: boolean;
};

export default function OnBoardLayout({
  children,
  completed,
  steps,
  isWorkflowModal,
}: Props) {
  const { activeStep, handleBack, setFormDataStore, formDataStore } =
    useSignUpStore();
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setFormDataStore("currentPage", newAlignment);
  };
  const buttons = ["Login", "Sign Up"];
  const { isLoading } = useSignUpStore();
  const { issm, isxs } = useMuiBreakpoints();
  return (
    <AlertProvider>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: {
            xs: isWorkflowModal ? "100%" : "100vh",
            sm: "100vh",
            md: "100%",
          },
          width: "100%",
          position: "relative",
          overflowY: "auto",
          background: {
            xs: isWorkflowModal ? "#19181f" : "none",
          },
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            padding:
              issm || isxs || isWorkflowModal ? "0px !important" : "auto",
            height: isWorkflowModal ? "100%" : "auto",
          }}
          maxWidth={issm || isxs || isWorkflowModal ? "xl" : "lg"}
        >
          <Box
            sx={{
              background: {
                xs: "none",
                sm: isWorkflowModal ? "#19181f" : "#12121280",
              },
              borderRadius: "20px",
              height: activeStep == 0 && !isWorkflowModal ? "500px" : "auto",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: isWorkflowModal ? "100%" : "90%" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {isLoading && <GLoader />}

            <Box
              sx={{
                display: "flex",
                height: { xs: "auto", sm: "100%", md: "100%" },
                // width: { xs: "100%", sm: "300px", xl: "400px" },
                width: {
                  xs: "100%", // Full width on extra-small screens
                  sm: "250px", // Fixed width on small screens
                  md: "30%", // 30% width on medium screens
                  lg: "30%", // Adjusted width on large screens (e.g., 25%)
                  xl: "30%", // Optional width on extra-large screens if needed
                },

                position: "relative",
                justifyContent: { xs: "flex-start", sm: "space-between" },
                padding: {
                  xs: "24px 24px 0 24px",
                  sm: "24px 24px 0 24px",
                  md: 3,
                },
                background: { xs: "none", sm: "#121212BF" },
                borderRadius: "20px 0 0 20px",
                flexDirection: "column",
              }}
            >
              <Box
                component={"img"}
                src={"/sign/signup-styled-layer.png"}
                alt="Apiflow-signUp"
                style={{
                  top: 0,
                  left: 0,
                  position: "absolute",
                  width: "100%",
                }}
              />
              <Logo />
              <SignUPStepper steps={steps} />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: { xs: 2, sm: 0 },
                }}
              >
                {activeStep == 0 ? (
                  !isWorkflowModal && (
                    <GToggleButton
                      handleChange={handleChange}
                      alignment={formDataStore?.currentPage}
                      buttons={buttons}
                      customStyle={{
                        width: "160px",
                      }}
                    />
                  )
                ) : (
                  <GlobalButton
                    disabled={
                      isWorkflowModal
                        ? activeStep == 2
                        : activeStep == 3 || activeStep == 1
                    }
                    padding="5px 15px"
                    label={"Back to " + steps[activeStep - 1]?.label}
                    iconPosition="start"
                    background={"none"}
                    color="white"
                    fontWeight={500}
                    onClickHandler={handleBack}
                    icon={
                      <ArrowBackIosNewRounded
                        sx={{
                          fontSize: "12px",
                          color:
                            (isWorkflowModal && activeStep == 2) ||
                            (!isWorkflowModal &&
                              (activeStep == 3 || activeStep == 1))
                              ? "gray"
                              : "white",
                        }}
                      />
                    }
                  />
                )}
              </Box>
            </Box>
            <Box
              sx={{
                width: "inherit",
                height: "100%",
                padding: { xs: "10px", md: 0 },
              }}
            >
              {children}
            </Box>
          </Box>
          {!isWorkflowModal && (
            <Box
              sx={{
                width: "100%",
                height: "60px",
                position: "absolute",
                bottom: -70,
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "100%", // Full width on extra-small screens
                    sm: "250px", // Fixed width on small screens
                    md: "30%", // 30% width on medium screens
                    lg: "30%", // Adjusted width on large screens (e.g., 25%)
                    xl: "30%", // Optional width on extra-large screens if needed
                  },
                }}
              ></Box>
              <Box
                sx={{
                  width: "inherit",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <SignUPStepper steps={steps} variant="slider" />
                </Box>
              </Box>
            </Box>
          )}
        </Container>
      </Stack>
    </AlertProvider>
  );
}
