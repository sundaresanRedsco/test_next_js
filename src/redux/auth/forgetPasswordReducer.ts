import { errorHandling } from "@/services/errorHandling";
import { AdminServices } from "@/services/services";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const SendToken = createAsyncThunk(
  "forgetPassword/sendToken",
  async (value: any) => {
    try {
      return await AdminServices("post", "api/auth/registration", value, null);
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);
export const ResetPassword = createAsyncThunk(
  "forgetPassword/resetPassword",
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

type SignupInitialStateType = {
  loading: boolean;
};

const initialState: SignupInitialStateType = {
  loading: false,
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(SendToken.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(SendToken.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(SendToken.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ResetPassword.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ResetPassword.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ResetPassword.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export type ForgetPasswordReducer = ReturnType<
  typeof forgetPasswordSlice.reducer
>;

export default forgetPasswordSlice.reducer;
