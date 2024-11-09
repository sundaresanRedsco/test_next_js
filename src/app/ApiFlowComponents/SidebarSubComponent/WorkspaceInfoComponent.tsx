import React from "react";
import { PrimaryTextTypography } from "../../Styles/signInUp";
import { Box } from "@mui/material";
import GButton from "../Global/GButton";
import GDivider from "../Global/GDivider";
import TeamsWorkspace from "./WorkspaceInfoItems/teamsWorkspace";
import Projects from "./WorkspaceInfoItems/projects";
import Endpoints from "./WorkspaceInfoItems/endpoints";
import Flows from "./WorkspaceInfoItems/flows";
import SecurityTags from "./WorkspaceInfoItems/securityTags";
import SecurityRisks from "./WorkspaceInfoItems/securityRisks";
import VulnerabilitiesTypes from "./WorkspaceInfoItems/vulnerabilitiesTypes";
import DataTypes from "./WorkspaceInfoItems/dataTypes";
import IntegrationsItem from "./WorkspaceInfoItems/integrationsItem";
import { setAddTabs } from "../../Redux/tabReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import { permissionReducer } from "../../Redux/permissionReducer/permissionReducer";
import { workspaceReducer } from "../../Redux/apiManagement/workspaceReducer";
import {
  MODULES,
  PERMISSIONS,
  SUB_MODULES,
} from "../../Constants/permissionConstants";
import withPermission from "../withPermission";
import theme from "../../../Theme/theme";

const WorkspaceInfo = () => {
  const dispatch = useDispatch<any>();

  const { permissions } = useSelector<RootStateType, permissionReducer>(
    (state) => state.permission
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  console.log(currentWorkspace?.id, "currentWorkspacecurrentWorkspace");

  return (
    <Box
      sx={
        {
          // padding: "10px",
        }
      }
    >
      {/* <HeaderTextTypography style={{ fontSize: "13px" }}>
        Workspace Information
      </HeaderTextTypography> */}
      {/* outer box for margin */}
      <Box style={{ margin: "10px 0px" }}>
        {/* workspace */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PrimaryTextTypography style={{ fontSize: "10px" }}>
            Use Workspace
          </PrimaryTextTypography>
          <Box>
            <GButton
              label="Invite"
              buttonShape="circular"
              buttonType="Outlined"
              // buttonType="teritiary"
              borderColor={theme?.palette.v2PrimaryColor.main}
              padding="0px"
              minWidth="35px"
              disabled={currentWorkspace?.id?.trim() === "" ? true : false}
              cursor={currentWorkspace?.id?.trim() === "" ? "none" : "pointer"}
            />
            <GButton
              label="New"
              buttonShape="circular"
              buttonType="Outlined"
              // buttonType="teritiary"
              marginLeft="5px"
              padding="0px"
              minWidth="35px"
              module_name={MODULES.API_MANAGEMENT}
              sub_module={SUB_MODULES.WORKSPACE}
              action={PERMISSIONS.CREATE}
              isPermission
              onClickHandler={() => {
                dispatch(setAddTabs("new_workspace"));
              }}
            />
          </Box>
        </Box>
        <GDivider />
        {/* Team Workspace */}
        <TeamsWorkspace />

        {/* Projects */}
        <Projects />

        {/* Endpoints */}
        <Endpoints />

        {/* Flows */}
        <Flows />

        {/* Security Tags */}
        <SecurityTags />

        {/* Security Risks */}
        <SecurityRisks />

        {/* Vulnerabilities Types */}
        <VulnerabilitiesTypes />

        {/* DataTypes */}
        <DataTypes />

        {/* Integrations */}
        <IntegrationsItem />
      </Box>
    </Box>
  );
};

const WorkspaceInfoComponent = withPermission(
  WorkspaceInfo,
  MODULES.API_MANAGEMENT,
  SUB_MODULES.WORKSPACE,
  PERMISSIONS.GET_WORKSPACE_LIST // Adjust the permission as needed
);

export default WorkspaceInfoComponent;
