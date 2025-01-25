import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import { apiMangeDahboardCountInterface } from "../../Utilities/interface/projectInterface";
import { SingleApiDesignFlowInterface } from "../../Utilities/interface/apiDesignFlowInterace";
import * as Y from "yjs";

export const GetDesignflowMinamlInfoFlowoffset = createAsyncThunk(
  "apiFlowDesign/GetDesignflowMinamlInfoFlowoffset",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_designflow_minaml_info_flowoffset?project_id=${value.project_id}&start=${value.start}&end=${value.end}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);
export const GetApiDesignFlowByWorkspaceId = createAsyncThunk(
  "apiFlowDesign/GetApiDesignFlowByWorkspaceId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_api_design_flow_by_workspace_id?workspace_id=${value}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const GetApiDesignFlowByProjectIdStageId = createAsyncThunk(
  "apiFlowDesign/GetApiDesignFlowByProjectIdStageId",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_api_design_flow_by_projectid_stageid?project_id=${values?.project_id}&stage_id=${values?.stage_id}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const CreateApiDesignFlow = createAsyncThunk(
  "apiFlowDesign/CreateApiDesignFlow",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_design_flow_service/create_api_design_flow?project_id=" +
          value?.projectid,
        value,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const UpdateApiDesignFlow = createAsyncThunk(
  "apiFlowDesign/UpdateApiDesignFlow",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_design_flow_service/update_api_design_flow",
        value,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const DeleteApiDesignFlow = createAsyncThunk(
  "apiFlowDesign/DeleteApiDesignFlow",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `Api/Api_design_flow_service/delete_api_design_flow_by_design_flow__id?design_flow_id=${value}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const DesignApiFlow = createAsyncThunk(
  "apiFlowDesign/designApiFlow",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_design_flow_service/store_api_design_flow_by_design_flow?api_flow_id=" +
          value.flow_id,
        value.data,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const GetDesignApiFlow = createAsyncThunk(
  "apiFlowDesign/getDesignApiFlow",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        // "Api/Api_design_flow_service/get_api_design_flow_by_design_flow_node_edge_viewport?api_flow_id=" +
        //   api_flow_id,
        "Api/Api_design_flow_service/getall_nodes-edges_by_versionidand_flow_id_neo4j?flow_id=" +
          data.flow_id +
          "&version_id=" +
          data.version_id +
          "&project_id=" +
          data.project_id,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const DeleteNodeEdges = createAsyncThunk(
  "apiFlowDesign/deleteNodeEdges",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_design_flow_service/bulk_delete_by_node_id_and_edge_id",
        value,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const RunDesignFlow = createAsyncThunk(
  "apiFlowDesign/RunDesignFlow",
  async (flow_id: any) => {
    try {
      return await AdminServices(
        "get",
        "Api/Api_design_flow_service/run_design?api_flow_id=" + flow_id,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const RunSingleNode = createAsyncThunk(
  "apiFlowDesign/RunSingleNode",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_design_flow_service/save_and_fetch_by_operation_id?operation_id=" +
          value.operation_id +
          "&flow_id=" +
          value.flow_id +
          "&node_id=" +
          value.node_id +
          "&project_id=" +
          value.project_id,
        value.data,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const GetApiDesignFlowByDesignFlowId = createAsyncThunk(
  "apiFlowDesign/GetApiDesignFlowByDesignFlowId",
  async (designId: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_api_design_flow_by_design_flow__id?design_flow_id=${designId}`,
        null,
        null
      );
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const GetRunScheduleDetailsByFlowId = createAsyncThunk(
  "apiFlowDesign/GetRunScheduleDetailsByFlowId",
  async (flowId: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_run_schedule_details_by_flow_id?flow_id=${flowId}`,
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

export const GetApiScheduleRunDetailsByScheduleId = createAsyncThunk(
  "apiFlowDesign/GetApiScheduleRunDetailsByScheduleId",
  async (scheduleId: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_api_schedule_run_details_by_schedule_id?schedule_id=${scheduleId}`,
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

export const GetApiScheduleRunDnsDetailsResponseById = createAsyncThunk(
  "apiFlowDesign/GetApiScheduleRunDnsDetailsResponseById",
  async (id: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_api_schedule_run_dns_details_and_response_by_id?id=${id}`,
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

export const ScheduleRunDesignApi = createAsyncThunk(
  "apiFlowDesign/ScheduleRunDesignApi",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_design_flow_service/schedule_run_design_api",
        data,
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

export const CreateScheduleRunDesignApi = createAsyncThunk(
  "apiFlowDesign/CreateScheduleRunDesignApi",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_design_flow_service/create_schedule_run_design_api",
        data,
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

export const UpdateScheduleRunDesignApi = createAsyncThunk(
  "apiFlowDesign/UpdateScheduleRunDesignApi",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        "Api/Api_design_flow_service/update_schedule_run_design_api",
        data,
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

export const GetByScheduleRunId = createAsyncThunk(
  "apiFlowDesign/GetByScheduleRunId",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_by_schedulerun_id?scheduleRunId=${data?.scheduleId}&OrderBy_Asc_or_desc=${data?.orderByVal}&from=${data?.fromVal}&end=${data?.endVal}`,
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

export const GetByScheduleResponseByRunAtId = createAsyncThunk(
  "apiFlowDesign/GetByScheduleResponseByRunAtId",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_by_schedulerun_response_by_runat_id?RunAtId=${data?.runAtId}&OrderBy_Asc_or_desc=${data?.orderByVal}&from=${data?.fromVal}&end=${data?.endVal}`,
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

export const GetCollecctionAndOpeartions = createAsyncThunk(
  "apiFlowDesign/GetCollecctionAndOpeartions",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/get_collection_with_inputparams?Project_id=${data?.Project_id}&stage_id=${data?.stage_id}`,
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

export const GetAllVerisons = createAsyncThunk(
  "apiFlowDesign/GetAllVerisons",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/getallversions_by_flow_id?flowId=${value.flow_id}&project_id=${value.project_id}`,
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

export const SaveFlowHandler = createAsyncThunk(
  "apiFlowDesign/SaveFlowHandler",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        // `Api/Api_design_flow_service/create_Designflow_neo4j?FlowId=${data.flow_id}&Version=${data.version_id}&UserId=${data.user_id}`,
        `Api/Api_design_flow_service/create_Designflow_neo4j?FlowId=${data.flow_id}&Version=${data.version_id}&project_id=${data?.project_id}`,

        data.value,
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

export const PublishVersion = createAsyncThunk(
  "apiFlowDesign/PublishVersion",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_all_versions_duplicate_by_flowid_neo4j?flow_id=${value.flow_id}&project_id=${value.project_id}`,
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

export const GetRevisionsByFlowVersionId = createAsyncThunk(
  "apiFlowDesign/GetRevisionsByFlowVersionId",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/getrevisions_by_flowidand_versionid_offset?flow_id=${values?.flow_id}&version_id=${values?.version_id}&offset=${values?.offset}&limit=${values?.limit}&sort_order=${values?.sort_order}&sort_by=${values?.sort_by}&project_id=${values?.project_id}`,
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

export const GetChangesByRevisionId = createAsyncThunk(
  "apiFlowDesign/GetChangesByRevisionId",
  async (revision_id: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/Get_changes_by_revisonid?revision_id=${revision_id}`,
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

export const GetGlobalKeys = createAsyncThunk(
  "apiFlowDesign/GetGlobalKeys",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_globalkey_by_flowandversion_id?flow_id=${data.flow_id}&version_id=${data.version_id}`,
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

export const CreateGlobalKeys = createAsyncThunk(
  "apiFlowDesign/GetGlobalKeys",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        `Api/Api_design_flow_service/create_designflow_globalkey`,
        data,
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
export const UpdatelobalKeys = createAsyncThunk(
  "apiFlowDesign/GetGlobalKeys",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_globalkey_by_flowandversion_id?flow_id=${data.flow_Id}&version_id=${data.version_id}`,
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

export const GetNodeChangeManByFlowNodeId = createAsyncThunk(
  "apiFlowDesign/GetNodeChangeManByFlowNodeId",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_node_changemanagment_by_flowandnode_id?flow_id=${data?.flow_id}&node_id=${data?.node_id}&project_id=${data?.project_id}`,
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

export const GetDesignFlowOffset = createAsyncThunk(
  "apiFlowDesign/GetDesignFlowOffset",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_design_flowoffset?project_id=${data?.project_id}&stage_id=${data?.stage_id}&start=${data?.start}&end=${data?.end}&name=${data?.name}`,
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

export const GetNodeChangesTrackingOffset = createAsyncThunk(
  "apiFlowDesign/GetNodeChangesTrackingOffset",
  async (data: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_node_changestracking_offset?flow_id=${data?.flow_id}&project_id=${data?.project_id}&node_id=${data?.node_id}&offset=${data?.offset}&limit=${data?.limit}`,
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

export const GetRecentModification = createAsyncThunk(
  "apiFlowDesign/GetRecentModification",
  async (project_id: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_design_flow_service/get_recent_modification_project_id?project_id=${project_id}`,
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

export const PostRecentModification = createAsyncThunk(
  "apiFlowDesign/PostRecentModification",
  async (data: any) => {
    try {
      return await AdminServices(
        "post",
        `Api/Api_design_flow_service/create_recent_modification`,
        data,
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

export const resetGatewayStateFlow = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  DesignFlowloading: boolean;
  currentFlowDetails: any;
  changesByRevisionIdLoading: boolean;
  singleApiDesignFlow: SingleApiDesignFlowInterface;
  runResult: any;
  wsProvider: any;
  nextNode: String[] | null;
  flowYdoc: Y.Doc | null;
  userLists: any[];
  compiling: boolean;
  isEditable: boolean;
  flowList: any[];
  globalKeys: any[];
  globalResponse: any;
  createScheduleRunDesignApiLoading: boolean;
  updateScheduleRunDesignApiLoading: boolean;
  getRunScheduleDetailsByFlowIdLoading: boolean;
  getByScheduleRunIdLoading: boolean;
  getByScheduleResRunAtIdLoading: boolean;
  runSingleNodeData: any;
  collectionAndOpe: any[];
  currentUserColor: string;
  flowVersions: any[];
  getRevisionLoading: boolean;
  revisionData: any[];
  nodeChangeManFlowNodeLoading: boolean;
  changeHistoryNodes: any;
  nodeChangeTrackingLoading: boolean;
  flowLoading: boolean;
  getDesignFlowOffsetLoading: boolean;
  recentModifications: any[];
  getRecentModificationsLoading: boolean;
  totalCount: number;
};

const initialState: InitialStateType = {
  totalCount: 0,
  loading: false,
  DesignFlowloading: false,
  currentFlowDetails: {},
  changesByRevisionIdLoading: false,
  flowList: [],
  singleApiDesignFlow: {
    nodes: [],
    edges: [], // Define a specific type if edges have a predictable structure
    viewport: {
      x: 0,
      y: 0,
      zoom: 1,
    },
  },
  runResult: [],
  wsProvider: null,
  nextNode: [],
  flowYdoc: null,
  userLists: [],
  compiling: false,
  isEditable: false,
  globalKeys: [],
  globalResponse: {},
  createScheduleRunDesignApiLoading: false,
  updateScheduleRunDesignApiLoading: false,
  getRunScheduleDetailsByFlowIdLoading: false,
  getByScheduleRunIdLoading: false,
  getByScheduleResRunAtIdLoading: false,
  runSingleNodeData: {},
  collectionAndOpe: [],
  currentUserColor: "null",
  flowVersions: [],
  getRevisionLoading: false,
  revisionData: [],
  nodeChangeManFlowNodeLoading: false,
  changeHistoryNodes: {
    nodes: [],
    edges: [],
  },
  nodeChangeTrackingLoading: false,
  flowLoading: false,
  getDesignFlowOffsetLoading: false,
  recentModifications: [],
  getRecentModificationsLoading: false,
};

export const flowSlice = createSlice({
  name: "apiFlowDesign",
  initialState,
  reducers: {
    clearSingleApiData: (state, action) => {
      // Update the state with the selected container value
      state.singleApiDesignFlow = {
        nodes: [],
        edges: [], // Define a specific type if edges have a predictable structure
        viewport: {
          x: 0,
          y: 0,
          zoom: 1,
        },
      };
    },
    clearResults: (state, action) => {
      // Update the state with the selected container value
      state.runResult = [];
    },

    clearFlowList: (state, action) => {
      // Update the state with the selected container value
      state.flowList = [];
    },
    setWSprovider: (state, action) => {
      // Update the state with the selected container value
      state.wsProvider = action.payload;
    },
    setNextNode: (state, action) => {
      console.log(action.payload, "setNextNode");
      // Update the state with the selected container value
      state.nextNode = action.payload;
    },
    setFlowYdoc: (state, action) => {
      console.log(action.payload, "setFlowYdoc");
      // Update the state with the selected container value
      state.flowYdoc = action.payload;
    },
    setUserLists: (state, action) => {
      // console.log(action.payload, "setFlowYdoc");
      // Update the state with the selected container value
      state.userLists = action.payload;
    },

    setCompiling: (state, action) => {
      state.compiling = action.payload;
    },

    setIsEditable: (state, action) => {
      state.isEditable = action.payload;
    },

    setGlobalKeys: (state, action) => {
      console.log(action.payload, "setNextNode");
      // Update the state with the selected container value
      state.globalKeys = action.payload;
    },

    setGlobalResponse: (state, action) => {
      // console.log(action.payload, "setNextNode");
      // Update the state with the selected container value
      state.globalResponse = action.payload;
    },

    setCurrentUserFlowColor: (state, action) => {
      // console.log(action.payload, "setNextNode");
      // Update the state with the selected container value
      state.currentUserColor = action.payload;
    },

    setChangeHistroy: (state, action) => {
      // console.log(action.payload, "setNextNode");
      // Update the state with the selected container value
      state.changeHistoryNodes = action.payload;
    },
    clearChangeHistroy: (state, action) => {
      // console.log(action.payload, "setNextNode");
      // Update the state with the selected container value
      state.changeHistoryNodes = {
        nodes: [],
        edges: [],
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(
      GetDesignflowMinamlInfoFlowoffset.pending,
      (state, action) => {
        state.getDesignFlowOffsetLoading = true;
      }
    );

    builder.addCase(
      GetDesignflowMinamlInfoFlowoffset.fulfilled,
      (state, action) => {
        state.getDesignFlowOffsetLoading = false;
        const newFlowList = action.payload.apiDesignFlows;
        state.totalCount = action.payload.totalCount;
        // Create a set of IDs from the new workspace list for quick lookup
        const newFlowIds = new Set(newFlowList.map((nw: any) => nw.id));

        // Filter out workspaces from the old list that are not in the new list
        const filteredOldFlowList = state.flowList.filter(
          (flow) => !newFlowIds.has(flow.id)
        );

        // Update the workspace list with the filtered old workspaces and the new workspaces
        state.flowList = [...filteredOldFlowList, ...newFlowList];
      }
    );

    builder.addCase(
      GetDesignflowMinamlInfoFlowoffset.rejected,
      (state, action) => {
        state.getDesignFlowOffsetLoading = false;
      }
    );
    builder.addCase(GetApiDesignFlowByWorkspaceId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      GetApiDesignFlowByWorkspaceId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(GetApiDesignFlowByWorkspaceId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      GetApiDesignFlowByProjectIdStageId.pending,
      (state, action) => {
        state.loading = true;
        state.flowLoading = true;
      }
    );

    builder.addCase(
      GetApiDesignFlowByProjectIdStageId.fulfilled,
      (state, action) => {
        state.loading = false;
        state.flowList = action.payload;
        state.flowLoading = false;
      }
    );

    builder.addCase(
      GetApiDesignFlowByProjectIdStageId.rejected,
      (state, action) => {
        state.loading = false;
        state.flowLoading = false;
      }
    );

    builder.addCase(CreateApiDesignFlow.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateApiDesignFlow.fulfilled, (state, action) => {
      state.loading = false;

      const flowExists = state.flowList.some(
        (flow: any) => flow.id === action.payload.id
      );
      // If the workspace does not exist in the list, add it
      if (!flowExists) {
        state.flowList.push(action.payload);
      }
    });

    builder.addCase(CreateApiDesignFlow.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateApiDesignFlow.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateApiDesignFlow.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateApiDesignFlow.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteApiDesignFlow.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(DeleteApiDesignFlow.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteApiDesignFlow.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetDesignApiFlow.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetDesignApiFlow.fulfilled, (state, action) => {
      state.singleApiDesignFlow = action.payload[0];
      state.loading = false;
    });

    builder.addCase(GetDesignApiFlow.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DesignApiFlow.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(DesignApiFlow.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DesignApiFlow.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(DeleteNodeEdges.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(DeleteNodeEdges.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteNodeEdges.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(RunDesignFlow.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(RunDesignFlow.fulfilled, (state, action) => {
      state.runResult = action.payload;
      state.loading = false;
    });

    builder.addCase(RunDesignFlow.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetApiDesignFlowByDesignFlowId.pending, (state, action) => {
      state.DesignFlowloading = true;
    });

    builder.addCase(
      GetApiDesignFlowByDesignFlowId.fulfilled,
      (state, action) => {
        state.DesignFlowloading = false;
        state.currentFlowDetails = action.payload;
      }
    );

    builder.addCase(
      GetApiDesignFlowByDesignFlowId.rejected,
      (state, action) => {
        state.DesignFlowloading = false;
      }
    );

    builder.addCase(GetRunScheduleDetailsByFlowId.pending, (state, action) => {
      state.getRunScheduleDetailsByFlowIdLoading = true;
    });

    builder.addCase(
      GetRunScheduleDetailsByFlowId.fulfilled,
      (state, action) => {
        state.getRunScheduleDetailsByFlowIdLoading = false;
      }
    );

    builder.addCase(GetRunScheduleDetailsByFlowId.rejected, (state, action) => {
      state.getRunScheduleDetailsByFlowIdLoading = false;
    });

    builder.addCase(
      GetApiScheduleRunDetailsByScheduleId.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetApiScheduleRunDetailsByScheduleId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetApiScheduleRunDetailsByScheduleId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetApiScheduleRunDnsDetailsResponseById.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetApiScheduleRunDnsDetailsResponseById.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetApiScheduleRunDnsDetailsResponseById.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(ScheduleRunDesignApi.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ScheduleRunDesignApi.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ScheduleRunDesignApi.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateScheduleRunDesignApi.pending, (state, action) => {
      state.createScheduleRunDesignApiLoading = true;
    });

    builder.addCase(CreateScheduleRunDesignApi.fulfilled, (state, action) => {
      state.createScheduleRunDesignApiLoading = false;
    });

    builder.addCase(CreateScheduleRunDesignApi.rejected, (state, action) => {
      state.createScheduleRunDesignApiLoading = false;
    });

    builder.addCase(UpdateScheduleRunDesignApi.pending, (state, action) => {
      state.updateScheduleRunDesignApiLoading = true;
    });

    builder.addCase(UpdateScheduleRunDesignApi.fulfilled, (state, action) => {
      state.updateScheduleRunDesignApiLoading = false;
    });

    builder.addCase(UpdateScheduleRunDesignApi.rejected, (state, action) => {
      state.updateScheduleRunDesignApiLoading = false;
    });

    builder.addCase(GetByScheduleRunId.pending, (state, action) => {
      state.getByScheduleRunIdLoading = true;
    });

    builder.addCase(GetByScheduleRunId.fulfilled, (state, action) => {
      state.getByScheduleRunIdLoading = false;
    });

    builder.addCase(GetByScheduleRunId.rejected, (state, action) => {
      state.getByScheduleRunIdLoading = false;
    });

    builder.addCase(GetByScheduleResponseByRunAtId.pending, (state, action) => {
      state.getByScheduleResRunAtIdLoading = true;
    });

    builder.addCase(
      GetByScheduleResponseByRunAtId.fulfilled,
      (state, action) => {
        state.getByScheduleResRunAtIdLoading = false;
      }
    );

    builder.addCase(
      GetByScheduleResponseByRunAtId.rejected,
      (state, action) => {
        state.getByScheduleResRunAtIdLoading = false;
      }
    );

    builder.addCase(resetGatewayStateFlow, (state, action) => {
      return initialState; // Reset state to initial values
    });

    builder.addCase(GetCollecctionAndOpeartions.fulfilled, (state, action) => {
      state.loading = false;
      state.collectionAndOpe = action.payload;
    });

    builder.addCase(GetCollecctionAndOpeartions.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetCollecctionAndOpeartions.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(RunSingleNode.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(RunSingleNode.fulfilled, (state, action) => {
      state.loading = false;
      state.runSingleNodeData = action.payload;
    });

    builder.addCase(RunSingleNode.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllVerisons.pending, (state, action) => {
      state.DesignFlowloading = true;
    });

    builder.addCase(GetAllVerisons.fulfilled, (state, action) => {
      state.DesignFlowloading = false;
      state.flowVersions = action.payload;
    });

    builder.addCase(GetAllVerisons.rejected, (state, action) => {
      state.DesignFlowloading = false;
    });

    builder.addCase(PublishVersion.pending, (state, action) => {
      state.DesignFlowloading = true;
    });

    builder.addCase(PublishVersion.fulfilled, (state, action) => {
      state.DesignFlowloading = false;
    });

    builder.addCase(PublishVersion.rejected, (state, action) => {
      state.DesignFlowloading = false;
    });

    builder.addCase(GetRevisionsByFlowVersionId.pending, (state, action) => {
      state.getRevisionLoading = true;
    });

    builder.addCase(GetRevisionsByFlowVersionId.fulfilled, (state, action) => {
      state.getRevisionLoading = false;
    });

    builder.addCase(GetRevisionsByFlowVersionId.rejected, (state, action) => {
      state.getRevisionLoading = false;
    });

    builder.addCase(GetGlobalKeys.pending, (state, action) => {
      state.DesignFlowloading = true;
    });

    builder.addCase(GetGlobalKeys.fulfilled, (state, action) => {
      state.DesignFlowloading = false;
    });

    builder.addCase(GetGlobalKeys.rejected, (state, action) => {
      state.DesignFlowloading = false;
    });

    builder.addCase(GetChangesByRevisionId.pending, (state, action) => {
      state.changesByRevisionIdLoading = true;
    });

    builder.addCase(GetChangesByRevisionId.fulfilled, (state, action) => {
      state.changesByRevisionIdLoading = false;
    });

    builder.addCase(GetChangesByRevisionId.rejected, (state, action) => {
      state.changesByRevisionIdLoading = false;
    });

    builder.addCase(GetNodeChangeManByFlowNodeId.pending, (state, action) => {
      state.nodeChangeManFlowNodeLoading = true;
    });

    builder.addCase(GetNodeChangeManByFlowNodeId.fulfilled, (state, action) => {
      state.nodeChangeManFlowNodeLoading = false;
    });

    builder.addCase(GetNodeChangeManByFlowNodeId.rejected, (state, action) => {
      state.nodeChangeManFlowNodeLoading = false;
    });

    builder.addCase(GetNodeChangesTrackingOffset.pending, (state, action) => {
      state.nodeChangeTrackingLoading = true;
    });

    builder.addCase(GetNodeChangesTrackingOffset.fulfilled, (state, action) => {
      state.nodeChangeTrackingLoading = false;
    });

    builder.addCase(GetNodeChangesTrackingOffset.rejected, (state, action) => {
      state.nodeChangeTrackingLoading = false;
    });

    builder.addCase(GetDesignFlowOffset.pending, (state, action) => {
      state.getDesignFlowOffsetLoading = true;
    });

    builder.addCase(GetDesignFlowOffset.fulfilled, (state, action) => {
      state.getDesignFlowOffsetLoading = false;
      state.flowList = action.payload;
    });

    builder.addCase(GetDesignFlowOffset.rejected, (state, action) => {
      state.getDesignFlowOffsetLoading = false;
    });

    builder.addCase(GetRecentModification.pending, (state, action) => {
      state.getRecentModificationsLoading = true;
    });

    builder.addCase(GetRecentModification.fulfilled, (state, action) => {
      state.getRecentModificationsLoading = false;
      state.recentModifications = action.payload;
    });

    builder.addCase(GetRecentModification.rejected, (state, action) => {
      state.getRecentModificationsLoading = false;
    });

    builder.addCase(PostRecentModification.pending, (state, action) => {
      state.DesignFlowloading = true;
    });

    builder.addCase(PostRecentModification.fulfilled, (state, action) => {
      state.DesignFlowloading = false;
    });

    builder.addCase(PostRecentModification.rejected, (state, action) => {
      state.DesignFlowloading = false;
    });
  },
});

export type FlowReducer = ReturnType<typeof flowSlice.reducer>;
export const {
  clearSingleApiData,
  clearResults,
  setWSprovider,
  setNextNode,
  setFlowYdoc,
  setUserLists,
  setCompiling,
  setIsEditable,
  setGlobalKeys,
  setGlobalResponse,
  setCurrentUserFlowColor,
  setChangeHistroy,
  clearChangeHistroy,
  clearFlowList,
} = flowSlice.actions;
export default flowSlice.reducer;
