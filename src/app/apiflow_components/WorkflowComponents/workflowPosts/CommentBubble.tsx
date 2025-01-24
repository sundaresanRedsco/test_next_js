import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import { AddReaction } from "@mui/icons-material";
import { Avatar, Button, Stack, Box } from "@mui/material";
import { Emoji } from "emoji-picker-react";
import React from "react";
import CustomEmojiPicker from "./CustomEmojiPicker";

type Props = {
  nestedSize?: number;
  id: any;
};

export default function CommentBubble({ nestedSize, id }: Props) {
  const width = nestedSize ? `${100 - nestedSize * 10}%` : "100%";
  return (
    <Stack sx={{ width: "100%", alignItems: "flex-end" }}>
      <Stack direction={"row"} spacing={1} sx={{ width: width }}>
        <Avatar
          sx={{
            width: nestedSize ? 20 : 30,
            height: nestedSize ? 20 : 30,
          }}
        />
        <Stack
          sx={{
            width: "100%",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Stack
            sx={{
              borderRadius: "10px",
              background: "#8080802b",
              padding: 1,
              justifyContent: "center",
            }}
          >
            <TeritaryTextTypography
              sx={{ fontSize: "13px", fontWeight: "bold" }}
            >
              John
            </TeritaryTextTypography>
            <TeritaryTextTypography sx={{ fontSize: "10px" }}>
              John
            </TeritaryTextTypography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {[
                { name: "React", onClick: "" },
                { name: "Reply", onClick: "" },
              ].map((btn: any, index: number) => {
                if (btn.name == "React") {
                  return <CustomEmojiPicker id={id} size="small" />;
                } else {
                  return (
                    <Button
                      key={index}
                      variant="text"
                      size="small"
                      sx={{
                        color: "gray",
                        textTransform: "Capitalize",
                        height: "15px",
                      }}
                    >
                      {btn.name}
                    </Button>
                  );
                }
              })}
            </Box>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <TeritaryTextTypography
                sx={{ fontSize: "11px", color: "slategray" }}
              >
                3
              </TeritaryTextTypography>
              <Stack direction={"row"}>
                {[
                  { code: "1f603" },
                  { code: "1f44d" },
                  { code: "2764-fe0f" },
                ].map((elem, index) => {
                  return (
                    <Box
                      sx={{
                        borderRadius: "50%",
                        padding: "2px",
                        background: "#dac2c2",
                        marginRight: "-4px",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                      key={index}
                    >
                      <Emoji unified={elem.code} size={13} />
                    </Box>
                  );
                })}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
