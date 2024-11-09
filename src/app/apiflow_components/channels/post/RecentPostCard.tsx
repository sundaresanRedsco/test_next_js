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

// Styled TextTypography component
const TextTypography = styled(Typography)`
  font-family: "FiraSans-Regular" !important;
  color: white;
  font-size: 0.7rem;
  margin-top: 0.7rem;
`;

// Styled Box for the entire card section
const StyledBox = styled(Box)`
  background-color: #191c1d80; // Light background
  border-radius: 15px; // Rounded corners
  padding: 16px; // Padding for spacing
  margin: 16px 0px; // Space below the box
`;

const Heading = styled(Typography)`
  // text-align: center; // Center the text
  color: white; // Text color
  margin-bottom: 16px; // Space between heading and grid
`;

function PostCard() {
  return (
    <div>
      <StyledBox>
        {/* Common Heading */}
        <Heading variant="h5">Recent Posts</Heading>

        <Grid container spacing={2}>
          {postCardData.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
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
                    <TextTypography>{post.title}</TextTypography>
                    <TextTypography style={{ color: "#FF8888" }}>
                      <li style={{ marginRight: "0px !important" }}>
                        {post.messageText}
                      </li>
                    </TextTypography>
                  </div>

                  <TextTypography
                    style={{ color: "#F3F3F3BF", fontSize: "0.7rem" }}
                  >
                    {post.apiText}
                  </TextTypography>

                  <div className="d-flex" style={{ marginTop: "1rem" }}>
                    <div style={{ marginTop: "0.5rem" }}>{post.icon}</div>
                    <TextTypography
                      style={{ color: "#BA9AFF", marginLeft: "10px" }}
                    >
                      {post.profileText}
                    </TextTypography>
                  </div>

                  <TextTypography style={{ color: "#F3F3F3" }}>
                    {post.description}
                  </TextTypography>
                  <hr />

                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TextTypography
                      style={{ color: "#ACAAB3", marginTop: "1.2rem" }}
                    >
                      {post.time}
                    </TextTypography>

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
