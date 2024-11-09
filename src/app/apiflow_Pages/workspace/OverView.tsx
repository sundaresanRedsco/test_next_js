"use client";
import React from "react";

import { Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";

import { workspaceReducer } from "../../Redux/apiManagement/workspaceReducer";

const TextTypography = styled(Typography)`
  font-family: "FiraSans-regular" !important;
  color: ${({ theme }) => theme.palette.textPrimaryColor.main};
  font-size: 0.7rem;
  margin-top: 0.7rem;
`;

function OverView() {
  const dispatch = useDispatch<any>();

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  return (
    <div>
      <TextTypography style={{ fontSize: "1.7rem", margin: "1.5rem 0rem" }}>
        {(currentWorkspace?.name ?? "") + " Workspace Summary"}
      </TextTypography>
    </div>
  );
}

export default OverView;
