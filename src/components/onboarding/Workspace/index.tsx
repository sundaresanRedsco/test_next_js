// import GInput from "@/app/apiflow_components/global/GInput";
// import {
//   PrimarySignInUPTypography,
//   SecondarySignInUPTypography,
// } from "@/app/Styles/signInUp";
import {
  Box,
  FormHelperText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
// import GSwitch from "../../global/GSwitch";
// import {
//   AwsWhite,
//   AzureSignUp,
//   GCPSignUp,
//   LoadBalancerSignUp,
//   RestAPISignUp,
//   SwaggerSignUp,
// } from "@/app/Assests/icons";
// import GatewayCard from "../../global/GatewayCard";
// import ScrollableLayout from "../ScrollableLayout";

import axios from "axios";
// import { setItem } from "@/app/Services/localstorage";
// import theme from "@/theme/theme";
import useMuiBreakpoints from "@/hooks/useMuiBreakpoints";
import { useSignUpStore } from "@/store/useSignUpStore";
import useWorkspace from "@/hooks/sign/useWorkspace";
// import { translate } from "@/app/Helpers/helpersFunctions";
// import { gatewayList } from "@/app/Constants/DropdownOptions";

type Props = {
  clientSession: any;
  isWorkflowModal?: boolean;
};
// export const gatewayList = [
//   {
//     name: `${translate("gatewayList.AWS")}`,
//     label: `${translate("gatewayList.AWS")}`,
//     icon: <AwsWhite height={"40px"} />,
//     clickable: "AWS",
//   },
//   {
//     name: `${translate("gatewayList.AZURE")}`,
//     label: `${translate("gatewayList.AZURE")}`,
//     icon: <AzureSignUp height={"40px"} />,
//     clickable: "AZURE",
//   },
//   {
//     name: `${translate("gatewayList.GCP")}`,
//     label: `${translate("gatewayList.GCP")}`,
//     icon: <GCPSignUp height={"40px"} />,
//     clickable: "GCP",
//   },

//   {
//     name: `${translate("gatewayList.SWAGGER_NAME")}`,
//     label: `${translate("gatewayList.SWAGGER")}`,
//     icon: <SwaggerSignUp height={"40px"} />,
//     clickable: "SWAGGER",
//   },

//   // {
//   //   name: "HTTP, RESTful, SOAP and WSDL",
//   //   label: "HTTP",
//   //   icon: <RestAPISignUp height={"40px"} />,
//   //   clickable: "HTTP",
//   // },
//   // {
//   //   name: "API Discovery via traffic monitoring",
//   //   label: "Load Balancer",
//   //   icon: <LoadBalancerSignUp height={"40px"} />,
//   //   clickable: "APISIX",
//   // },
// ];
export default function Workspace({ clientSession, isWorkflowModal }: Props) {
  const { userData, setFormDataStore, formDataStore, setactiveStep } =
    useSignUpStore();
  const { isxs, issm, ismd, isxl } = useMuiBreakpoints();

  const {
    formData,
    handleSubmit,
    formNewError,
    alertInfo,
    loading,
    formErrors,
    handleOnChange,
    handleWorkspaceFormDatas,
    setFormData,
    methodErr,
    setmethodErr,
  } = useWorkspace(clientSession?.data);

  const handleVisibilityChange = (e: any) => {
    handleWorkspaceFormDatas("is_channel", e.target.checked);
  };
  useEffect(() => {
    if (formDataStore?.workspace) {
      const data = formDataStore?.workspace;
      setFormData({
        workspace_name: data.workspace_name,
        description: data.description,
        is_channel: data.is_channel,
        post_content: "null",
      });
    }
  }, [formDataStore?.workspace]);

  // const inputs = [
  //   {
  //     id: 1,
  //     label: `${translate("common.NAME")}`,
  //     icon: "",
  //     type: "text",
  //     onChange: (e: any) =>
  //       setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value })),
  //     isErr: formErrors?.workspace_name || formNewError,
  //     errMsg: formErrors?.workspace_name || formNewError,
  //     name: "workspace_name",
  //     value: formData.workspace_name,
  //   },
  //   {
  //     id: 2,
  //     label: `${translate("common.DESCRIPTION")}`,
  //     icon: "",
  //     type: "text",
  //     onChange: (e: any) =>
  //       setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value })),
  //     isErr: formErrors?.description,
  //     errMsg: formErrors?.description,
  //     name: "description",
  //     value: formData.description,
  //   },
  //   {
  //     id: 3,
  //     type: "switch",
  //     title: `${translate("signUp.SWITCH_TITLE")}`,
  //     link: {
  //       label: `${translate("signUp.SWITCH_NAME")}`,
  //       to: "",
  //     },
  //     onChange: handleVisibilityChange,
  //     name: "is_channel",
  //     value: formData.is_channel,
  //   },
  // ];
  // const InputArray = [
  //   {
  //     id: 1,
  //     title: `${translate("signUp.WORKSPACE")}`,
  //     description: `${translate("signUp.WORSKAPCE_DESCRIPTION")}`,
  //     inputs: inputs,
  //   },
  //   {
  //     id: 1,
  //     title: `${translate("signUp.DISCOVERY_TYPE")}`,
  //     description: `${translate("signUp.DISCOVERY_TYPE_DESCRITPION")}`,
  //     inputs: gatewayList,
  //     type: "cards",
  //     helperText: formErrors?.method,
  //   },
  // ];

  return (
    // <ScrollableLayout
    //   handleNext={handleSubmit}
    //   showNextButton={true}
    //   // showNextButton={formDatas.gateway != ""}
    //   showBackButton={true}
    //   handleBack={() => {
    //     setactiveStep(0);
    //     if (formDataStore?.authType.split("_")[0] != "email") {
    //       setFormDataStore("authType", formDataStore?.authType + "_back");
    //     } else {
    //       setFormDataStore("isRegisterd", true);
    //     }
    //   }}
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
    //         columnSpacing={isxs ? 1 : issm ? 1 : 2}
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
    //                 color: "white",
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
    //                   fontSize: "18px",
    //                 },
    //               }}
    //             >
    //               {elem?.description}
    //             </SecondarySignInUPTypography>
    //             {elem?.helperText && (
    //               <FormHelperText
    //                 sx={{
    //                   fontSize: "10px",
    //                   margin: "0px",
    //                   fontFamily: "Firasans-regular",
    //                   color: theme.palette.helperText.main,
    //                   "@media (min-width: 2120px)": {
    //                     fontSize: "18px",
    //                   },
    //                 }}
    //               >
    //                 {elem.helperText}
    //               </FormHelperText>
    //             )}
    //           </Stack>
    //         </Grid>
    //         {elem?.inputs.map((input: any, inputIndex: number) => {
    //           if (input?.type == "switch") {
    //             return (
    //               <Grid size={{ md: 12, sm: 12, xs: 12 }} key={inputIndex}>
    //                 <Box
    //                   sx={{
    //                     color: theme.palette.SignInUpBorder.main,
    //                     display: "flex",
    //                     alignItems: "center",
    //                     gap: "3px",
    //                     borderBottom: `1px solid ${theme.palette.sigInUpButtonBorder.main}`,
    //                     paddingBottom: "15px",
    //                     width: "100%",
    //                     justifyContent: "space-between",
    //                   }}
    //                 >
    //                   <Box
    //                     sx={{
    //                       color: theme.palette.SignInUpBorder.main,
    //                       display: "flex",
    //                       alignItems: "center",
    //                       gap: "3px",
    //                       width: { xs: "100%", sm: "100%", md: "auto" },
    //                       flexDirection: {
    //                         xs: "column",
    //                         sm: "column",
    //                         md: "row",
    //                       },
    //                       flexWrap: "wrap",
    //                     }}
    //                   >
    //                     <SecondarySignInUPTypography
    //                       sx={{
    //                         color: "white",
    //                         fontSize: "13px",
    //                         "@media (min-width: 2120px)": {
    //                           fontSize: "20px",
    //                         },
    //                       }}
    //                     >
    //                       {input?.title}
    //                     </SecondarySignInUPTypography>
    //                     <div style={{ cursor: "pointer" }}>
    //                       <PrimarySignInUPTypography
    //                         sx={{
    //                           color: "white",
    //                           fontSize: "13px",
    //                           textTransform: "uppercase",
    //                           textDecoration: "underline",
    //                           "@media (min-width: 2120px)": {
    //                             fontSize: "20px",
    //                           },
    //                         }}
    //                       >
    //                         {input?.link?.label}
    //                         {" >"}
    //                       </PrimarySignInUPTypography>
    //                     </div>
    //                   </Box>
    //                   <GSwitch
    //                     value={input?.value}
    //                     handleChange={input?.onChange}
    //                     name={input?.name}
    //                   />
    //                 </Box>
    //               </Grid>
    //             );
    //           } else if (elem?.type == "cards") {
    //             return (
    //               <Grid
    //                 size={{ md: 4, sm: 4, xs: 12 }}
    //                 key={inputIndex}
    //                 sx={{
    //                   marginBottom: 2,
    //                   "@media (max-width: 850px)": {
    //                     width: "100%",
    //                   },
    //                 }}
    //               >
    //                 <GatewayCard
    //                   isActive={input?.clickable == formDataStore?.gateway}
    //                   label={input?.name}
    //                   onClick={() => {
    //                     setFormDataStore("gateway", input?.clickable);
    //                   }}
    //                   icon={input?.icon}
    //                 />
    //               </Grid>
    //             );
    //           } else {
    //             return (
    //               <Grid
    //                 size={{ md: 6, sm: 6, xs: 12 }}
    //                 key={inputIndex}
    //                 sx={{
    //                   "@media (max-width: 850px)": {
    //                     width: "100%",
    //                   },
    //                 }}
    //               >
    //                 <Stack sx={{ gap: 1, marginBottom: "15px" }}>
    //                   <Box
    //                     sx={{
    //                       color: theme.palette.SignInUpBorder.main,
    //                       display: "flex",
    //                       alignItems: "center",
    //                       gap: "3px",
    //                     }}
    //                   >
    //                     {input?.icon}
    //                     <SecondarySignInUPTypography
    //                       sx={{
    //                         color: "white",
    //                         fontSize: "13px",
    //                         "@media (min-width: 2120px)": {
    //                           fontSize: "20px",
    //                         },
    //                       }}
    //                     >
    //                       {input?.label}
    //                     </SecondarySignInUPTypography>
    //                   </Box>
    //                   <GInput
    //                     name={input.name}
    //                     type={input.type}
    //                     fullWidth={true}
    //                     error={input.err}
    //                     helperText={input.errMsg}
    //                     onChangeHandler={input.onChange}
    //                     value={input.value}
    //                     height={"47px"}
    //                     radius={"5px"}
    //                     // height="43px"
    //                   />
    //                 </Stack>
    //               </Grid>
    //             );
    //           }
    //         })}
    //       </Grid>
    //     );
    //   })}
    // </ScrollableLayout>
    <></>
  );
}
