// // authService.js
// import * as msal from "msal";

// const msalConfig: any = {
//   auth: {
//     clientId: "7900dbb8-73ea-4678-9c62-8234215de579",
//     authority: "https://login.microsoftonline.com/common",
//     redirectUri: "http://localhost:3000/sign", // Update with your actual redirect URI  "http://localhost:3000/sign" https://api.apiflow.pro/sign
//   },
//   cache: {
//     cacheLocation: "localStorage",
//     storeAuthStateInCookie: true,
//   },
// };

// const loginRequest = {
//   scopes: ["openid", "profile"],
// };

// const msalInstance = new msal.UserAgentApplication(msalConfig);

// const authService = {
//   login: async () => {
//     try {
//       await msalInstance.loginPopup(loginRequest);
//       return msalInstance.getAccount();
//     } catch (error) {
//       console.error("Error during login:", error);
//       throw error;
//     }
//   },

//   logout: () => {
//     msalInstance.logout();
//   },

//   getToken: async () => {
//     try {
//       const account = msalInstance.getAccount();
//       if (account) {
//         const tokenResponse = await msalInstance.acquireTokenSilent(
//           loginRequest
//         );
//         console.log("Token Response:", tokenResponse);

//         // You might want to check for the token type here
//         if (tokenResponse.tokenType === "id_token") {
//           // Access the id_token, not accessToken
//           const idToken = tokenResponse.idToken.rawIdToken;
//           console.log("ID Token:", idToken);
//           return idToken;
//         } else {
//           console.error("Unexpected token type:", tokenResponse.tokenType);
//           return null;
//         }
//       } else {
//         console.error("User not authenticated");
//         // Handle the case where the user is not authenticated
//         return null;
//       }
//     } catch (error) {
//       console.error("Error during token acquisition:", error);
//       throw error;
//     }
//   },
// };

// export default authService;

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

// const msalInstance = new PublicClientApplication(msalConfig);

// export const authService = {
//   initialize: async () => {
//     // Call and await the initialize function before using other MSAL APIs
//     await msalInstance.handleRedirectPromise();
//   },

//   login: async () => {
//     try {
//       await authService.initialize();
//       const response = await msalInstance.loginPopup(loginRequest);

//       // Check if login was successful
//       if (response) {
//         // Now, acquire the token silently
//         const tokenResponse = await msalInstance.acquireTokenSilent({
//           ...loginRequest,
//         });

//         console.log("Token Response:", tokenResponse);

//         // Handle the acquired token as needed
//         if (tokenResponse.tokenType === "id_token") {
//           const idToken = tokenResponse.idToken;
//           console.log("ID Token:", idToken);
//         } else {
//           console.error("Unexpected token type:", tokenResponse.tokenType);
//         }
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       throw error;
//     }
//   },

//   logout: () => {
//     msalInstance.logout();
//   },
// };

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
