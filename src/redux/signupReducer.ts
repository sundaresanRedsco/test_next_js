import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../services/services";
import { errorHandling } from "../services/errorHandling";

export const SignUpUser = createAsyncThunk(
  "signup/SignUpUser",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Signup/registration",
        value,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);

export const ResendEmailToken = createAsyncThunk(
  "signup/ResendEmailToken",
  async (email: string) => {
    try {
      return await AdminServices(
        "post",
        "api/Signup/resend_email?email=",
        email,
        null
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

const signupSlice = createSlice({
  name: "signupage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(SignUpUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(SignUpUser.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(SignUpUser.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(ResendEmailToken.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ResendEmailToken.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ResendEmailToken.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export type SignupReducer = ReturnType<typeof signupSlice.reducer>;

export default signupSlice.reducer;
