import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
// import ScrollableLayout from "../ScrollableLayout";
// import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import { Box, Stack } from "@mui/material";
// import {
//   PrimarySignInUPTypography,
//   SecondarySignInUPTypography,
//   TertiarySignInUPTypography,
// } from "@/app/Styles/signInUp";

// import { gatewayList } from "../Workspace";
// import { gatewayList } from "@/app/Constants/DropdownOptions";
import ResourceCard from "./ResourceCard";
import SelectedCountButton from "./SelectedCountButton";

// import theme from "@/theme/theme";
import useMuiBreakpoints from "@/hooks/useMuiBreakpoints";
import { useSignUpStore } from "@/store/useSignUpStore";
import useCatalogue from "@/hooks/sign/useCatalogue";
// import { translate } from "@/app/Helpers/helpersFunctions";

type Props = {
  clientSession?: any;
  isWorkflowModal?: boolean;
};

export default function Resources({ clientSession, isWorkflowModal }: Props) {
  const { isxs, issm, ismd } = useMuiBreakpoints();
  const { activeStep, handleBack, handleStep, formDataStore, apiDataStore } =
    useSignUpStore();
  const { fetchData, updateProject, updateGroup, isUpdating } = useCatalogue(
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

  // const menuIndex = gatewayList.findIndex(
  //   (i: any) => i.clickable == formDataStore?.gateway
  // );

  // useEffect(() => {
  //   if (activeStep == 3) {
  //     fetchData(0, 3);
  //   }
  // }, [activeStep]);

  // const dynamicTitle = () => {
  //   switch (formDataStore?.gateway) {
  //     case "AWS":
  //       return `${translate("gatewayList.AWS_DESC")}`;
  //     // case "Azure Gateway":
  //     //   return "API discovery via Integration";
  //     case "SWAGGER":
  //       return `${translate("gatewayList.SWAGGER_DESC")}`;
  //     default:
  //       return `${translate("gatewayList.DEFAULT_DESC")}`;
  //   }
  // };
  // const showSelectedCount = formDataStore?.gateway == "AWS";

  return (
    // <ScrollableLayout
    //   handleNext={handleStep}
    //   showNextButton={true}
    //   showBackButton={true}
    //   handleBack={handleBack}
    //   columnSpacing={isxs ? 1 : issm ? 1 : 2}
    //   isWorkflowModal={isWorkflowModal}
    //   // additionalButton={formDataStore?.gateway == "SWAGGER"}
    //   // additionalButtonLabel={"Skip to Invite Users"}
    //   // additionalButtonOnClick={() => {}}
    // >
    //   <Grid
    //     size={{
    //       xl: 12,
    //       lg: 12,
    //       md: 12,
    //       xs: 12,
    //     }}
    //   >
    //     <Stack
    //       direction={"row"}
    //       sx={{
    //         width: "100%",
    //         alignItems: "center",
    //         justifyContent: "space-between",
    //         marginBottom: "15px",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           gap: 1,
    //           flexDirection: {
    //             xs: "column",
    //             sm: "column",
    //             md: "row",
    //           },
    //         }}
    //       >
    //         <PrimarySignInUPTypography
    //           sx={{
    //             color: theme.palette.signInUpPrimary.main,
    //             fontSize: "18px",
    //             "@media (min-width: 2120px)": {
    //               fontSize: "25px",
    //             },
    //           }}
    //         >
    //           {dynamicTitle()}
    //         </PrimarySignInUPTypography>
    //         <SelectedCountButton count={projectDetails?.group_count} />
    //       </Box>
    //       {gatewayList[menuIndex]?.icon}
    //     </Stack>
    //   </Grid>
    //   {projectDetails?.length != 0 ? (
    //     projectDetails?.groups?.map((elem: any, index: number) => {
    //       const isLoadingEnabled =
    //         elem.group_id == isUpdating ||
    //         (elem.project?.length > 0
    //           ? elem.project
    //               .map((project: any) => project.project_id)
    //               ?.includes(isUpdating)
    //           : false);

    //       return (
    //         <Grid size={{ md: 12, sm: 12, xs: 12 }} key={index}>
    //           <Stack sx={{ width: "100%", marginBottom: 1 }}>
    //             <ResourceCard
    //               data={elem}
    //               name={elem?.name}
    //               description={elem?.description}
    //               environments={elem?.project}
    //               handleSaveProject={updateGroup}
    //               handleSaveEnv={updateProject}
    //               isLoading={isLoadingEnabled}
    //             />
    //           </Stack>
    //         </Grid>
    //       );
    //     })
    //   ) : (
    //     <Box
    //       sx={{
    //         width: "100%",
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         height: "40vh",
    //         paddingTop: 5,
    //       }}
    //     >
    //       <SecondarySignInUPTypography sx={{ color: theme.palette.gray.main }}>
    //         {translate("noDataDescription.NO_DATA_AVAILABLE")}
    //       </SecondarySignInUPTypography>
    //     </Box>
    //   )}
    // </ScrollableLayout>
    <></>
  );
}
