"use client";
import OnboardingButton from "@/components/onboarding/OnboardingButton";
import OnboardingTypography from "@/components/onboarding/OnboardingTypography";
import OnboardingWrapper from "@/components/onboarding/OnboardingWrapper";
import { getCookies, globalTranslate } from "@/helpers/helpersFunctions";
import { ResendEmailToken } from "@/redux/signupReducer";
import { CenteredStack } from "@/styles/onBoarding";
import { Box, Stack, useTheme } from "@mui/material";
import { error } from "console";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {};

export default function EmailVerification({}: Props) {
  const theme = useTheme();
  const dispatch = useDispatch<any>();

  let key: string = process.env.NEXT_PUBLIC_COOKIE_EMAIL_VERIFICATION ?? "";
  const [email, setEmail] = useState<string>("");

  const onResendHandler = () => {
    dispatch(ResendEmailToken(email))
      .unwrap()
      .then((res: any) => {})
      .catch((error: any) => {});
  };

  useEffect(() => {
    // Get the email from cookies
    const storedEmail = getCookies(key);
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  return (
    <OnboardingWrapper>
      <CenteredStack>
        <Box
          sx={{
            background: theme.apiTrail.onboarding.Background,
            borderRadius: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 4,
            px: 2,
          }}
        >
          <div className="w-4/5">
            <OnboardingTypography
              text={globalTranslate(
                "mailVerification.TITLE",
                "onboardingConstants"
              )}
              fontSize={{
                xl: globalTranslate("fontSize.md", "signInUpStyleConstants"),
                xs: globalTranslate("fontSize.sm", "signInUpStyleConstants"),
              }}
              color={theme.apiTrail.onboarding.PrimaryText}
              fontWeight="lg"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center", // Center the image horizontally
                my: 2,
              }}
            >
              <Image
                src="/images/mail.png"
                alt="mail"
                width={120}
                height={120}
              />
            </Box>
            <OnboardingTypography
              text={globalTranslate(
                "mailVerification.SEND_TO" + email,
                "onboardingConstants"
              )}
              fontSize={{
                xl: globalTranslate("fontSize.xs1", "signInUpStyleConstants"),
                xs: globalTranslate("fontSize.xs2", "signInUpStyleConstants"),
              }}
              color={theme.apiTrail.onboarding.PrimaryText}
              fontWeight="md"
            />
            <OnboardingTypography
              text={globalTranslate(
                "mailVerification.DESCRIPTION",
                "onboardingConstants"
              )}
              fontSize={{
                xl: globalTranslate("fontSize.xs3", "signInUpStyleConstants"),
                xs: globalTranslate("fontSize.xs4", "signInUpStyleConstants"),
              }}
              color={theme.apiTrail.onboarding.SecondaryText}
              fontWeight="sm"
              sx={{
                my: 1,
              }}
            />
            <Box
              sx={{
                mt: 2,
              }}
            >
              <OnboardingButton
                sx={{
                  fontSize: {
                    xl: globalTranslate(
                      "fontSize.xs1",
                      "signInUpStyleConstants"
                    ),
                    xs: globalTranslate(
                      "fontSize.xs2",
                      "signInUpStyleConstants"
                    ),
                  },
                }}
                onClick={() => {
                  onResendHandler();
                }}
                text={globalTranslate(
                  "mailVerification.BUTTON",
                  "onboardingConstants"
                )}
              />
            </Box>
          </div>
        </Box>
      </CenteredStack>
    </OnboardingWrapper>
  );
}
