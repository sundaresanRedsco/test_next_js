"use client";
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
import { Box, IconButton, Popover } from "@mui/material";
import { ChatBubble } from "@mui/icons-material";
import useWorkflowPost from "@/app/hooks/posts/useWorkflowPost";
// Import the helper functions
import { MqttClient } from "mqtt";
import toast from "react-hot-toast";
import { connectToMqtt, sendMqttMessage } from "@/app/Helpers/mqttHelpers";
import { usePostStore } from "@/app/store/usePostStore";
export default function HomeChannel(props: any) {
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
  // Use the custom hook to get the message

  const { setopenPostAnchorEl, openPostAnchorEl, setChannelId } =
    usePostStore();
  const openPosts = Boolean(openPostAnchorEl);
  useEffect(() => {
    dispatch(
      getChannels({
        workspace_id: currentWorkspace?.id,
        start: 1,
        end: 10,
      })
    )
      .unwrap()
      .then((res: any) => {
        setCurrentChannel(res[0]);
        // console.log("UpdateResponse: ", res);
        // router.push(`/userId/${userProfile?.user?.user_id}/channel`);
        // toast.success("channel Created");
      });
  }, []);

  useEffect(() => {
    if (currentChannel?.id) {
      setChannelId(currentChannel.id); // Ensure the channelId is set properly
      console.log(currentChannel?.id, "currentChannel?.id");
    }
  }, [currentChannel, setChannelId]);

  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!userProfile?.user?.user_id) return;

    const topic = `users/${userProfile.user.user_id}/notifications`;

    const mqttClient = connectToMqtt(
      process.env.NEXT_PUBLIC_APP_MQTT_URL as string, // Broker URL
      topic,
      (receivedTopic: any, message: any) => {
        // Handle incoming messages

        let mess = JSON.parse(message);

        toast.success(mess?.message, {
          position: "top-left", // Options: "top-left", "top-right", "top-center", "bottom-left", "bottom-right", "bottom-center"
        });
      },
      (error: any) => {},
      () => {
        // Handle successful connection
        setIsConnected(true);
      }
    );

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [userProfile]);

  const handleSendMessage = () => {
    if (client && userProfile?.user?.user_id) {
      sendMqttMessage(
        client,
        `users/${userProfile.user.user_id}/notifications`,
        "Hello from React!"
      );
    }
  };

  return (
    <div>
      {Array.isArray(channels) &&
        channels.map((x: any, index: any) => (
          <Box
            sx={{
              color: "white",
              cursor: "pointer",
              paddingY: 2,
              borderBottom: "1.5px dashed gray",
            }}
            onClick={() => {
              setCurrentChannel(x);
              setChannelId(x.id);
            }}
          >
            {index + 1 + " . " + x?.channel_name}
          </Box>
        ))}

      {currentChannel && (
        <IconButton
          aria-owns={currentChannel?.id}
          aria-haspopup={true}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setopenPostAnchorEl(event.currentTarget);
          }}
          sx={{
            position: "absolute",
            right: 20,
            bottom: 20,
            zIndex: 1,
            background:
              "linear-gradient(90deg, rgb(155, 83, 176) 0%, rgb(122, 67, 254) 100%)",
            color: "white",
          }}
        >
          <ChatBubble />
        </IconButton>
      )}
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
            background: "black",
          },
        }}
      >
        <WorkflowPosts channel_id={currentChannel?.id} />
      </Popover>
    </div>
  );
}
