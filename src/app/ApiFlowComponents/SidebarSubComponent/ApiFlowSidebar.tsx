import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import { testRunnerReducer } from "../../Redux/apiTesting/testRunnerReducer";
import GlobalLoader from "../../Components/Global/GlobalLoader";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../../Theme/theme";
import { useDrag } from "react-dnd";
import {
  projectReducer,
  GetAllStagesByWorkspaceId,
  GetCollectionOperationTree,
} from "../../Redux/apiManagement/projectReducer";
import GlobalCircularLoader from "../../Components/Global/GlobalCircularLoader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import GraphQlImage from "../../Assests/images/graphql.png";
// import GrpcImage from "../../Assests/images/gprc.png";
// import WebImage from "../../Assests/images/web.png";
import GrpcImage from "../../Assests/images/gprc.webp";
import GraphQlImage from "../../Assests/images/graphql.webp";
import WebImage from "../../Assests/images/web.webp";
import { environmentReducer } from "../../Redux/apiManagement/environmentReducer";
import { workspaceReducer } from "../../Redux/apiManagement/workspaceReducer";
import Image from "next/image";

export const ItemTypes = {
  CARD: "card",
};

interface SidebarContainerProps {
  expanded?: boolean;
  children?: ReactNode;
}

const SidebarConExpanded = styled(Box)<SidebarContainerProps>`
  background: #eaecf3;
  width: 130px; /* Width based on 'expanded' prop */
  height: 100%; /* Use full height available */
  font-family: Inter-Regular !important;
  border-right: 1px solid ${({ theme }) => theme.palette.silverGrey.main};

  overflow-y: hidden;
  overflow-x: hidden;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Track color */
  }

  &::-webkit-scrollbar-thumb {
    background: #888; /* Thumb color */
    border-radius: 10px; /* Radius of the thumb */
  }

  @media (max-width: 1024px) {
    height: auto; /* Allow height to adjust based on content */
    position: relative; /* Ensure it's positioned correctly */
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    height: auto; /* Allow height to adjust based on content */
    position: relative; /* Ensure it's positioned correctly */
    overflow-y: auto;
  }

  @media (min-width: 1440px) {
    height: auto;
    position: relative; /* Ensure it's positioned correctly */
    overflow-y: auto;
  }
`;

export const HeadingSidebarTypography = styled(Typography)`
  font-family: Inter-Regular;
  color: ${theme.palette.primaryText.main};
  font-weight: 600;
  wordwrap: break-word;
`;

export const SecondarySidebarTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${({ theme }) => theme.palette.primaryText.main};
`;

const CollectionNameHeading = styled(Typography)`
  font-family: Inter-Regular !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70px;
  text-decoration: none;
`;
const OperationNameHeading = styled(Typography)`
  font-family: Inter-Regular !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  text-decoration: none;
  color: ${theme.palette.teritiaryColor.main};
  margin-top: 7px;
  margin-bottom: 10px;
  margin-left: 20px;
`;

const accordionSummaryStyles = {
  borderBottom: "none",
  margin: "0px",
};

const accordionDetailsStyles = {
  marginTop: "-25px",
  marginBottom: "-20px",
  border: "none",
};

const accordionCollectionStyles = {
  elevation: 0,
  border: "none",
  borderBottom: "none",
  "&.MuiPaper-root::before": {
    display: "none",
  },
  background: "transparent",
  boxShadow: "none",
  marginTop: "-15px",
  margin: "0px",
};

const jsonIconStyle = {
  width: "10px",
  height: "10px",
};

const grpcImageStyle = {
  width: "10px",
  height: "10px",
};

const DraggableCard = ({ name }: any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<any>();

  const { getCollOperTreeLoading } = useSelector<RootStateType, projectReducer>(
    (state) => state.apiManagement.projects
  );

  const { currentEnvironment, currentStage } = useSelector<
    RootStateType,
    environmentReducer
  >((state) => state.apiManagement.environment);

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const DraggableCardNew = ({ name }: any) => {
    const [, drag] = useDrag({
      type: "CARD",
      item: { name },
    });

    return (
      <SecondarySidebarTypography
        // ref={drag}
        style={{
          fontSize: "0.6rem",
          fontWeight: 600,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </SecondarySidebarTypography>
    );
  };

  const DraggableCard = ({ id, name, http_method, type }: any) => {
    const [, drag] = useDrag({
      type: ItemTypes.CARD,
      item: { id, name, http_method, type },
    });

    return (
      <div
      // ref={drag}
      >
        <SecondarySidebarTypography
          style={{
            fontSize: "0.6rem",
            fontWeight: 600,
            overflow: "hidden",
            maxWidth: "80px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            cursor: "grab",
          }}
        >
          {name}
        </SecondarySidebarTypography>
      </div>
    );
  };

  const DraggableCardCollections = ({ id, name, operations, type }: any) => {
    const [, drag] = useDrag({
      type: ItemTypes.CARD,
      item: { id, name, operations, type },
    });

    return (
      <div>
        <SecondarySidebarTypography
          style={{
            fontSize: "10px",
            fontWeight: 900,
            overflow: "hidden",
            maxWidth: "100px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            cursor: "grab",
          }}
        >
          {name}
        </SecondarySidebarTypography>
      </div>
    );
  };

  const [projectId, setProjectId] = useState("");
  const [collOperDetails, setCollOperDetails] = useState<any[]>([]);
  const [collectionId, setCollectionId] = useState(
    collOperDetails[0]?.collections_id
  );

  const [apiStageId, setApiStageId] = useState("");

  const [currentPage, setCurrentPage] = useState<number>(15);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startVal, setStartVal] = useState<number>(0);
  const [endVal, setEndVal] = useState<number>(8);
  const [collOperTreeCount, setCollOperTreeCount] = useState(0);

  const renderAccordionDetails = (collections: any) => {
    return (
      <AccordionDetails sx={accordionDetailsStyles}>
        {collections?.operations
          ?.filter((filterStatus: any) => filterStatus?.status === "ACTIVE")
          ?.map((operations: any) => (
            // <OperationNameHeading key={operations?.id} onDragStart={(event: any) => onDragStart(event, operations)}>
            <OperationNameHeading key={operations?.operation_id}>
              <DraggableCard
                key={operations?.operation_id}
                id={operations?.operation_id}
                name={operations?.operation_name}
                http_method={operations?.http_method}
                type="operations"
              />
            </OperationNameHeading>
          ))}
      </AccordionDetails>
    );
  };

  const fetchPageData = async (page: number) => {
    setIsLoading(true);
    setEndVal((prevEnd: any) => prevEnd + 8);
    let requestData = {
      project_id: currentEnvironment,
      stage_id: currentStage,
      offsetStart: 0,
      offsetEnd: page,
    };
    dispatch(GetCollectionOperationTree(requestData))
      .unwrap()
      .then((res: any) => {
        console.log("treeRes: ", res);
        setCollOperTreeCount(res?.count);
        const filterStatusVal = res?.collections?.filter(
          (filterStatus: any) => filterStatus?.status === "ACTIVE"
        );
        console.log("GetOperationTreeRes: ", res?.collections);
        setCollOperDetails(filterStatusVal);
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.log("Eror: ", error);
      });

    console.log("requestData: ", requestData);
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !getCollOperTreeLoading
      ) {
        setCurrentPage((prevPage) => prevPage + 8);
      }
    }
  };

  useEffect(() => {
    fetchPageData(currentPage);
    setIsLoading(false);
  }, [currentPage, currentEnvironment]);

  useEffect(() => {
    fetchPageData(currentPage);
  }, []);

  // dispatch(setApiStageId)

  useEffect(() => {
    dispatch(GetAllStagesByWorkspaceId(currentWorkspace?.id))
      .unwrap()
      .then((res: any) => {
        setApiStageId(res[0]?.apistage_id);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  }, [currentEnvironment, currentWorkspace?.id]);

  console.log("GetOperationRes: ", collOperDetails);

  return (
    <div>
      <div
        className="scrollableProjectSidebar"
        // className="api_designFlow_sidebarDrag"
      >
        <div style={{ position: "relative" }}>
          <GlobalCircularLoader open={getCollOperTreeLoading} />
          <div
            style={{
              marginTop: "10px",
              height: "520px",
              overflowY: "auto",
            }}
            ref={containerRef}
            onScroll={handleScroll}
          >
            {collOperDetails
              // ?.filter((filterCollStatus: any) => filterCollStatus?.status === "ACTIVE")
              ?.map((collections: any) => (
                <>
                  <Accordion
                    key={collections?.collection_id}
                    sx={accordionCollectionStyles}
                    expanded={collectionId === collections?.collection_id}
                    onChange={() => {
                      setCollectionId(
                        collectionId === collections?.collection_id
                          ? null
                          : collections?.collection_id
                      );
                    }}
                    style={{ position: "relative" }}
                  >
                    <AccordionSummary
                      key={collections?.collection_id}
                      expandIcon={
                        <ExpandMoreIcon
                          style={{
                            fontSize: "10px",
                            marginLeft: "10px",
                          }}
                        />
                      }
                      sx={accordionSummaryStyles}
                      style={{
                        marginTop: "-10px",
                        marginLeft: "-10px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <>
                          {collections?.service_type === "JSON" ? (
                            // <JsonIcon style={jsonIconStyle} />
                            <></>
                          ) : collections?.service_type === "SOAP" ? (
                            // <SoapIcon style={jsonIconStyle} />
                            <></>
                          ) : collections?.service_type === "gRPC" ? (
                            // <img
                            //     src={GrpcImage}
                            //     alt=""
                            //     style={grpcImageStyle}
                            // />
                            <Image
                              src={GrpcImage}
                              alt=""
                              style={grpcImageStyle}
                            />
                          ) : collections?.service_type === "GraphQL" ? (
                            // <img
                            //     src={GraphQlImage}
                            //     alt=""
                            //     style={grpcImageStyle}
                            // />
                            <Image
                              src={GraphQlImage}
                              alt=""
                              style={grpcImageStyle}
                            />
                          ) : collections?.service_type === "WEB SOCKET" ? (
                            // <img src={WebImage} alt="" style={grpcImageStyle} />
                            <Image
                              src={WebImage}
                              alt=""
                              style={grpcImageStyle}
                            />
                          ) : (
                            ""
                          )}
                        </>
                        <>
                          <CollectionNameHeading
                            key={collections?.collection_id}
                          >
                            {/* {collections?.name} */}
                            <DraggableCardCollections
                              key={collections?.collection_id}
                              name={collections?.collection_name}
                              id={collections?.collection_id}
                              type="collections"
                              // operations={renderAccordionDetails(collections)}
                              operations={collections?.operations?.map(
                                (val: any) => ({
                                  name: val?.operation_name,
                                  id: val?.operation_id,
                                  method: val?.method,
                                })
                              )}
                            />
                          </CollectionNameHeading>
                        </>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        marginLeft: "-10px",
                        marginTop: "-10px",
                      }}
                      // sx={accordionDetailsStyles}
                    >
                      {collectionId === collections?.collection_id &&
                        renderAccordionDetails(collections)}
                    </AccordionDetails>
                  </Accordion>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ApiFlowSidebar = () => {
  const { loading } = useSelector<RootStateType, testRunnerReducer>(
    (state) => state.apiTesting.testRunner
  );

  return (
    <>
      {loading && <GlobalLoader />}
      <SidebarConExpanded className="p-0">
        <HeadingSidebarTypography
          style={{
            fontSize: "10px",
            fontWeight: 600,
            marginLeft: "5px",
            marginTop: "10px",
          }}
        >
          Design Api
        </HeadingSidebarTypography>

        <DraggableCard />
      </SidebarConExpanded>
    </>
  );
};

export default ApiFlowSidebar;
