import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "../redux/ReduxProvider";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientProvider from "@/Provider/clientProvider";
import { Suspense } from "react";
import ConsoleLogProvider from "@/Provider/consoleLogProvider";
import SessionWrapper from "@/Provider/sessionProvider";

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
                <Suspense>{children}</Suspense>
              </SessionWrapper>
            </ClientProvider>
          </ConsoleLogProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
