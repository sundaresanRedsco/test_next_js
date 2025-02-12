import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import ScrollableLayout from "../ScrollableLayout";
import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import { Box, Stack } from "@mui/material";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
  TertiarySignInUPTypography,
} from "@/app/Styles/signInUp";

import { gatewayList } from "../Workspace";
import ResourceCard from "./ResourceCard";
import SelectedCountButton from "./SelectedCountButton";
import GRadioGroup from "../../global/GRadioGroup";
import GUploadButton from "../../global/GUploadButton";
import useCatalogue from "@/app/hooks/sign/useCatalogue";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";

type Props = {
  clientSession?: any;
  isWorkflowModal?: boolean;
};

export default function Resources({ clientSession, isWorkflowModal }: Props) {
  const { isxs, issm, ismd } = useMuiBreakpoints();
  const { activeStep, handleBack, handleStep, formDataStore, apiDataStore } =
    useSignUpStore();
  const { fetchData, updateProject, updateGroup } = useCatalogue(
    clientSession?.data
  );
  const projectDetails = apiDataStore?.projectDetails
    ? apiDataStore?.projectDetails
    : [];
  const InputArray = [
    {
      id: 1,
      name: "CMP",
      description: "CMP",
      environments: [
        {
          title: "Dev Stage",
          about: "Dev Stage",
        },
        {
          title: "UAT Stage",
          about: "UAT Stage",
        },
      ],
      isVisible: formDataStore?.gateway == "AWS",
      type: "card",
    },
    {
      id: 2,
      name: "SCM",
      description: "SCM",
      environments: [
        {
          title: "Dev Stage",
          about: "Dev Stage",
        },
        {
          title: "UAT Stage",
          about: "UAT Stage",
        },
      ],
      isVisible:
        formDataStore?.gateway == "AWS" || formDataStore?.gateway == "SWAGGER",
      type: "card",
    },
  ];

  const menuIndex = gatewayList.findIndex(
    (i: any) => i.clickable == formDataStore?.gateway
  );

  // useEffect(() => {
  //   if (activeStep == 3) {
  //     fetchData(0, 3);
  //   }
  // }, [activeStep]);

  const dynamicTitle = () => {
    switch (formDataStore?.gateway) {
      case "AWS":
        return "AWS Projects & Environments";
      // case "Azure Gateway":
      //   return "API discovery via Integration";
      case "SWAGGER":
        return "API discovery via Swagger Import";
      default:
        return "Discovered Projects & Environments";
    }
  };
  // const showSelectedCount = formDataStore?.gateway == "AWS";

  return (
    <ScrollableLayout
      handleNext={handleStep}
      showNextButton={true}
      showBackButton={true}
      handleBack={handleBack}
      columnSpacing={isxs ? 1 : issm ? 1 : 2}
      isWorkflowModal={isWorkflowModal}
      // additionalButton={formDataStore?.gateway == "SWAGGER"}
      // additionalButtonLabel={"Skip to Invite Users"}
      // additionalButtonOnClick={() => {}}
    >
      <Grid
        size={{
          xl: 12,
          lg: 12,
          md: 12,
          xs: 12,
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
              },
            }}
          >
            <PrimarySignInUPTypography
              sx={{
                color: "white",
                fontSize: "18px",
                "@media (min-width: 2120px)": {
                  fontSize: "25px",
                },
              }}
            >
              {dynamicTitle()}
            </PrimarySignInUPTypography>
            <SelectedCountButton count={projectDetails?.group_count} />
          </Box>
          {gatewayList[menuIndex]?.icon}
        </Stack>
      </Grid>
      {projectDetails?.length != 0 ? (
        projectDetails?.groups?.map((elem: any, index: number) => {
          // if (elem.isVisible) {
          // if (elem.type == "card") {
          return (
            <Grid size={{ md: 12, sm: 12, xs: 12 }} key={index}>
              <Stack sx={{ width: "100%", marginBottom: 1 }}>
                <ResourceCard
                  data={elem}
                  name={elem?.name}
                  description={elem?.description}
                  environments={elem?.project}
                  handleSaveProject={updateGroup}
                  handleSaveEnv={updateProject}
                />
              </Stack>
            </Grid>
          );
          // }
          // if (elem.type == "multi-inputs") {
          //   return (
          //     <Grid key={index} size={{ md: 12, sm: 12, xs: 12 }}>
          //       <Grid
          //         container
          //         sx={{ width: "100%" }}
          //         columnGap={1.5}
          //         rowGap={1}
          //       >
          //         <Grid
          //           sx={{
          //             width: { xs: "100%", sm: "100%", md: "100%" },
          //           }}
          //         >
          //           <PrimarySignInUPTypography
          //             sx={{
          //               color: "white",
          //               fontSize: "15px",
          //             }}
          //           >
          //             {elem?.title}
          //           </PrimarySignInUPTypography>
          //         </Grid>
          //         {elem?.inputs?.map((input: any, inputIndex: number) => {
          //           return (
          //             <Grid
          //               sx={{
          //                 width: { xs: "100%", sm: "100%", md: "49%" },
          //               }}
          //               key={inputIndex}
          //             >
          //               <Stack sx={{ gap: 1, marginBottom: "15px" }}>
          //                 <Box
          //                   sx={{
          //                     color: "#FFFFFF80",
          //                     display: "flex",
          //                     alignItems: "center",
          //                     gap: "3px",
          //                   }}
          //                 >
          //                   <SecondarySignInUPTypography
          //                     sx={{
          //                       color: "white",
          //                       fontSize: "12px",
          //                     }}
          //                   >
          //                     {input?.label}
          //                   </SecondarySignInUPTypography>
          //                 </Box>
          //                 <GInput
          //                   name={input.name}
          //                   type={input.type}
          //                   fullWidth={true}
          //                   onChangeHandler={(value: any) => {}}
          //                   // value={input.value}
          //                 />
          //               </Stack>
          //             </Grid>
          //           );
          //         })}
          //       </Grid>
          //     </Grid>
          //   );
          // } else if (elem.type == "radio") {
          //   return (
          //     <Grid key={index} size={{ md: 12, sm: 12, xs: 12 }}>
          //       <Box
          //         sx={{
          //           width: "100%",
          //           display: "flex",
          //           alignItems: {
          //             xs: "flex-start",
          //             sm: "flex-start",
          //             md: "center",
          //           },
          //           borderBottom: "1px solid #FFFFFF80",
          //           position: "relative",
          //           justifyContent: "center",
          //           marginBottom: 2,
          //           flexDirection: { xs: "column", sm: "column", md: "row" },
          //         }}
          //       >
          //         <PrimarySignInUPTypography
          //           sx={{
          //             color: "white",
          //             fontSize: "15px",
          //             position: { xs: "static", sm: "static", md: "absolute" },
          //             left: 0,
          //           }}
          //         >
          //           {elem?.title}
          //         </PrimarySignInUPTypography>
          //         <Box
          //           sx={{
          //             display: "flex",
          //             justifyContent: "center",
          //             alignItems: "center",
          //             width: { xs: "100%", sm: "100%", md: "auto" },
          //           }}
          //         >
          //           <GRadioGroup
          //             name={elem.name}
          //             value={elem.value}
          //             inputs={elem.inputs}
          //             onChange={elem.onChange}
          //           />
          //         </Box>
          //         {elem?.inputs?.map((input: any, inputIndex: number) => {
          //           return null;
          //         })}
          //       </Box>
          //     </Grid>
          //   );
          // } else if (elem.type == "button") {
          //   return (
          //     <Grid size={{ md: 12, sm: 12, xs: 12 }} key={index}>
          //       <Stack sx={{ gap: 1 }}>
          //         <GUploadButton label="" fileHandler={() => {}} />
          //       </Stack>
          //     </Grid>
          //   );
          // }
          // else {
          //   return (
          //     <Grid size={{ md: 6, sm: 6, xs: 12 }} key={index}>
          //       <Stack sx={{ gap: 1, marginBottom: "15px" }}>
          //         <Box
          //           sx={{
          //             color: "#FFFFFF80",
          //             display: "flex",
          //             alignItems: "center",
          //             gap: "3px",
          //           }}
          //         >
          //           <SecondarySignInUPTypography
          //             sx={{
          //               color: "white",
          //               fontSize: "12px",
          //             }}
          //           >
          //             {elem?.label}
          //           </SecondarySignInUPTypography>
          //         </Box>
          //         <GInput
          //           name={elem.name}
          //           type={elem.type}
          //           fullWidth={true}
          //           onChangeHandler={(value: any) => {}}
          //           // value={elem.value}
          //         />
          //       </Stack>
          //     </Grid>
          //   );
          // }
          // }
        })
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
            paddingTop: 5,
          }}
        >
          <SecondarySignInUPTypography sx={{ color: "gray" }}>
            No data available
          </SecondarySignInUPTypography>
        </Box>
      )}
    </ScrollableLayout>
  );
}
