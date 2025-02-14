"use client";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import GInput from "../../../apiflow_components/global/GInput";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Grid2,
  IconButton,
  Switch,
  Typography,
  Stack,
} from "@mui/material";
import GButton from "@/app/apiflow_components/global/GlobalButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import {
  GetWorkspacesById,
  UpdateWorkspace,
  workspaceReducer,
} from "@/app/Redux/apiManagement/workspaceReducer";
import {
  formatWorkspaceDate,
  getRandomColor,
  getValueOrDefault,
} from "@/app/Helpers/helpersFunctions";
import {
  apiInvitationReducer,
  GetAllAcceptedInvitations,
  updateTableEndValue,
  updateTableStartValue,
} from "@/app/Redux/apiInvitationReducer";

import dynamic from "next/dynamic";
import CreateWorkflowModal from "@/app/apiflow_components/workspace/CreateWorkflowModal";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import { usePathname } from "next/navigation";
import { CommonReducer } from "@/app/Redux/commonReducer";
import theme from "@/Theme/theme";

const GSwitch = dynamic(
  () => import("@/app/apiflow_components/global/GSwitch"),
  { ssr: false }
);

const DeleteIconNew = dynamic(
  () => import("@/app/Assests/icons/DeleteIcon.svg"),
  { ssr: false }
);

const ProfileBack = dynamic(
  () => import("@/app/Assests/icons/ProfileBackIcon.svg"),
  { ssr: false }
);

const LeftArrowIcon = dynamic(
  () => import("@/app/Assests/icons/LeftArrow.svg"),
  { ssr: false }
);

const StyledProfileBack = styled(ProfileBack)`
  font-size: 2rem;
  color: white;
`;

const TextTypography = styled(Typography)`
  font-family: FiraSans-Regular;
  color: white;
  font-size: 1rem;
  margin-top: 0.7rem;
`;

const HeadingTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #ffffffbf;
  font-size: 1.3rem;
  margin-top: 0.7rem;
`;

const TableTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: ${theme.palette.textPrimaryColor.main};
  font-size: 0.8rem;
`;

const PurpleSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#FFFFFF", // White color for the toggle circle
    "& + .MuiSwitch-track": {
      backgroundColor: "#7A43FE", // Vibrant purple when checked
    },
  },
  "& .MuiSwitch-switchBase": {
    color: "#FFFFFF", // White circle when unchecked
    "& + .MuiSwitch-track": {
      backgroundColor: "#7A43FE", // Grey background when unchecked
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 20, // Smooth rounded edges for the track
  },
}));

function OverView() {
  const dispatch = useDispatch<any>();
  const containerRef = useRef<any>(null);
  const containerRefClick = useRef(null);

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const {
    tableStartValue,
    tableEndValue,

    acceptedInvitationTotalCount,
  } = useSelector<RootStateType, apiInvitationReducer>(
    (state) => state.apiInvitation
  );

  const avatarText = (val: any) => {
    return val ? val?.substring(0, 3).toUpperCase() : "";
  };

  const [avatarImage, setAvatarImage] = useState<any>(
    currentWorkspace?.profile_picture
  );
  const [isChannel, setIschannel] = useState(true);

  const [data, setData] = useState({
    name: currentWorkspace?.name,
    CreatedBy: currentWorkspace?.created_by,
    description: currentWorkspace?.summary,
    CreatedDate: currentWorkspace?.created_at,
  });

  const [initialData, setInitialData] = useState({
    name: currentWorkspace?.name,
    description: currentWorkspace?.summary,
    avatarImage: avatarImage,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tableList, setTableList] = useState<any[]>([]);

  const [avatarColor, setAvatarColor] = useState<string>("");

  const fetchTableData = async (page: number) => {
    let data = {
      workspace_id: currentWorkspace?.id,
      project_id: "",
      group_id: "",
      startValue: tableStartValue,
      endValue: page,
    };

    dispatch(GetAllAcceptedInvitations(data))
      .unwrap()
      .then((invitationRes: any) => {
        setTableList((prevValues: any) => {
          const newData = Array.isArray(invitationRes?.invitations)
            ? invitationRes?.invitations
            : [];
          const updatedValues = [...prevValues];

          newData?.forEach((val: any) => {
            if (
              !prevValues?.some((prevData: any) => prevData?.id === val?.id)
            ) {
              updatedValues.push(val);
            }
          });

          return updatedValues;
        });
      })
      .catch((error: any) => {})
      .finally(() => setIsLoading(false));
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        if (tableEndValue <= acceptedInvitationTotalCount) {
          dispatch(updateTableStartValue(tableStartValue + 5));
          dispatch(updateTableEndValue(tableEndValue + 5));
        }
      }
    }
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (key: any, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggle = () => {
    setIschannel((prev) => !prev);
  };

  const handleUpdateWorkspace = () => {
    let workspaceId = currentWorkspace?.id as string;
    let udpdateData = {
      workspace_id: currentWorkspace?.id,
      details: {
        name: data?.name,
        descriptions: data?.description,
        profile_picture: avatarImage,
        is_channel: isChannel,
      },
    };

    dispatch(UpdateWorkspace(udpdateData))
      .unwrap()
      .then((updateRes: any) => {
        if (updateRes) {
          dispatch(GetWorkspacesById(workspaceId))
            .unwrap()
            .then((getRes: any) => {
              setInitialData({
                name: currentWorkspace?.name,
                description: currentWorkspace?.summary,
                avatarImage: avatarImage,
              });
            })
            .catch((error: any) => {});
        }
      })
      .catch((error: any) => {});
  };

  const hasChanges = () => {
    return (
      data.name !== initialData.name ||
      data.description !== initialData.description ||
      (avatarImage !== null && avatarImage !== initialData?.avatarImage)
    );
  };

  useEffect(() => {
    if (currentWorkspace) {
      setData({
        name: currentWorkspace.name,
        CreatedBy: currentWorkspace.created_by,
        description: currentWorkspace?.summary,
        CreatedDate: currentWorkspace.created_at,
      });
    }
  }, [currentWorkspace]);

  useEffect(() => {
    const container = document.getElementById("scrollable-container");
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchTableData(tableEndValue);
  }, [tableEndValue, currentWorkspace]);

  // Detect click outside the component
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (hasChanges()) {
          handleUpdateWorkspace();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [data, avatarImage]);

  useEffect(() => {
    dispatch(GetWorkspacesById(currentWorkspace?.id as string))
      .unwrap()
      .then((getRes: any) => {})
      .catch((error: any) => {});
  }, [currentWorkspace?.id]);

  useEffect(() => {
    setAvatarColor(getRandomColor());
  }, []);
  const {
    setApiDataStore,
    handleOpenSignUp,
    setIsImportAws,
    setFormDataStore,
  }: any = useSignUpStore();
  const pathname = usePathname();
  const workspaceId = pathname?.split("/")[4];

  return (
    <div>
      <div>
        <HeadingTypography style={{ marginTop: "1rem" }}>
          {data?.name} <LeftArrowIcon />
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "FiraSans-Regular",
              fontSize: "1.3rem",
              margin: "0rem 0.3rem",
              fontWeight: "600",
            }}
          >
            Settings
          </span>
          <LeftArrowIcon />
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "FiraSans-Regular",
              fontSize: "1.3rem",
              marginLeft: "0.3rem",
              fontWeight: "600",
            }}
          >
            Overview
          </span>{" "}
        </HeadingTypography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 0px",
        }}
      >
        <TextTypography sx={{ fontSize: "1.3rem", fontWeight: "600" }}>
          Workspace Profile
        </TextTypography>
        <Box>
          <Stack direction="row" spacing={2}>
            <TextTypography>Channel</TextTypography>
            <span style={{ marginTop: "5px" }}>
              <GSwitch
                value={isChannel}
                handleChange={handleToggle}
                name={"toggleSwitch"}
              />
            </span>
          </Stack>
        </Box>
      </div>
      <Box
        sx={{
          background: "#241D35",
          borderRadius: "20px",
          padding: "10px",
        }}
      >
        <Grid2 container spacing={2} ref={containerRefClick}>
          <Grid2 size={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
            <Box
              sx={{
                margin: "1rem 0rem",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  background:
                    avatarImage || avatarImage === "null" ? "" : "#3F64FA",
                  border: avatarImage ? "1px solid #F3F3F340" : "",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: 900,
                  width: 150,
                  height: 150,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "FiraSans-Regular",
                }}
                src={
                  currentWorkspace?.profile_picture
                    ? currentWorkspace?.profile_picture
                    : avatarImage
                }
              >
                {(!avatarImage || avatarImage === "null") &&
                  data?.name?.slice(0, 3).toUpperCase()}
              </Avatar>

              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#7A43FE",
                  border: "solid 3.5px #241D35",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  marginLeft: {
                    xs: "50%",
                    sm: "50%",
                    md: "30%",
                    lg: "20%",
                    xl: "20%",
                  },
                  marginTop: {
                    xs: "50%",
                    sm: "50%",
                    md: "40%",
                    lg: "30%",
                    xl: "30%",
                  },
                  zIndex: "99",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-button"
                  onChange={handleImageUpload}
                />
                <label htmlFor="upload-button">
                  <IconButton component="span">
                    <StyledProfileBack />
                  </IconButton>
                </label>
              </Box>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 6, md: 6, lg: 8, xl: 8 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sx: "column",
                  md: "column",
                  lg: "row",
                  xl: "row",
                },
                marginTop: "10px",
              }}
            >
              <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <TextTypography
                  style={{
                    color: "#FFFFFFBF",
                    fontSize: "0.8rem",
                    fontWeight: "400",
                    margin: "10px",
                  }}
                >
                  Name
                  <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <GInput
                      value={data?.name}
                      fullWidth
                      margin={"10px 0px 0px 0px"}
                      height="40px"
                      onChangeHandler={(e: any) => {
                        let name = e.target.value;
                        handleChange("name", name);
                      }}
                    />
                  </Grid2>
                </TextTypography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                  <TextTypography
                    style={{
                      color: "#FFFFFFBF",
                      fontSize: "0.8rem",
                      fontWeight: "400",
                      margin: "10px",
                    }}
                  >
                    Description
                    <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                      <GInput
                        value={data?.description as string}
                        fullWidth
                        margin={"10px 0px 0px 0px"}
                        height="40px"
                        onChangeHandler={(e: any) => {
                          let name = e.target.value;
                          handleChange("description", name);
                        }}
                      />
                    </Grid2>
                  </TextTypography>
                </Grid2>
              </Grid2>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sx: "column",
                  md: "column",
                  lg: "row",
                  xl: "row",
                },
              }}
            >
              <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <TextTypography
                  style={{
                    color: "#FFFFFFBF",
                    fontSize: "0.8rem",
                    marginTop: "2rem",
                    fontWeight: "400",
                    margin: "10px",
                  }}
                >
                  Created By
                  <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <GInput
                      value={data?.CreatedBy}
                      color="#FFFFFFA6"
                      disabledColor="#FFFFFFA6"
                      fullWidth
                      disabled={true}
                      height="40px"
                      margin={"10px 0px 0px 0px"}
                      border="none"
                      background="rgba(18, 18, 18, 0.35)"
                      onChangeHandler={(value: any) => {}}
                    />
                  </Grid2>
                </TextTypography>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                <TextTypography
                  style={{
                    color: "#FFFFFFBF",
                    fontSize: "0.8rem",
                    marginTop: "2rem",
                    fontWeight: "400",
                    margin: "10px",
                  }}
                >
                  Created Date
                  <Grid2 size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <GInput
                      value={formatWorkspaceDate(data?.CreatedDate)}
                      color="#FFFFFFA6"
                      disabledColor="#FFFFFFA6"
                      fullWidth
                      disabled={true}
                      height="40px"
                      margin={"10px 0px 0px 0px"}
                      background="rgba(18, 18, 18, 0.35)"
                      border="none"
                      onChangeHandler={(value: any) => {}}
                    />
                  </Grid2>
                </TextTypography>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>

        <Box>
          <TableContainer
            ref={containerRef}
            onScroll={handleScroll}
            sx={{
              height: 300,
              marginTop: "1rem",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "2px",
              },
            }}
          >
            <Table sx={{ tableLayout: "fixed", width: "100%" }}>
              <TableHead>
                <TableRow
                  sx={{
                    background: "#362F47",
                    "&.MuiTableRow-root .MuiTableCell-root": {
                      borderBottom: "none",
                    },
                  }}
                >
                  {["E-Mail ID", "Name", "Role", "Action"].map(
                    (header, index) => (
                      <TableCell
                        key={index}
                        align={header === "E-Mail ID" ? "left" : "center"}
                        sx={{
                          color: `${theme.palette.textPrimaryColor.main}`,
                          fontFamily: "FiraSans-Regular",
                          fontWeight: "500",
                        }}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {tableList?.length > 0 ? (
                  tableList?.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      sx={{
                        position: "relative",
                        "&.MuiTableRow-root .MuiTableCell-root": {
                          borderBottom: "1.5px solid #FFFFFF26",
                        },
                      }}
                    >
                      <TableCell key="email">
                        <div className="d-flex">
                          <Avatar
                            sx={{
                              background: getRandomColor(),
                              color: `${theme.palette.textPrimaryColor.main}`,
                              width: 30,
                              height: 30,
                            }}
                          >
                            <TableTypography>
                              {row.user_name?.[0]?.toUpperCase()}
                            </TableTypography>
                          </Avatar>{" "}
                          <TableTypography style={{ margin: "0.2rem 0.6rem" }}>
                            {getValueOrDefault(row?.email)}
                          </TableTypography>
                        </div>
                      </TableCell>
                      <TableCell key="name" align="center">
                        <TableTypography>
                          {getValueOrDefault(row?.user_name)}
                        </TableTypography>
                      </TableCell>
                      <TableCell key="role" align="center">
                        <TableTypography>
                          {getValueOrDefault(row?.role_name)}
                        </TableTypography>
                      </TableCell>
                      <TableCell key="action" align="center">
                        <TableTypography>{<DeleteIconNew />}</TableTypography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    sx={{
                      "&.MuiTableRow-root .MuiTableCell-root": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TableCell
                      colSpan={4}
                      align="center"
                      sx={{
                        color: "#FFFFFF",
                        height: "240px",
                      }}
                    >
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <GButton
          background="#7A43FE"
          color="#FFFFFF"
          label={"Import"}
          onClickHandler={() => {
            setApiDataStore("workspace", { id: workspaceId });
            setFormDataStore("gateway", "AWS");
            setIsImportAws(true);
            handleOpenSignUp();
          }}
        />

        <GButton
          background="#7A43FE"
          color="#FFFFFF"
          marginLeft="1rem"
          label={"Export"}
        />
      </div>
      <CreateWorkflowModal />
    </div>
  );
}

export default OverView;
