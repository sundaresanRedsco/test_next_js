import { landingPageTranslate } from "@/helpers/helpersFunctions";
import { NavButtonTypography } from "@/Styles/landingPage";
import theme from "@/Theme/theme";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export const NavButtons = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
        justifyContent: "center",
        // width: "100%",
        // height: "100%",
        gap: 2,
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          width: "100%",
          gap: 1.5,
        },
        [theme.breakpoints.down("xs")]: {
          flexDirection: "column",
          width: "100%",
          gap: 1.5,
        },
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          width: "100%",
          gap: 1.5,
        },
      }}
    >
      <Button
        variant="contained"
        sx={{
          background: `${theme.palette.landingPrimary.main} !important`,
          color: `${theme.palette.landingLogInBtnText.main}`,
          borderRadius: "15px",
          transition: "all 0.3s",
          padding: "5px 20px",
          border: `0.5px solid ${theme.palette.landingPrimary.main}`,
          textTransform: "none",
          [theme.breakpoints.down("sm")]: {
            padding: "5px 20px",
            marginBottom: "10px",
          },
        }}
        onClick={() => {
          router.push("/signin");
        }}
      >
        <NavButtonTypography>
          {landingPageTranslate("LOG_IN")}
        </NavButtonTypography>
      </Button>
      <Button
        variant="contained"
        sx={{
          background: `transparent`,
          color: `${theme.palette.landingPrimary.main}`,
          borderRadius: "15px",
          transition: "all 0.3s",
          padding: "5px 20px",
          border: `0.5px solid ${theme.palette.landingPrimary.main}`,
          textTransform: "none",
          [theme.breakpoints.down("sm")]: {
            padding: "5px 18px",
            marginBottom: "10px",
          },
        }}
        onClick={() => {
          router.push("/signup");
        }}
      >
        <NavButtonTypography>
          {landingPageTranslate("SIGN_UP")}
        </NavButtonTypography>
      </Button>
    </Box>
  );
};
