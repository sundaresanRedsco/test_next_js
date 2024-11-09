import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { operationInterface } from "../../Utilities/interface/endpointInterface";
import { GetCollecOperTreeInterface } from "../../../interface/endpointInterface";

export const GetOperations = createAsyncThunk(
  "projects/getOperations",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/operation_get?project_id=${value?.project_id}&stage_id=${value?.stage_id}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const GetCollectionOperationTree = createAsyncThunk(
  "projects/GetCollectionOperationTree",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/get_collection_operation_tree?project_id=${values?.project_id}&offsetStart=${values?.offsetStart}&offsetEnd=${values?.offsetEnd}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetCollectionOperationTreeFlow = createAsyncThunk(
  "projects/GetCollectionOperationTreeFlow",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/get_collection_operation_tree?project_id=${values?.project_id}&offsetStart=${values?.offsetStart}&offsetEnd=${values?.offsetEnd}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);
export const GetOperationTagsCountbyProjectAndStageId = createAsyncThunk(
  "endpoint/GetOperationTagsCountbyProjectAndStageId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/api_tags_by_project_id?ProjectId=${value?.project_id}&stage_id=${value?.stage_id}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const GetOperationTagsCountbyCollectionId = createAsyncThunk(
  "projects/GetOperationTagsCountbyCollectionId",
  async (collection_id: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/api_tags?collection_id=` + collection_id,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const GetOperationCountbyStageId = createAsyncThunk(
  "endpoint/GetOperationCountbyStageId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/endpoint_counts_by_stageid?stage_id=${value?.stage_id}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const GetOperationCountbyCollectionId = createAsyncThunk(
  "projects/GetOperationCountbyCollectionId",
  async (collection_id: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/endpoint_counts_by_collectionid?collection_id=` +
          collection_id,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const GetCollectionById = createAsyncThunk(
  "enpoints/getCollectionsById",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Collection_/get_collection_by_id?collection_id=${value}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const GetCollectionDocsById = createAsyncThunk(
  "enpoints/GetCollectionDocsById",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Import_/Get_Swagger_doc_import_by_collection_id_project_id?project_id=${value.project_id}&collection_id=cx${value.collection_id}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const ImportSwaggerDocument = createAsyncThunk(
  "enpoints/ImportSwaggerDocument",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Import_/Swagger_doc_import_api",
        value,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const resetGatewayStateSwaggerDoc = createAction("Gateway/resetState");

export const resetSwaggerState = createAction("swaggerDoc/resetState");

type InitialStateType = {
  getOperationLoading: boolean;
  getTreeFlowLoading: boolean;
  operationLists: operationInterface[];
  getCollOperTreeLoading: boolean;
  getCollOperTreeData: GetCollecOperTreeInterface;
  getCollOperTreeFlowData: GetCollecOperTreeInterface;
};

const initialState: InitialStateType = {
  getOperationLoading: false,
  getTreeFlowLoading: false,
  operationLists: [],
  getCollOperTreeLoading: false,
  getCollOperTreeData: {
    count: 0,
    collections: [],
  },
  getCollOperTreeFlowData: {
    count: 0,
    collections: [],
  },
};

export const endpointSlice = createSlice({
  name: "endpoints",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetOperations.pending, (state, action) => {
      state.getOperationLoading = true;
    });

    builder.addCase(GetOperations.fulfilled, (state, action) => {
      state.getOperationLoading = false;
      state.operationLists = action.payload;
    });

    builder.addCase(GetOperations.rejected, (state, action) => {
      state.getOperationLoading = false;
    });

    builder.addCase(GetCollectionOperationTree.pending, (state, action) => {
      state.getCollOperTreeLoading = true;
    });

    builder.addCase(GetCollectionOperationTree.fulfilled, (state, action) => {
      state.getCollOperTreeLoading = false;
      state.getCollOperTreeData = action.payload;
    });

    builder.addCase(GetCollectionOperationTree.rejected, (state, action) => {
      state.getTreeFlowLoading = false;
    });

    builder.addCase(GetCollectionOperationTreeFlow.pending, (state, action) => {
      state.getTreeFlowLoading = true;
    });

    builder.addCase(
      GetCollectionOperationTreeFlow.fulfilled,
      (state, action) => {
        state.getTreeFlowLoading = false;
        state.getCollOperTreeFlowData = action.payload;
      }
    );

    builder.addCase(
      GetCollectionOperationTreeFlow.rejected,
      (state, action) => {
        state.getCollOperTreeLoading = false;
      }
    );

    builder.addCase(
      GetOperationTagsCountbyProjectAndStageId.pending,
      (state, action) => {
        state.getOperationLoading = true;
      }
    );
    builder.addCase(
      GetOperationTagsCountbyProjectAndStageId.fulfilled,
      (state, action) => {
        state.getOperationLoading = false;
      }
    );
    builder.addCase(
      GetOperationTagsCountbyProjectAndStageId.rejected,
      (state, action) => {
        state.getOperationLoading = false;
      }
    );
    builder.addCase(
      GetOperationTagsCountbyCollectionId.pending,
      (state, action) => {
        state.getOperationLoading = true;
      }
    );
    builder.addCase(
      GetOperationTagsCountbyCollectionId.fulfilled,
      (state, action) => {
        state.getOperationLoading = false;
      }
    );
    builder.addCase(
      GetOperationTagsCountbyCollectionId.rejected,
      (state, action) => {
        state.getOperationLoading = false;
      }
    );

    builder.addCase(GetOperationCountbyStageId.pending, (state, action) => {
      state.getOperationLoading = true;
    });
    builder.addCase(GetOperationCountbyStageId.fulfilled, (state, action) => {
      state.getOperationLoading = false;
    });
    builder.addCase(GetOperationCountbyStageId.rejected, (state, action) => {
      state.getOperationLoading = false;
    });
    builder.addCase(
      GetOperationCountbyCollectionId.pending,
      (state, action) => {
        state.getOperationLoading = true;
      }
    );
    builder.addCase(
      GetOperationCountbyCollectionId.fulfilled,
      (state, action) => {
        state.getOperationLoading = false;
      }
    );
    builder.addCase(
      GetOperationCountbyCollectionId.rejected,
      (state, action) => {
        state.getOperationLoading = false;
      }
    );

    builder.addCase(GetCollectionById.pending, (state, action) => {
      state.getOperationLoading = true;
    });
    builder.addCase(GetCollectionById.fulfilled, (state, action) => {
      state.getOperationLoading = false;
    });
    builder.addCase(GetCollectionById.rejected, (state, action) => {
      state.getOperationLoading = false;
    });

    builder.addCase(GetCollectionDocsById.pending, (state, action) => {
      state.getOperationLoading = true;
    });
    builder.addCase(GetCollectionDocsById.fulfilled, (state, action) => {
      state.getOperationLoading = false;
    });
    builder.addCase(GetCollectionDocsById.rejected, (state, action) => {
      state.getOperationLoading = false;
    });

    builder.addCase(ImportSwaggerDocument.pending, (state, action) => {
      state.getOperationLoading = true;
    });
    builder.addCase(ImportSwaggerDocument.fulfilled, (state, action) => {
      state.getOperationLoading = false;
    });
    builder.addCase(ImportSwaggerDocument.rejected, (state, action) => {
      state.getOperationLoading = false;
    });
  },
});

export type endpointReducer = ReturnType<typeof endpointSlice.reducer>;

export default endpointSlice.reducer;
