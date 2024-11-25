"use client";
import React, { useEffect, useRef, useState } from "react";
// import WorkspaceCard from "../../apiflow_components/workspace/WorkspaceCard";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/system";
// import PostCard from "../../apiflow_components/channels/post/PostCard";
// import WorkspaceCreateCard from "../../apiflow_components/workspace/workspaceCreateCard";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import { CommonReducer, initializeSession } from "../../Redux/commonReducer";
import {
  GetWorkspacesByUserId,
  setCurrentWorkspace,
  workspaceReducer,
} from "../../Redux/apiManagement/workspaceReducer";
import { setCookies } from "../../Helpers/helpersFunctions";
import Cookies from "js-cookie";
import { resetEnvironmentState } from "../../Redux/apiManagement/environmentReducer";
import { setTabs } from "../../Redux/tabReducer";
import { useRouter } from "next/navigation";
import GlobalCircularLoader from "@/app/ApiFlowComponents/Global/GlobalCircularLoader";
import { useSideBarStore } from "@/app/hooks/sideBarStore";
import { setItem } from "@/app/Services/localstorage";
import dynamic from "next/dynamic";
import WorkspacePageSkeleton from "@/app/apiflow_components/skeletons/WorkspacePageSkeleton";
import { useGlobalStore } from "@/app/hooks/useGlobalStore";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";
import { useSession } from "next-auth/react";

const WorkspaceCard = dynamic(
  () => import("../../apiflow_components/workspace/WorkspaceCard"),
  {
    ssr: false, // Optionally disable SSR if you don't need it during SSR
    loading: () => <WorkspacePageSkeleton />,
  }
);

const WorkspaceCreateCard = dynamic(
  () => import("../../apiflow_components/workspace/workspaceCreateCard"),
  {
    ssr: false, // You can also choose to disable SSR here if you only need it on the client-side
  }
);

const TextTypography = styled(Typography)`
  font-family: "FiraSans-regular" !important;
  color: ${({ theme }) => theme.palette.textPrimaryColor.main};
  font-size: 0.7rem;
  margin-top: 0.7rem;
`;

function WorkspacePage() {
  const { openSignUp }: any = useSignUpStore();

  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [offsetVal, setoffsetVal] = useState<number>(0);
  const { status } = useSession();
  const { workspaceList, currentWorkspace, getWsidLoading, totalCount } =
    useSelector<RootStateType, workspaceReducer>(
      (state) => state.apiManagement.workspace
    );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const { setIsSidebarCollapsed } = useSideBarStore();
  const { setIsPageLoading } = useGlobalStore();

  const handleSelectedTeam = (wsidVal: string) => {
    //encrypt wsid
    setIsPageLoading(true);
    setCookies(
      process.env.NEXT_PUBLIC_COOKIE_WSID || "",
      wsidVal,
      userProfile?.user?.expiration_time
    );

    const currentSelectedWorkspace = workspaceList?.find(
      (x: any) => x.id === wsidVal
    );
    Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_PROJECTID ?? "");

    dispatch(resetEnvironmentState());
    dispatch(setCurrentWorkspace(currentSelectedWorkspace));
    const newUrl = `/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}?tabs=get_started`;
    dispatch(setTabs(["get_started"]));
    // window.history.pushState({}, "", newUrl);
    setIsSidebarCollapsed(false);
    // router.push(`/userId/${userProfile?.user.user_id}`);
    setItem(`/sidebarMenuId/${userProfile?.user?.user_id}`, "apiMan");
    router.push(`/userId/${userProfile?.user.user_id}/workspaceId/${wsidVal}`);
  };
  const [isLoading, setisLoading] = useState(false);
  const fetchPageData = async (offsetVal: number) => {
    setisLoading(true);

    const data = {
      user_id: userProfile?.user.user_id,
      offset: offsetVal,
      limit: 8,
    };

    dispatch(GetWorkspacesByUserId(data))
      .unwrap()
      .then((workspaceRes: any) => {
        setisLoading(false);
      })
      .catch((error: any) => {
        console.log("ErrorWorkspace: ", error);
        setisLoading(false);
      });
  };

  useEffect(() => {
    dispatch(initializeSession());
  }, []);
  const containerRef = useRef<any>();
  const handleScroll = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.getBoundingClientRect().bottom;
      if (bottom <= window.innerHeight && !isLoading) {
        setoffsetVal((prev) => prev + 5);
      }
    }
  };
  useEffect(() => {
    if (userProfile?.user.user_id) fetchPageData(offsetVal);
  }, [userProfile?.user.user_id, openSignUp]);
  useEffect(() => {
    if (offsetVal <= totalCount && userProfile?.user.user_id)
      fetchPageData(offsetVal);
  }, [userProfile?.user.user_id, offsetVal]);

  // Hook to handle scroll events
  useEffect(() => {
    const conatiner = document.getElementById("mainContainer");

    if (conatiner) {
      conatiner.addEventListener("scroll", handleScroll);
      return () => {
        conatiner.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div>
      <TextTypography style={{ fontSize: "1.7rem", margin: "1.5rem 0rem" }}>
        <span style={{ color: "#FFFFFFBF" }}>Welcome</span>,{" "}
        {userProfile.user.first_name &&
        userProfile.user.first_name != "null" ? (
          userProfile.user.first_name + " " + userProfile.user.last_name
        ) : (
          <>User</>
        )}
      </TextTypography>

      <Grid container spacing={3}>
        {status == "loading" || (getWsidLoading && !isLoading) ? (
          <SkeletonLoader />
        ) : (
          workspaceList?.map((workspace: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              key={workspace?.id}
              sx={{
                display: "flex",
                position: "relative",
                minHeight: "300px",
                "@media (min-width: 1600px)": {
                  // Change '1920px' to any custom breakpoint
                  flexBasis: "25%", // Adjust as per your needs
                  maxWidth: "25%", // Same as the flexBasis for proper alignment
                },
              }}
            >
              <React.Suspense fallback={<WorkspacePageSkeleton />}>
                <WorkspaceCard
                  membersCount={workspace?.members_count}
                  syncTime={"2 mins ago"}
                  riskCount={2}
                  projectCount={workspace?.group_count}
                  title={workspace?.name}
                  onClickHandler={() => handleSelectedTeam(workspace.id)}
                />
              </React.Suspense>
            </Grid>
          ))
        )}
        {isLoading && <SkeletonLoader />}
        {/* {getWsidLoading && (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{
              display: "flex",
              position: "relative",
              minHeight: "300px",
              "@media (min-width: 1600px)": {
                // Change '1920px' to any custom breakpoint
                flexBasis: "25%", // Adjust as per your needs
                maxWidth: "25%", // Same as the flexBasis for proper alignment
              },
            }}
          >
            <GlobalCircularLoader open={true} noBackdrop={true} />
          </Grid>
        )} */}

        {/* )} */}

        {/* For the Create Workspace card */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          xl={4}
          sx={{
            display: "flex",
            "@media (min-width: 1600px)": {
              // Change '1920px' to any custom breakpoint
              flexBasis: "25%", // Adjust as per your needs
              maxWidth: "25%", // Same as the flexBasis for proper alignment
            },
          }}
        >
          <WorkspaceCreateCard />
        </Grid>
        {/* {getWsidLoading && ( */}
      </Grid>

      <div ref={containerRef}></div>
      {/* <PostCard /> */}
    </div>
  );
}
const SkeletonLoader = () => {
  return [1, 2, 3, 4].map((elem, index) => {
    return (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={4}
        xl={4}
        sx={{
          display: "flex",
          position: "relative",
          minHeight: "300px",
          "@media (min-width: 1600px)": {
            // Change '1920px' to any custom breakpoint
            flexBasis: "25%", // Adjust as per your needs
            maxWidth: "25%", // Same as the flexBasis for proper alignment
          },
        }}
      >
        <WorkspacePageSkeleton key={index} />
      </Grid>
    );
  });
};
export default WorkspacePage;
