"use client";
import Surfacelayout from "@/app/website_components/layout/Surfacelayout";
import AboutSection from "@/app/website_components/page/aboutsection";
import HeroSection from "@/app/website_components/page/heroSection";
import Image from "next/image";
import { Box, Stack } from "@mui/material";
import ManageIdentities from "@/app/website_components/page/homepage/ManageIdentities";
import FooterDetails from "@/app/website_components/page/homepage/FooterDetails";
import Footer from "@/app/website_components/page/homepage/Footer";
import { useEffect } from "react";
import { useSignUpStore } from "@/app/hooks/sign/signZustand";

export default function Home() {
  const { handleStep, activeStep, setFormDataStore } = useSignUpStore();
  useEffect(() => {
    if (activeStep == -1) {
      localStorage.clear();
    }
    setFormDataStore("currentPage", "SignUp");
  }, []);
  return (
    <Surfacelayout>
      <Box
        sx={{
          height: {
            lg: "auto",
            sm: "calc(100% + 300px)",
            xs: "calc(100% + 400px)",
          },
          width: "100%",
          position: "absolute",
          left: 0,
          top: "-65px",
          objectFit: "cover",
          overflow: "clip",
        }}
        component={"img"}
        src="/page/heroSection/background.jpg"
      />
      <HeroSection />
      <AboutSection />

      <ManageIdentities />
      <FooterDetails />
      <Footer />
    </Surfacelayout>
  );
}
