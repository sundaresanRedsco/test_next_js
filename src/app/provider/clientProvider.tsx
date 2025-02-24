// ClientProvider.tsx
"use client"; // This marks the component as a client component

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "@mui/material";
import theme from "../../theme/theme";
import { Toaster } from "react-hot-toast";

const ClientProvider = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-right" reverseOrder={false} />
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </ThemeProvider>
  );
};

export default ClientProvider;
