import React, { useEffect, useState } from "react";
import { RootStateType } from "../../Redux/store";
import { useSelector } from "react-redux";
import { CommonReducer } from "../../Redux/commonReducer";
import { connectToMqtt, sendMqttMessage } from "../../MtqHelper/mtqHelper"; // Import the helper functions
import { MqttClient } from "mqtt";

const PostPage: React.FC = () => {
  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common,
  );
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!userProfile?.user?.user_id) return;

    const topic = `users/${userProfile.user.user_id}/notifications`;

    const mqttClient = connectToMqtt(
      "ws://139.99.114.132:15675/ws", // Broker URL
      topic,
      (receivedTopic, message) => {
        // Handle incoming messages
        console.log(`Received message: ${message} on topic: ${receivedTopic}`);
        setMessages((prevMessages) => [...prevMessages, message]);
      },
      (error) => {
        // Handle errors

        console.error("MQTT error:", error);
      },
      () => {
        // Handle successful connection
        setIsConnected(true);
      },
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
        "Hello from React!",
      );
    }
  };

  return (
    <div>
      <h1>MQTT with HiveMQ</h1>
      <button onClick={handleSendMessage} disabled={false}>
        Send Message
      </button>
      <h2>Received Messages:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostPage;
