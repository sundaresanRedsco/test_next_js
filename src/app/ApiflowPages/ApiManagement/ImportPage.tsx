import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import GlobalSelect from "../../ApiFlowComponents/Global/GlobalSelect";
import GlobalTextArea from "../../ApiFlowComponents/Global/GlobalTextArea";
import { styled } from "@mui/system";
import ImportsCard from "../../ApiFlowComponents/ApiManagements/ImportsComponents/ImportsCard";
import GAvatar from "../../ApiFlowComponents/Global/GAvatar";
import UserV2Icon from "../../Assests/icons/v2UserIcon.svg";
import GButton from "../../ApiFlowComponents/Global/GButton";
import GlobalTextField from "../../ApiFlowComponents/Global/GlobalTextField";
import GlobalHeader from "../../ApiFlowComponents/Global/GlobalHeader";
import GlobalCircularLoader from "../../ApiFlowComponents/Global/GlobalCircularLoader";
import {
  environmentReducer,
  GetNewProjectByWorkspaceIdSolrOffset,
} from "../../Redux/apiManagement/environmentReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../Redux/store";
import { workspaceReducer } from "../../Redux/apiManagement/workspaceReducer";
import { apiGatewayReducer } from "../../Redux/apiManagement/apiGatewayReducer";

const DescriptionTypography = styled(Typography)`
  font-family: Inter-Medium !important;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
  font-size: 0.6rem;
`;

const PrimaryTypography = styled(Typography)`
  font-family: Inter-Medium !important;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
  font-size: 0.7555rem;
  // font-weight: 600;
`;

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.V2SectionBackgroundColor.main};
  padding: 10px 20px;
`;

interface userDataErrorsType {
  description?: string;
  project_name?: string;
}

const weeksdays = [
  { id: "1", label: "Create New Project", description: "" },
  { id: "2", label: "Daily", description: "data1" },
  { id: "3", label: "Weekly", description: "data2" },
  { id: "4", label: "Monthly", description: "data3" },
];
function ImportPage(props: any) {
  const { id, onCloseHandler } = props;
  const dispatch = useDispatch<any>();
  const containerRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    project_name: "", // For the GlobalTextField
    description: "", // For the GlobalTextArea
  });
  console.log(formData?.description, "asasasasasasddjhsdhj");

  const { createProjectLoading, ProjectsListOffset, getProjectLoading } =
    useSelector<RootStateType, environmentReducer>(
      (state) => state.apiManagement.environment
    );

  const { loading } = useSelector<RootStateType, apiGatewayReducer>(
    (state) => state.apiManagement.gateWay
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const [formErrors, setFormErrors] = useState<userDataErrorsType>({
    project_name: "",
    description: "",
  });
  console.log(formErrors,"setFormErrors");
  
  const [projetId, setProjectId] = useState<any>();
  const [endVal, setEndVal] = useState<number>(2);
  const [searchVal, setSearchVal] = useState("");
  const [projectValues, setProjectValues] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(2);

  const [isCreatingNewProject, setIsCreatingNewProject] = useState(true);

  const hasSpecialChars = (str: any) => /[^a-zA-Z0-9_ ]/g.test(str);

  const hasNumbers = (str: any) => /\d/g.test(str);

  const isValidLength = (str: any, min = 3, max = 50) =>
    str.length >= min && str.length <= max;

  const validateForm = () => {
    const newErrors: userDataErrorsType = {};

    if (formData.project_name === "") {
      newErrors.project_name = "Project Name is required";
    } else if (hasSpecialChars(formData.project_name)) {
      newErrors.project_name =
        "Project Name should not contain special characters";
    } else if (!isValidLength(formData.project_name, 3, 50)) {
      newErrors.project_name =
        "Project Name should be between 3 and 50 characters";
    }

    // if (formData.description === "") {
    //   newErrors.description = "Description is required";
    // } else if (!isValidLength(formData.description, 0, 200)) {
    //   newErrors.description = "Description should be maximum 200 characters";
    // }

    setFormErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const fetchPageData = async (page: number) => {
    setEndVal((prevEnd: any) => prevEnd + 8);
    let requestData = {
      // wsid: wsidVal,
      wsid: currentWorkspace?.id,
      sortByField: "name",
      sortByValue: searchVal?.trim() !== "" ? searchVal : "",
      sortDirection: "asc",
      // startValue: startVal,
      startValue: 0,
      // endValue: endVal,
      endValue: page,
    };

    console.log("RequestDatas: ", requestData);

    dispatch(GetNewProjectByWorkspaceIdSolrOffset(requestData))
      .unwrap()
      .then((projectRes: any) => {
        console.log(projectRes, "projectRessds");
        const fetchedProjects = projectRes?.projects || [];
        const updatedProjectValues = [
          { name: "Create New Project", id: "create_new" },
          ...fetchedProjects,
        ];
        setProjectValues(updatedProjectValues);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleScroll = () => {
    if (containerRef?.current) {
      const { scrollTop, clientHeight, scrollHeight } = containerRef?.current;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        // setCurrentPage((prevPage) => prevPage + 8);
        setCurrentPage((prevPage) => prevPage + 2);
      }
    }
  };

  useEffect(() => {
    // const container = document.getElementById(maninContainer);
    const container = document.getElementById("scrollable-container");
    container?.addEventListener("scroll", handleScroll);
    setSearchVal("");

    return () => {
      container?.removeEventListener("scroll", handleScroll);
      setSearchVal("");
    };
    // }, [maninContainer]); // Include maninContainer as a dependency
  }, []);
  useEffect(() => {
    fetchPageData(currentPage);
  }, [currentPage, searchVal, currentWorkspace]);

  console.log(projectValues, "newprojectValuesxdsdod");

  return (
    <div>
      <GlobalHeader id={id} onCloseHandler={onCloseHandler} />
      <CardContainer
        style={{
          padding: "10px 10px",
          position: "relative",
        }}
      >
        {(createProjectLoading || loading) && (
          <GlobalCircularLoader open={createProjectLoading || loading} />
        )}

        <Grid container spacing={3}>
          <Grid
            item
            xl={6}
            xs={12}
            sm={12}
            md={6}
            sx={{ paddingRight: "3rem", marginTop: "2rem" }}
          >
            <PrimaryTypography>Add / Import API end points</PrimaryTypography>
            <PrimaryTypography style={{ marginTop: "1.5rem" }}>
              You can create new project or choose existing project to add these
              API end points
            </PrimaryTypography>

            <div style={{ marginTop: "1.4rem" }}>
              {/* {<GlobalCircularLoader open={true} />} */}
              <GlobalSelect
                fullWidth={false}
                borderHeight="40px"
                size="small"
                radius="0px"
                fontSize="0.6rem"
                options={projectValues.map((data) => ({
                  label: data.name,
                  value: data.id,
                }))}
                defaultValue={"create_new"}
                onChange={(value: any) => {
                  const selectedOption = projectValues.find(
                    (option) => option.id === value
                  );
                  if (selectedOption) {
                    setProjectId(selectedOption.id);
                  }

                  if (selectedOption?.label === "Create New Project") {
                    setProjectId("");
                    setFormData({
                      ...formData,
                      project_name: "",
                      description: "",
                    });
                  } else {
                    if (selectedOption) {
                      setFormData({
                        ...formData,
                        project_name: selectedOption.name,
                        description: selectedOption.project_type,
                      });
                    }
                  }
                }}
                dropdownContainerStyle={{
                  maxHeight: "100px", // Fixed height for the dropdown
                  overflowY: "auto", // Enable vertical scrolling
                }}
                onDropdownScroll={(e: any) => {
                  const { scrollTop, scrollHeight, clientHeight } = e.target;
                  if (
                    scrollTop + clientHeight >= scrollHeight - 10 &&
                    !isLoading
                  ) {
                    setCurrentPage((prevPage) => prevPage + 2); // Fetch more data
                  }
                }}
              />
            </div>

            <DescriptionTypography style={{ marginTop: "0.7rem" }}>
              Name
            </DescriptionTypography>

            <GlobalTextField
              name={""}
              label=""
              fontSize="0.6rem"
              value={formData.project_name}
              onChange={(e: any) => {
                if (isCreatingNewProject) {
                  setFormData({
                    ...formData,
                    project_name: e.target.value,
                  });
                }
              }}
              disabledVal={!isCreatingNewProject} // Disable input unless "Create New Project" is selected
              placeholder="Name"
              error={formErrors.project_name} // Conditionally display error
            />

            <DescriptionTypography style={{ margin: "0.7rem 0rem" }}>
              Description
            </DescriptionTypography>

            <GlobalTextArea
              name="description"
              fullWidth
              value={formData.description}
              onChange={(value: any) => {
                if (isCreatingNewProject) {
                  setFormData({
                    ...formData,
                    description: value,
                  });
                }
              }}
              disabled={!isCreatingNewProject} // Disable input unless "Create New Project" is selected
              placeholder="Description"
              error={formErrors.description} // Conditionally display error
              helperText={formErrors.description} // Display the error message
            />

            <div>
              <DescriptionTypography> Team</DescriptionTypography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.7rem",
                }}
              >
                <div>
                  <UserV2Icon width={"30px"} height={"30px"} />
                </div>
                {/* <GAvatar /> */}
                <div>
                  <GButton
                    buttonShape="circular"
                    // buttonType='primary'
                    background="#F6F9FF"
                    color="#9A93B9"
                    label="invite"
                    padding="1px 30px"
                    minWidth="35px"
                  />
                </div>
            
              </div>
            </div>
          </Grid>

          <Grid item xl={6} xs={12} sm={12} md={6} sx={{ marginTop: "2rem" }}>
            <ImportsCard
              datas={formData}
              projetId={projetId}
              vadilate={validateForm}
              onFormDataChange={setFormData}
              onErrorData={setFormErrors}
            />
            {/* <ImportsCard/> */}
          </Grid>
        </Grid>
      </CardContainer>
    </div>
  );
}

export default ImportPage;
