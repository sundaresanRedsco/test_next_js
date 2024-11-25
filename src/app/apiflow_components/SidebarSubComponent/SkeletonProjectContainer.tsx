import React from "react";
import Accordion from "@mui/material/Accordion";
import { accordionCollectionStyles } from "./ProjectsComponet";
import { AccordionDetails, AccordionSummary, Box } from "@mui/material";
import GSkeletonLoader from "@/app/ApiFlowComponents/Global/GSkeletonLoader";
import theme from "@/Theme/theme";
import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SkeletonLoader } from "./workspaceSideComponents/FlowTree";

export default function SkeletonProjectContainer() {
  return [1]?.map((accordion, index) => (
    <div key={index}>
      <Accordion
        sx={accordionCollectionStyles}
        expanded={true} // Only one can be open
      >
        <AccordionSummary
          sx={{
            padding: "0px 10px",
            alignItems: "center",
            height: "45px",
            "&.Mui-expanded": {
              minHeight: "34px",
              // marginTop: "10px",
            },
            "& .MuiAccordionSummary-content": {
              margin: "0",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiAccordionSummary-content.Mui-expanded": {
              margin: "0px",
            },
            background: theme.palette.sidebarMainBackground.main,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              margin: "0px 0px",
              position: "relative",
              width: "100%",
            }}
          >
            <GSkeletonLoader secondary={true} open={true} />
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            width: "100%",
            "&.MuiAccordionDetails-root": {
              padding: "0px !important",
            },
            "& .MuiButtonBase-root": {
              paddingLeft: 4,
            },
            "& .MuiPaper-root": {
              margin: 0,
              position: "relative",
            },
          }}
        >
          <ProjectTreeSkeleton />
        </AccordionDetails>
      </Accordion>
      <hr
        style={{
          color: "white",
          border: "-10px solid white",
          margin: "10px",
        }}
      />
    </div>
  ));
}

export const ProjectTreeSkeleton = ({ isEndpoint }: any) => {
  return (
    <Accordion
      sx={{
        boxShadow: "none",
        "&::before": {
          display: "none",
        },
        margin: "0px !important",
      }}
      expanded={true}
    >
      <AccordionSummary
        sx={{
          minHeight: "34px",
          "&.Mui-expanded": {
            minHeight: "34px",
          },
          "& .MuiAccordionSummary-content": {
            margin: "0",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: "0px",
          },
          background: theme.palette.sidebarMainBackground.main,
        }}
      >
        <GSkeletonLoader
          secondary={true}
          open={true}
          width="80%"
          height={"22px"}
        />
      </AccordionSummary>
      <AccordionDetails
        sx={{
          width: "100%",
          "&.MuiAccordionDetails-root": {
            padding: "0px !important",
          },
          "& .MuiButtonBase-root": {
            paddingLeft: 3,
            paddingRight: 0,
          },
          "& .MuiPaper-root": {
            borderRadius: "0px !important",
          },
        }}
      >
        <EnvTreeSkeleton isEndpoint={isEndpoint} />
      </AccordionDetails>
    </Accordion>
  );
};
const EnvTreeSkeleton = ({ isEndpoint }: any) => {
  return ["WorkFlows", "Endpoints"].map((elem, index) => {
    return (
      <Accordion
        sx={{
          background: theme.palette.sidebarMainBackground.main,
          color: "white",
          boxShadow: "none",
          // marginTop: "10px",
          margin: "0px !important",
        }}
        expanded={true}
      >
        {!isEndpoint && (
          <AccordionSummary
            sx={{
              background: theme.palette.sidebarMainBackground.main,
              color: "#FFFFFF",
              minHeight: "34px",
              "&.Mui-expanded": {
                minHeight: "34px",
                // marginTop: "10px",
              },
              "& .MuiAccordionSummary-content": {
                margin: 0,
                display: "flex",
                alignItems: "center",
              },
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: "0px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                margin: 0,
                position: "relative",
                width: "100%",
              }}
            >
              <ExpandMoreIcon
                sx={{
                  transform: "rotate(0deg)",
                  transition: "transform 0.3s",
                  color: "#FFFFFF",
                  fontSize: "20px",
                }}
              />

              <div
                className="d-flex"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TeritaryTextTypography
                  style={{
                    color: "#FFFFFF",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  {elem}
                </TeritaryTextTypography>
              </div>
            </Box>
          </AccordionSummary>
        )}
        <AccordionDetails
          id="workflowContainer"
          sx={{
            width: "100%",
            "&.MuiAccordionDetails-root": {
              padding: "0px !important",
              display: "flex",
              flexDirection: "column",
            },
            maxHeight: "140px",
            overflowY: "hidden",
            "&:hover": {
              overflowY: "auto",
            },
          }}
        >
          <SkeletonLoader />
        </AccordionDetails>
      </Accordion>
    );
  });
};
