import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "./provider/ReduxProvider";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientProvider from "./provider/clientProvider";
import { Suspense } from "react";
import ConsoleLogProvider from "./provider/consoleLogProvider";
import SessionWrapper from "./provider/sessionProvider";
import APIThemeProvider from "./provider/themeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Assests/images/cloneImage.png" />
      </head>
      <body>
        <ReduxProvider>
          <ConsoleLogProvider>
            <ClientProvider>
              <SessionWrapper>
                <APIThemeProvider>
                  <Suspense>{children}</Suspense>
                </APIThemeProvider>
              </SessionWrapper>
            </ClientProvider>
          </ConsoleLogProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
