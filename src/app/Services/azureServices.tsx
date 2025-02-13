import { PublicClientApplication } from "@azure/msal-browser";
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "7900dbb8-73ea-4678-9c62-8234215de579", //337124cc-1b79-48b2-8e0e-ef65f291013d
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000/sign",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            break;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["openid", "profile"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
