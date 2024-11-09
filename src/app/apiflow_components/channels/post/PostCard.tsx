import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import GButton from "@/app/ApiFlowComponents/Global/GButton";
import { Profile } from "@/app/Assests/icons";

// Sample data for workspace cards
const postCardData = [
  {
    id: "1",
    title: "Channel 1",
    messageText: "2 Unread Messages",
    apiText: "Dev API",
    icon: <Profile />,
    profileText: "Singara V",
    time: "5 minutes ago",
    description:
      "Lorem ipsum dolor sit amet consectetur. Neque bibendum in eu purus elementum egestas",
  },
  {
    id: "2",
    title: "New API Channel",
    messageText: "2 Unread Messages",
    apiText: "Dev API",
    icon: <Profile />,
    profileText: "Senthilraj K",
    time: "25 minutes ago",
    description:
      "Lorem ipsum dolor sit amet consectetur. Neque bibendum in eu purus elementum egestas",
  },
  {
    id: "3",
    title: "New API Channel 2",
    messageText: "2 Unread Messages",
    apiText: "Dev API",
    icon: <Profile />,
    profileText: "Singara V",
    time: "5 minutes ago",
    description:
      "Lorem ipsum dolor sit amet consectetur. Neque bibendum in eu purus elementum egestas",
  },
];

// Styled typography components for different sections
const TitleTypography = styled(Typography)`
  font-family: "FiraSans-Bold" !important;
  font-size: 1rem;
  color: #fff;
`;

const MessageTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  font-size: 0.75rem;
  color: #ff8888;
`;

const ApiTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  font-size: 0.8rem;
  color: #f3f3f3bf;
`;

const ProfileTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  font-size: 0.8rem;
  color: #ba9aff;
  margin-left: 10px;
`;

const TimeTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  font-size: 0.7rem;
  color: #acaab3;
`;

const DescriptionTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  font-size: 0.75rem;
  color: #f3f3f3;
  margin-top: 1rem;
`;

// Styled Box for the entire card section
const StyledBox = styled(Box)`
  background-color: #191c1d80; // Light background
  border-radius: 15px; // Rounded corners
  padding: 16px; // Padding for spacing
  margin: 16px 0px; // Space below the box
`;

const Heading = styled(Typography)`
  color: white; // Text color
  margin-bottom: 16px; // Space between heading and grid
  font-family: "FiraSans-Bold" !important;
`;

function PostCard() {
  return (
    <div>
      <StyledBox>
        {/* Common Heading */}
        <Heading variant="h5">Recent Posts</Heading>

        <Grid container spacing={2}>
          {postCardData.map((post) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={4}
              sx={{
                "@media (min-width: 1600px)": {
                  // Change '1920px' to any custom breakpoint
                  flexBasis: "25%", // Adjust as per your needs
                  maxWidth: "25%", // Same as the flexBasis for proper alignment
                },
              }}
              key={post.id}
            >
              <Card
                sx={{
                  backgroundColor: "#12121280",
                  color: "#fff",
                  borderRadius: "30px",
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TitleTypography>{post.title}</TitleTypography>
                    <MessageTypography>
                      <li>{post.messageText}</li>
                    </MessageTypography>
                  </div>

                  <ApiTypography>{post.apiText}</ApiTypography>

                  <div
                    className="d-flex align-items-center"
                    style={{ marginTop: "1rem" }}
                  >
                    <div>{post.icon}</div>
                    <ProfileTypography>{post.profileText}</ProfileTypography>
                  </div>

                  <DescriptionTypography>
                    {post.description}
                  </DescriptionTypography>
                  <hr />

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TimeTypography>{post.time}</TimeTypography>

                    <div style={{ marginTop: "1rem" }}>
                      <GButton
                        background="#7A43FE"
                        label="View"
                        color="#FFFFFF"
                        padding="4px"
                        border="none"
                        fontSize="0.8rem"
                        fontWeight="600"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </StyledBox>
    </div>
  );
}

export default PostCard;
