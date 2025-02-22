import { SuccessSignUp } from "@/app/Assests/icons";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
} from "@/app/Styles/signInUp";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import GlobalButton from "../../global/GButton";
import Cookies from "js-cookie";
import theme from "@/Theme/theme";
import { translate } from "@/app/Helpers/helpersFunctions";

export default function CompletedSection({ clientSession }: any) {
  const router = useRouter();
  const { resetAllSignStoreData } = useSignUpStore();
  const handleSubmit = () => {
    if (clientSession) {
      router.push("/userId/" + clientSession?.user?.user_id);
      Cookies.remove(clientSession?.user?.user_id);
      resetAllSignStoreData();
    }
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
          color: theme.palette.signInUpPrimary.main,
          fontSize: { xs: "20px", md: "20px" },
          textAlign: "center",
          "@media (min-width: 2120px)": {
            fontSize: "60px",
          },
        }}
      >
        {translate("signUp.SUCCESSFULL")}
      </PrimarySignInUPTypography>
      <SecondarySignInUPTypography
        sx={{
          color: theme.palette.sigInUpStepperTextSecondary.main,
          marginTop: 1,
          textAlign: "center",
          "@media (min-width: 2120px)": {
            fontSize: "30px",
          },
        }}
      >
        {translate("signUp.SUCCESS_DESC")}
      </SecondarySignInUPTypography>
      <GlobalButton
        className="bigButton"
        padding="10px 40px"
        label={`${translate("button.GO_TO_DASHBOARD")}`}
        iconPosition="end"
        background={theme.palette.sigInUpStepperIconActive.main}
        color={theme.palette.signInUpPrimary.main}
        fontSize={"15px"}
        margin="30px 0 0 0"
        fontWeight={500}
        onClickHandler={handleSubmit}
        fontFamily="Firasans-medium !important"
        radius="10px"
      />
    </Stack>
  );
}
