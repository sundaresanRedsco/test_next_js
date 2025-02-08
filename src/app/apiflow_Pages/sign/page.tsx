"use client";
import CompletedSection from "@/app/apiflow_components/sign/completedSection";
import Discovery from "@/app/apiflow_components/sign/discovery";
import InvitedUsers from "@/app/apiflow_components/sign/inviteUsers";
import OnBoardLayout from "@/app/apiflow_components/sign/OnBoardLayout";
import Resources from "@/app/apiflow_components/sign/resources";
import SignIn from "@/app/apiflow_components/sign/sign-in";
import SignUp from "@/app/apiflow_components/sign/sign-up";
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

export default function Sign() {
  const clientSession = useSession();
  const { activeStep, formDataStore, resetApiData, resetForm } =
    useSignUpStore();
  // console.log(clientSession);
  const { CLIENT_ID } = useSignIn();
  const [completed, setCompleted] = React.useState({});
  const [isClient, setisClient] = useState(false);
  // console.log({ apiDataStore, formDataStore });

  const steps = [
    {
      id: 1,
      label: "Signup",
      icon: <UserSvg color={activeStep == 0 ? "white" : "#9A9A9A"} />,
      description: "Provide an email and password",
    },
    {
      id: 2,
      label: "Workspace",
      icon: <WorkspaceSvg color={activeStep == 1 ? "white" : "#9A9A9A"} />,
      description: "Create workspace",
    },
    {
      id: 3,
      label: "Discovery",
      icon: <DiscoverySvg color={activeStep == 2 ? "white" : "#9A9A9A"} />,
      description: "Discover your API",
    },
    {
      id: 4,
      label: "Resources Catalog",
      icon: <CatalogSvg color={activeStep == 3 ? "white" : "#9A9A9A"} />,
      description: "Catalog API",
    },
    {
      id: 5,
      label: "Invite Users",
      icon: <InvitedUsersSvg color={activeStep == 4 ? "white" : "#9A9A9A"} />,
      description: "Manage your team",
    },
  ];

  useEffect(() => {
    setisClient(true);
  }, []);
  // useEffect(() => {
  //   if (activeStep > 0) {
  //     Cookies.set("isOnboarding", JSON.stringify(activeStep));
  //   } else {
  //     Cookies.remove("isOnboarding");
  //   }
  // }, [activeStep]);
  useEffect(() => {
    if (formDataStore?.currentPage == "Login") {
      resetApiData();
      resetForm();
    }
  }, [formDataStore?.currentPage]);

  const Wrapper = activeStep == -1 ? "div" : OnBoardLayout;
  const commonProps =
    activeStep === -1
      ? {}
      : {
          steps,
          completed,
        };
  const renderComponent = () => {
    {
      switch (activeStep) {
        case 0:
          return (
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              {formDataStore?.currentPage == "Login" ? (
                <SignIn clientSession={clientSession} />
              ) : (
                <SignUp />
              )}
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
          return isClient && <WelcomePage />;
      }
    }
  };
  return <Wrapper {...(commonProps as any)}>{renderComponent()}</Wrapper>;
}
