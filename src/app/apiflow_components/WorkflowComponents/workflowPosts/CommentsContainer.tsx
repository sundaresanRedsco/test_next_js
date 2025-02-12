import { AddReaction, ArrowDropDown, Send } from "@mui/icons-material";
import { Box, IconButton, Popover, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import GInput from "../../global/GInput";
import CommentBubble from "./CommentBubble";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import EmojiPicker from "emoji-picker-react";
import useComments from "@/app/hooks/posts/useComments";
import EmptyData from "./EmptyData";
import theme from "@/Theme/theme";
import { usePostStore } from "@/app/store/usePostStore";

type Props = { type: any };

export default function CommentsContainer({ type }: Props) {
  const { postId } = usePostStore();
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<any>(null);
  const [comment_id, setComment_id] = useState("");
  const [isReply, setIsReplay] = useState(false);
  const [isReplies, setIsReplies] = useState(false);
  const [isSendEnabled, setisSendEnabled] = useState(false);
  const openEmoji = Boolean(emojiAnchorEl);
  const [comment, setComment] = useState("");
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const {
    createComment,
    comments,
    createReplies,
    commentsLoading,
    commentCreationLoading,
    getComments,
  } = useComments();
  const emojiPopOverId = openEmoji ? "CommentEmoji-popover" : undefined;
  const handleOpenEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(event.currentTarget);
  };
  const handleCloseEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(null);
  };

  useEffect(() => {
    if (comment.length > 0) {
      setisSendEnabled(true);
    } else {
      setisSendEnabled(false);
    }
  }, [comment]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxHeight: "100%",
          background: theme.palette.modalBoxShadow.main,
          boxShadow:
            "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px -6px 14px 0px rgba(0,0,0,0.12)",
          position: "relative",
          borderRadius: 2,
          padding: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 1,
          zIndex: "99999",
        }}
      >
        {commentsLoading ? (
          <Stack gap={1} sx={{ width: "95%" }}>
            {[1, 2].map((elem) => {
              return (
                <Box key={elem} sx={{ display: "flex", gap: 1, width: "100%" }}>
                  <Skeleton
                    sx={{ height: "40px", width: "40px" }}
                    variant="circular"
                  />
                  <Stack>
                    <Skeleton sx={{ width: "100px" }} variant="text" />
                    <Skeleton sx={{ width: "150px" }} variant="text" />
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        ) : comments?.length > 0 ? (
          <Stack
            sx={{
              maxHeight: "250px",
              overflowY: "auto",
              width: "100%",
              overflowX: "hidden",
            }}
          >
            {comments?.map((x: any) => (
              <div>
                <CommentBubble
                  key={x.id}
                  id={1}
                  data={x}
                  setIsReplay={setIsReplay}
                  setComment={setComment_id}
                  setIsReplies={setIsReplies}
                  repliesCount={x?.repliesCount}
                />
                {comment_id === x.id && (
                  <>
                    {x?.reply_comments?.map((comment: any) => (
                      <CommentBubble
                        key={comment.id}
                        id={comment.id}
                        data={comment}
                        isReplay
                        nestedSize={1}
                        createReplies={createReplies}
                      />
                    ))}
                  </>
                )}
              </div>
            ))}
          </Stack>
        ) : (
          <EmptyData text="No Comments Yet" />
        )}
        {commentCreationLoading && (
          <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
            <Skeleton
              sx={{ height: "40px", width: "40px" }}
              variant="circular"
            />
            <Stack>
              <Skeleton sx={{ width: "100px" }} variant="text" />
              <Skeleton sx={{ width: "150px" }} variant="text" />
            </Stack>
          </Box>
        )}
        {/* <CommentBubble id={2} nestedSize={1} />
        <CommentBubble id={3} nestedSize={2} /> */}
        {isReply && (
          <button
            onClick={() => {
              setIsReplay(false);
              setIsReplies(false);
              setComment_id("");
            }}
          >
            comment
          </button>
        )}
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
            setComment(e.target.value);
          }}
          height="30px"
          radius="50px"
          width="100%"
          placeholder={"Comment as " + userProfile?.user?.user_name}
          sx={{
            transition: "width 0.3s",
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
                  createComment({
                    post_id: postId,
                    comment_text: comment,
                  });
                }
              }}
            />
          }
        />
        <ArrowDropDown
          sx={{
            color: theme.palette.apiBackgroundUrlCardColor.main,
            position: "absolute",
            bottom: "-28px",
            height: "2em",
            width: "2em",
            right: type == "me" ? "10px" : "auto",
          }}
        />
      </Box>
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
    </>
  );
}
