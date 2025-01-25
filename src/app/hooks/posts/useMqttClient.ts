import { useEffect, useState } from "react";
import mqtt from "mqtt";
import toast from "react-hot-toast";

// Custom hook to manage MQTT client
export default function useMqttClient(userId: any) {
  const [client, setClient] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Create MQTT client and connect
    const client = mqtt.connect("ws://139.99.114.132:15675", {
      username: "mqttapiflow",
      password: "mqttapiflow",
    });

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      // Subscribe to the topic after connection
      const topic = `users/${userId}/notifications`;
      client.subscribe(topic, (err) => {
        if (err) {
          console.error("Failed to subscribe:", err);
        } else {
          console.log(`Subscribed to topic: ${topic}`);
        }
      });
    });

    client.on("message", (topic, message) => {
      // Process incoming message
      toast.success(`New Notification: ${message?.toString()}`);
      setMessage(message.toString());
    });

    // Cleanup on component unmount
    return () => {
      if (client) {
        client.end();
      }
    };
  }, [userId]);

  return { message };
}
