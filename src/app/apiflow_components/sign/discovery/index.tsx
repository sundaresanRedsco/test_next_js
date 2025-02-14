import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import ScrollableLayout from "../ScrollableLayout";
import useMuiBreakpoints from "@/app/hooks/useMuiBreakpoints";
import { Box, Stack } from "@mui/material";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
} from "@/app/Styles/signInUp";
import GInput from "@/app/apiflow_components/global/GInput";
import GSelect from "@/app/apiflow_components/sign/discovery/GSelect";
import { gatewayList } from "../Workspace";
import GUploadButton from "../../global/GUploadButton";
import useDiscovery from "@/app/hooks/sign/useDiscovery";
import useCatalogue from "@/app/hooks/sign/useCatalogue";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import GRadioGroup from "../../global/GRadioGroup";
import theme from "@/Theme/theme";

type Props = {
  clientSession: any;
  isWorkflowModal?: boolean;
};

export default function Discovery({ clientSession, isWorkflowModal }: Props) {
  const { handleBack, formDataStore, setFormDataStore } = useSignUpStore();
  const { fetchData } = useCatalogue(clientSession?.data);
  const {
    discoveryFormDatas,
    setdiscoveryFormDatas,
    discoveryhandleChange,
    handleSubmit,
    timesData,
    awsRegions,
    errorMsg,
    handleFormData,
  } = useDiscovery(clientSession?.data, fetchData);

  const { isxs, issm, ismd, isxl } = useMuiBreakpoints();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormDataStore(name, value);
  };
  const InputArray = [
    {
      id: 1,
      label:
        formDataStore?.gateway == "SWAGGER"
          ? "Project Name"
          : "Configuration Name",
      type: "text",
      onChange: discoveryhandleChange,
      isErr: errorMsg?.name != "",
      errMsg: errorMsg?.name,
      name: "name",
      value: discoveryFormDatas.name,
      isVisible: true,
    },
    {
      id: 2,
      label: "Description",
      type: "text",
      onChange: discoveryhandleChange,
      isErr: "",
      errMsg: "",
      name: "description",
      value: discoveryFormDatas.description,
      isVisible: true,
    },
    {
      id: 5,
      label: "Access Key",
      type: "text",
      onChange: discoveryhandleChange,
      isErr: errorMsg?.accessKey != "",
      errMsg: errorMsg?.accessKey,
      name: "accessKey",
      value: discoveryFormDatas.accessKey,
      isVisible:
        formDataStore?.gateway == "AWS" || formDataStore?.gateway == "AZURE",
    },
    {
      id: 6,
      label: "Secret Key",
      type: "text",
      onChange: discoveryhandleChange,
      isErr: errorMsg?.secretKey != "",
      errMsg: errorMsg?.secretKey,
      name: "secretKey",
      value: discoveryFormDatas.secretKey,
      isVisible:
        formDataStore?.gateway == "AWS" || formDataStore?.gateway == "AZURE",
    },
    {
      id: 6,
      label: "Region",
      type: "select",
      onChange: (value: any) => {
        handleFormData("region", value);
      },
      isErr: errorMsg?.region != "",
      errMsg: errorMsg?.region,
      name: "region",
      value: discoveryFormDatas.region,
      isVisible: formDataStore?.gateway == "AWS",
      menus: awsRegions.map((region) => ({
        value: region.region,
        label: region.region,
      })),
    },
    {
      id: 6,
      label: "Subscription ID",
      type: "text",
      onChange: discoveryhandleChange,
      isErr: "",
      errMsg: "",
      name: "subcription_id",
      value: discoveryFormDatas.subscription_id,
      isVisible: formDataStore?.gateway == "AZURE",
    },
    {
      id: 6,
      label: "Tenant ID",
      type: "text",
      onChange: discoveryhandleChange,
      isErr: "",
      errMsg: "",
      name: "azure_tenat_id",
      value: discoveryFormDatas.azure_tenat_id,
      isVisible: formDataStore?.gateway == "AZURE",
    },
    {
      id: 3,
      label: "Sync Interval",
      type: "select",
      onChange: (value: any) => {
        handleFormData("interval", value);
      },
      isErr: errorMsg?.interval != "",
      errMsg: errorMsg?.interval,
      name: "interval",
      value: discoveryFormDatas.interval,
      isVisible: formDataStore?.gateway != "SWAGGER",
      menus: timesData.map((times) => ({
        value: times.name,
        label: times.name,
      })),
    },
    {
      id: 5,
      type: "radio",
      isVisible: formDataStore?.gateway == "SWAGGER",
      title: "Import Type",
      name: "doc_type",
      value: formDataStore?.doc_type,
      onChange: handleChange,
      inputs: [
        {
          id: 1,
          label: "Swagger URL",
          type: "radio",
          onChange: "",
          isErr: "",
          errMsg: "",
          name: "url",
          value: "URL",
        },
        {
          id: 2,
          label: "Swagger File",
          type: "radio",
          onChange: "",
          isErr: "",
          errMsg: "",
          name: "file",
          value: "FILE",
        },
      ],
    },
    {
      id: 6,
      label: "Swagger URL",
      type: "text",
      onChange: discoveryhandleChange,
      isErr: errorMsg?.url != "",
      errMsg: errorMsg?.url,
      name: "url",
      value: discoveryFormDatas.url,
      isVisible:
        formDataStore?.gateway == "SWAGGER" && formDataStore?.doc_type == "URL",
      fullWidth: true,
    },
    {
      id: 4,
      label: "File",
      type: "file",
      onChange: (file: any) => {
        handleFormData("file_store", file);
      },
      isErr: errorMsg?.file_store != "",
      errMsg: errorMsg?.file_store,
      name: "file_store",
      value: discoveryFormDatas.file_store,
      isVisible:
        formDataStore?.gateway == "SWAGGER" &&
        formDataStore?.doc_type == "FILE",
      fullWidth: true,
    },
  ];

  const menus = gatewayList.map((elem) => ({
    label: elem.name,
    value: elem.clickable,
  }));
  useEffect(() => {
    if (formDataStore?.gatewayForm) {
      const data = formDataStore?.gatewayForm;
      setdiscoveryFormDatas({
        id: data?.id,
        secretKey: data?.secretKey,
        name: data?.name,
        region: data?.region,
        accessKey: data?.accessKey,
        type: data?.type,
        subscription_id: data?.subscription_id,
        azure_tenat_id: data?.azure_tenat_id,
        interval: data?.interval,
        ApiGatewayType: data?.ApiGatewayType,
        client_id: data?.client_id,
        client_secreat: data?.client_secreat,
        api_url: data?.api_url,
        admin_url: data?.admin_url,
        server_urls: data?.server_urls,
        authentication_key: data?.authentication_key,
        description: data?.description,
        file_store: data?.file_store,
        doc_type: data?.doc_type,
        url: data?.url,
      });
    }
  }, [formDataStore?.gatewayForm]);
  return (
    <ScrollableLayout
      handleNext={() => {
        handleSubmit();
      }}
      showNextButton={true}
      showBackButton={true}
      handleBack={handleBack}
      columnSpacing={isxs ? 1 : issm ? 1 : 2}
      isWorkflowModal={isWorkflowModal}
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
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
            gap: {
              xs: 1,
              sm: 1,
              md: 0,
            },
          }}
        >
          <PrimarySignInUPTypography
            sx={{
              color: theme.palette.signInUpPrimary.main,
              fontSize: "18px",
              "@media (min-width: 2120px)": {
                fontSize: "25px",
              },
            }}
          >
            API discovery via Integration
          </PrimarySignInUPTypography>
          <GSelect
            options={menus}
            size={"small"}
            width={isxs || issm ? "100%" : "150px"}
            value={formDataStore?.gateway}
            onChange={(value: any) => {
              setFormDataStore("gateway", value);
            }}
            name={"gateway"}
            background={theme.palette.inputBg.main}
            radius={"7px"}
            sx={{
              "@media (min-width: 2120px)": {
                "& .MuiInputBase-root": {
                  height: "60px !important",
                },
                width: "250px",
              },
            }}
          />
        </Stack>
      </Grid>
      {InputArray.map((elem, index) => {
        if (elem.isVisible) {
          if (elem?.type == "select") {
            return (
              <Grid size={{ md: 6, sm: 12, xs: 12 }} key={index}>
                <Stack sx={{ gap: 1, marginBottom: "15px" }}>
                  <Box
                    sx={{
                      color: theme.palette.iconSidebarIconColor.main,
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <SecondarySignInUPTypography
                      sx={{
                        color: theme.palette.signInUpPrimary.main,
                        fontSize: "13px",
                        "@media (min-width: 2120px)": {
                          fontSize: "20px",
                        },
                      }}
                    >
                      {elem?.label}
                    </SecondarySignInUPTypography>
                  </Box>
                  <GSelect
                    options={elem.menus}
                    size={"small"}
                    width={"100%"}
                    value={elem.value}
                    onChange={elem.onChange}
                    name={elem.name}
                    error={elem.isErr}
                    helperText={elem.errMsg}
                    height={"47px"}
                    radius={"5px"}
                  />
                </Stack>
              </Grid>
            );
          } else if (elem?.type == "file") {
            return (
              <Grid
                size={{
                  md: elem?.fullWidth ? 12 : 6,
                  sm: elem?.fullWidth ? 12 : 6,
                  xs: 12,
                }}
                key={index}
              >
                <Stack sx={{ gap: 1 }}>
                  <Box
                    sx={{
                      color: theme.palette.iconSidebarIconColor.main,
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <SecondarySignInUPTypography
                      sx={{
                        color: theme.palette.signInUpPrimary.main,
                        fontSize: "13px",
                        "@media (min-width: 2120px)": {
                          fontSize: "20px",
                        },
                      }}
                    >
                      {elem?.label}
                    </SecondarySignInUPTypography>
                  </Box>
                  <GUploadButton
                    label="Select File"
                    fileHandler={elem.onChange}
                    helperText={elem.errMsg}
                  />
                </Stack>
              </Grid>
            );
          } else if (elem.type == "radio") {
            return (
              <Grid key={index} size={{ md: 12, sm: 12, xs: 12 }}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: {
                      xs: "flex-start",
                      sm: "flex-start",
                      md: "center",
                    },
                    borderBottom: `1px solid ${theme.palette.iconSidebarIconColor.main}`,
                    position: "relative",
                    justifyContent: "center",
                    marginBottom: 2,
                    flexDirection: { xs: "column", sm: "column", md: "row" },
                  }}
                >
                  <PrimarySignInUPTypography
                    sx={{
                      color: theme.palette.signInUpPrimary.main,
                      fontSize: "15px",
                      position: { xs: "static", sm: "static", md: "absolute" },
                      left: 0,
                      "@media (min-width: 2120px)": {
                        fontSize: "23px",
                      },
                    }}
                  >
                    {elem?.title}
                  </PrimarySignInUPTypography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: { xs: "100%", sm: "100%", md: "auto" },
                    }}
                  >
                    <GRadioGroup
                      name={elem.name}
                      value={elem.value}
                      inputs={elem.inputs}
                      onChange={elem.onChange}
                    />
                  </Box>
                </Box>
              </Grid>
            );
          } else {
            return (
              <Grid
                size={{
                  md: elem?.fullWidth ? 12 : 6,
                  sm: 12,
                  xs: 12,
                }}
                key={index}
              >
                <Stack sx={{ gap: 1, marginBottom: "15px" }}>
                  <Box
                    sx={{
                      color: theme.palette.iconSidebarIconColor.main,
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <SecondarySignInUPTypography
                      sx={{
                        color: theme.palette.signInUpPrimary.main,
                        fontSize: "13px",
                        "@media (min-width: 2120px)": {
                          fontSize: "20px",
                        },
                      }}
                    >
                      {elem?.label}
                    </SecondarySignInUPTypography>
                  </Box>
                  <GInput
                    name={elem.name}
                    type={elem.type}
                    fullWidth={true}
                    value={elem.value}
                    onChangeHandler={elem.onChange}
                    error={elem.isErr}
                    helperText={elem.errMsg}
                    height={"47px"}
                    radius={"5px"}
                  />
                </Stack>
              </Grid>
            );
          }
        }
      })}
    </ScrollableLayout>
  );
}
