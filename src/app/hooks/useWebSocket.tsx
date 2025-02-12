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
  const secretKey = process.env.SECRET_KEY;
  const websocketUrl = isProduction
    ? process.env.NEXT_PUBLIC_WSS_URL || "default_websocket_url"
    : "wss://afnode.iprotecs.net/";
  useEffect(() => {
    const connection: any = new WebSocket(websocketUrl);
    if (connection) {
      setsocket(connection);
      connection.onopen = () => {
        connection.send(JSON.stringify({ secretKey }));
      };

      // Handle incoming messages from WebSocket
      connection.onmessage = (event: any) => {
        const message = event.data;
      };

      // Handle WebSocket errors
      connection.onerror = (error: any) => {
        // toast.error("Invalid JSON file");
      };

      // Handle WebSocket close
      connection.onclose = () => {};
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
