import { Box, Modal } from "@mui/material";
import React, { useEffect } from "react";
import {
  CatalogSvg,
  DiscoverySvg,
  InvitedUsersSvg,
  WorkspaceSvg,
} from "@/app/Assests/icons";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import { useSession } from "next-auth/react";
import OnBoardLayout from "../sign/OnBoardLayout";
import Workspace from "../sign/Workspace";
import Discovery from "../sign/discovery";
import Resources from "../sign/resources";
import InvitedUsers from "../sign/inviteUsers";
import GIconButton from "../global/GIconButton";
import { Close } from "@mui/icons-material";

type Props = {
  height?: string;
  width?: string;
};

export default function CreateWorkflowModal({ height, width }: Props) {
  const { setOpenSignUp, openSignUp }: any = useSignUpStore();
  const clientSession = useSession();
  const {
    activeStep,
    setFormDataStore,
    resetApiData,
    resetForm,
    setactiveStep,
    isLoading,
    isImportAws,
  } = useSignUpStore();

  const [completed, setCompleted] = React.useState({});
  const steps = isImportAws
    ? [
        {
          id: 1,
          label: "Discovery",
          icon: <DiscoverySvg color={activeStep == 1 ? "white" : "#9A9A9A"} />,
          description: "Discover your API",
        },
        {
          id: 2,
          label: "Resources Catalog",
          icon: <CatalogSvg color={activeStep == 2 ? "white" : "#9A9A9A"} />,
          description: "Catalog API",
        },
        {
          id: 3,
          label: "Invite Users",
          icon: (
            <InvitedUsersSvg color={activeStep == 3 ? "white" : "#9A9A9A"} />
          ),
          description: "Manage your team",
        },
      ]
    : [
        {
          id: 0,
          label: "Workspace",
          icon: <WorkspaceSvg color={activeStep == 0 ? "white" : "#9A9A9A"} />,
          description: "Create workspace",
        },
        {
          id: 1,
          label: "Discovery",
          icon: <DiscoverySvg color={activeStep == 1 ? "white" : "#9A9A9A"} />,
          description: "Discover your API",
        },
        {
          id: 2,
          label: "Resources Catalog",
          icon: <CatalogSvg color={activeStep == 2 ? "white" : "#9A9A9A"} />,
          description: "Catalog API",
        },
        {
          id: 3,
          label: "Invite Users",
          icon: (
            <InvitedUsersSvg color={activeStep == 3 ? "white" : "#9A9A9A"} />
          ),
          description: "Manage your team",
        },
      ];
  const handleFormDatas = (key: string, value: any) => {
    setFormDataStore(key, value);
  };
  useEffect(() => {
    setactiveStep(0);
    handleFormDatas("currentPage", "Sign Up");
  }, [openSignUp]);
  useEffect(() => {
    if (activeStep > 3) {
      setOpenSignUp(false);
      resetApiData();
      resetForm();
      setactiveStep(0);
    }
  }, [activeStep, openSignUp]);

  //form functionalities

  const Wrapper = activeStep == -1 ? "div" : OnBoardLayout;
  const commonProps = {
    steps,
    completed,
    isWorkflowModal: true,
  };
  const renderComponent = () => {
    if (isImportAws) {
      switch (activeStep) {
        case 0:
          return (
            <Discovery clientSession={clientSession} isWorkflowModal={true} />
          );
        case 1:
          return (
            <Resources clientSession={clientSession} isWorkflowModal={true} />
          );
        case 2:
          return (
            <InvitedUsers
              clientSession={clientSession}
              isWorkflowModal={true}
            />
          );
      }
    } else {
      switch (activeStep) {
        case 0:
          return (
            <Workspace clientSession={clientSession} isWorkflowModal={true} />
          );
        case 1:
          return (
            <Discovery clientSession={clientSession} isWorkflowModal={true} />
          );
        case 2:
          return (
            <Resources clientSession={clientSession} isWorkflowModal={true} />
          );
        case 3:
          return (
            <InvitedUsers
              clientSession={clientSession}
              isWorkflowModal={true}
            />
          );
      }
    }
  };

  return (
    <Modal
      onClose={
        isLoading
          ? undefined
          : () => {
              setOpenSignUp(false);
            }
      }
      open={openSignUp}
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <Box
        sx={{
          width: "80%",
          outline: "none",
          height: "80vh",
          borderRadius: "20px",
          boxShadow: "0 0 1px gray",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <GIconButton
          icon={<Close />}
          onClick={() => {
            setOpenSignUp(false);
          }}
          customStyle={{ position: "absolute", top: 5, right: 10, zIndex: 1 }}
        />
        <Wrapper {...(commonProps as any)}>{renderComponent()}</Wrapper>
      </Box>
    </Modal>
  );
}
