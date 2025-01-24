import React, { useEffect, useRef, useState } from "react";
import GInput from "../../global/GInput";
import {
  AddReaction,
  AttachFile,
  Close,
  EmojiEmotions,
  Send,
} from "@mui/icons-material";
import { Box, IconButton, Popover, Stack } from "@mui/material";
import {
  PrimarySignInUPTypography,
  SecondarySignInUPTypography,
} from "@/app/Styles/signInUp";
import useWorkflowPost from "@/app/hooks/posts/useWorkflowPost";
import PostBubble from "./PostBubble";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";

type Props = {
  channel_id: string;
};

export default function WorkflowPosts({ channel_id }: Props) {
  //*HOOKS
  const { posts, postLoading, createPost, getPosts, postCreationLoading } =
    useWorkflowPost();
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const messages = [
    { type: "me", message: "Hello", sender: "You" },
    { type: "other", message: "Hi", sender: "John" },
    { type: "other", message: "Welcome", sender: "James" },
    { type: "other", message: "Hello world", sender: "Peter" },
  ];
  const [isLiked, setisLiked] = useState(messages.map(() => false));
  const [inputData, setinputData] = useState({
    media_url: "",
    content: "",
  });
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setfile] = useState<any>(null);

  //*VARIABLES
  const openEmoji = Boolean(emojiAnchorEl);
  const emojiPopOverId = openEmoji ? "PostEmoji-popover" : undefined;

  //*FUNCTIONS
  const handleReaction = (code: any) => {
    console.log("showErr-emoji", code);
  };
  const handleCreatePost = () => {
    createPost({ channel_id: channel_id, ...inputData });
    setinputData({ media_url: "", content: "" });
  };
  const handleOnchange = (e: any) => {
    const { name, value } = e.target;
    setinputData((prev) => ({ ...prev, [name]: value }));
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
    console.log(event.currentTarget, "showErr-event");
  };
  const handleCloseEmojiPopUp = (event: any) => {
    setEmojiAnchorEl(null);
  };

  useEffect(() => {
    getPosts(channel_id);
  }, [channel_id]);

  return (
    <Stack
      spacing={2}
      sx={{
        position: "relative",
        width: "400px",
        height: "100%",
      }}
      direction={"column"}
    >
      <Stack
        sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
      >
        <PrimarySignInUPTypography>Posts</PrimarySignInUPTypography>
      </Stack>

      <Stack
        spacing={3}
        sx={{ height: "70vh", overflowY: "auto", paddingBottom: 3 }}
      >
        {posts ? (
          posts?.map((elem: any, index: number) => (
            <PostBubble
              imageUrl={elem?.media_url}
              name={elem?.posted_by}
              isLiked={isLiked[index]}
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
            />
          ))
        ) : (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SecondarySignInUPTypography sx={{ color: "slategray" }}>
              No Posts Yet
            </SecondarySignInUPTypography>
          </Box>
        )}
      </Stack>

      {file && (
        <Box
          sx={{
            position: "absolute",
            bottom: 50,
            height: "200px",
            width: "100%",
            background: "#31244F80",
            padding: 1,
            borderRadius: 5,
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
              onClick={() => {
                console.log("showErr-event");
              }}
              sx={{ padding: 0 }}
            >
              <AddReaction
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          }
          endIcon={
            <AttachFile
              sx={{ cursor: "pointer" }}
              onClick={handleButtonClick}
            />
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
            console.log("showErr-Post", e);
          }}
        />
      </Popover>
    </Stack>
  );
}
