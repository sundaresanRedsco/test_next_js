import { SuccessSignUp } from "@/app/Assests/icons";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import GlobalButton from "../../global/GButton";
import { removeItem } from "@/app/Services/localstorage";
import toast from "react-hot-toast";

export default function CompletedSection({ clientSession }: any) {
  const router = useRouter();
  const { resetApiData, resetForm, setactiveStep } = useSignUpStore();
  const handleSubmit = () => {
    router.push("/userId/" + clientSession?.user?.workspace_id);
    resetApiData();
    resetForm();
    removeItem(`userId/${clientSession?.user?.user_id}`);
    setTimeout(() => {
      toast.success("Scan started");
    }, 3000);
    setTimeout(() => {
      toast.success("Scan ended");
    }, 15000);
  };
  return (
    <Stack
      sx={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <SuccessSignUp />
      <PrimarySignInUPTypography
        sx={{
          color: "white",
          fontSize: { xs: "20px", md: "20px" },
          textAlign: "center",
        }}
      >
        Successful
      </PrimarySignInUPTypography>
      <SecondarySignInUPTypography
        sx={{
          color: "#F3F3F3BF",
          marginTop: 1,
          textAlign: "center",
        }}
      >
        Your account has successfully created, Now Re-directing to application
      </SecondarySignInUPTypography>
      <GlobalButton
        padding="10px 40px"
        label={"Go to Dashboard"}
        iconPosition="end"
        background={"#7A43FE"}
        color="white"
        fontSize="15px"
        margin="30px 0 0 0"
        fontWeight={500}
        onClickHandler={handleSubmit}
        fontFamily="Firasans-medium !important"
        radius="10px"
      />
    </Stack>
  );
}
