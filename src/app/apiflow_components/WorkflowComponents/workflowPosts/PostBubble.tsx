import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import { Avatar, Box, Button, IconButton, Stack } from "@mui/material";
import React from "react";
import { FaRegComment } from "react-icons/fa";
import { EmojiEmotions, ExpandMore } from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";
type Props = {
  type: "me" | "other";
  isLiked: boolean;
  handleLike: () => void;
  text: string;
  name: string;
};

export default function PostBubble({
  type,
  isLiked,
  handleLike,
  text,
  name,
}: Props) {
  return (
    <Stack
      spacing={1}
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: type == "me" ? "end" : "start",
      }}
      direction={type == "me" ? "row-reverse" : "row"}
    >
      <Stack
        sx={{
          padding: 1,
          background: "#f2e7ff",
          borderRadius:
            type == "me" ? "10px 10px 0 10px" : "0px 10px 10px 10px",
          width: "70%",
        }}
        spacing={1}
      >
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          <Avatar sx={{ width: 30, height: 30 }} />
          <TeritaryTextTypography>{name}</TeritaryTextTypography>
        </Stack>
        <Box component={"img"} src="/media.avif" />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TeritaryTextTypography>{text}</TeritaryTextTypography>
          <Stack direction={"row"}>
            <IconButton size="small">
              <FaRegComment size={"15px"} />1
            </IconButton>
          </Stack>
        </Box>
      </Stack>
      <EmojiPicker
        reactionsDefaultOpen={true}
        onReactionClick={(e) => {
          console.log("showErr", e);
        }}
      />
    </Stack>
  );
}
