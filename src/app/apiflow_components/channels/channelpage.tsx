"use client";

import React, { useState } from "react";
import { ChipCloseIcon, LeftArrowIcon, ProfileBack } from "@/app/Assests/icons";
import { Avatar, Box, Chip, InputAdornment, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid2";
import TextsmsIcon from "@mui/icons-material/Textsms";
import GInput from "@/app/apiflow_components/global/GInput";
import GButton from "@/app/apiflow_components/global/GButton";

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

function Channel() {
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState<any[]>([
    "Karthi G",
    "Singara V",
    "Senthilraj Kappini",
  ]);
  const [environmentName, setEnvironmentName] = useState("");
  const [environments, setEnvironments] = useState<any[]>(["Environment1"]);

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

  return (
    <Box sx={{ padding: "30px" }}>
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
              }}
            >
              <TextsmsIcon
                style={{
                  color: "rgba(255, 255, 255, 0.15)",
                }}
              />
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
                marginLeft: "90%",
                marginTop: "50%",
                zIndex: "99",
              }}
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
                  value={channelName}
                  // value="getUsers"
                  margin="10px 0px"
                  onChangeHandler={(e: any) => {
                    let name = e.target.value;
                    setChannelName(name);
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
              <Box>
                <PrimaryTypography>Description</PrimaryTypography>
                <GInput
                  fullWidth={true}
                  height="50px"
                  value={channelDescription}
                  // value="getUsers"
                  margin="10px 0px"
                  onChangeHandler={(e: any) => {
                    let name = e.target.value;
                    setChannelDescription(name);
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid
          size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
          sx={{ marginTop: "10px" }}
        >
          <Box>
            <PrimaryTypography
              sx={{
                color: "#ffffffbf",
              }}
            >
              Add Participants
            </PrimaryTypography>
            <GInput
              fullWidth={true}
              height="50px"
              value={participantName}
              // value="getUsers"
              margin="10px 0px"
              sx={{
                "& .MuiOutlinedInput-root": {
                  paddingLeft: "0px",
                },
              }}
              onKeyUp={(event: any) => {
                if (event?.key === "Enter") {
                  handleAddParticipants(participantName);
                }
              }}
              onChangeHandler={(e: any) => {
                let name = e.target.value;
                setParticipantName(name);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    sx={{
                      backgroundColor: "#12121280",
                      color: "white",
                      height: "50px", // Same height as the input field
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0 20px",
                      borderRadius: "4px 0 0 4px", // Rounded left corners to match input field
                    }}
                  >
                    #
                  </Box>
                </InputAdornment>
              }
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          {participants?.map((val: any) => (
            <Chip
              label={val}
              deleteIcon={<ChipCloseIcon />}
              onDelete={() => handleDeleteParticipants(val)}
              sx={{
                background: "rgba(121, 70, 253, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontFamily: "FiraSans-Regular",
                "&.MuiButtonBase-root": {
                  borderRadius: "5px",
                  color: "#FFFFFF",
                },
                marginRight: "10px",
              }}
            />
          ))}
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
          sx={{ marginTop: "10px" }}
        >
          <Box>
            <PrimaryTypography
              sx={{
                color: "#ffffffbf",
              }}
            >
              Environment
            </PrimaryTypography>
            <GInput
              fullWidth={true}
              height="50px"
              value={environmentName}
              // value="getUsers"
              margin="10px 0px"
              sx={{
                "& .MuiOutlinedInput-root": {
                  paddingLeft: "0px",
                },
              }}
              onKeyUp={(event: any) => {
                if (event?.key === "Enter") {
                  handleAddEnvironemnts(environmentName);
                }
              }}
              onChangeHandler={(e: any) => {
                let name = e.target.value;
                setEnvironmentName(name);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    sx={{
                      backgroundColor: "#12121280",
                      color: "white",
                      height: "50px", // Same height as the input field
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0 20px",
                      borderRadius: "4px 0 0 4px", // Rounded left corners to match input field
                    }}
                  >
                    #
                  </Box>
                </InputAdornment>
              }
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          {environments?.map((val: any) => (
            <Chip
              label={val}
              deleteIcon={<ChipCloseIcon />}
              onDelete={() => handleDeleteEnvironments(val)}
              sx={{
                background: "rgba(121, 70, 253, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontFamily: "FiraSans-Regular",
                "&.MuiButtonBase-root": {
                  borderRadius: "5px",
                  color: "#FFFFFF",
                },
                marginRight: "10px",
              }}
            />
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "end",
          justifyContent: "end",
        }}
      >
        <GButton
          buttonType="primary"
          label="Cancel"
          marginRight="10px"
          background="transparent"
          border="1px solid #F3F3F340"
          padding="5px 20px"
          fontSize={"12px"}
          radius="10px"
        />
        <GButton
          buttonType="primary"
          label="Create Channel"
          marginRight="10px"
          padding="5px 20px"
          fontSize={"12px"}
          radius="10px"
        />
      </Box>
    </Box>
  );
}

export default Channel;
