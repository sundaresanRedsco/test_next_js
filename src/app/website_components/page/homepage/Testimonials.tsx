"use client";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";

// Sample data for the carousel
const testimonials = [
  {
    name: "Alexander De Ridder",
    role: "Co-founder at INK",
    text: "Logto Cloud is an incredible solution for startups and scaleups who need authentication...",
    avatar: "https://via.placeholder.com/150", // Example avatar image
  },
  {
    name: "Hussaini Maina",
    role: "Developer",
    text: "If you're building a SaaS and your authn is not built with something like Logto...",
    avatar: "https://via.placeholder.com/150",
  },
  {
    name: "Michel Courtine",
    role: "Technical Staff at Docker",
    text: "I've been using Logto as THE authentication system...",
    avatar: "https://via.placeholder.com/150",
  },
  {
    name: "Olyno",
    role: "Developer",
    text: "Highly recommended Logto for startups looking for authentication...",
    avatar: "https://via.placeholder.com/150",
  },
  {
    name: "Onur Köse",
    role: "Backend Developer",
    text: "I migrated the authentication system...",
    avatar: "https://via.placeholder.com/150",
  },
];

export default function Testimonials() {
  return <Box sx={{ padding: "20px", marginTop: "10px" }}></Box>;
}
