import React, { useEffect, useRef, useState } from "react";
import PostBubble from "./PostBubble";
import useWorkflowPost from "@/app/hooks/posts/useWorkflowPost";
import { Box, IconButton, Popover, Skeleton, Stack } from "@mui/material";
import theme from "@/Theme/theme";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import EmptyData from "./EmptyData";
import EmojiPicker from "emoji-picker-react";
import { AddReaction, AttachFile, Close, Send } from "@mui/icons-material";
import GInput from "../../global/GInput";
import { usePostStore } from "@/app/store/usePostStore";
import { PostSkeleton, PostsSkeleton } from "./skeletons";

type Props = { channel_id: any };

export default function PostContainer({ channel_id }: Props) {
  //*HOOKS
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const {
    posts,
    postLoading,
    createPost,
    postCreationLoading,
    postDeleting,
    deletePost,
    postUpdating,
    updatePost,
  } = useWorkflowPost();
  const { file, setfile, inputData, setinputData, selectedData, resetData } =
    usePostStore();

  const [emojiAnchorEl, setEmojiAnchorEl] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //*FUNCTIONS
  const handleReaction = (code: any) => {
    console.log("showErr-emoji", code);
  };
  const handleCreatePost = () => {
    if (selectedData?.type == "post" && inputData.content) {
      updatePost({
        post_id: selectedData.id,
        content: inputData.content,
      });
    } else {
      if (inputData.content || inputData.media_url) {
        createPost({ channel_id, ...inputData });
      }
    }
  };
  const handleOnchange = (e: any) => {
    const { name, value } = e.target;
    setinputData({ ...inputData, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setfile(files[0]);
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          handleOnchange({
            target: { name: "media_url", value: base64String },
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleClearFile = () => {
    setfile(null);
    handleOnchange({ target: { name: "media_url", value: "" } });
  };
  const handleOpenEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(event.currentTarget);
  };
  const handleCloseEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(null);
  };

  //*VARIABLES
  const openEmoji = Boolean(emojiAnchorEl);
  const emojiPopOverId = openEmoji ? "PostEmoji-popover" : undefined;

  useEffect(() => {
    if (selectedData.type == "post") {
      setinputData({ content: selectedData.text });
    }
  }, [selectedData]);

  return (
    <>
      <Stack
        sx={{
          height: "70vh",
          overflowY: "auto",
          paddingBottom: 3,
          flexDirection: "column-reverse",
        }}
      >
        {(postCreationLoading || postUpdating || postDeleting) && (
          <PostSkeleton />
        )}
        {postLoading ? (
          <PostsSkeleton />
        ) : posts?.length > 0 ? (
          posts
            ?.slice()
            .map((elem: any, index: number) => (
              <PostBubble
                imageUrl={elem?.media_url}
                name={elem?.posted_by}
                handleLike={(code) => handleReaction(code)}
                key={index}
                type={
                  elem?.posted_by == userProfile?.user?.email ? "me" : "other"
                }
                text={elem?.content}
                id={elem?.id}
                likes={elem?.likes}
                likesCount={elem?.likesCount}
                commentsCount={elem?.commentsCount}
                channel_id={channel_id}
                posted_at={elem?.posted_at}
                handleDelete={deletePost}
              />
            ))
        ) : (
          <EmptyData text=" No Posts Yet" />
        )}
      </Stack>

      {file && (
        <Box
          sx={{
            position: "absolute",
            bottom: 50,
            height: "200px",
            width: "100%",
            background: theme.palette.secondaryChatBg.main,
            padding: 1,
            borderRadius: 5,
            zIndex: 11111,
          }}
        >
          <Box
            component={"img"}
            src={URL.createObjectURL(file)}
            sx={{ objectFit: "contain", height: "100%", width: "100%" }}
          />
          <IconButton
            onClick={handleClearFile}
            size="small"
            sx={{ color: "#dc3545", position: "absolute", top: 1, right: 1 }}
          >
            <Close />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          position: "relative",
        }}
      >
        <GInput
          WebkitBoxShadow={"0 0 0 30px #9891a7 inset !important"}
          background={"#31244F80"}
          name={"content"}
          type={"text"}
          fullWidth={true}
          variant="outlined"
          value={inputData.content}
          error={false}
          helperText={""}
          onChangeHandler={handleOnchange}
          height="43px"
          radius="5px"
          width="100%"
          placeholder="Write something here..."
          sx={{
            transition: "width 0.3s",
          }}
          startIcon={
            <IconButton
              aria-haspopup={true}
              aria-owns={emojiPopOverId}
              onClick={(e) => {
                e.preventDefault();
                handleOpenEmojiPopUp(e);
              }}
              sx={{ padding: 0, position: "relative", zIndex: 1 }}
            >
              <AddReaction
                sx={{
                  color: theme.palette.textPrimaryColor.main,
                }}
              />
            </IconButton>
          }
          endIcon={
            <Box>
              {inputData.content && selectedData.type == "post" && (
                <IconButton
                  onClick={() => {
                    resetData("selectedData");
                    resetData("inputData");
                  }}
                  sx={{ color: "red" }}
                >
                  <Close />
                </IconButton>
              )}
              <AttachFile
                sx={{
                  cursor: "pointer",
                  color: theme.palette.textPrimaryColor.main,
                }}
                onClick={handleButtonClick}
              />
            </Box>
          }
        />
        <IconButton
          onClick={handleCreatePost}
          sx={{
            background: "#31244F",
            color: "white",
            padding: 1,
            "&:hover": {
              background: "#31244F",
            },
            opacity: inputData.content || inputData.media_url ? 1 : 0,
            position:
              inputData.content || inputData.media_url
                ? "relative"
                : "absolute",
            transition: "opacity 0.3s",
          }}
        >
          <Send />
        </IconButton>
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
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
            setinputData({
              ...inputData,
              content: inputData.content + e.emoji,
            });
            setEmojiAnchorEl(null);
          }}
        />
      </Popover>
    </>
  );
}
