import { AddReaction, ArrowDropDown, Send } from "@mui/icons-material";
import { Box, IconButton, Popover } from "@mui/material";
import React, { useEffect, useState } from "react";
import GInput from "../../global/GInput";
import CommentBubble from "./CommentBubble";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import EmojiPicker from "emoji-picker-react";
import useComments from "@/app/hooks/posts/useComments";

type Props = { type: any; postId: any };

export default function CommentsContainer({ type, postId }: Props) {
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<any>(null);
  const [comment_id, setComment_id] = useState("");
  const [isReply, setIsReplay] = useState(false);
  const [isReplies, setIsReplies] = useState(false);

  const openEmoji = Boolean(emojiAnchorEl);
  const [comment, setComment] = useState("");
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const { createComment, comments, replies, createReplies, getReplies } =
    useComments(postId, userProfile?.user?.user_id);
  const emojiPopOverId = openEmoji ? "CommentEmoji-popover" : undefined;
  const handleOpenEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(event.currentTarget);
  };
  const handleCloseEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(null);
  };

  useEffect(() => {
    getReplies(comment_id);
  }, [comment_id]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: "white",
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
                    id={2}
                    data={comment}
                    isReplay
                    nestedSize={2}
                  />
                ))}
              </>
            )}
          </div>
        ))}

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
                  color: "white",
                }}
              />
            </IconButton>
          }
          endIcon={
            <Send
              fontSize="small"
              sx={{ cursor: "pointer", color: "white" }}
              onClick={() => {
                if (isReply) {
                  createReplies({
                    comment_id: comment_id,
                    reply_text: comment,
                  });
                } else {
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
            color: "white",
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
