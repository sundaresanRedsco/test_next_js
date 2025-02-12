import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import { AddReaction, Send } from "@mui/icons-material";
import { Avatar, Button, Stack, Box, IconButton, Popover } from "@mui/material";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import CustomEmojiPicker from "./CustomEmojiPicker";
import theme from "@/Theme/theme";
import GInput from "../../global/GInput";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";

type Props = {
  nestedSize?: number;
  id: any;
  data?: any;
  setIsReplay?: any;
  setComment?: any;
  setIsReplies?: any;
  isReplay?: any;
  repliesCount?: any;
  createReplies?: any;
};

export default function CommentBubble({
  nestedSize,
  id,
  data,
  setIsReplay,
  setComment,
  setIsReplies,
  isReplay,
  repliesCount,
  createReplies,
}: Props) {
  const [isReply, setisReply] = useState(false);
  const [comment, setcomment] = useState("");
  const [isSendEnabled, setisSendEnabled] = useState(false);
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const width = nestedSize ? `${100 - nestedSize * 10}%` : "100%";
  useEffect(() => {
    if (comment.length > 0) {
      setisSendEnabled(true);
    } else {
      setisSendEnabled(false);
    }
  }, [comment]);
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
              gap: 1,
            }}
          >
            <TeritaryTextTypography
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                color: theme.palette.textTertiaryColor.main,
              }}
            >
              {isReplay ? data?.replied_by : data?.commented_by}
            </TeritaryTextTypography>
            <TeritaryTextTypography
              sx={{
                fontSize: "10px",
                color: theme.palette.textSecondaryColor.main,
              }}
            >
              {isReplay ? data?.reply_text : data?.comment_text}
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
            {!isReplay && (
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
                    name: "Replies",
                    onClick: "",
                    element: repliesCount > 0 && (
                      <TeritaryTextTypography
                        sx={{ fontSize: "11px", color: "slategray" }}
                      >
                        {repliesCount}
                      </TeritaryTextTypography>
                    ),
                  },
                  {
                    name: "Reply",
                    onClick: () => {
                      setisReply(true);
                    },
                  },
                ].map((btn: any, index: number) => {
                  if (btn.name == "React") {
                    // return <CustomEmojiPicker id={id} size="small" />;
                  } else {
                    return (
                      <>
                        <Button
                          key={index}
                          variant="text"
                          size="small"
                          sx={{
                            color: "gray",
                            textTransform: "Capitalize",
                            height: "15px",
                          }}
                          onClick={() => {
                            setisReply(true);
                            setComment(data.id);
                            setIsReplies(true);
                          }}
                        >
                          {btn.name}
                        </Button>
                        {btn.element}
                      </>
                    );
                  }
                })}
              </Box>
            )}
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
          {isReply && (
            <GInput
              WebkitBoxShadow={"0 0 0 30px #9891a7 inset !important"}
              background={"#31244F80"}
              name={"content"}
              type={"text"}
              fullWidth={true}
              variant="outlined"
              value={comment}
              error={false}
              helperText={""}
              onChangeHandler={(e: any) => {
                setcomment(e.target.value);
              }}
              height="30px"
              radius="50px"
              width="100%"
              placeholder={"Comment as " + userProfile?.user?.user_name}
              sx={{
                transition: "width 0.3s",
                marginBottom: 1,
              }}
              startIcon={
                <IconButton
                  aria-haspopup={true}
                  aria-owns={emojiPopOverId}
                  onClick={handleOpenEmojiPopUp}
                  sx={{ padding: 0 }}
                >
                  <AddReaction
                    sx={{
                      fontSize: "15px",
                      color: theme.palette.textTertiaryColor.main,
                    }}
                  />
                </IconButton>
              }
              endIcon={
                <Send
                  fontSize="small"
                  sx={{
                    cursor: "pointer",
                    color: isSendEnabled
                      ? theme.palette.textPrimaryColor.main
                      : theme.palette.textTertiaryColor.main,
                    transition: ".3s",
                  }}
                  onClick={() => {
                    if (comment) {
                      createReplies({
                        comment_id: id,
                        reply_text: comment,
                      });
                    }
                  }}
                />
              }
            />
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
        <EmojiPicker
          onEmojiClick={(e) => {
            console.log("showErr-comment", e);
          }}
        />
      </Popover>
    </Stack>
  );
}
