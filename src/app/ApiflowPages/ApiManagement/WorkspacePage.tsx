import { Box, Grid, Radio, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import GlobalTextField from "../../ApiFlowComponents/Global/GlobalTextField";
import GlobalTextArea from "../../ApiFlowComponents/Global/GlobalTextArea";
import UserV2Icon from "../../Assests/icons/v2UserIcon.svg";
import GButton from "../../ApiFlowComponents/Global/GButton";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  CreateWorkspace,
  workspaceReducer,
} from "../../Redux/apiManagement/workspaceReducer";
import { RootStateType } from "../../Redux/store";
import GlobalButton from "../../ApiFlowComponents/Global/GlobalButton";
import GlobalHeader from "../../ApiFlowComponents/Global/GlobalHeader";
import { useAlert } from "../../../context/alertContext";
import { setRemoveTabs } from "../../Redux/tabReducer";
import GlobalCircularLoader from "../../ApiFlowComponents/Global/GlobalCircularLoader";
import theme from "../../../Theme/theme";
import { CommonReducer } from "@/app/Redux/commonReducer";

const CustomRadio = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <Radio
      checked={checked}
      onChange={onChange}
      sx={{
        color: checked ? "blue" : "gray",
        "&.Mui-checked": {
          color: "#000080",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "1rem", // Adjust the size of the icon here
        },
      }}
    />
  );
};

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.V2SectionBackgroundColor.main};
  // padding: 10px 25px;
`;

const HeadingTypography = styled(Typography)`
  font-family: Inter-Medium !important;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
  font-size: 0.7rem;
  // font-weight: 600;
  margin-top: 0.7rem;
`;

const CardTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
  font-size: 0.9rem;
  // font-weight: 600;
  // margin-top: 0.1rem;
`;

const CardBoxContainer = styled(Box)`
  padding: 10px 20px;
  margin-top: 0.5rem;
  // height: 470px;
  min-height: 350px;
`;

const SecondaryTypography = styled(Typography)`
  font-family: Inter-Regular !important;
  color: ${({ theme }) => theme.palette.V2TextColor.main};
  font-size: 0.6rem;
  font-family: Inter-Regular !important;
`;

const WorkspaceCard = styled(Box)`
  background: ${({ theme }) => theme.palette.CardBlack.main};
  /* background: white; */
  color: ${({ theme }) => theme.palette.V2GlobalHeaderColor.main};
  padding: 20px;
  width: 100%;
  font-family: Inter-Regular !important;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  // display: flex;
`;

interface userDataErrorsType {
  description?: string;
  workspace_name?: string;
}

const options = [
  {
    title: "Team",
    description: "(Visible to invited team members)",
    selected: "TEAM",
  },
  {
    title: "Personal",
    description: "(Visible to all members in the Organisation)",
    selected: "PERSONAL",
  },
];

function WorkspacePage(props: any) {
  const { id, onCloseHandler } = props;
  const dispatch = useDispatch<any>();

  const { showAlert } = useAlert();

  const { loading, workSpaceResponce } = useSelector<
    RootStateType,
    workspaceReducer
  >((state) => state.apiManagement.workspace);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  console.log(workSpaceResponce, "workSpaceResponcesds");

  const [formData, setFormData] = useState({
    workspace_name: "",
    description: "",
    visibility: "TEAM",
  });

  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    type: "Error" | "Success";
  } | null>(null);

  console.log(formData?.visibility, "visibility");

  const [formErrors, setFormErrors] = useState<userDataErrorsType>({
    workspace_name: "",
    description: "",
  });

  const [formNewError, setFormNewerror] = useState<any>("");
  const hasSpecialChars = (str: any) => /[^a-zA-Z0-9_ ]/g.test(str);
  const hasNumbers = (str: any) => /\d/g.test(str);
  const isValidLength = (str: any, min = 3, max = 50) =>
    str.length >= min && str.length <= max;

  const validateForm = () => {
    const newErrors: userDataErrorsType = {};

    if (formData.workspace_name === "") {
      newErrors.workspace_name = "Workspace Name is required";
    } else if (hasSpecialChars(formData.workspace_name)) {
      newErrors.workspace_name =
        "Workspace Name should not contain special characters";
    } else if (!isValidLength(formData.workspace_name, 3, 50)) {
      newErrors.workspace_name =
        "Workspace Name should be between 3 and 50 characters";
    }

    // if (formData.description === "") {
    //   newErrors.description = "Description is required";
    // } else if (!isValidLength(formData.description, 0, 200)) {
    //   newErrors.description = "Description should be 200 characters";
    // }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      let WorkSpaceDetails;
      WorkSpaceDetails = {
        // user_id: userProfile?.user.user_id,
        // tenant_id: userProfile?.user?.tenant_id,
        name: formData.workspace_name,
        summary: formData.description,
        permission: formData?.visibility,
      };

      dispatch(CreateWorkspace(WorkSpaceDetails))
        .unwrap()
        .then((res: any) => {
          toast.success("Workspace Created");
          console.log("UpdateResponse: ", res);
          let name = res?.name;
          showAlert(
            "Success",
            name,
            "Workspace Created",
            "",
            () => console.log("Alert closed"),
            () => console.log("Alert clicked")
          );
          dispatch(setRemoveTabs("new_workspace"));
        })
        .catch((error: any) => {
          console.log(error, "error OccurredWork");
          setFormNewerror(error.message);
          toast.error(error.message);
        });
    } else {
      console.log("Form has errors.");
    }
  };

  const handleRadioChange = (selected: string) => {
    setFormData((prevData) => ({
      ...prevData,
      visibility: selected,
    }));
  };

  return (
    <div>
      <GlobalHeader id={id} onCloseHandler={onCloseHandler} />

      <CardContainer
        style={{
          padding: "10px 10px",
          position: "relative",
        }}
      >
        {loading && <GlobalCircularLoader open={loading} />}
        <Grid container spacing={3}>
          <Grid
            item
            xl={6}
            xs={12}
            sm={12}
            md={5}
            sx={{
              borderRight: "solid 1px #DADADA",
              marginTop: "1.5rem",
              paddingRight: "3rem",
            }}
          >
            <div>
              <HeadingTypography>Workspace Details</HeadingTypography>

              <GlobalTextField
                name={""}
                fontSize="0.6rem"
                value={formData.workspace_name}
                onChange={(e: any) => {
                  setFormData({
                    ...formData,
                    workspace_name: e.target.value,
                  });
                }}
                error={formErrors?.workspace_name || formNewError}
                placeholder="Workspace Name"
              />

              <HeadingTypography>Workspace Description</HeadingTypography>

              <div style={{ marginTop: "0.7rem" }}>
                <GlobalTextArea
                  name="description"
                  fullWidth
                  value={formData.description}
                  onChange={(value: any) => {
                    setFormData({
                      ...formData,
                      description: value,
                    });
                  }}
                  placeholder="Description"
                  error={formErrors.description}
                  helperText={formErrors.description}
                />
              </div>

              <HeadingTypography>Project Team</HeadingTypography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.5rem",
                }}
              >
                <div>
                  <UserV2Icon width={"30px"} height={"30px"} />
                </div>
                <div>
                  <GButton
                    buttonShape="circular"
                    background="#F6F9FF"
                    color="#9A93B9"
                    label="Invite"
                    padding="1px 30px"
                    minWidth="35px"
                  />
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xl={6} xs={12} sm={12} md={7} sx={{ marginTop: "1.5rem" }}>
            <HeadingTypography style={{ marginLeft: "17px" }}>
              Workspace Visibility
            </HeadingTypography>
            <CardBoxContainer>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {options?.map((val: any, index: number) => (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    xl={6}
                    sx={{ paddingRight: "1rem" }}
                    key={index}
                  >
                    <WorkspaceCard
                      onClick={() => handleRadioChange(val.selected)}
                      style={{}}
                    >
                      <div>
                        <CustomRadio
                          checked={formData.visibility === val.selected}
                          onChange={() => handleRadioChange(val.selected)}
                        />
                      </div>

                      <div>
                        <CardTypography>{val.title}</CardTypography>
                        <SecondaryTypography>
                          {val.description}
                        </SecondaryTypography>
                      </div>
                    </WorkspaceCard>
                  </Grid>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "5rem",
                }}
              >
                {/* <GlobalButton
                  label={"Create Workspace"}
                  onClickHandler={handleSubmit}
                  background="#282F79"

                  buttonType="primary"
                /> */}

                <GlobalButton
                  label={"Create Workspace"}
                  onClickHandler={handleSubmit}
                  padding="10px"
                  borderRadius="8px"
                  //  background=  "#2BBCD4"
                  // background: theme.palette.CardBlack.main,
                  background={theme.palette.CardButton.main}
                  color="white"
                  // buttonType="primary"
                />
              </div>
            </CardBoxContainer>
          </Grid>
        </Grid>
      </CardContainer>
    </div>
  );
}

export default WorkspacePage;
