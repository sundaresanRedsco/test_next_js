import React, { createContext, useContext, useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";

type Props = { children: any };
const ContextProvider = createContext<any>({});
export const useWebSocket = () => {
  const response = useContext(ContextProvider);
  return response;
};
export default function WebSocketProvider({ children }: Props) {
  const [socket, setsocket] = useState(null);
  const isProduction = false;

  const websocketUrl = isProduction
    ? process.env.NEXT_PUBLIC_WSS_URL || "default_websocket_url" // Use a default if undefined
    : // : "ws://localhost:9595";
      // "ws://localhost:9596";
      // "wss://afnode.iprotecs.net/";
      "wss://apiflow-websocket.onrender.com/";
  useEffect(() => {
    const connection: any = new WebSocket(websocketUrl);
    if (connection) {
      setsocket(connection);
      connection.addEventListener("open", () => {
        console.log("WebSocket connected to " + websocketUrl);
      });

      // Close event - WebSocket connection closed
      connection.addEventListener("close", () => {
        console.log("WebSocket connection closed.");
      });

      // Error event - WebSocket connection error
      connection.addEventListener("error", (error: any) => {
        console.error("WebSocket error: ", error);
      });

      // Message event - WebSocket message received
      connection.addEventListener("message", (event: any) => {
        console.log("Received message: ", event.data);
      });
    }
  }, []);
  const getWsProvider: any = (
    tenant_id: any,
    apiFlow_Id: any,
    versionValue: any,
    ydoc: any
  ) => {
    const wsProvider = new WebsocketProvider(
      websocketUrl,
      `${tenant_id}_${apiFlow_Id}_${versionValue}`,
      ydoc
    );
    return wsProvider;
  };
  return (
    <ContextProvider.Provider
      value={{
        socket,
        getWsProvider,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
}
