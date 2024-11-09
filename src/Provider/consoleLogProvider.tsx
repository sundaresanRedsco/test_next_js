"use client";
import { useEffect } from "react";

// Custom provider component to handle console log disabling
const ConsoleLogProvider = ({ children }: any) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log = () => {}; // Disable console.log
      console.warn = () => {}; // Optional: Disable console.warn
      console.info = () => {}; // Optional: Disable console.info
      // Leave console.error active, as it can be useful for catching errors in production
    }
  }, []);

  return children; // Return the wrapped components
};

export default ConsoleLogProvider;
