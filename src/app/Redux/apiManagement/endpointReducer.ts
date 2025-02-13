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

export const GetCollectionImportOperationTree = createAsyncThunk(
  "projects/GetCollectionImportOperationTree",
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

export const GetMinimalCollectionOperationTree = createAsyncThunk(
  "projects/GetMinimalCollectionOperationTree",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/get_minimal_collection_operation_tree?project_id=${values?.project_id}&offsetStart=${values?.offsetStart}&offsetEnd=${values?.offsetEnd}`,
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
        `api/Collection_/get_collection_by_id?collection_id=${value.collection_id}&project_id=${value.project_id}`,
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
        `api/Import_/Get_Swagger_doc_import_by_collection_id_project_id?project_id=${value.project_id}&collection_id=${value.collection_id}`,
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
        "api/Import_/Swagger_doc_import_api?workspace_id=" +
          value?.workspace_id,
        value.data,
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

export const GetEndpointCounts = createAsyncThunk(
  "enpoints/GetEndpointCounts",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/get_endpoint_counts?project_id=${data?.project_id}&workspace_id=${data?.workspace_id}&group_id=${data?.group_id}`,
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

export const GetEndpointCountIdentity = createAsyncThunk(
  "enpoints/GetEndpointCountIdentity",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/get_endpoint_counts_identity?project_id=${data?.project_id}&workspace_id=${data?.workspace_id}&group_id=${data?.group_id}`,
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

export const GetBackgroundChangeTracking = createAsyncThunk(
  "enpoints/GetBackgroundChangeTracking",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `api/ChangesTracking/getChangeTracking_offset?entityId=${data?.back_id}&parentEntityId=${data?.operation_id}&offset=${data?.offset}&limit=${data?.limit}`,
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

export const resetGatewayStateSwaggerDoc = createAction("Gateway/resetState");

export const resetSwaggerState = createAction("swaggerDoc/resetState");
type Endpoint = {
  name: string;
  id: string;
};
type Collection = { name: string; id: string; operations: Endpoint[] };
type InitialStateType = {
  getOperationLoading: boolean;
  getTreeFlowLoading: boolean;
  collectionCount: number;
  operationLists: operationInterface[];
  getCollOperTreeLoading: boolean;
  getMinimalCollOperTreeLoading: boolean;
  getCollOperTreeData: Collection[];
  getCollOperTreeFlowData: GetCollecOperTreeInterface;
  workflowSidebarStart: number;
  workflowSidebarEnd: number;
  getEndpointsCountLoading: boolean;
  getEndpointCountIdentityLoading: boolean;
  changeHistoryBackground: any;
};

const initialState: InitialStateType = {
  getOperationLoading: false,
  getTreeFlowLoading: false,
  collectionCount: 0,
  operationLists: [],
  getCollOperTreeLoading: false,
  getMinimalCollOperTreeLoading: false,
  getCollOperTreeData: [],
  getCollOperTreeFlowData: {
    count: 0,
    collections: [],
  },
  workflowSidebarStart: 0,
  workflowSidebarEnd: 8,
  getEndpointsCountLoading: false,
  getEndpointCountIdentityLoading: false,
  changeHistoryBackground: [],
};

export const endpointSlice = createSlice({
  name: "endpoints",
  initialState,
  reducers: {
    resetCollOperTreeData(state, action) {
      state.getCollOperTreeData = [];
    },
    updateWorkflowSidebarStart(state, action) {
      state.workflowSidebarStart = action.payload;
    },
    updateWorkflowSidebarEnd(state, action) {
      state.workflowSidebarEnd = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(GetBackgroundChangeTracking.pending, (state, action) => {
      state.changeHistoryBackground = true;
    });

    builder.addCase(GetBackgroundChangeTracking.fulfilled, (state, action) => {
      state.getOperationLoading = false;
      state.changeHistoryBackground = action.payload;
    });

    builder.addCase(GetBackgroundChangeTracking.rejected, (state, action) => {
      state.getOperationLoading = false;
    });

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
    builder.addCase(
      GetMinimalCollectionOperationTree.pending,
      (state, action) => {
        state.getMinimalCollOperTreeLoading = true;
      }
    );

    builder.addCase(
      GetMinimalCollectionOperationTree.fulfilled,
      (state, action) => {
        state.getMinimalCollOperTreeLoading = false;
        const newCollOperTreeData = action.payload.collections;
        state.collectionCount = action.payload.count;

        const newCollOperTreeDataIds = new Set(
          newCollOperTreeData.map((nw: any) => nw.id)
        );

        const filteredOldCollectionList = state.getCollOperTreeData.filter(
          (collection) => !newCollOperTreeDataIds.has(collection.id)
        );

        state.getCollOperTreeData = [
          ...filteredOldCollectionList,
          ...newCollOperTreeData,
        ];
      }
    );

    builder.addCase(
      GetMinimalCollectionOperationTree.rejected,
      (state, action) => {
        state.getMinimalCollOperTreeLoading = false;
      }
    );

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

    builder.addCase(GetEndpointCounts.pending, (state, action) => {
      state.getEndpointsCountLoading = true;
    });
    builder.addCase(GetEndpointCounts.fulfilled, (state, action) => {
      state.getEndpointsCountLoading = false;
    });
    builder.addCase(GetEndpointCounts.rejected, (state, action) => {
      state.getEndpointsCountLoading = false;
    });

    builder.addCase(GetEndpointCountIdentity.pending, (state, action) => {
      state.getEndpointCountIdentityLoading = true;
    });
    builder.addCase(GetEndpointCountIdentity.fulfilled, (state, action) => {
      state.getEndpointCountIdentityLoading = false;
    });
    builder.addCase(GetEndpointCountIdentity.rejected, (state, action) => {
      state.getEndpointCountIdentityLoading = false;
    });
  },
});

export type endpointReducer = ReturnType<typeof endpointSlice.reducer>;
export const {
  resetCollOperTreeData,
  updateWorkflowSidebarStart,
  updateWorkflowSidebarEnd,
} = endpointSlice.actions;
export default endpointSlice.reducer;
