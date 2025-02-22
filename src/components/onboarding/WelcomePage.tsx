"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { globalTranslate } from "@/helpers/helpersFunctions";
import theme from "@/theme/theme";
import { useSignUpStore } from "@/store/useSignUpStore";
import OnBoardLayout from "@/layouts/OnboardLayout";
import OnboardingButton from "./OnboardingButton";
import Workspace from "./Workspace";
import Discovery from "./discovery";
import Resources from "./resources";
import InvitedUsers from "./inviteUsers";
import CompletedSection from "./completedSection";
import SignUpSvg from "@/assests/svgs/onboard/SignUpSvg";
import WorkspaceSvg from "@/assests/svgs/onboard/WorkspaceSvg";
import DiscoverySvg from "@/assests/svgs/onboard/DiscoverySvg";
import CatalogSvg from "@/assests/svgs/onboard/CatalogSvg";
import InviteUsersSvg from "@/assests/svgs/onboard/InviteUsersSvg";
import { Stack } from "@mui/material";

export default function WelcomePage() {
  const clientSession = useSession();
  const { activeStep, formDataStore, setIsLoading, setactiveStep } =
    useSignUpStore();
  const [completed, setCompleted] = React.useState({});
  const [isClient, setisClient] = useState(false);

  const steps = [
    {
      id: 1,
      label: `${globalTranslate("signUp.SIGNUP", "onboardingConstants")}`,
      icon: (
        <SignUpSvg
          color={
            activeStep == 0
              ? theme.apiTrail.onboarding.Primary
              : theme.apiTrail.onboarding.StepperTextDefault
          }
        />
      ),
      description: `${globalTranslate(
        "signUp.SIGNUP_DESCRIPTION",
        "onboardingConstants"
      )}`,
    },
    {
      id: 2,
      label: `${globalTranslate("signUp.WORKSPACE", "onboardingConstants")}`,
      icon: (
        <WorkspaceSvg
          color={
            activeStep == 1
              ? theme.apiTrail.onboarding.Primary
              : theme.apiTrail.onboarding.StepperTextDefault
          }
        />
      ),
      description: `${globalTranslate(
        "signUp.WORKSPACE",
        "onboardingConstants"
      )}`,
    },
    {
      id: 3,
      label: `${globalTranslate("signUp.DISCOVERY", "onboardingConstants")}`,
      icon: (
        <DiscoverySvg
          color={
            activeStep == 2
              ? theme.apiTrail.onboarding.Primary
              : theme.apiTrail.onboarding.StepperTextDefault
          }
        />
      ),
      description: `${globalTranslate(
        "signUp.DISCOVERY_DESCRIPTION",
        "onboardingConstants"
      )}`,
    },
    {
      id: 4,
      label: `${globalTranslate("signUp.RESOURCES", "onboardingConstants")}`,
      icon: (
        <CatalogSvg
          color={
            activeStep == 3
              ? theme.apiTrail.onboarding.Primary
              : theme.apiTrail.onboarding.StepperTextDefault
          }
        />
      ),
      description: `${globalTranslate(
        "signUp.RESOURCES_DESCRIPTION",
        "onboardingConstants"
      )}`,
    },
    {
      id: 5,
      label: `${globalTranslate("signUp.INVITE_USERS", "onboardingConstants")}`,
      icon: (
        <InviteUsersSvg
          color={
            activeStep == 4
              ? theme.apiTrail.onboarding.Primary
              : theme.apiTrail.onboarding.StepperTextDefault
          }
        />
      ),
      description: `${globalTranslate(
        "signUp.INVITE_USERS_DESCRIPTION",
        "onboardingConstants"
      )}`,
    },
  ];

  useEffect(() => {
    setIsLoading(false);
    setisClient(true);
  }, []);

  const Wrapper = activeStep == 0 ? "div" : OnBoardLayout;
  const commonProps =
    activeStep === 0
      ? {}
      : {
          steps,
        };
  const renderComponent = () => {
    {
      switch (activeStep) {
        case 0:
          return (
            <Stack
              sx={{
                width: "100%",
                height: "90vh",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <OnboardingButton onClick={() => setactiveStep(1)} text="next" />
            </Stack>
          );

        // case 1:
        //   return <Workspace clientSession={clientSession} />;
        // case 2:
        //   return <Discovery clientSession={clientSession} />;
        // case 3:
        //   return <Resources clientSession={clientSession} />;
        // case 4:
        //   return <InvitedUsers clientSession={clientSession} />;
        // case 5:
        //   return <CompletedSection clientSession={clientSession?.data} />;
        default:
          return <OnboardingButton text="next" />;
      }
    }
  };
  return <Wrapper {...(commonProps as any)}>{renderComponent()}</Wrapper>;
}
