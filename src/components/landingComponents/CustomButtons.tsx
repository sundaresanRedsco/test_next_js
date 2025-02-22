import { landingPageTranslate } from "@/helpers/helpersFunctions";
import { CustomButtonTypography } from "@/Styles/landingPage";
import theme from "@/Theme/theme";
import { Box, Button } from "@mui/material";

export const CustomButton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
        height: "100%",
        width: { xs: "100%", sm: "auto" },
        marginTop: { xs: 4, sm: 5, md: 6 },
        gap: 2,
        flexWrap: "wrap",
        "@media (max-width: 600px)": {
          flexDirection: "column",
          gap: 1.5,
        },
      }}
    >
      <Button
        variant="contained"
        sx={{
          background: `${theme.palette.landingStartWithFreeBtn.main} !important`,
          color: `${theme.palette.landingPrimary.main}`,
          fontWeight: "500",
          borderRadius: "15px",
          transition: "all 0.3s",
          padding: "12px 40px",
          border: "none",
          textTransform: "none",
          minWidth: "180px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomButtonTypography>
          {landingPageTranslate("START_WITH_FREE")}
        </CustomButtonTypography>
      </Button>
      <Button
        variant="contained"
        sx={{
          background: `${theme.palette.landingContactUsBtnBg.main} !important`,
          color: `${theme.palette.landingPrimary.main}`,
          fontWeight: "500",
          borderRadius: "15px",
          transition: "all 0.3s",
          padding: "12px 40px",
          border: `0.1px solid ${theme.palette.landingContactUsBtn.main}`,
          textTransform: "none",
          minWidth: "180px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomButtonTypography>
          {landingPageTranslate("CONTACT_US")}
        </CustomButtonTypography>
      </Button>
    </Box>
  );
};
