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
// Import the helper functions
import { MqttClient } from "mqtt";
import toast from "react-hot-toast";
import { connectToMqtt, sendMqttMessage } from "@/app/Helpers/mqttHelpers";
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

  const { openPosts, setopenPostAnchorEl, openPostAnchorEl, setChannelId } =
    useWorkflowPost();

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
      "ws://139.99.114.132:15675/ws", // Broker URL
      topic,
      (receivedTopic: any, message: any) => {
        // Handle incoming messages
        console.log(
          `Received message 1: ${message} on topic: ${receivedTopic}`
        );
        console.log(
          `Received message 2: ${message?.message} on topic: ${receivedTopic}`
        );

        let mess = JSON.parse(message);
        console.log(`Received message 3: ${mess}`);

        console.log(`Received message 4: ${mess?.message}`);
        toast.success(mess?.message, {
          position: "top-left", // Options: "top-left", "top-right", "top-center", "bottom-left", "bottom-right", "bottom-center"
        });
        // setMessages((prevMessages) => [...prevMessages, message]);
      },
      (error: any) => {
        // Handle errors

        console.error("MQTT error:", error);
      },
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
        channels.map((x: any) => (
          <p
            style={{ color: "white" }}
            onClick={() => {
              setCurrentChannel(x);
              setChannelId(x.id);
            }}
          >
            {x?.channel_name}
          </p>
        ))}

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
      >
        <WorkflowPosts channel_id={currentChannel?.id} />
      </Popover>
    </div>
  );
}
