import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { color, styled } from "@mui/system";
import { InfoIcon } from "@/app/Assests/icons";
import { Info } from "@mui/icons-material";

// Styled Typography
const TitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-Regular",
  color: theme.palette.text.apiBackgroundTextCardColor, // Using theme color
  fontSize: "12px",
  fontWeight: 600,
}));

const DataTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "FiraSans-Regular",
  color: theme.palette.text.apiBackgroundTextCardColor, // Using theme secondary text color
  fontSize: "12px",
}));
const dataBoxStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "10px",

  borderRadius: "5px",
};

// Component
function BackgroundUrlsAccordion(props: { backgroundUrlData: any[] }) {
  const { backgroundUrlData } = props;
  const theme = useTheme();

  return (
    <Box>
      {backgroundUrlData.length === 0 ? (
        <Typography
          sx={{
            color: theme.palette.apiBackgroundTextCardColor.main,
            textAlign: "center",
            padding: "20px",
          }}
        >
          There is no data available.
        </Typography>
      ) : (
        backgroundUrlData.map((val, index) => (
          <Accordion
            key={index}
            sx={{
              color: theme.palette.apiBackgroundTextCardColor.main,
              marginBottom: "10px",
              background: "transparent",
            }}
          >
            {/* Accordion Summary (Title as Background URL) */}
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{ color: theme.palette.apiBackgroundTextCardColor.main }}
                />
              }
            >
              <TitleTypography>
                <Info
                  style={{
                    color: theme.palette.apiBackgroundTextCardColor.main,
                  }}
                />{" "}
                {val?.background_url && val?.background_url !== "null"
                  ? val.background_url
                  : "No URL Available"}
              </TitleTypography>
            </AccordionSummary>

            {/* Accordion Details (All Other Fields) */}
            <AccordionDetails>
              <Box sx={{ ...dataBoxStyle }}>
                <DataTypography>
                  <strong>Type:</strong> {val?.type || "-"}
                </DataTypography>
                <DataTypography>
                  <strong>Method:</strong> {val?.method || "-"}
                </DataTypography>
                <DataTypography>
                  <strong>Region:</strong> {val?.region || "-"}
                </DataTypography>
                <DataTypography>
                  <strong>API Type:</strong> {val?.api_type || "-"}
                </DataTypography>
                <DataTypography>
                  <strong>Function Name:</strong> {val?.function_name || "-"}
                </DataTypography>
                <DataTypography>
                  <strong>Connection Type:</strong>{" "}
                  {val?.connection_type || "-"}
                </DataTypography>
                <DataTypography>
                  <strong>Updated At:</strong> {val?.updated_at || "-"}
                </DataTypography>
                <DataTypography>
                  <strong>Created At:</strong> {val?.created_at || "-"}
                </DataTypography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
}

export default BackgroundUrlsAccordion;
