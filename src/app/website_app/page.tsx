import Surfacelayout from "../website_components/layout/Surfacelayout";
import Testimonials from "../website_components/page/homepage/Testimonials";
import WhyScreen from "../website_components/page/homepage/WhyScreen";
import AboutSection from "../website_components/page/aboutsection";
import HeroSection from "../website_components/page/heroSection";
import Image from "next/image";
import TrustSection from "../website_components/page/homepage/TrustSection";
import GrowSection from "../website_components/page/homepage/growSection";

import { Box, Stack } from "@mui/material";
import CustomerSection from "../website_components/page/customersection";
import ManageIdentities from "../website_components/page/homepage/ManageIdentities";
import FooterDetails from "../website_components/page/homepage/FooterDetails";
import Footer from "../website_components/page/homepage/Footer";

export default function Home() {
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
