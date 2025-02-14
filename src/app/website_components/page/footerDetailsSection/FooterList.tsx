import { Box, Typography } from "@mui/material";
import React from "react";
import LaunchIcon from "@mui/icons-material/Launch";

type Props = {};

export default function FooterList({}: Props) {
  const productsList = [
    {
      id: 1,
      name: "Email and SMS passwordless",
    },
    {
      id: 2,
      name: "Enterprise SSO (SAML & OIDC)",
    },
    {
      id: 3,
      name: "Password",
    },
    {
      id: 4,
      name: "Machine-to-machine",
      icon: true,
    },
    {
      id: 5,
      name: "Social sign-in",
    },
    {
      id: 6,
      name: "Management API",
    },
    {
      id: 7,
      name: "Omni sign-in experience",
    },
    {
      id: 8,
      name: "Protected App",
    },
    {
      id: 9,
      name: "Multi-factor authentication",
    },
    {
      id: 10,
      name: "IdP for 3rd-party apps",
    },
    {
      id: 11,
      name: "User management",
    },
    {
      id: 12,
      name: "Role-based access control",
    },
    {
      id: 13,
      name: "Organizations (Multi-tenancy)",
    },
  ];

  const solutionsList = [
    {
      id: 1,
      name: "Consumer apps",
    },
    {
      id: 2,
      name: "SaaS products",
    },
    {
      id: 3,
      name: "AI apps",
    },
    {
      id: 4,
      name: "Enterprise-ready",
    },
    {
      id: 5,
      name: "Multi-app products",
    },
  ];

  const developersList = [
    {
      id: 1,
      name: "Documentation",
      icon: true,
    },
    {
      id: 2,
      name: "API references",
      icon: true,
    },
    {
      id: 3,
      name: "SDK guide",
      icon: true,
    },
    {
      id: 1,
      name: "Documentation",
      icon: true,
    },
    {
      id: 4,
      name: "Migration guide",
      icon: true,
    },
  ];

  const resourcesList = [
    {
      id: 1,
      name: "Blog",
    },
    {
      id: 2,
      name: "Branding assets",
      icon: true,
    },
    {
      id: 3,
      name: "YouTube channel",
      icon: true,
    },
    {
      id: 4,
      name: "Sign-in experience assets",
      icon: true,
    },
    {
      id: 5,
      name: "Newsletter",
    },
    {
      id: 6,
      name: "Open-source",
    },
    {
      id: 7,
      name: "Logto vs. Auth0",
    },
    {
      id: 8,
      name: "Logto vs. Clerk",
    },
    {
      id: 9,
      name: "Logto vs. Stytch",
    },
    {
      id: 10,
      name: "Changelogs",
    },
    {
      id: 11,
      name: "Roadmap",
      icon: true,
    },
  ];

  const aboutList = [
    {
      id: 1,
      name: "Trust and security",
    },
    {
      id: 2,
      name: "About us",
    },
  ];

  return (
    <Box
      sx={{
        marginLeft: "10px",
      }}
    >
      {/* products */}
      <Box>
        <Typography
          sx={{
            color: "#f7f8f8",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
            marginBottom: "12px",
          }}
        >
          Products
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Array.from({ length: Math.ceil(productsList.length / 2) }).map(
            (_, rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* Left Product */}
                <Box
                  sx={{
                    flex: "1 1 calc(50% - 10px)",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    marginBottom: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#a9acac",
                      fontSize: "14px",
                      lineHeight: "20px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {productsList[rowIndex * 2]?.name}
                  </Typography>
                </Box>

                {/* Right Product */}
                <Box
                  sx={{
                    flex: "1 1 calc(50% - 10px)",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    marginBottom: 1,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#a9acac",
                      fontSize: "14px",
                      lineHeight: "20px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {productsList[rowIndex * 2 + 1]?.name}
                    {/* Conditionally render the LaunchIcon if icon is true */}
                    {productsList[rowIndex * 2 + 1]?.icon && (
                      <LaunchIcon
                        sx={{
                          marginLeft: "3px",
                          fontSize: "12px",
                          lineHeight: "20px",
                          color: "#a9acac",
                        }}
                      />
                    )}
                  </Typography>
                </Box>
              </Box>
            )
          )}
        </Box>
      </Box>

      {/* Pricing and Solutions */}
      <Box
        sx={{
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Space between the two lists
            gap: 4, // Space between columns
          }}
        >
          {/* Pricing List */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                color: "#f7f8f8",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                marginBottom: "12px",
              }}
            >
              Pricing
            </Typography>
            <Box
              sx={{
                "&:hover": {
                  textDecoration: "underline", // Underline on hover
                },
                marginBottom: 2, // Space between items
              }}
            >
              <Typography
                sx={{
                  color: "#a9acac",
                  fontSize: "14px",
                  lineHeight: "20px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Pricing plans
              </Typography>
            </Box>
          </Box>

          {/* Solutions List */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                color: "#f7f8f8",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                marginBottom: "12px",
              }}
            >
              Solutions
            </Typography>
            {solutionsList.map((item) => (
              <Box
                key={item.id}
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  marginBottom: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#a9acac",
                    fontSize: "14px",
                    lineHeight: "20px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Developers and Resources */}
      <Box
        sx={{
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Space between the two lists
            gap: 4, // Space between columns
          }}
        >
          {/* Developers List */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                color: "#f7f8f8",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                marginBottom: "12px",
              }}
            >
              Developers
            </Typography>
            {developersList.map((item) => (
              <Box
                key={item.id}
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  marginBottom: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#a9acac",
                    fontSize: "14px",
                    lineHeight: "20px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {item.name}
                </Typography>
                {item.icon && (
                  <LaunchIcon
                    sx={{
                      marginLeft: "3px",
                      fontSize: "12px",
                      lineHeight: "20px",
                      color: "#a9acac",
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Resources List */}
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                color: "#f7f8f8",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                marginBottom: "12px",
              }}
            >
              Resources
            </Typography>
            {resourcesList.map((item) => (
              <Box
                key={item.id}
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  marginBottom: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#a9acac",
                    fontSize: "14px",
                    lineHeight: "20px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {item.name}
                </Typography>
                {item.icon && (
                  <LaunchIcon
                    sx={{
                      marginLeft: "3px",
                      fontSize: "12px",
                      lineHeight: "20px",
                      color: "#a9acac",
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* About */}
      <Box sx={{ flex: 1, marginTop: "30px" }}>
        <Typography
          sx={{
            color: "#f7f8f8",
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "24px",
            marginBottom: "12px",
          }}
        >
          About
        </Typography>
        {aboutList.map((item) => (
          <Box
            key={item.id}
            sx={{
              "&:hover": {
                textDecoration: "underline",
              },
              marginBottom: 1,
            }}
          >
            <Typography
              sx={{
                color: "#a9acac",
                fontSize: "14px",
                lineHeight: "20px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
