"use client";
import React from "react";
import OnboardingWrapper from "./OnboardingWrapper";
import WelcomePage from "./WelcomePage";

type Props = {};

export default function Onboarding({}: Props) {
  return (
    <OnboardingWrapper>
      <WelcomePage />
    </OnboardingWrapper>
  );
}
