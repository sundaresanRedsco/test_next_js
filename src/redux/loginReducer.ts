import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../services/services";
import { errorHandling } from "../services/errorHandling";
import { getSession, signIn } from "next-auth/react";
import Cookies from "js-cookie";
// import errorHandling from "../services/errorHandling";

export const login = createAsyncThunk(
  "login/login",
  async (value: any, { rejectWithValue }) => {
    try {
      const response = await signIn("credentials", {
        ...value,
        redirect: false,
      });
      const session = await getSession();
      console.log(session, "session");
      if (response && response.error) {
        throw response.error;
        // return rejectWithValue(errorHandling(response));
      }
      // const userId: any = session?.user?.user_id;
      // const isExistingUser: any = session?.user?.user_registered;
      const userId: string = "";
      const isExistingUser = false;
      if (
        userId &&
        (!isExistingUser ||
          isExistingUser != "EXISTING_USER" ||
          value.invitations_token)
      ) {
        Cookies.set(userId, "onboarding");
      }
      return session;
    } catch (err: any) {
      throw new Error(err);

      // return rejectWithValue(errorHandling(err));
    }
  }
);

const resetPassword = createAsyncThunk("login/reset", async (value: any) => {
  try {
    return await AdminServices(
      value.method,
      "authentication/" + value.feature,
      value.data,
      null
    );
  } catch (err: any) {
    //   throw new Error(errorHandling(err));
  }
});

export const TwoFactorLogin = createAsyncThunk(
  "common/TwoFactorLogin",
  async (value: any, { rejectWithValue }) => {
    try {
      const response = await signIn("credentials", {
        ...value,
        redirect: false,
      });
      const session = await getSession();
      if (response && response.error) {
        throw response.error;
        // return rejectWithValue(errorHandling(response));
      }
      return session;
    } catch (err: any) {
      throw new Error(err);

      // return rejectWithValue(errorHandling(err));
    }
  }
);

export const resetGatewayStateLogin = createAction("Gateway/resetState");

export const logout = createAsyncThunk("logout", async () => {
  // return await authService.logout();
});

type LoginInitialStateType = {
  loading: boolean;
  isTimedOut: boolean;
  salt: string | null | undefined;
  status: string;
};

const initialState: LoginInitialStateType = {
  loading: false,
  isTimedOut: false,
  salt: null,
  status: "NOT-VERIFIED",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "VERIFIED";
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.status = "NOT-VERIFIED";
    });

    builder.addCase(TwoFactorLogin.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(TwoFactorLogin.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(TwoFactorLogin.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateLogin, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type LoginReducer = ReturnType<typeof loginSlice.reducer>;

export default loginSlice.reducer;
