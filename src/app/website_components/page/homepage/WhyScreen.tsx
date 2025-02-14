import { Box } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Grid, Card, CardContent, Typography } from "@mui/material";

type Props = {};

type Point = {
  text: string;
};

type CardData = {
  heading: string;
  points: Point[];
};

export default function WhyScreen({}: Props) {
  const counters = [
    {
      icon: <AccessTimeIcon />,
      heading: "8,400+",
      subtext: "Stars",
    },
    {
      icon: <EventIcon />,
      heading: "398,000+",
      subtext: "Downloads",
    },
    {
      icon: <BarChartIcon />,
      heading: "1,000+",
      subtext: "Members",
    },
    {
      icon: <CheckCircleIcon />,
      heading: "100+",
      subtext: "Countries",
    },
  ];

  const cards: CardData[] = [
    {
      heading: "The most scalable and flexible product",
      points: [
        {
          text: "OIDC-based product and covers authentication and authorization.",
        },
        {
          text: "Logto is designed to scale with your business, from a single app to multi-app structure.",
        },
      ],
    },
    {
      heading: "The most scalable and flexible product",
      points: [
        {
          text: "OIDC-based product and covers authentication and authorization.",
        },
        {
          text: "Logto is designed to scale with your business, from a single app to multi-app structure.",
        },
      ],
    },
    {
      heading: "The most scalable and flexible product",
      points: [
        {
          text: "OIDC-based product and covers authentication and authorization.",
        },
        {
          text: "Logto is designed to scale with your business, from a single app to multi-app structure.",
        },
      ],
    },
    {
      heading: "The most scalable and flexible product",
      points: [
        {
          text: "OIDC-based product and covers authentication and authorization.",
        },
        {
          text: "Logto is designed to scale with your business, from a single app to multi-app structure.",
        },
      ],
    },
  ];
}
