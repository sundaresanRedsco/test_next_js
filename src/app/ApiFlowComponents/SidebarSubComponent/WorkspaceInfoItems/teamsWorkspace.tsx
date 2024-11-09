// import {
//   Box,
//   InputAdornment,
//   MenuItem,
//   TextField,
//   useTheme,
// } from "@mui/material";
// import React, { useEffect, useRef, useState } from "react";
// import { SecondaryTextTypography } from "../../../Styles/signInUp";
// import GAvatar from "../../Global/GAvatar";
// import UserV2Icon from "../../../Assests/icons/v2UserIcon.svg";
// import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
// import GBadge from "../../Global/GBadge";
// import GButton from "../../Global/GButton";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   GetWorkspacesByUserId,
//   setCurrentWorkspace,
//   workspaceReducer,
// } from "../../../Redux/apiManagement/workspaceReducer";
// import Cookies from "js-cookie";
// import { RootStateType } from "../../../Redux/store";
// import { CommonReducer } from "../../../Redux/commonReducer";
// import { useLocation } from "react-router-dom";
// import { setTabs } from "../../../Redux/tabReducer";
// import {
//   resetEnvironmentState,
//   setCurrentEnvironment,
//   setCurrentEnvironmentDetails,
// } from "../../../Redux/apiManagement/environmentReducer";
// import { setCurrentStage } from "../../../Redux/apiManagement/projectReducer";
// const TeamsWorkspace = () => {
//   const dispatch = useDispatch<any>();

//   const userId = Cookies.get("USRID");
//   const containerRef = useRef<any>(null);
//   const queryParams = new URLSearchParams(window.location.search);
//   const workspaceId = queryParams.get("workspaceId");
//   const { userProfile } = useSelector<RootStateType, CommonReducer>(
//     (state) => state.common,
//   );

//   const { workspaceList, currentWorkspace } = useSelector<
//     RootStateType,
//     workspaceReducer
//   >((state) => state.apiManagement.workspace);

//   console.log(currentWorkspace, "currentWorkspacedsdsdsdsd");

//   const theme = useTheme();
//   const manageTeamValues = [
//     { name: "User1", icon: <UserV2Icon /> },
//     { name: "User2", icon: <UserV2Icon /> },
//     { name: "User3", icon: <UserV2Icon /> },
//     { name: "User4", icon: <UserV2Icon /> },
//   ];

//   const [manageTeamVal, setManageTeamVal] = useState<any[]>(manageTeamValues);
//   const [offset, setOffset] = useState(0);
//   const limit = 5;
//   const [loading, setLoading] = useState(false);
//   const [teamsCount, setTeamsCount] = useState(0);

//   // const loadMoreData = () => {
//   //   const data = {
//   //     user_id: userProfile?.user.user_id,
//   //     // user_id: "1bd10a0065da47ed8a23e6590dc59a89",
//   //     offset,
//   //     limit,
//   //   };

//   //   setLoading(true);
//   //   dispatch(GetWorkspacesByUserId(data))
//   //     .unwrap()
//   //     .then((workspaceRes: any) => {
//   //       if (workspaceRes?.length > 0) {
//   //         setOffset((prevOffset) => prevOffset + limit);
//   //         setTeamsCount(workspaceList?.length || 0);

//   //         if (!currentWorkspace) {
//   //           const currentSelectedWorkspace =
//   //             workspaceList?.find((x) => x.id === workspaceId) ||
//   //             workspaceList[0];

//   //           dispatch(setCurrentWorkspace(currentSelectedWorkspace));
//   //         }
//   //       }
//   //       setLoading(false);
//   //     })
//   //     .catch((error: any) => {
//   //       console.log("ErrorWorkspace: ", error);
//   //       setLoading(false);
//   //     });
//   // };

//   const fetchPageData = async (offsetVal: number) => {
//     const data = {
//       user_id: userProfile?.user.user_id,
//       // user_id: "1bd10a0065da47ed8a23e6590dc59a89",
//       offset: offsetVal,
//       limit: limit,
//     };

//     setLoading(true);
//     dispatch(GetWorkspacesByUserId(data))
//       .unwrap()
//       .then((workspaceRes: any) => {
//         if (workspaceRes?.length > 0) {
//           setOffset((prevOffset) => prevOffset + limit);
//           setTeamsCount(workspaceList?.length || 0);

//           if (!currentWorkspace) {
//             const currentSelectedWorkspace =
//               workspaceList?.find((x) => x.id === workspaceId) ||
//               workspaceList[0];

//             dispatch(setCurrentWorkspace(currentSelectedWorkspace));
//           }
//         }
//         setLoading(false);
//       })
//       .catch((error: any) => {
//         console.log("ErrorWorkspace: ", error);
//         setLoading(false);
//       });
//   };

//   // const handleScrollVal = (event: React.UIEvent<HTMLDivElement>) => {
//   //   const bottom =
//   //     event.currentTarget.scrollHeight ===
//   //     event.currentTarget.scrollTop + event.currentTarget.clientHeight;

//   //   if (bottom && !loading) {
//   //     loadMoreData();
//   //   }
//   // };

//   const handleScroll = () => {
//     if (containerRef?.current) {
//       const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
//       if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
//         // setCurrentPage((prevPage) => prevPage + 8);
//         setOffset((prevPage) => prevPage + 5);
//       }
//     }
//   };

//   const handleSelectedTeam = (wsidVal: string) => {
//     Cookies.set("WSID", wsidVal);
//     sessionStorage.setItem("WSID", wsidVal);

//     const currentSelectedWorkspace = workspaceList?.find(
//       (x) => x.id === wsidVal,
//     );

//     console.log(
//       currentSelectedWorkspace,
//       wsidVal,
//       "currentSelectedWorkspacecurrentSelectedWorkspace",
//     );
//     dispatch(resetEnvironmentState());
//     dispatch(setCurrentWorkspace(currentSelectedWorkspace));
//     const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}?tabs=get_started`;
//     dispatch(setTabs(["get_started"]));
//     window.history.pushState({}, "", newUrl);
//   };

//   useEffect(() => {
//     // const container = document.getElementById(maninContainer);
//     const container = document.getElementById("scrollable-container");
//     container?.addEventListener("scroll", handleScroll);

//     return () => {
//       container?.removeEventListener("scroll", handleScroll);
//     };
//     // }, [maninContainer]); // Include maninContainer as a dependency
//   }, []);

//   useEffect(() => {
//     if (userProfile.user.user_id) {
//       // loadMoreData();
//       fetchPageData(offset);
//     }
//   }, [userProfile.user.user_id, offset]);

//   console.log(
//     "currentSelectedWorkspacecurrentSelectedWorkspace: ",
//     currentWorkspace?.name,
//   );

//   return (
//     <Box>
//       <TextField
//         select
//         fullWidth
//         size="small"
//         value={currentWorkspace?.id || ""}
//         sx={{
//           "& .MuiOutlinedInput-input": {
//             display: "flex",
//             alignItems: "center", // Centers the content vertically
//             height: "100%", // Ensures full height for the select input
//             boxSizing: "border-box", // Ensure consistent padding and layout
//           },
//           "& .MuiOutlinedInput-root": {
//             backgroundColor: theme.palette.v2TeamWorkspaceBgColor.main,
//             borderRadius: "2px",
//             border: "none",
//             height: "100%",
//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               border: "none",
//             },
//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               border: "none",
//             },
//           },
//           "& .MuiOutlinedInput-notchedOutline": {
//             border: "none",
//           },
//           "& .MuiSelect-icon": {
//             display: "none",
//           },
//         }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <GBadge badgeContent={teamsCount} color="#FE6565" position="left">
//                 <KeyboardArrowDownOutlinedIcon
//                   style={{
//                     fontSize: "13px",
//                     cursor: "pointer",
//                     fontFamily: "Inter-Regular ! important",
//                   }}
//                 />
//               </GBadge>
//             </InputAdornment>
//           ),
//         }}
//       >
//         {currentWorkspace && (
//           <MenuItem
//             value={currentWorkspace?.id}
//             onClick={() => handleSelectedTeam(currentWorkspace?.id)}
//           >
//             <SecondaryTextTypography
//               style={{
//                 fontSize: "10px",
//                 color: "#282F79",
//                 fontWeight: 600,
//               }}
//             >
//               {currentWorkspace?.name}
//             </SecondaryTextTypography>
//           </MenuItem>
//         )}

//         <div
//           className="test"
//           style={{
//             maxHeight: "100px", // Adjust this height as needed
//             overflowY: "auto",
//           }}
//           ref={containerRef}
//           onScroll={handleScroll}
//         >
//           {workspaceList
//             ?.filter((x) => x.id !== currentWorkspace?.id)
//             .map((option) => (
//               <MenuItem
//                 key={option.id}
//                 value={option.id}
//                 onClick={() => handleSelectedTeam(option.id)}
//               >
//                 <SecondaryTextTypography
//                   style={{
//                     fontSize: "10px",
//                     color: "#282F79",
//                     fontWeight: 600,
//                   }}
//                 >
//                   {option.name}
//                 </SecondaryTextTypography>
//               </MenuItem>
//             ))}
//         </div>
//       </TextField>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginTop: "10px",
//         }}
//       >
//         <Box display="flex" flexDirection="row" alignItems="center">
//           {manageTeamVal.map((val: any) => (
//             <Box
//               key={val.name}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//             >
//               {/* <GAvatar
//                 avatarType="customIcon"
//                 username={val.name}
//                 customIcon={React.cloneElement(val.icon, {
//                   style: { width: "14px", height: "14px" },
//                 })}
//               /> */}
//             </Box>
//           ))}
//         </Box>
//         <Box>
//           <GButton
//             buttonType="Outlined"
//             buttonShape="circular"
//             label="Manage Team"
//             padding="1px 4px"
//             minWidth="40px"
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default TeamsWorkspace;

"use client";

import {
  Box,
  InputAdornment,
  MenuItem,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { SecondaryTextTypography } from "../../../Styles/signInUp";
import GAvatar from "../../Global/GAvatar";
import UserV2Icon from "../../../Assests/icons/v2UserIcon.svg";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import GBadge from "../../Global/GBadge";
import GButton from "../../Global/GButton";
import { useDispatch, useSelector } from "react-redux";
import {
  GetWorkspacesByUserId,
  setCurrentWorkspace,
  workspaceReducer,
} from "../../../Redux/apiManagement/workspaceReducer";
import Cookies from "js-cookie";
import { RootStateType } from "../../../Redux/store";
import { CommonReducer } from "../../../Redux/commonReducer";
import { setTabs } from "../../../Redux/tabReducer";
import {
  resetEnvironmentState,
} from "../../../Redux/apiManagement/environmentReducer";
import { usePathname } from "next/navigation"; // Import usePathname
import {setCookies } from "@/app/Helpers/helpersFunctions";

const TeamsWorkspace = () => {
  const dispatch = useDispatch<any>();

  const containerRef = useRef<any>(null);
  const pathname = usePathname(); // Use usePathname instead of useLocation
  const queryParams = new URLSearchParams(pathname.split("?")[1]);
  const workspaceId = queryParams.get("workspaceId");
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { workspaceList, currentWorkspace } = useSelector<
    RootStateType,
    workspaceReducer
  >((state) => state.apiManagement.workspace);

  const theme = useTheme();
  const manageTeamValues = [
    { name: "User1", icon: <UserV2Icon /> },
    { name: "User2", icon: <UserV2Icon /> },
    { name: "User3", icon: <UserV2Icon /> },
    { name: "User4", icon: <UserV2Icon /> },
  ];

  const [manageTeamVal, setManageTeamVal] = useState<any[]>(manageTeamValues);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const [teamsCount, setTeamsCount] = useState(0);

  const fetchPageData = async (offsetVal: number) => {
    const data = {
      user_id: userProfile?.user.user_id,
      offset: offsetVal,
      limit: limit,
    };

    setLoading(true);
    dispatch(GetWorkspacesByUserId(data))
      .unwrap()
      .then((workspaceRes: any) => {
        if (workspaceRes?.length > 0) {
          setOffset((prevOffset) => prevOffset + limit);
          setTeamsCount(workspaceList?.length || 0);

          if (!currentWorkspace) {
            const currentSelectedWorkspace =
              workspaceList?.find((x) => x.id === workspaceId) ||
              workspaceList[0];

            dispatch(setCurrentWorkspace(currentSelectedWorkspace));
          }
        }
        setLoading(false);
      })
      .catch((error: any) => {
        console.log("ErrorWorkspace: ", error);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        setOffset((prevPage) => prevPage + 5);
      }
    }
  };

  const handleSelectedTeam = (wsidVal: string) => {
    //encrypt wsid

    setCookies(
      process.env.NEXT_PUBLIC_COOKIE_WSID || "",
      wsidVal,
      userProfile?.user?.expiration_time
    );

    const currentSelectedWorkspace = workspaceList?.find(
      (x) => x.id === wsidVal
    );
    Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_PROJECTID ?? "");

    dispatch(resetEnvironmentState());
    dispatch(setCurrentWorkspace(currentSelectedWorkspace));
    const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}?tabs=get_started`;
    dispatch(setTabs(["get_started"]));
    window.history.pushState({}, "", newUrl);
  };

  useEffect(() => {
    const container = document.getElementById("scrollable-container");
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (userProfile.user.user_id) {
      fetchPageData(offset);
    }
  }, [userProfile.user.user_id, offset]);

  return (
    <Box>
      <TextField
        select
        fullWidth
        size="small"
        value={currentWorkspace?.id || ""}
        sx={{
          "& .MuiOutlinedInput-input": {
            display: "flex",
            alignItems: "center",
            height: "100%",
            boxSizing: "border-box",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.v2TeamWorkspaceBgColor.main,
            borderRadius: "2px",
            border: "none",
            height: "100%",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiSelect-icon": {
            display: "none",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <GBadge badgeContent={teamsCount} color="#FE6565" position="left">
                <KeyboardArrowDownOutlinedIcon
                  style={{
                    fontSize: "13px",
                    cursor: "pointer",
                    fontFamily: "Inter-Regular ! important",
                  }}
                />
              </GBadge>
            </InputAdornment>
          ),
        }}
      >
        {currentWorkspace && (
          <MenuItem
            value={currentWorkspace?.id}
            onClick={() => handleSelectedTeam(currentWorkspace?.id)}
          >
            <SecondaryTextTypography
              style={{
                fontSize: "10px",
                color: "#282F79",
                fontWeight: 600,
              }}
            >
              {currentWorkspace?.name}
            </SecondaryTextTypography>
          </MenuItem>
        )}

        <div
          className="test"
          style={{
            maxHeight: "100px",
            overflowY: "auto",
          }}
          ref={containerRef}
          onScroll={handleScroll}
        >
          {workspaceList
            ?.filter((x) => x.id !== currentWorkspace?.id)
            .map((option) => (
              <MenuItem
                key={option.id}
                value={option.id}
                onClick={() => handleSelectedTeam(option.id)}
              >
                <SecondaryTextTypography
                  style={{
                    fontSize: "10px",
                    color: "#282F79",
                    fontWeight: 600,
                  }}
                >
                  {option.name}
                </SecondaryTextTypography>
              </MenuItem>
            ))}
        </div>
      </TextField>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          {manageTeamVal.map((val: any) => (
            <Box
              key={val.name}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {/* <GAvatar
                avatarType="customIcon"
                username={val.name}
                customIcon={React.cloneElement(val.icon, {
                  style: { width: "14px", height: "14px" },
                })}
              /> */}
            </Box>
          ))}
        </Box>
        <Box>
          <GButton
            buttonType="Outlined"
            buttonShape="circular"
            label="Manage Team"
            padding="1px 4px"
            minWidth="40px"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TeamsWorkspace;
