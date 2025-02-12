import { AddReaction } from "@mui/icons-material";
import { Box, Stack, IconButton, Popover } from "@mui/material";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import React, { useState } from "react";

type Props = { size?: "small"; id: any; channel_id: any; createLike?: any };

export default function CustomEmojiPicker({
  size,
  id,
  channel_id,
  createLike,
}: Props) {
  const [anchorEl, setanchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleOpenPopUp = (e: any) => {
    setanchorEl(e.currentTarget);
  };
  const handleClosePopUp = () => {
    setanchorEl(null);
  };
  const popUpId = "emoji" + id;
  return (
    <Box
      sx={{
        borderRadius: "50px",
        background: "#56565690",
        backgroundFilter: "blur(8px)",
        boxShadow:
          "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        padding: size == "small" ? "5px" : 1,
        gap: "5px",
      }}
    >
      {[
        { code: "1f603" },
        { code: "1f44d" },
        { code: "2764-fe0f" },
        { code: "add" },
      ].map((elem, index) => {
        if (elem.code == "add") {
          return (
            <Stack
              key={index}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  scale: 1.3,
                },
                transition: "all 0.3s",
              }}
            >
              <IconButton
                aria-haspopup={true}
                aria-owns={open ? popUpId : undefined}
                onClick={handleOpenPopUp}
                sx={{ padding: 0 }}
              >
                <AddReaction
                  sx={{
                    fontSize: size == "small" ? "12px" : "15px",
                    color: "#898989de",
                  }}
                />
              </IconButton>
            </Stack>
          );
        } else {
          return (
            <Stack
              key={index}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  scale: 1.3,
                },
                transition: "all 0.3s",
              }}
              onClick={() => {
                createLike({
                  post_id: id,
                  emoji: elem.code,
                  channel_id: channel_id,
                });
              }}
            >
              <Emoji unified={elem.code} size={size == "small" ? 10 : 13} />
            </Stack>
          );
        }
      })}
      <Popover
        open={open}
        onClose={handleClosePopUp}
        id={id}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <EmojiPicker
          onEmojiClick={(e) => {
            createLike({
              post_id: id,
              emoji: e,
            });
          }}
        />
      </Popover>
    </Box>
  );
}
