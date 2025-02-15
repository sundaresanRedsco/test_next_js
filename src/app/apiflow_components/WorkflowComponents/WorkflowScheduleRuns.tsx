import { PrimaryTypography, SecondaryTypography } from "@/app/Styles/signInUp";
import theme from "@/Theme/theme";
import { FormControl, Popover } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GInput from "@/app/apiflow_components/global/GInput";
// import GSelect from "../global/GSelect";
import GSelect from "@/app/apiflow_components/sign/discovery/GSelect";
import GButton from "../global/GlobalButtons";
import { TextOutlinedInput } from "@/app/hooks/operations/useOperationHelpers";
import { usePathname } from "next/navigation";
import { RootStateType } from "@/app/Redux/store";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import { environmentReducer } from "@/app/Redux/apiManagement/environmentReducer";
import {
  CreateScheduleRunDesignApi,
  GetRunScheduleDetailsByFlowId,
  UpdateScheduleRunDesignApi,
} from "@/app/Redux/apiManagement/flowReducer";

const WorkflowScheduleRuns = (props: any) => {
  const { open, setOpen } = props;
  const pathname = usePathname();

  const dispatch = useDispatch<any>();

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { currentEnvironment } = useSelector<RootStateType, environmentReducer>(
    (state) => state.apiManagement.environment
  );

  const [flowId, setFlowId] = useState<any>(null);

  const [error, setError] = useState<any>({});

  const [scheduledRequestfrequencyDay, setScheduledRequestfrequencyDay] =
    useState("EVERY_DAY");

  const [scheduledRequestfrequencyTime, setScheduledRequestfrequencyTime] =
    useState("12AM");

  const [scheduledRequestfrequencyHour, setScheduledRequestfrequencyHour] =
    useState("EVERY_HOUR");

  const [runFrequencyValue, setRunFrequencyValue] = useState("WEEK_TIMER");

  const [scheduleRunValues, setScheduleRunValues] = useState({
    schedule_id: "",
    schedule_name: "",
    frequency_type: "MINUTE_TIMER",
    repeat_schedule_w_m_d: "EVERY_5_MINUTES",
    schedule_description: "",
  });

  const handleClosePopover = () => {
    setOpen(false);
  };

  const handleScheduleRunState = (field: any, event: any) => {
    setScheduleRunValues((prevValues) => ({
      ...prevValues,
      [field]: event,
    }));
  };

  const handleGetScheduleRun = () => {
    if (flowId && currentEnvironment) {
      let data = {
        project_id: currentEnvironment,
        flow_id: flowId,
      };

      dispatch(GetRunScheduleDetailsByFlowId(data))
        .unwrap()
        .then((res: any) => {
          setScheduleRunValues({
            schedule_id: res[0]?.id,
            schedule_name: res[0]?.schedule_name,
            frequency_type: "MINUTE_TIMER",
            repeat_schedule_w_m_d: res[0]?.repeat_schedule_w_m_d,
            schedule_description: res[0]?.schedule_description,
          });
        })
        .catch((error: any) => {});
    }
  };

  const handleCreateScheduleRun = () => {
    let createData = {
      project_id: currentEnvironment,
      requestBody: {
        flow_id: flowId,
        workspace_id: currentWorkspace?.id,
        repeat_schedule_w_m_d: scheduleRunValues?.repeat_schedule_w_m_d,
        schedule_name: scheduleRunValues?.schedule_name,
        schedule_description: scheduleRunValues?.schedule_description,
        frequency_type: "MINUTE_TIMER",
      },
    };

    dispatch(CreateScheduleRunDesignApi(createData))
      .unwrap()
      .then((res: any) => {
        handleGetScheduleRun();
      })
      .catch((error: any) => {});
  };

  const handleUpdateScheduleRun = () => {
    let updatedDaa = {
      project_id: currentEnvironment,
      requestBody: {
        schedule_id: scheduleRunValues?.schedule_id,
        is_paused: true,
        repeat_schedule_w_m_d: scheduleRunValues?.repeat_schedule_w_m_d,
        frequency_type: scheduleRunValues?.frequency_type,
      },
    };

    dispatch(UpdateScheduleRunDesignApi(updatedDaa))
      .unwrap()
      .then((res: any) => {
        handleGetScheduleRun();
      })
      .catch((error: any) => {});
  };

  const handleScheduleRun = () => {
    if (scheduleRunValues?.schedule_id) {
      handleUpdateScheduleRun();
    } else {
      handleCreateScheduleRun();
    }
  };

  useEffect(() => {
    const pathParts = pathname.split("/");

    const workflowIndex = pathParts.indexOf("workflow");

    if (workflowIndex !== -1 && workflowIndex + 1 < pathParts.length) {
      setFlowId(pathParts[workflowIndex + 1]);
    }
  }, [pathname]);

  useEffect(() => {
    if (flowId && currentEnvironment) {
      handleGetScheduleRun();
    }
  }, [currentEnvironment, flowId]);

  return (
    <Box>
      <Popover
        open={open}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          zIndex: 9999,
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.summaryBgColor.main,
            width: "580px",
            height: "380px",

            // position: "absolute",
          },
        }}
      >
        <Box sx={{ padding: "15px" }}>
          <Box>
            <PrimaryTypography style={{ fontSize: "14px", fontWeight: 600 }}>
              Schedule Configuration
            </PrimaryTypography>
          </Box>
          <Box>
            <SecondaryTypography
              style={{
                fontSize: "12px",
                color: `${theme.palette.secondaryColor.main}`,
              }}
            >
              Your collection will be automatically run on the Cloud at the
              configured frequency.
            </SecondaryTypography>
          </Box>
          <>
            <Box style={{ marginTop: "10px" }}>
              <PrimaryTypography
                style={{
                  fontSize: "14px",
                  fontFamily: "FiraSans-regular",
                  fontWeight: 900,
                }}
              >
                Schedule name
              </PrimaryTypography>
              <Box>
                <GInput
                  value={scheduleRunValues?.schedule_name}
                  fullWidth={true}
                  height="40px"
                  padding="7px 10px"
                  size="normal"
                  onChangeHandler={(e: any) => {
                    handleScheduleRunState("schedule_name", e.target.value);
                  }}
                  error={error?.schedule_name ? error?.schedule_name : ""}
                  helperText={error?.schedule_name ? error?.schedule_name : ""}
                />
                <span
                  style={{
                    whiteSpace: "pre",
                  }}
                >
                  {"  "}
                </span>
              </Box>
            </Box>

            <Box>
              {/* <PrimaryTypography
                style={{
                  fontSize: "14px",
                  fontFamily: "FiraSans-regular",
                  fontWeight: 900,
                }}
              >
                {" "}
                Run Frequency Type
              </PrimaryTypography> */}
              <Box></Box>
            </Box>

            <Box
              sx={{
                marginTop: "20px",
              }}
            >
              {scheduleRunValues?.frequency_type === "MINUTE_TIMER" && (
                <Box>
                  <PrimaryTypography
                    style={{
                      fontSize: "14px",
                      fontFamily: "FiraSans-regular",
                      fontWeight: 900,
                    }}
                  >
                    {" "}
                    Run Frequency
                  </PrimaryTypography>

                  <GInput
                    disabled
                    value={scheduleRunValues?.repeat_schedule_w_m_d}
                    fullWidth={true}
                    height="40px"
                    padding="7px 10px"
                    size="normal"
                    onChangeHandler={(e: any) => {
                      handleScheduleRunState(
                        "repeat_schedule_w_m_d",
                        e.target.value
                      );
                    }}
                    error={
                      error?.repeat_schedule_w_m_d
                        ? error?.repeat_schedule_w_m_d
                        : ""
                    }
                    helperText={
                      error?.repeat_schedule_w_m_d
                        ? error?.repeat_schedule_w_m_d
                        : ""
                    }
                  />
                </Box>
              )}
            </Box>

            <div className="api_designFlow_description">
              <PrimaryTypography
                style={{
                  fontSize: "14px",
                  fontFamily: "FiraSans-regular",
                  fontWeight: 900,
                  marginTop: "20px",
                }}
              >
                ApiFlow Description
              </PrimaryTypography>
              <FormControl>
                <div style={{ marginTop: "10px" }}>
                  <TextOutlinedInput
                    value={scheduleRunValues?.schedule_description}
                    data-test={"project-description"}
                    style={{
                      width: "547px",
                      height: "50px",
                      borderRadius: "7px",
                      fontWeight: 700,
                    }}
                    onChange={(e: any) => {
                      handleScheduleRunState(
                        "schedule_description",
                        e.target.value
                      );
                    }}
                    onKeyUp={(event: any) => {}}
                  />
                </div>
              </FormControl>
            </div>
          </>
          <div style={{ margin: "10px" }} className="api_designFlow_buttons">
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div>
                <GButton
                  buttonType="primary"
                  fontSize="14px"
                  label={`Cancel`}
                  background="transparent"
                  onClickHandler={handleClosePopover}
                />
              </div>
              <div style={{ marginLeft: "10px" }}>
                <GButton
                  buttonType="primary"
                  fontSize="14px"
                  label={`Schedule Run`}
                  onClickHandler={handleScheduleRun}
                  dataTest="save-project-btn"
                />
              </div>
            </div>
          </div>
        </Box>
      </Popover>
    </Box>
  );
};

export default WorkflowScheduleRuns;
