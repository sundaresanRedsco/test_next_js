import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { login, logout } from "./loginReducer";
import * as authService from "../services/auth";
import { AdminServices } from "../services/services";
import { errorHandling } from "../services/errorHandling";
import axios from "axios";
import Cookies from "js-cookie";
import {
  EncrouptionLogic,
  decryptData,
  setCookies,
} from "../helpers/helpersFunctions";
// import { userInterface } from "../../interface/userInterface";

type CommonInitialStateType = {
  isLoggedIn: boolean;
  userProfile: {
    user: any;
  };
  sessionExpireTime: any | null;
  packages: any | any;
  maninContainer: any;
  loading: boolean;
  expiryDate: any;
  RefeshToken: any;
  tourStep: number;
  tourStepValues: any[];
  sessionPopup: boolean;
  themeValue: string | any;
  currentTreeActive: string;
};

export const initializeSession = createAsyncThunk(
  "initializeSession",
  async () => {
    return await authService.getUserProfile();
  }
);

const getPackages = createAsyncThunk("commom/packages", async () => {
  try {
    return await AdminServices(
      "get",
      "authentication/package/view/",
      null,
      null
    );
  } catch (err: any) {
    // throw new Error(errorHandling(err));
  }
});

const SendEmailOTPPassword = createAsyncThunk(
  "common/sendEmailOTPPassword",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `api/auth/request_forgot_password_otp?email=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

const ForgetPasswordOTPverification = createAsyncThunk(
  "common/sendEmailOTPPassword",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/auth/forgot_password",
        value,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const UpdateUser = createAsyncThunk(
  "common/updateUser",
  async (value: any) => {
    try {
      return await AdminServices("post", "api/auth/update_user", value, null);
    } catch (error) {}
  }
);

export const UpdatePassword = createAsyncThunk(
  "common/updatePassword",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/auth/update_password",
        value,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetCompanyByTenantId = createAsyncThunk(
  "common/getCompanyByTenantId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/auth/get_company_by_tenantid?id=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const UpdateCompanyDetails = createAsyncThunk(
  "common/updateCompanyDetails",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/auth/update_company",
        value,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

const GetRefreshToken = createAsyncThunk(
  "common/GetRefreshToken",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/auth/refresh_token?token=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const resetGatewayStateCommon = createAction("Gateway/resetState");

const userInitialState = {
  user: {
    user_id: "",
    first_name: "",
    last_name: "",
    token: "",
    email: "",
    tenant_id: "",
    profile_picture: "",
    cover_picture: "",
    workspace_id: "",
    user_registered: "", // Assuming there are only two possible values
    expiration_time: 0,
    user_from: null, // Assuming "NULL" can be represented as null
    refresh_token: "",
    is_2fa_enable: false,
    team_workspace_id: "",
    first_login: false,
    role_id: "",
    user_name: "",
  },
};

const initialState: CommonInitialStateType = {
  isLoggedIn: false,
  userProfile: {
    user: {
      user_id: "",
      first_name: "",
      last_name: "",
      token: "",
      email: "",
      tenant_id: "",
      profile_picture: "",
      cover_picture: "",
      workspace_id: "",
      user_registered: "", // Assuming there are only two possible values
      expiration_time: 0,
      user_from: null, // Assuming "NULL" can be represented as null
      refresh_token: "",
      is_2fa_enable: false,
      team_workspace_id: "",
      first_login: false,
      role_id: "",
      user_name: "",
    },
  },
  sessionExpireTime: null,
  RefeshToken: {},
  packages: null,
  maninContainer: null,
  loading: false,
  expiryDate: "",
  tourStep: 0,
  tourStepValues: [],
  sessionPopup: false,
  themeValue: "light",
  currentTreeActive: "",
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    selectContainer: (state, action) => {
      // Update the state with the selected container value
      state.maninContainer = action.payload;
    },
    updateUserProfile: (state, action) => {
      // Update the state with the selected container value
      if (state.userProfile) {
        state.userProfile.user = action.payload;
        localStorage.setItem(
          process.env.NEXT_PUBLIC_COOKIE_USERPROFILE || "",
          EncrouptionLogic(state.userProfile.user)
        );
      }
    },
    updateTourStep: (state, action) => {
      // Update the state with the selected container value
      state.tourStep = action.payload;
    },
    updateTourStepValues: (state, action) => {
      state.tourStepValues = action.payload;
    },
    updateSessionPopup: (state, action) => {
      state.sessionPopup = action.payload;
    },
    updateTheme: (state, action) => {
      state.themeValue = action.payload;
    },

    setCurrentTreeActive: (state, action) => {
      state.currentTreeActive = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initializeSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.userProfile = action.payload;
        state.sessionExpireTime = action.payload.session_expire_time;
        state.isLoggedIn = true;
      }
    });

    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true;
      }
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.userProfile = userInitialState;
      state.isLoggedIn = false;
      // state.sessionExpireTime = action.payload.session_expire_time;
      // state.isTrialActive = !action.payload.isTrialPeriod;
    });

    builder.addCase(getPackages.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getPackages.fulfilled, (state, action) => {
      state.loading = false;
      state.packages = action.payload.data;
    });

    builder.addCase(SendEmailOTPPassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(SendEmailOTPPassword.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(SendEmailOTPPassword.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      if (state.userProfile) {
        let userDetails: any = EncrouptionLogic(
          localStorage.getItem(process.env.NEXT_PUBLIC_COOKIE_USERPROFILE || "")
        );

        let tenant_id = userDetails ? userDetails?.tenant_id : null;

        let updatedData = { ...action.payload, tenant_id: tenant_id };
        state.loading = false;
        state.userProfile.user = updatedData;

        localStorage.setItem(
          process.env.NEXT_PUBLIC_COOKIE_USERPROFILE || "",
          EncrouptionLogic(updatedData)
        );
      }
    });

    builder.addCase(UpdateUser.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdatePassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdatePassword.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdatePassword.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetCompanyByTenantId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetCompanyByTenantId.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetCompanyByTenantId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateCompanyDetails.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateCompanyDetails.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateCompanyDetails.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetRefreshToken.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetGatewayStateCommon, (state, action) => {
      return initialState; // Reset state to initial values
    });

    builder.addCase(GetRefreshToken.fulfilled, (state, action) => {
      state.loading = false;
      if (state.userProfile) {
        // state.RefeshToken = action.payload;

        let userDetails = decryptData(
          localStorage.getItem(process.env.NEXT_PUBLIC_COOKIE_USERPROFILE || "")
        );
        let access_token: any = action.payload?.access_Token;
        let sessionExpireTime: any = action.payload?.expire_Time;

        // let userInfo = JSON.parse(userDetails);
        let userInfo = userDetails;
        let updatedData = {
          ...userInfo,
          token: access_token,
          expiration_time: sessionExpireTime,
        };
        state.loading = false;
        state.userProfile.user = updatedData;
        state.sessionExpireTime = sessionExpireTime;

        localStorage.setItem(
          process.env.NEXT_PUBLIC_COOKIE_USERPROFILE || "",
          EncrouptionLogic(updatedData)
        );

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        setCookies("token", access_token, sessionExpireTime);
      }
    });

    builder.addCase(GetRefreshToken.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export type CommonReducer = ReturnType<typeof commonSlice.reducer>;
export const {
  selectContainer,
  updateTourStep,

  updateUserProfile,
  updateSessionPopup,

  setCurrentTreeActive,
} = commonSlice.actions;

export default commonSlice.reducer;
