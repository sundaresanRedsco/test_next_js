import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "../Services/auth";
import { AdminServices } from "../Services/services";
import { errorHandling } from "../Services/errorHandling";

export const signupUser = createAsyncThunk(
  "signup/user",
  async (value: any) => {
    try {
      return await AdminServices("post", "api/auth/registration", value, null);
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);
export const updateUser = createAsyncThunk(
  "signup/update_user",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        "api/auth/update_user",
        data?.value,
        data?.token
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "signup/verifyOtp",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/auth/enter_registration_otp",
        value,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

export const resendOtp = createAsyncThunk(
  "signup/resendOtp",
  async (email: string) => {
    try {
      return await AdminServices(
        "post",
        "api/auth/regenerate_registration_otp?email=" + email,
        null,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

export const signupOrganization = createAsyncThunk(
  "signup/organization",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/auth/company_registration",
        value,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

export const memberInviteActivation = createAsyncThunk(
  "signup/memberInviteActivation",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Team_/accept_invite?ActivationKey=" + value,
        value,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

export const resetGatewayStateSignUp = createAction("Gateway/resetState");

type SignupInitialStateType = {
  loading: boolean;
};

const initialState: SignupInitialStateType = {
  loading: false,
};

export const signupSlice = createSlice({
  name: "signupage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signupUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(verifyOtp.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(signupOrganization.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(signupOrganization.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(signupOrganization.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(memberInviteActivation.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(memberInviteActivation.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(memberInviteActivation.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateSignUp, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type SignupReducer = ReturnType<typeof signupSlice.reducer>;

export default signupSlice.reducer;
