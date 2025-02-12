// "use client";

import React, { useState } from "react";
import { ChipCloseIcon, LeftArrowIcon, ProfileBack } from "@/app/Assests/icons";
import { Avatar, Box, Chip, InputAdornment, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid2";
import TextsmsIcon from "@mui/icons-material/Textsms";
import GInput from "@/app/apiflow_components/global/GInput";
import GButton from "@/app/apiflow_components/global/GButton";
import { CreateChannel, getChannels } from "@/app/Redux/channel/ChannelReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import GMentionDropdown from "../global/GMentionDropdown";

const HeadingTypography = styled(Typography)`
  font-family: FiraSans-Regular !important;
  color: #ffffffbf;
  font-size: 1.3rem;
  margin-top: 0.7rem;
`;

const TextTypography = styled(Typography)`
  font-family: FiraSans-Regular;
  color: white;
  font-size: 1rem;
  margin-top: 0.7rem;
`;

export const PrimaryTypography = styled(Typography)`
  font-family: FiraSans-Regular;
  color: #ffffff;
  font-weight: 400;
  font-size: 15px;
  wordwrap: break-word;
`;

interface userDataErrorsType {
  description?: string;
  channel_name?: string;
}

function Channel() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(
    null
  );
  console.log(selectedImageBase64, "selectedImageBase64sdlsdl");

  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState<any[]>([]);
  const [environmentName, setEnvironmentName] = useState("");
  const [environments, setEnvironments] = useState<any[]>([]);

  const [channelData, setChanneldata] = useState<any>({
    channel_name: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState<userDataErrorsType>({
    channel_name: "",
    description: "",
  });

  console.log(channelData?.description, "ssdchannel_name");

  const members = ["John", "Jane", "Jack", "Jill", "Michael", "Emily"];

  const handleAddParticipants = (val: any) => {
    setParticipants((prev) => [...prev, val]);
    setParticipantName("");
  };

  const handleAddEnvironemnts = (val: any) => {
    setEnvironments((prev) => [...prev, val]);
    setEnvironmentName("");
  };

  const handleDeleteParticipants = (val: any) => {
    setParticipants((participantValues) =>
      participantValues.filter((participantName) => participantName !== val)
    );
  };

  const handleDeleteEnvironments = (val: any) => {
    setEnvironments((environmentValues) =>
      environmentValues.filter((environemntName) => environemntName !== val)
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImageBase64(base64String); // Update state with Base64 string
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const triggerFileSelect = () => {
    (document.getElementById("imageInput") as HTMLInputElement)?.click();
  };

  const hasSpecialChars = (str: any) => /[^a-zA-Z0-9_ ]/g.test(str);
  const hasNumbers = (str: any) => /\d/g.test(str);
  const isValidLength = (str: any, min = 3, max = 50) =>
    str.length >= min && str.length <= max;

  const validateForm = () => {
    const newErrors: userDataErrorsType = {};

    if (channelData.channel_name === "") {
      newErrors.channel_name = "Channel Name is required";
    } else if (hasSpecialChars(channelData.channel_name)) {
      newErrors.channel_name =
        "Channel Name should not contain special characters";
    } else if (!isValidLength(channelData.channel_name, 3, 50)) {
      newErrors.channel_name =
        "Channel Name should be between 3 and 50 characters";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      let ChannelDetails;
      ChannelDetails = {
        workspace_id: currentWorkspace?.id,
        project_id: null,
        channel_name: channelData?.channel_name,
        description: channelData?.description || "",
        profile_picture: selectedImageBase64,
        type: "",
        groups: [],
        projects: [],
        workspaces: [],
        additionalParticipants: [
          {
            user_email: "",
            role_id: "",
          },
        ],
        createdBy: "",
      };

      dispatch(CreateChannel(ChannelDetails))
        .unwrap()
        .then((res: any) => {
          dispatch(
            getChannels({
              workspace_id: currentWorkspace?.id,
              start: 1,
              end: 5,
            })
          )
            .unwrap()
            .then(() => {
              console.log("UpdateResponse: ", res);
              router.push(`/userId/${userProfile?.user?.user_id}/channel`);
              toast.success("channel Created");
            });
        })
        .catch((error: any) => {
          console.log(error, "error OccurredWork");
        });
    } else {
      console.log("Form has errors.");
    }
  };

  return (
    <Box>
      <Box>
        <HeadingTypography style={{ marginTop: "1rem" }}>
          Channel <LeftArrowIcon />
          <span
            style={{
              color: "#FFFFFF",
              fontFamily: "FiraSans-Bold",

              margin: "0rem 0.5rem",
            }}
          >
            Create Channel
          </span>
        </HeadingTypography>
      </Box>
      <Box
        style={{
          margin: "1rem 0px",
        }}
      >
        <HeadingTypography
          sx={{
            fontFamily: "FiraSans-Bold",
            color: "#FFFFFF",
          }}
        >
          Project
        </HeadingTypography>
      </Box>
      <Box
        sx={{
          background: "#241D35",
          borderRadius: "20px",
          padding: "10px",
        }}
      >
        <Grid
          size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
          sx={{ display: "flex", flexDirection: "row" }}
        >
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
            <input
              type="file"
              id="imageInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageUpload}
            />

            <Avatar
              sx={{
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                fontSize: "1.3rem",
                width: 100,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={triggerFileSelect}
              src={selectedImageBase64 || undefined}
            >
              {!selectedImageBase64 && (
                <TextsmsIcon
                  style={{
                    color: "rgba(255, 255, 255, 0.15)",
                  }}
                />
              )}
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
                marginLeft: "79%",
                marginTop: "78%",
                zIndex: "99",
                cursor: "pointer",
              }}
              onClick={triggerFileSelect}
            >
              <ProfileBack
                sx={{
                  fontSize: "2rem",
                  color: "white",
                }}
              />
            </Box>
          </Box>

          <HeadingTypography style={{ margin: "40px", fontSize: "16px" }}>
            Channels are meant for enhanced collaboration across your
            organization. You can create channels for the entire organization,
            your team or across multiple teams.
          </HeadingTypography>
        </Grid>
        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <PrimaryTypography>Name</PrimaryTypography>
                <GInput
                  fullWidth={true}
                  height="50px"
                  value={channelData?.channel_name}
                  margin="10px 0px"
                  padding="7px 0px"
                  onChangeHandler={(e: any) => {
                    const name = e.target.value; // Access the input's value from the event's target
                    setChanneldata({
                      ...channelData,
                      channel_name: name,
                    });
                    console.log(name); // This will log the updated channel name
                  }}
                  error={formErrors?.channel_name}
                  helperText={formErrors?.channel_name}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <PrimaryTypography>Description</PrimaryTypography>
                <GInput
                  fullWidth={true}
                  height="50px"
                  value={channelData?.description}
                  margin="10px 0px"
                  padding="7px 0px"
                  onChangeHandler={(e: any) => {
                    const description = e.target.value;
                    setChanneldata({
                      ...channelData,
                      description: description,
                    });
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <PrimaryTypography>@Searchable</PrimaryTypography>
          <GMentionDropdown options={members} placeholder="Search..." />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          justifyContent: "end",
        }}
      >
        <Link href={`/userId/${userProfile?.user?.user_id}/channel`} passHref>
          <GButton
            buttonType="primary"
            label="Cancel"
            marginRight="10px"
            background="transparent"
            border="1px solid #F3F3F340"
            padding="5px 20px"
            fontSize="12px"
            radius="10px"
          />
        </Link>

        <GButton
          buttonType="primary"
          label="Create Channel"
          marginRight="10px"
          padding="5px 20px"
          fontSize={"12px"}
          radius="10px"
          onClickHandler={handleSubmit}
        />
      </Box>
    </Box>
  );
}

export default Channel;
