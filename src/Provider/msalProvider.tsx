"use client";

import { MsalProvider as ReactMsalProvider } from "@azure/msal-react";
import { msalConfig } from "../app/Services/azureServices";

import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const MsalProvider = ({ children }: any) => {
  return (
    <ReactMsalProvider instance={msalInstance}>{children}</ReactMsalProvider>
  );
};

export default MsalProvider;
