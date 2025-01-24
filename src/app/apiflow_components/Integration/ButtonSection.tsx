import React from "react";
import { SecondaryTypography } from "@/app/hooks/operations/useOperationHelpers";
import GDivider from "@/app/apiflow_components/global/GDivider";
import { Box } from "@mui/material";
import GButton from "@/app/apiflow_components/global/GButton";
import theme from "@/Theme/theme";

const ButtonSection = ({
  title,
  labels,
  activeButton,
  handleButtonClick,
  section,
}: any) => (
  <div>
    <SecondaryTypography style={{ marginTop: "1rem" }}>
      {title}
    </SecondaryTypography>

    <GDivider />

    <Box sx={{ marginTop: "0.8rem" }}>
      {labels?.map((label: any) => (
        <GButton
          key={label}
          label={label}
          padding="4px 20px"
          marginLeft="1rem"
          onClickHandler={() => handleButtonClick(section, label)}
          buttonType="primary"
          color={
            activeButton?.label === label
              ? `${theme.palette.primaryWhite.main}`
              : `${theme.palette.primaryBlack.main}`
          }
          background={activeButton?.label === label ? "#A855F7" : "#F1F5F9"}
        />
      ))}
    </Box>
  </div>
);

export default ButtonSection;
