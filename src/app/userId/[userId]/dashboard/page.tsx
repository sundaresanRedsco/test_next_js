"use client";
import { TextTypography } from "@/app/apiflow_components/WorkflowComponents/Nodes/workflowOperationNode";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { RootStateType } from "@/app/Redux/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function Dashboard({}: Props) {
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  return (
    <div>
      <TextTypography
        style={{ fontSize: "1.7rem", margin: "1.5rem 0rem", color: "white" }}
      >
        <span style={{ color: "#FFFFFFBF" }}>Welcome</span>,{" "}
        {userProfile.user.first_name &&
        userProfile.user.first_name != "null" ? (
          userProfile.user.first_name + " " + userProfile.user.last_name
        ) : (
          <>User</>
        )}
      </TextTypography>
    </div>
  );
}
