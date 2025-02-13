import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import ProjectSideBar from "@/app/apiflow_components/Integration/ProjectSidebar";
import NotesIcon from "@/app/Assests/icons/notes.svg";
import GlobalIntegrationCard from "@/app/apiflow_components/global/GlobalIntegrationCard";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import {
  GetIntegrationByTenantIdandType,
  integrationReducer,
} from "@/app/Redux/apiManagement/integrationReducer";
import GlobalCircularLoader from "@/app/apiflow_components/global/GCircularLoader";
import { dateFormat, formatToTitleCase } from "@/app/Helpers/helpersFunctions";

const CardContainer = styled(Box)``;

const sidebarData = [
  {
    label: "CHANGE HISTORY",
    id: "history",
    icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
  },

  {
    label: "SETTING",
    id: "setting",
    icon: <NotesIcon style={{ height: "25px", width: "25px" }} />,
  },
];

function IntegrationList(props: any) {
  const { id, onCloseHandler } = props;
  const dispatch = useDispatch<any>();

  const type =
    id === "integration_page_service_now"
      ? "SERVICE_NOW"
      : id === "integration_page_splunk_siem"
      ? "SPLUNK_SIEM"
      : id === "jira"
      ? "JIRA"
      : id === "pager_duty"
      ? "PAGER_DUTY"
      : "";

  const { integrationLoading } = useSelector<RootStateType, integrationReducer>(
    (state) => state.apiManagement.integration
  );

  const [activeItem, setActiveItem] = useState("SUMMARY");
  const [integrationList, setIntegrationList] = useState([]);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const handleItemClick = (id: any) => {
    setActiveItem(id);
  };

  useEffect(() => {
    const data = {
      tenant_id: userProfile?.user.tenant_id,
      type: type,
      start: 1,
      end: 5,
    };
    if (type) {
      dispatch(GetIntegrationByTenantIdandType(data))
        .unwrap()
        .then((res: any) => {
          setIntegrationList(res);
        });
    }
  }, [id]);

  return (
    <div>
      {id === "integration_page_service_now" ||
      id === "integration_page_splunk_siem" ? (
        <>
          <Box>
            <p>{formatToTitleCase(id)}</p>
            {integrationList?.map((data: any, index: any) => (
              <div style={{ marginTop: "10px" }} key={index}>
                <GlobalIntegrationCard
                  title={data?.type}
                  secondaryTitle={`Added on ${dateFormat(data?.created_at)}`}
                  cardData={"SN"}
                />
              </div>
            ))}
            <GlobalCircularLoader open={integrationLoading} />
          </Box>
        </>
      ) : id === "jira" || id === "pager_duty" ? (
        <>
          <CardContainer
            style={{
              padding: "10px 10px",
              position: "relative",
              height: "100vh",
              overflowY: "hidden",
            }}
          >
            <div className="d-flex">
              <Box
                sx={{
                  width: "7%",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <ProjectSideBar
                  sidebarData={sidebarData}
                  onClickHandler={(id: string) => handleItemClick(id)}
                  active={activeItem}
                />
              </Box>
              <Box>
                {/* <p>{formatToTitleCase(id)}</p> */}
                {integrationList?.map((data: any, index: any) => (
                  <div style={{ marginTop: "10px" }} key={index}>
                    <GlobalIntegrationCard
                      title={data?.type}
                      secondaryTitle={`Added on ${dateFormat(
                        data?.created_at
                      )}`}
                      cardData={"SN"}
                    />
                  </div>
                ))}
                <GlobalCircularLoader open={integrationLoading} />
              </Box>
            </div>
          </CardContainer>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default IntegrationList;
