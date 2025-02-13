import mqtt, { MqttClient } from "mqtt";

const options: mqtt.IClientOptions = {
  username: "mqttapiflow", // Replace with the new username
  password: "mqttapiflow", // Replace with the new password
};

export const connectToMqtt = (
  brokerUrl: string,
  topic: string,
  onMessageCallback: (topic: string, message: string) => void,
  onErrorCallback: (error: Error) => void,
  onConnectCallback: () => void
): MqttClient => {
  const mqttClient = mqtt.connect(brokerUrl, options);

  mqttClient.on("connect", () => {
    onConnectCallback();

    mqttClient.subscribe(topic, (err: any) => {
      if (err) {
      } else {
      }
    });
  });

  mqttClient.on("message", (receivedTopic: string, message: Buffer) => {
    onMessageCallback(receivedTopic, message.toString());
  });

  mqttClient.on("error", (error: Error) => {
    console.error("Connection error:", error);
    onErrorCallback(error);
    mqttClient.end();
  });

  return mqttClient;
};

export const sendMqttMessage = (
  client: MqttClient | null,
  topic: string,
  message: string
) => {
  if (client) {
    client.publish(topic, message);
  } else {
  }
};
