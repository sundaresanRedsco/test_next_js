import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import { AddReaction, Delete, Edit, Send } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Stack,
  Box,
  IconButton,
  Popover,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import CustomEmojiPicker from "./CustomEmojiPicker";
import theme from "@/Theme/theme";
import GInput from "../../global/GInput";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { usePostStore } from "@/app/store/usePostStore";
import { formatTimeAgo } from "./helperFunction";

type Props = {
  nestedSize?: number;
  data?: any;
  repliesCount?: any;
  reply_comments?: any;
  commented_at?: any;
  message: string;
  email: string;
  handleDeleteReply?: any;
  handleDelete?: any;
};

export default function CommentBubble({
  nestedSize,
  data,
  repliesCount,
  reply_comments,
  message,
  email,
  commented_at,
  handleDeleteReply,
  handleDelete,
}: Props) {
  const { setMention, setComment, comment } = usePostStore();
  const [openReplies, setopenReplies] = useState(false);
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const width = "100%";

  const [emojiAnchorEl, setEmojiAnchorEl] = useState<any>(null);
  const openEmoji = Boolean(emojiAnchorEl);
  const emojiPopOverId = openEmoji ? "CommentEmoji-popover" : undefined;
  const handleOpenEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(event.currentTarget);
  };
  const handleCloseEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(null);
  };
  return (
    <Stack sx={{ width: "100%", alignItems: "flex-end" }}>
      <Stack direction={"row"} spacing={1} sx={{ width: width }}>
        <Avatar
          sx={{
            width: nestedSize ? 25 : 30,
            height: nestedSize ? 25 : 30,
          }}
        />
        <Stack
          sx={{
            width: "100%",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Stack
              sx={{
                borderRadius: "10px",
                background: "#8080802b",
                padding: 1,
                justifyContent: "center",
                gap: 1,
              }}
            >
              <TeritaryTextTypography
                sx={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: theme.palette.textTertiaryColor.main,
                }}
              >
                {email}
              </TeritaryTextTypography>
              <TeritaryTextTypography
                sx={{
                  fontSize: "12px",
                  color: theme.palette.textSecondaryColor.main,
                }}
              >
                {message}
              </TeritaryTextTypography>
              <TeritaryTextTypography
                sx={{
                  fontSize: "10px",
                  color: theme.palette.textTertiaryColor.main,
                  textAlign: "end",
                  width: "100%",
                }}
              >
                {formatTimeAgo(commented_at)}
              </TeritaryTextTypography>
            </Stack>
            {email == userProfile?.user?.email && (
              <IconButton
                sx={{
                  color: theme.palette.textTertiaryColor.main,
                }}
                onClick={() => {
                  if (!nestedSize) {
                    handleDelete(data.id);
                  } else {
                    handleDeleteReply(data.id);
                  }
                }}
              >
                <Delete
                  sx={{
                    fontSize: "15px",
                    color: "red",
                  }}
                />
              </IconButton>
            )}
          </Box>

          {!nestedSize && (
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
                  {
                    name: "Like",
                    onClick: () => {
                      // setopenReplies(true);
                    },
                  },
                  {
                    name: "Reply",
                    onClick: () => {
                      setMention({
                        email,
                        id: data.id,
                      });
                    },
                  },
                ].map((btn: any, index: number) => {
                  if (btn.name == "React") {
                    // return <CustomEmojiPicker id={id} size="small" />;
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
                        onClick={btn.onClick}
                      >
                        {btn.name}
                      </Button>
                    );
                  }
                })}
              </Box>
              {/* //*reaction  */}
              {/* <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
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
            </Stack> */}
            </Box>
          )}
          {repliesCount > 0 && (
            <Accordion
              sx={{
                "&.MuiPaper-root": {
                  padding: 0,
                  background: "transparent",
                },
                boxShadow: "none",
                "&::before": {
                  display: "none",
                },
                margin: "0px !important",
              }}
              expanded={openReplies}
            >
              {!openReplies && (
                <AccordionSummary
                  onClick={() => {
                    setopenReplies(!openReplies);
                  }}
                  sx={{
                    minHeight: "10px",
                    background: "transparent",
                    color: "#FFFFFF80",

                    "&.Mui-expanded": {
                      minHeight: "14px",
                    },
                    "& .MuiAccordionSummary-content": {
                      margin: "0",
                      display: "flex",
                      alignItems: "center",
                    },
                    "& .MuiAccordionSummary-content.Mui-expanded": {
                      margin: "0px",
                    },
                  }}
                >
                  <TeritaryTextTypography
                    sx={{
                      fontSize: "11px",
                      color: theme.palette.textTertiaryColor.main,
                    }}
                  >
                    View {repliesCount} more replies
                  </TeritaryTextTypography>
                </AccordionSummary>
              )}
              <AccordionDetails
                sx={{
                  width: "100%",
                  "&.MuiAccordionDetails-root": {
                    padding: "0px !important",
                  },
                  "& .MuiButtonBase-root": {
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                }}
              >
                <Stack
                  sx={{
                    flexDirection: "column-reverse",
                    gap: 1,
                  }}
                >
                  {reply_comments?.map((elem: any) => {
                    return (
                      <CommentBubble
                        message={elem.reply_text}
                        email={elem.replied_by}
                        key={elem.id}
                        data={elem}
                        nestedSize={1}
                        commented_at={elem.replied_at}
                        handleDeleteReply={handleDeleteReply}
                      />
                    );
                  })}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )}
        </Stack>
      </Stack>
      <Popover
        open={openEmoji}
        onClose={handleCloseEmojiPopUp}
        id={emojiPopOverId}
        anchorEl={emojiAnchorEl}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <EmojiPicker onEmojiClick={(e) => {}} />
      </Popover>
    </Stack>
  );
}
