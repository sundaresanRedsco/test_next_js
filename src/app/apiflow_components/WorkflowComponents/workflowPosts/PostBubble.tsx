import { TeritaryTextTypography } from "@/app/Styles/signInUp";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Skeleton,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import {
  AddReaction,
  ArrowDropDown,
  Edit,
  MoreVert,
  Send,
} from "@mui/icons-material";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import CommentBubble from "./CommentBubble";
import GInput from "../../global/GInput";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import CustomEmojiPicker from "./CustomEmojiPicker";
import CommentsContainer from "./CommentsContainer";
import useLikes from "@/app/hooks/posts/useLikes";
import theme from "@/Theme/theme";
import { AdminServices } from "@/app/Services/services";
import { useQuery } from "@tanstack/react-query";
import { usePostStore } from "@/app/store/usePostStore";
import { queryClient } from "@/app/apiflow_Pages/layout/dashboardLayout";
import { formatTimeAgo } from "./helperFunction";

type Props = {
  type: "me" | "other";
  handleLike: (code: any) => void;
  text: string;
  name: string;
  id: any;
  imageUrl?: any;
  commentsCount?: any;
  likesCount?: any;
  channel_id?: any;
  likes?: any;
  posted_at?: any;
  handleDelete?: any;
};

export default function PostBubble({
  type,
  handleLike,
  text,
  name,
  id,
  imageUrl,
  likesCount,
  commentsCount,
  channel_id,
  likes,
  posted_at,
  handleDelete,
}: Props) {
  const [isHover, setisHover] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const { createLike, likeCreating } = useLikes({ postid: id });

  const { openComment, setopenComment, setselectedData, selectedData } =
    usePostStore();

  const handlePopoverOpen = () => {
    setopenComment(id);
    queryClient.invalidateQueries({ queryKey: ["comments"] });
  };
  const handlePopoverClose = (event: any) => {
    setopenComment("");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Stack
      spacing={1}
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: type == "me" ? "end" : "start",
        zIndex: "9998",
        padding: 1,
      }}
      direction={type == "me" ? "row-reverse" : "row"}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
    >
      <Stack
        sx={{
          padding: 1,
          background: theme.palette.sidebarMainBackground.main,
          borderRadius:
            type == "me" ? "10px 10px 0 10px" : "0px 10px 10px 10px",
          width: "70%",
          position: "relative",
          border:
            selectedData.id == id && selectedData.type == "post"
              ? "2px dashed white"
              : "none",
          animation:
            selectedData.id == id && selectedData.type == "post"
              ? "blinkShadow 3s infinite"
              : "",
        }}
        spacing={1}
      >
        {likeCreating ? (
          <Box
            sx={{
              position: "absolute",
              bottom: "-8px",
              right: type == "me" ? "auto" : "-2px",
              left: type == "me" ? "-2px" : "auto",
              borderRadius: "20px",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 1px 1px #373737",
              gap: "5px",
              background: theme.palette.modalBoxShadow.main,
            }}
          >
            <Skeleton
              sx={{
                width: "100px",
                height: "20px",
                borderRadius: "10px",
                background: theme.palette.modalBoxShadow.main,
              }}
              variant="rectangular"
            />
          </Box>
        ) : (
          likesCount != 0 && (
            <Stack
              direction={"row"}
              sx={{
                position: "absolute",
                bottom: "-8px",
                right: type == "me" ? "auto" : "-2px",
                left: type == "me" ? "-2px" : "auto",
                paddingX: "10px",
                borderRadius: "20px",
                background: theme.palette.modalBoxShadow.main,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 0 1px 1px ${theme.palette.modalBoxShadow.main}`,
                gap: "5px",
                paddingY: "2px",
              }}
            >
              {likes?.map((elem: any, index: number) => {
                return <Emoji key={index} unified={elem.emojis} size={13} />;
              })}
              <TeritaryTextTypography
                sx={{
                  fontSize: "11px",
                  color: theme.palette.textTertiaryColor.main,
                }}
              >
                {likesCount}
              </TeritaryTextTypography>
            </Stack>
          )
        )}
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ alignItems: "center", position: "relative" }}
        >
          <Avatar
            sx={{
              width: 30,
              height: 30,
              // background: theme.palette.textTertiaryColor.main,
            }}
          />
          <Stack>
            <TeritaryTextTypography
              sx={{
                color: theme.palette.textSecondaryColor.main,
                fontSize: "13px",
              }}
            >
              {name}
            </TeritaryTextTypography>
            <TeritaryTextTypography
              sx={{
                color: theme.palette.textTertiaryColor.main,
                fontSize: "12px",
              }}
            >
              {formatTimeAgo(posted_at)}
            </TeritaryTextTypography>
          </Stack>
          {name == userProfile?.user?.email && (
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                color: theme.palette.textTertiaryColor.main,
                position: "absolute",
                right: 0,
              }}
            >
              <MoreVert
                sx={{
                  fontSize: "20px",
                }}
              />
            </IconButton>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                setselectedData({ id, type: "post", text });
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleDelete(id);
                handleClose();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Stack>
        <TeritaryTextTypography
          sx={{
            color: theme.palette.textSecondaryColor.main,
          }}
        >
          {text}
        </TeritaryTextTypography>
        {imageUrl && <Box component={"img"} src={imageUrl} />}
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              justifyContent: "space-between",
            }}
          >
            {likesCount > 0 && (
              <TeritaryTextTypography
                sx={{
                  color: theme.palette.textSecondaryColor.main,
                  fontSize: "12px",
                }}
              >
                {likesCount} Likes
              </TeritaryTextTypography>
            )}

            {commentsCount > 0 && (
              <TeritaryTextTypography
                sx={{
                  color: theme.palette.textSecondaryColor.main,
                  fontSize: "12px",
                }}
              >
                {commentsCount} Comments
              </TeritaryTextTypography>
            )}
          </Box>
          <Button
            startIcon={<FaRegComment size={"13px"} />}
            onClick={handlePopoverOpen}
            sx={{
              color: theme.palette.textTertiaryColor.main,
              textTransform: "capitalize",
              fontFamily: "Firasans-regular",
              fontSize: "13px",
              "& .MuiButton-icon": {
                marginRight: "3px",
              },
            }}
          >
            Comment
          </Button>
        </Stack>
      </Stack>

      <CustomEmojiPicker
        id={id}
        channel_id={channel_id}
        createLike={createLike}
      />
    </Stack>
  );
}
