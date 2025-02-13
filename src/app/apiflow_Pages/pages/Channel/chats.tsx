"use client";

import Channel from "@/app/apiflow_components/channels/channelpage";
import { workspaceReducer } from "@/app/Redux/apiManagement/workspaceReducer";
import {
  ChannelReducer,
  getChannels,
} from "@/app/Redux/channel/ChannelReducer";
import { RootStateType } from "@/app/Redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CommonReducer } from "@/app/Redux/commonReducer";
import WorkflowPosts from "@/app/apiflow_components/WorkflowComponents/workflowPosts";
import { IconButton, Popover } from "@mui/material";
import { ChatBubble } from "@mui/icons-material";
import useWorkflowPost from "@/app/hooks/posts/useWorkflowPost";
export default function Chats(props: any) {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const [currentChannel, setCurrentChannel] = useState<any>({});
  const { currentWorkspace } = useSelector<RootStateType, workspaceReducer>(
    (state) => state.apiManagement.workspace
  );

  const { channels } = useSelector<RootStateType, ChannelReducer>(
    (state) => state.channels.channels
  );

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const { openPosts, setopenPostAnchorEl, openPostAnchorEl } =
    useWorkflowPost();

  useEffect(() => {
    dispatch(
      getChannels({
        workspace_id: currentWorkspace?.id,
        start: 1,
        end: 5,
      })
    )
      .unwrap()
      .then((res: any) => {
        setCurrentChannel(res[0]);
      });
  }, []);
  return (
    <div>
      {channels.map((x: any) => (
        <p
          style={{ color: "white" }}
          onClick={() => {
            setCurrentChannel(x);
          }}
        >
          {x.channel_name}
        </p>
      ))}

      <IconButton
        aria-owns={currentChannel?.id}
        aria-haspopup={true}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setopenPostAnchorEl(event.currentTarget);
        }}
        sx={{
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgb(155, 83, 176) 0%, rgb(122, 67, 254) 100%)",
          color: "white",
        }}
      >
        <ChatBubble />
      </IconButton>
      <Popover
        id={currentChannel?.id}
        open={openPosts}
        anchorEl={openPostAnchorEl || null}
        onClose={() => {
          setopenPostAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          zIndex: 9999,
          "& .MuiPaper-root": {
            padding: "10px",
          },
        }}
      ></Popover>
    </div>
  );
}
