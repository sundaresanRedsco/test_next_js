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
import {
  PrimaryTextTypography,
  TeritaryTextTypography,
} from "@/app/Styles/signInUp";
import GButton from "../../global/GlobalButtons";
import { CommentSkeleton } from "./skeletons";

export default function CommentsContainer() {
  const { openComment, comment, setComment, mention, resetData } =
    usePostStore();
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<any>(null);
  const [isSendEnabled, setisSendEnabled] = useState(false);
  const openEmoji = Boolean(emojiAnchorEl);
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const {
    createComment,
    comments,
    createReplies,
    commentsLoading,
    commentCreationLoading,
    createRepliesLoading,
    commentReplyDeleting,
    deleteCommentReply,
    commentDeleting,
    deleteComment,
    commentsErr,
  } = useComments();
  const emojiPopOverId = openEmoji ? "CommentEmoji-popover" : undefined;
  const handleOpenEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(event.currentTarget);
  };
  const handleCloseEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(null);
  };
  const handleSubmit = () => {
    if (comment) {
      if (mention.email) {
        createReplies({
          comment_id: mention.id,
          reply_text: comment,
        });
      } else {
        createComment({
          post_id: openComment,
          comment_text: comment,
        });
      }
    }
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
          background: theme.palette.secondaryChatBg.main,
          boxShadow:
            "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px -6px 14px 0px rgba(0,0,0,0.12)",
          position: "relative",
          borderRadius: 2,
          padding: 1,
          display: "flex",
          alignItems: "center",
          zIndex: "99999",
          height: "70vh",
          overflowY: "auto",
          paddingBottom: 3,
          flexDirection: "column-reverse",
          gap: 3,
        }}
      >
        {commentsLoading ? (
          <Stack gap={1} sx={{ width: "95%" }}>
            {[1, 2, 3].map((elem) => {
              return <CommentSkeleton key={elem} />;
            })}
          </Stack>
        ) : comments?.length > 0 && !commentsErr ? (
          comments?.map((x: any) => (
            <CommentBubble
              key={x.id}
              data={x}
              repliesCount={x?.repliesCount}
              reply_comments={x?.reply_comments}
              message={x?.comment_text}
              email={x?.commented_by}
              commented_at={x?.commented_at}
              handleDelete={deleteComment}
              handleDeleteReply={deleteCommentReply}
            />
          ))
        ) : (
          <EmptyData text="No Comments Yet" />
        )}
        {(commentDeleting ||
          commentReplyDeleting ||
          commentCreationLoading ||
          createRepliesLoading) && (
          <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
            <CommentSkeleton />
          </Box>
        )}
      </Box>
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          position: "relative",
        }}
      >
        {mention?.email && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "3px",
              alignItems: "center",
            }}
          >
            <TeritaryTextTypography
              sx={{
                fontSize: "11px",
                color: theme.palette.textTertiaryColor.main,
              }}
            >
              Replying to
            </TeritaryTextTypography>
            <PrimaryTextTypography
              sx={{
                fontSize: "11px",
                color: theme.palette.textPrimaryColor.main,
                textTransform: "capitalize",
              }}
            >
              {mention.email}
            </PrimaryTextTypography>
            <GButton
              onClickHandler={() => {
                resetData("mention");
              }}
              customStyle={{
                "&.MuiButtonBase-root": {
                  padding: "0px !important",
                  margin: "0px !important",
                  minWidth: "auto",
                  marginLeft: 1,
                },
                color: `${theme.palette.textTertiaryColor.main} !important`,
                fontWeight: "bold !important",
              }}
              variant="text"
              label={"Cancel"}
            />
          </Box>
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
              onClick={handleSubmit}
            />
          }
        />
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
            setComment(comment + e.emoji);
            setEmojiAnchorEl(null);
          }}
        />
      </Popover>
    </>
  );
}
