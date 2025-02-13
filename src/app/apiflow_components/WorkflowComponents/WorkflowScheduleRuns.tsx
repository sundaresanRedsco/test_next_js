import { PrimaryTypography, SecondaryTypography } from "@/app/Styles/signInUp";
import theme from "@/Theme/theme";
import { FormControl, Popover } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GInput from "@/app/apiflow_components/global/GInput";
import GSelect from "../global/GSelect";
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
        frequency_type: scheduleRunValues?.frequency_type,
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
                  // width="500px"
                  //   margin="10px 0px"
                  padding="7px 0px"
                  size="normal"
                  onChangeHandler={(e: any) => {
                    handleScheduleRunState("schedule_name", e.target.value);
                  }}
                  // onKeyDown={(event: any) => {
                  //   if (event?.key === "Enter") {
                  //     handleCreateApiFlowValidation();
                  //   }
                  // }}
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
              <PrimaryTypography
                style={{
                  fontSize: "14px",
                  fontFamily: "FiraSans-regular",
                  fontWeight: 900,
                }}
              >
                {" "}
                Run Frequency Type
              </PrimaryTypography>
              <Box>
                <GSelect
                  fullWidth={true}
                  size={"small"}
                  radius="4px"
                  options={[
                    {
                      label: "Minute timer",
                      value: "MINUTE_TIMER",
                    },
                    // { label: "Hour timer", value: "HOUR_TIMER" },
                    // { label: "Week timer", value: "WEEK_TIMER" },
                  ]}
                  value={scheduleRunValues?.frequency_type}
                  onChange={(val: any) => {
                    setRunFrequencyValue(val);
                    handleScheduleRunState("frequency_type", val);
                  }}
                />
              </Box>
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
                  <GSelect
                    fullWidth={true}
                    size={"small"}
                    radius="4px"
                    options={[
                      {
                        label: "Every_5_MINUTES",
                        value: "Every_5_MINUTES",
                      },
                      {
                        label: "Every_10_MINUTES",
                        value: "Every_10_MINUTES",
                      },
                      {
                        label: "Every_15_MINUTES",
                        value: "Every_15_MINUTES",
                      },
                      {
                        label: "Every_20_MINUTES",
                        value: "Every_20_MINUTES",
                      },
                      {
                        label: "Every_30_MINUTES",
                        value: "Every_30_MINUTES",
                      },
                      {
                        label: "Every_40_MINUTES",
                        value: "Every_40_MINUTES",
                      },
                      {
                        label: "Every_50_MINUTES",
                        value: "Every_50_MINUTES",
                      },
                    ]}
                    value={scheduleRunValues?.repeat_schedule_w_m_d}
                    onChange={(val: any) => {
                      setScheduledRequestfrequencyDay(val);
                      handleScheduleRunState("repeat_schedule_w_m_d", val);
                    }}
                  />
                </Box>
              )}
            </Box>
            {/* <Box>
              {scheduleRunValues?.frequency_type === "WEEK_TIMER" && (
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "530px",
                      marginTop: "10px",
                      // marginLeft:'-45px'
                    }}
                  >
                    <div>
                      <GSelect
                        fullWidth={false}
                        size={"small"}
                        radius="4px"
                        width="260px"
                        // borderColor={`${theme.palette.primaryBlack.main}`}
                        options={[
                          {
                            label: "Every day",
                            value: "EVERY_DAY",
                          },
                          {
                            label: "Every weekday (Monday-Friday)",
                            value: "WEEKDAY",
                          },
                          {
                            label: "Every Monday",
                            value: "MONDAY",
                          },
                          {
                            label: "Every Tuesday",
                            value: "TUESDAY",
                          },
                          {
                            label: "Every Wednesday",
                            value: "WEDNESDAY",
                          },
                          {
                            label: "Every Thursday",
                            value: "THURSDAY",
                          },
                          {
                            label: "Every Friday",
                            value: "FRIDAY",
                          },
                          {
                            label: "Every Saturday",
                            value: "SATURDAY",
                          },
                          {
                            label: "Every Sunday",
                            value: "SUNDAY",
                          },
                        ]}
                        value={scheduledRequestfrequencyDay}
                        onChange={(val: any) => {
                          setScheduledRequestfrequencyDay(val);
                        }}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <SecondaryTypography style={{ fontSize: "14px" }}>
                        at
                      </SecondaryTypography>
                    </div>
                    <div style={{}}>
                      <GSelect
                        fullWidth={false}
                        size={"small"}
                        radius="4px"
                        width="200px"
                        borderColor={`${theme.palette.primaryBlack.main}`}
                        options={[
                          { label: "12:00 AM", value: "12:00 AM" },
                          { label: "1:00 AM", value: "1:00 AM" },
                          { label: "2:00 AM", value: "2:00 AM" },
                          { label: "3:00 AM", value: "3:00 AM" },
                          { label: "4:00 AM", value: "4:00 AM" },
                          { label: "5:00 AM", value: "5:00 AM" },
                          { label: "6:00 AM", value: "6:00 AM" },
                          { label: "7:00 AM", value: "7:00 AM" },
                          { label: "8:00 AM", value: "8:00 AM" },
                          { label: "9:00 AM", value: "9:00 AM" },
                          { label: "10:00 AM", value: "10:00 AM" },
                          { label: "11:00 AM", value: "11:00 AM" },
                          { label: "12:00 PM", value: "12:00 PM" },
                          { label: "1:00 PM", value: "1:00 PM" },
                          { label: "2:00 PM", value: "2:00 PM" },
                          { label: "3:00 PM", value: "3:00 PM" },
                          { label: "4:00 PM", value: "4:00 PM" },
                          { label: "5:00 PM", value: "5:00 PM" },
                          { label: "6:00 PM", value: "6:00 PM" },
                          { label: "7:00 PM", value: "7:00 PM" },
                          { label: "8:00 PM", value: "8:00 PM" },
                          { label: "9:00 PM", value: "9:00 PM" },
                          { label: "10:00 PM", value: "10:00 PM" },
                          { label: "11:00 PM", value: "11:00 PM" },
                        ]}
                        value={
                          // scheduledRequestfrequencyType
                          scheduledRequestfrequencyTime
                        }
                        onChange={(val: any) => {
                          setScheduledRequestfrequencyTime(val);
                        }}
                      />
                    </div>
                  </div>
                </Box>
              )}
            </Box> */}
            {/* <Box>
              {scheduleRunValues?.frequency_type === "HOUR_TIMER" && (
                <div style={{ marginTop: "10px" }}>
                  <GSelect
                    fullWidth={true}
                    size={"small"}
                    radius="4px"
                    // width="530px"
                    borderColor={`${theme.palette.primaryBlack.main}`}
                    options={[
                      {
                        label: "Every hour",
                        value: "EVERY_HOUR",
                      },
                      {
                        label: "Every 2 hours",
                        value: "EVERY_2_HOURS",
                      },
                      {
                        label: "Every 3 hours",
                        value: "EVERY_3_HOURS",
                      },
                      {
                        label: "Every 4 hours",
                        value: "EVERY_4_HOURS",
                      },
                      {
                        label: "Every 6 hours",
                        value: "EVERY_6_HOURS",
                      },
                      {
                        label: "Every 12 hours",
                        value: "EVERY_12_HOURS",
                      },
                    ]}
                    value={scheduledRequestfrequencyHour}
                    onChange={(val: any) => {
                      setScheduledRequestfrequencyHour(val);
                    }}
                  />
                </div>
              )}
            </Box> */}
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
                      width: "500px",
                      height: "50px",
                      // borderColor: "#9CA3AF",
                      borderColor: "0 0 0 1.3px #F3F3F340",
                      borderRadius: "4px",
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
