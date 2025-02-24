// import GInput from "@/app/apiflow_components/global/GInput";
// import {
//   PrimarySignInUPTypography,
//   SecondarySignInUPTypography,
// } from "@/app/Styles/signInUp";
import { Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
// import ScrollableLayout from "../ScrollableLayout";
// import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import GSelect from "../discovery/GSelect";
// import GButton from "../../global/GButton";
// import GDataTable from "../../global/GDataTable";
// import useInvites from "@/app/hooks/sign/useInvites";

// import theme from "@/theme/theme";
import { useSignUpStore } from "@/store/useSignUpStore";
import useInvites from "@/hooks/sign/useInvites";
import useMuiBreakpoints from "@/hooks/useMuiBreakpoints";
// import { translate } from "@/app/Helpers/helpersFunctions";

type Props = {
  clientSession: any;
  isWorkflowModal?: boolean | undefined;
};

export default function InvitedUsers({
  clientSession,
  isWorkflowModal,
}: Props) {
  const { activeStep, handleBack, handleStep, formDataStore } =
    useSignUpStore();
  const {
    fetchRoles,
    roles,
    isFetchingTableData,
    inviteUserForm,
    handleChange,
    handleSubmit,
    errMsg,
    members,
    handleInviteUserFormData,
  } = useInvites(clientSession?.data);
  const { isxs, issm, ismd, isxl } = useMuiBreakpoints();
  const [columnLabels, setColumnLabels] = useState({
    // email: `${translate("common.EMAIL_ID")}`,
    // role_name: `${translate("common.ROLE")}`,
    // action: `${translate("common.ACTION")}`,
  });
  const inputs = [
    {
      id: 1,
      // label: `${translate("common.EMAIL_ID")}`,
      label: "",
      icon: "",
      type: "text",
      onChange: handleChange,
      isErr: errMsg?.email != "",
      errMsg: errMsg?.email,
      name: "email",
      value: inviteUserForm?.email,
    },
    {
      id: 2,
      // label: `${translate("common.ROLE")}`,
      label: "",
      type: "select",
      onChange: (value: any) => handleInviteUserFormData("role", value),
      isErr: errMsg?.role != "",
      errMsg: errMsg?.role,
      name: "role",
      value: inviteUserForm?.role,
      menus: roles.map((x: any) => ({
        label: x.role_name,
        value: x.id,
      })),
    },
  ];
  // const InputArray = [
  //   {
  //     id: 1,
  //     title: `${translate("signUp.INVITE_USERS")}`,
  //     description: `${translate("signUp.INVITE_USERS_DESC")}`,
  //     inputs: inputs,
  //   },
  //   {
  //     id: 1,
  //     title: `${translate("signUp.INVITED_USERS")}`,
  //     description: `${translate("signUp.INVITED_USERS_DESC")}`,
  //     inputs: [],
  //     type: "cards",
  //   },
  // ];

  return (
    // <ScrollableLayout
    //   handleNext={handleStep}
    //   handleBack={handleBack}
    //   showNextButton={true}
    //   showBackButton={true}
    //   isWorkflowModal={isWorkflowModal}
    // >
    //   {InputArray?.map((elem: any, index: number) => {
    //     return (
    //       <Grid
    //         container
    //         sx={{
    //           width: "100%",
    //           marginBottom: "15px",
    //         }}
    //         columnSpacing={isxs ? 1 : issm ? 1 : 1}
    //         key={index}
    //       >
    //         <Grid
    //           size={{
    //             xl: 12,
    //             lg: 12,
    //             md: 12,
    //             xs: 12,
    //           }}
    //         >
    //           <Stack
    //             sx={{
    //               width: "100%",
    //               alignItems: "flex-start",
    //               justifyContent: "center",
    //               marginBottom: "15px",
    //             }}
    //           >
    //             <PrimarySignInUPTypography
    //               sx={{
    //                 color: theme.palette.signInUpPrimary.main,
    //                 fontSize: "18px",
    //                 "@media (min-width: 2120px)": {
    //                   fontSize: "25px",
    //                 },
    //               }}
    //             >
    //               {elem?.title}
    //             </PrimarySignInUPTypography>
    //             <SecondarySignInUPTypography
    //               sx={{
    //                 color: theme.palette.sigInUpStepperTextSecondary.main,
    //                 fontSize: "10px",
    //                 "@media (min-width: 2120px)": {
    //                   fontSize: "15px",
    //                 },
    //               }}
    //             >
    //               {elem?.description}
    //             </SecondarySignInUPTypography>
    //           </Stack>
    //         </Grid>

    //         {elem.title != "Invited Users" ? (
    //           <Grid
    //             sx={{
    //               background: theme.palette.summaryBgColor.main,
    //               padding: "20px 10px",
    //               borderRadius: "10px",
    //             }}
    //             size={{ md: 12, sm: 12, xs: 12 }}
    //           >
    //             <Grid container columnSpacing={isxs ? 1 : issm ? 1 : 1}>
    //               {elem?.inputs.map((input: any, inputIndex: number) => {
    //                 if (input?.type == "select") {
    //                   return (
    //                     <Grid
    //                       size={{ md: 5, sm: 6, xs: 12 }}
    //                       key={inputIndex}
    //                       sx={{
    //                         "@media (max-width: 850px)": {
    //                           width: "100%",
    //                         },
    //                       }}
    //                     >
    //                       <Stack sx={{ gap: 1, marginBottom: "15px" }}>
    //                         <Box
    //                           sx={{
    //                             color: theme.palette.SignInUpBorder.main,
    //                             display: "flex",
    //                             alignItems: "center",
    //                             gap: "3px",
    //                           }}
    //                         >
    //                           <SecondarySignInUPTypography
    //                             sx={{
    //                               color: theme.palette.signInUpPrimary.main,
    //                               fontSize: "13px",
    //                               "@media (min-width: 2120px)": {
    //                                 fontSize: "20px",
    //                               },
    //                             }}
    //                           >
    //                             {input?.label}
    //                           </SecondarySignInUPTypography>
    //                         </Box>
    //                         <GSelect
    //                           options={input.menus}
    //                           size={"small"}
    //                           width={"100%"}
    //                           value={input.value}
    //                           onChange={input.onChange}
    //                           name={input.name}
    //                           error={input.err}
    //                           helperText={input.errMsg}
    //                           height={"47px"}
    //                           radius={"5px"}
    //                         />
    //                       </Stack>
    //                     </Grid>
    //                   );
    //                 } else {
    //                   return (
    //                     <Grid
    //                       size={{ md: 5, sm: 6, xs: 12 }}
    //                       key={inputIndex}
    //                       sx={{
    //                         "@media (max-width: 850px)": {
    //                           width: "100%",
    //                         },
    //                       }}
    //                     >
    //                       <Stack sx={{ gap: 1, marginBottom: "15px" }}>
    //                         <Box
    //                           sx={{
    //                             color: theme.palette.SignInUpBorder.main,
    //                             display: "flex",
    //                             alignItems: "center",
    //                             gap: "3px",
    //                           }}
    //                         >
    //                           {input?.icon}
    //                           <SecondarySignInUPTypography
    //                             sx={{
    //                               color: theme.palette.signInUpPrimary.main,
    //                               fontSize: "13px",
    //                               "@media (min-width: 2120px)": {
    //                                 fontSize: "20px",
    //                               },
    //                             }}
    //                           >
    //                             {input?.label}
    //                           </SecondarySignInUPTypography>
    //                         </Box>
    //                         <GInput
    //                           secondarybackground={
    //                             theme.palette.summaryBgColor.main
    //                           }
    //                           name={input.name}
    //                           type={input.type}
    //                           fullWidth={true}
    //                           onChangeHandler={input.onChange}
    //                           error={input.err}
    //                           helperText={input.errMsg}
    //                           value={input.value}
    //                           height={"47px"}
    //                           radius={"5px"}
    //                         />
    //                       </Stack>
    //                     </Grid>
    //                   );
    //                 }
    //               })}
    //               {elem.title == "Invite Users" && (
    //                 <Grid
    //                   size={{ md: 2, sm: 6, xs: 12 }}
    //                   sx={{
    //                     display: "flex",
    //                     alignItems: "center",
    //                     "@media (max-width: 850px)": {
    //                       width: "100%",
    //                     },
    //                   }}
    //                   key={index}
    //                 >
    //                   <GButton
    //                     buttonType="primary"
    //                     label={`${translate("button.INVITE")}`}
    //                     width={"100%"}
    //                     sx={{
    //                       height: "47px",
    //                       marginBottom:
    //                         errMsg.email || errMsg.role
    //                           ? "25px !important"
    //                           : "5px !important",
    //                       fontSize: "13px",
    //                       fontFamily: "Firasans-medium !important",
    //                       "@media (min-width: 2120px)": {
    //                         height: "80px",
    //                         fontSize: "20px",
    //                         marginBottom:
    //                           errMsg.email || errMsg.role
    //                             ? "25px !important"
    //                             : "0px !important",
    //                       },
    //                     }}
    //                     type={"button"}
    //                     onClickHandler={handleSubmit}
    //                     radius={"8px"}
    //                   />
    //                 </Grid>
    //               )}
    //             </Grid>
    //           </Grid>
    //         ) : (
    //           <Grid size={{ md: 12, sm: 12, xs: 12 }} key={index}>
    //             <GDataTable
    //               isLoading={isFetchingTableData}
    //               data={members}
    //               columnLabels={columnLabels}
    //             />
    //           </Grid>
    //         )}
    //       </Grid>
    //     );
    //   })}
    // </ScrollableLayout>
    <></>
  );
}
