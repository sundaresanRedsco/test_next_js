import { Box } from "@mui/material";
import { InfoNew, SettingNew } from "@/app/Assests/icons";
import { SecondaryTextTypography } from "@/app/Styles/signInUp";

export const BottomBar = (props: any) => {
  const { title, onClickHandler } = props;
  return (
    <>
      <Box
        sx={{
          marginTop: "auto",
          background: "#302835",
          padding: "10px 0px",
        }}
        className="d-flex align-items-center  justify-content-center"
      >
        <SettingNew />
        <SecondaryTextTypography
          style={{
            color: "#FFFFFF",
            marginLeft: "5px",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={onClickHandler}
        >
          {title}
        </SecondaryTextTypography>
      </Box>
    </>
  );
};
