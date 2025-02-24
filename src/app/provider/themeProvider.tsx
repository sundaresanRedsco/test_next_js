"use client";

import { useState, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {/* Provide toggleTheme function to children */}
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

// Create Context for theme toggling
import { createContext, useContext } from "react";
import { darkTheme, lightTheme } from "@/theme/theme";
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Custom Hook to use ThemeContext
export const useThemeToggle = () => useContext(ThemeContext);
