import React, { useEffect, useRef, useState } from "react";
import GInput from "../../global/GInput";
import { AttachFile, Close, EmojiEmotions } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { PrimarySignInUPTypography } from "@/app/Styles/signInUp";
import useWorkflowPost from "@/app/hooks/workflow/useWorkflowPost";
import PostBubble from "./PostBubble";

type Props = {};

export default function WorkflowPosts({}: Props) {
  //*HOOKS
  const { posts, postLoading, createPost, postCreationLoading } =
    useWorkflowPost();

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setfile] = useState<any>(null);

  //*VARIABLES

  //*FUNCTIONS
  const handleToggleLike = (index: number) => {
    const newIsLiked = [...isLiked];
    newIsLiked[index] = !newIsLiked[index];
    setisLiked(newIsLiked);
  };
  const handleCreatePost = () => {};
  const handleOnchange = (e: any) => {
    const { name, value } = e.target;
    setinputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setfile(files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleClearFile = () => {
    setfile(null);
  };
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

      <Stack spacing={1} sx={{ height: "70vh", overflowY: "auto" }}>
        {messages.map((elem: any, index: number) => (
          <PostBubble
            name={elem.sender}
            isLiked={isLiked[index]}
            handleLike={() => handleToggleLike(index)}
            key={index}
            type={elem.type}
            text={elem.message}
          />
        ))}
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
        placeholder="type your message here..."
        startIcon={<EmojiEmotions sx={{ cursor: "pointer" }} />}
        endIcon={
          <AttachFile sx={{ cursor: "pointer" }} onClick={handleButtonClick} />
        }
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </Stack>
  );
}
