import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { TwofactorEnableOtpInterface } from "../../Utilities/interface/settingsInterface";

export const SendEmailOtp = createAsyncThunk(
  "account/SendEmailOtp",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `api/auth/2fa_sendotp_via_gmail?email=${value.email}&action=${value.action}`,
        // `api/auth/ve?email=${value}`,

        value,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

export const TwoFactorOtpVerification = createAsyncThunk(
  "account/TwoFactorOtpVerification",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // `api/Operations/operation_create?collectionId=${value.collections_id}`,
        `api/auth/2fa_otp_verfications`,
        value,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

export const TwoFactorCodeVerification = createAsyncThunk(
  "account/TwoFactorCodeVerification",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // `api/Operations/operation_create?collectionId=${value.collections_id}`,
        `api/auth/2fa_code_verifications?code=${value.code}&secretkey=${value.secretkey}`,

        value,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

export const DisableTwoFactor = createAsyncThunk(
  "account/DisableTwoFactor",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // `api/Operations/operation_create?collectionId=${value.collections_id}`,
        `api/auth/2fa_disable`,
        value,
        null,
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  },
);

export const resetGatewayStateAccount = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  apikeySetting: any[];
  twoFactorResponce: TwofactorEnableOtpInterface;
};

const initialState: InitialStateType = {
  loading: false,
  apikeySetting: [],
  twoFactorResponce: {
    name: "",
    secret_key: "",
  },
};

export const prrmissionSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(SendEmailOtp.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(SendEmailOtp.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(SendEmailOtp.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(TwoFactorOtpVerification.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(TwoFactorOtpVerification.fulfilled, (state, action) => {
      state.loading = false;
      state.twoFactorResponce = action.payload;
    });

    builder.addCase(TwoFactorOtpVerification.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(TwoFactorCodeVerification.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(TwoFactorCodeVerification.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(TwoFactorCodeVerification.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DisableTwoFactor.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(DisableTwoFactor.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DisableTwoFactor.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetGatewayStateAccount, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type accountReducer = ReturnType<typeof prrmissionSlice.reducer>;

export default prrmissionSlice.reducer;
