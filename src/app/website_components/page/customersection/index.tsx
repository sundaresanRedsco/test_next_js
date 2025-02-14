import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CustomCard from "./CustomCard";
import { AutoSlideCarousel } from "../aboutsection/AutoSlideCarousel";
import InputComponet from "./InputComponet";
import MultifactorAuthCard from "./MultifactorAuthCard";

type Props = {};

export default function CustomerSection({}: Props) {
  return (
    <Stack
      sx={{
        width: "100%",
        padding: { md: "0 40px", sm: "0 20px", xs: "0 20px" },
      }}
    >
      <Typography
        component={"h2"}
        sx={{
          color: "white",
          fontWeight: "bold",
          textWrap: "wrap",
          wordBreak: "break-word",
          marginBlock: 0,
          fontSize: { md: "48px", sm: "32px", xs: "32px" },
          lineHeight: { md: "56px", sm: "40px", xs: "40px" },
          textAlign: "center",
          margin: { md: "100px 0 64px", sm: "48px 0 32px", xs: "48px 0 32px" },
        }}
      >
        For developers and enterprises
      </Typography>
      <Grid
        direction={{ sm: "row", xs: "column" }}
        container
        rowGap={3}
        columnGap={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomCard
          lg={3.8}
          md={5.8}
          sm={12}
          transform="translate(-50%) rotate(80deg)"
          title="Email and SMS passwordless"
          description="Using one-time codes sent via email and SMS to ensure a secure and friendly sign-in experience."
        >
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "200px",
              padding: "24px 0",
              textAlign: "center",
            }}
          >
            <Typography
              component={"p"}
              sx={{
                color: "#fffc",
                fontSize: "24px",
                lineHeight: "30px",
                marginTop: "8px",
                fontWeight: "bold",
              }}
            >
              Enter verification code
            </Typography>
            <Typography
              component={"p"}
              sx={{
                color: "#ffffffb3",
                fontSize: "14px",
                lineHeight: "16px",
                marginTop: "4px",
                textAlign: "center",
              }}
            >
              The verification code has been sent to your email
              user@gmail.com
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                alignItems: "center",
              }}
            >
              {[2, 5, 2, 8, 7, 9].map((elem, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      flex: "1 0 0px",
                      height: {
                        xs: "32px",
                        sm: "32px",
                        md: "40px",
                        lg: "48px",
                      },
                      width: { xs: "32px", sm: "32px", md: "40px", lg: "48px" },
                      border: "1px solid rgba(255,255,255,.12)",
                      borderRadius: "12px",
                      background: "#ffffff1a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "bold",
                      lineHeight: "20px",
                    }}
                  >
                    {elem}
                  </Box>
                );
              })}
            </Box>
          </Stack>
        </CustomCard>
        <CustomCard
          lg={3.8}
          md={5.8}
          sm={12}
          transform="translateX(-50%) rotate(30deg)"
          title="Social sign-in"
          description="Using social sign-in to let users log in using their existing social media accounts such as Facebook, Apple, Google, etc. "
        >
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "200px",
              padding: "24px 0",
              textAlign: "center",
              width: "100%",
            }}
          >
            <InputComponet
              icon={"/page/icons/google.svg"}
              text="Continue with Google"
            />
            <Box
              sx={{
                width: "100%",
                maskImage:
                  "linear-gradient(to right,#0000,#000 12.5%,#000 87.5%,#0000)",
                color: "white",
              }}
            >
              <AutoSlideCarousel reverse={true}>
                {[
                  "/page/icons/facebookIcon.svg",
                  "/page/icons/github.svg",
                  "/page/icons/googleIcon.svg",
                  "/page/icons/apple.svg",
                  "/page/icons/discord.svg",
                ].map((elem, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        border: "1px solid rgba(255,255,255,.08)",
                        borderRadius: "24px",
                        padding: "12px",
                        background:
                          "radial-gradient(372.84% 141.42% at 0% 0%,#ffffff2e,#ffffff0f)",
                        height: "62px",
                        width: "62px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        marginRight: "8px",
                      }}
                    >
                      <Box
                        component={"img"}
                        src={elem}
                        sx={{ height: "26px" }}
                      />
                    </Box>
                  );
                })}
              </AutoSlideCarousel>
            </Box>
          </Stack>
        </CustomCard>
        <CustomCard
          lg={3.8}
          md={12}
          sm={12}
          transform="translateX(-50%) rotate(-80deg)"
          title="Password"
          description="Using password sign-in to serve as the most popular method of authentication for your products and unblock users."
        >
          <Stack
            sx={{
              padding: "20px 0",
              gap: "20px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                alignSelf: "center",
                border: "1px solid rgba(255,255,255,.08)",
                background:
                  "radial-gradient(372.84% 141.42% at 0% 0%,#ffffff2e,#ffffff0f)",
                borderRadius: "24px",
                padding: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component={"img"}
                src="/page/icons/lock.svg"
                sx={{ height: "32px", width: "32px" }}
              />
            </Box>
            <Stack>
              <InputComponet icon={"/page/icons/eye.svg"} type="password" />
              <Typography
                component={"p"}
                sx={{
                  color: "#ffffffb3",
                  fontSize: "12px",
                  lineHeight: "16px",
                  marginBlockStart: "8px",
                }}
              >
                At least 3 types of characters are required.
              </Typography>
            </Stack>
          </Stack>
        </CustomCard>

       
        <CustomCard
          lg={5.8}
          md={12}
          sm={12}
          title="Enterprise SSO (SAML & OIDC)"
          description="Easily meet your enterprise identity system needs with our SSO solution. It offers secure connections to various identity providers via SAML or OIDC protocols."
          transform="translateX(-50%) rotate(-130deg)"
          opacity="0.4"
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              minHeight: "300px",
              padding: "0 20px",
              width: "100%",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            {[
              {
                img: "/page/icons/webAuthn.svg",
                title: "WebAuthn   (Passkey)",
              },
              {
                img: "/page/icons/authenticator.svg",
                title: "Authenticator       app",
              },
              {
                img: "/page/icons/backup.svg",
                title: "Backup                 codes",
              },
            ].map((elem, index) => {
              return (
                <MultifactorAuthCard
                  key={index}
                  img={elem.img}
                  title={elem.title}
                />
              );
            })}
          </Stack>
        </CustomCard>
        <CustomCard
          lg={5.8}
          md={12}
          sm={12}
          title="Organizations (multi-tenancy)"
          description="In multi-tenant and B2B apps, leveraging organizations is a preferred way to group users and resources. Use ApiFlow organizations features to drive SaaS best practices."
          transform="translateX(-50%) rotate(-110deg)"
          opacity="0.4"
        >
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              minHeight: "300px",
              padding: "0 20px",
              width: "100%",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            {[
              {
                img: "/page/icons/webAuthn.svg",
                title: "WebAuthn   (Passkey)",
              },
              {
                img: "/page/icons/authenticator.svg",
                title: "Authenticator       app",
              },
              {
                img: "/page/icons/backup.svg",
                title: "Backup                 codes",
              },
            ].map((elem, index) => {
              return (
                <MultifactorAuthCard
                  key={index}
                  img={elem.img}
                  title={elem.title}
                />
              );
            })}
          </Stack>
        </CustomCard>
      </Grid>
    </Stack>
  );
}
