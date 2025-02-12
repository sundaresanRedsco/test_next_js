import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import dynamic from "next/dynamic";

const CreateWorkflowModal = dynamic(() => import("./CreateWorkflowModal"), {
  ssr: false,
});

// Styled TextTypography component
const TextTypography = styled(Typography)`
  font-family: "FiraSans-regular" !important;
  color: ${({ theme }) => theme.palette.textPrimaryColor.main};
  font-size: 1.2rem;
  margin-top: 0.7rem;
`;

function WorkspaceCreateCard() {
  const { handleOpenSignUp }: any = useSignUpStore();

  return (
    <Card
      sx={{
        backgroundColor: "#12121280",
        color: "#fff",
        borderRadius: "30px",
        width: "100%",
        boxShadow: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px", // Optional: Adjust padding if needed
        flexDirection: "column", // Change layout to column
        minHeight: "280px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Box
            onClick={() => handleOpenSignUp()}
            sx={{
              height: "3rem",
              width: "3rem",
              borderRadius: "50%",
              backgroundColor: "#7A43FE",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "0.5rem",
              cursor: "pointer",
            }}
          >
            <TextTypography
              sx={{
                fontSize: "2rem",
                margin: 0,
              }}
            >
              +
            </TextTypography>
          </Box>

          <TextTypography>Create New Workspace</TextTypography>
        </Box>
      </CardContent>
      <CreateWorkflowModal />
    </Card>
  );
}

export default WorkspaceCreateCard;
