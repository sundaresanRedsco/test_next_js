// const WS_URL = "ws://10.11.13.83:7040";
const WS_URL = process.env.NEXT_PUBLIC_APP_WS_URL;
export const socketMiddleware =
  (socket: any) => (params: any) => (next: any) => (action: any) => {
    const { dispatch, getState } = params;
    const { type, payload } = action;

    switch (type) {
      case "socket/connect":
        socket.connect(WS_URL);

        break;

      case "socket/disconnect":
        socket.disconnect();

        break;

      case "socket/send":
        // Queue outgoing messages
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(payload);
        } else {
          // Dispatch action to indicate that the message is queued
          dispatch({ type: "socket/message_queued", payload });
        }
        break;

      default:
        break;
    }

    return next(action);
  };
