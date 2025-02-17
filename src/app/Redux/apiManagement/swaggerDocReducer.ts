import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { apiMangeDahboardCountInterface } from "../../Utilities/interface/projectInterface";

const ImportSwaggerDocument = createAsyncThunk(
  "swaggerDoc/ImportSwaggerDocument",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Import_/Swagger_doc_import_api",
        value,
        null,
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  },
);

const GetSwagerFileUrl = createAsyncThunk(
  "swaggerDoc/GetSwagerFileUrl",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Import_/Get_Swagger_doc_import_by_stage_id_project_id?project_id=${value?.project_id}&stage_id=${value?.stage_id}`,
        null,
        null,
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  },
);

export const resetGatewayStateSwaggerDoc = createAction("Gateway/resetState");

export const resetSwaggerState = createAction("swaggerDoc/resetState");

type InitialStateType = {
  loading: boolean;
  SwaggerDocs: any;
};

const initialState: InitialStateType = {
  loading: false,
  SwaggerDocs: [],
};

const swaggerSlice = createSlice({
  name: "swaggerDoc",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(ImportSwaggerDocument.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ImportSwaggerDocument.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportSwaggerDocument.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetSwagerFileUrl.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetSwagerFileUrl.fulfilled, (state, action) => {
      state.loading = false;
      state.SwaggerDocs = action.payload;
    });

    builder.addCase(GetSwagerFileUrl.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(resetSwaggerState, (state, action) => {
      return initialState; // Reset state to initial values
    });

    builder.addCase(resetGatewayStateSwaggerDoc, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

type swaggerDocReducer = ReturnType<typeof swaggerSlice.reducer>;

export default swaggerSlice.reducer;
