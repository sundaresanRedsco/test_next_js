import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "../redux/ReduxProvider";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientProvider from "@/provider/clientProvider";
import { Suspense } from "react";
import ConsoleLogProvider from "../provider/consoleLogProvider";
import SessionWrapper from "../provider/sessionProvider";
import ThemeProvider from "../provider/themeProvider";

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
                <ThemeProvider>
                  <Suspense>{children}</Suspense>
                </ThemeProvider>
              </SessionWrapper>
            </ClientProvider>
          </ConsoleLogProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
