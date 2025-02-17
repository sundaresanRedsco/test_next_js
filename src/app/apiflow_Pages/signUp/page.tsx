"use client";
import CompletedSection from "@/app/apiflow_components/sign/completedSection";
import Discovery from "@/app/apiflow_components/sign/discovery";
import InvitedUsers from "@/app/apiflow_components/sign/inviteUsers";
import OnBoardLayout from "@/app/apiflow_components/sign/OnBoardLayout";
import Resources from "@/app/apiflow_components/sign/resources";
import WelcomePage from "@/app/apiflow_components/sign/Welcome-page";
import Workspace from "@/app/apiflow_components/sign/Workspace";
import {
  CatalogSvg,
  DiscoverySvg,
  InvitedUsersSvg,
  UserSvg,
  WorkspaceSvg,
} from "@/app/Assests/icons";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useSignIn from "@/app/hooks/sign/useSignIn";
import SignUp from "@/app/apiflow_components/sign/sign-up";
import theme from "@/Theme/theme";
import { translate } from "@/app/Helpers/helpersFunctions";

export default function SignUpPage() {
  const clientSession = useSession();
  const { activeStep, formDataStore, resetApiData, resetForm, setIsLoading } =
    useSignUpStore();
  const { CLIENT_ID } = useSignIn();
  const [completed, setCompleted] = React.useState({});
  const [isClient, setisClient] = useState(false);

  const steps = [
    {
      id: 1,
      label: `${translate("signUp.SIGNUP")}`,
      icon: (
        <UserSvg
          color={
            activeStep == 0
              ? theme.palette.signInUpPrimary.main
              : theme.palette.sigInUpStepperTextDefault.main
          }
        />
      ),
      description: `${translate("signUp.SIGNUP_DESCRIPTION")}`,
    },
    {
      id: 2,
      label: `${translate("signUp.WORKSPACE")}`,
      icon: (
        <WorkspaceSvg
          color={
            activeStep == 1
              ? theme.palette.signInUpPrimary.main
              : theme.palette.sigInUpStepperTextDefault.main
          }
        />
      ),
      description: `${translate("signUp.WORKSPACE")}`,
    },
    {
      id: 3,
      label: `${translate("signUp.DISCOVERY")}`,
      icon: (
        <DiscoverySvg
          color={
            activeStep == 2
              ? theme.palette.signInUpPrimary.main
              : theme.palette.sigInUpStepperTextDefault.main
          }
        />
      ),
      description: `${translate("signUp.DISCOVERY_DESCRIPTION")}`,
    },
    {
      id: 4,
      label: `${translate("signUp.RESOURCES")}`,
      icon: (
        <CatalogSvg
          color={
            activeStep == 3
              ? theme.palette.signInUpPrimary.main
              : theme.palette.sigInUpStepperTextDefault.main
          }
        />
      ),
      description: `${translate("signUp.RESOURCES_DESCRIPTION")}`,
    },
    {
      id: 5,
      label: `${translate("signUp.INVITE_USERS")}`,
      icon: (
        <InvitedUsersSvg
          color={
            activeStep == 4
              ? theme.palette.signInUpPrimary.main
              : theme.palette.sigInUpStepperTextDefault.main
          }
        />
      ),
      description: `${translate("signUp.INVITE_USERS_DESCRIPTION")}`,
    },
  ];

  useEffect(() => {
    setIsLoading(false);
    setisClient(true);
  }, []);

  useEffect(() => {
    if (formDataStore?.currentPage == "Login") {
      resetApiData();
      resetForm();
    }
  }, [formDataStore?.currentPage]);

  const Wrapper =
    // activeStep == -1 ? "div" :
    OnBoardLayout;
  const commonProps =
    // activeStep === -1
    //   ? {}
    //   :
    {
      steps,
    };
  const renderComponent = () => {
    {
      switch (activeStep) {
        case 0:
          return (
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <SignUp />
              {/* {formDataStore?.currentPage == "Login" ? (
                <SignIn clientSession={clientSession} />
              ) : (
                <SignUp />
              )} */}
            </GoogleOAuthProvider>
          );

        case 1:
          return <Workspace clientSession={clientSession} />;
        case 2:
          return <Discovery clientSession={clientSession} />;
        case 3:
          return <Resources clientSession={clientSession} />;
        case 4:
          return <InvitedUsers clientSession={clientSession} />;
        case 5:
          return <CompletedSection clientSession={clientSession?.data} />;
        default:
          return (
            isClient && (
              <GoogleOAuthProvider clientId={CLIENT_ID}>
                <SignUp />
              </GoogleOAuthProvider>
            )
          );
      }
    }
  };
  return <Wrapper {...(commonProps as any)}>{renderComponent()}</Wrapper>;
}
