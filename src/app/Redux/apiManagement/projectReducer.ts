import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";
import { errorHandling } from "../../Services/errorHandling";
import {
  // Collection,
  GetCollecOperTreeInterface,
  apiMangeDahboardCountInterface,
  collectionListbyProjectIdInterface,
  collectionsInterface,
  currentChangeHistoryInterface,
  operationInterface,
  projectInterface,
  projectPublishInterface,
  projectSolrOffsetInterface,
  projectSolrPaginationInterface,
  projectsOffsetInterface,
  saveGetResponseInterface,
  singleCollectionInterface,
  singleOperationInterface,
  singleProjectInterface,
} from "../../Utilities/interface/projectInterface";

export const GetDashboardCount = createAsyncThunk(
  "project/getDashboardCount",
  async (workspace_id: any) => {
    try {
      return await AdminServices(
        "get",
        "api/Project/get_counts_of_project_and_endpoints?workspaceId=" +
          workspace_id,
        null,
        null
      );
    } catch (err: any) {
      if (err?.response && err?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(err));
    }
  }
);

export const GetProjects = createAsyncThunk("project/getProjects", async () => {
  try {
    return await AdminServices(
      "get",
      "api/Project/get_all_projects",
      null,
      null
    );
  } catch (err: any) {
    if (err?.response && err?.response?.status === 401) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error(errorHandling(err));
  }
});

// export const GetProjectsByWorkspaceId = createAsyncThunk(
//   "project/getProjectsByWorkspaceId",
//   async (workspaceId: any) => {
//     try {
//       return await AdminServices(
//         "get",
//         "api/Project/get_project_by_workspace_id?workspace_id=" + workspaceId,
//         null,
//         null
//       );
//     } catch (err: any) {
//       if (err?.response && err?.response?.status === 401) {
//         throw new Error("UNAUTHORIZED");
//       }
//       throw new Error(errorHandling(err));
//     }
//   }
// );

export const GetProjectByWorkspaceIdOffset = createAsyncThunk(
  "projects/GetProjectByWorkspaceIdOffset",
  async (values: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Project/get_project_by_workspace_id_offset",
        values,
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

export const CreateProjects = createAsyncThunk(
  "project/createProjects",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Project/project_create",
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

export const GetProjectById = createAsyncThunk(
  "project/getProjectById",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_publish_details_by_project_id/?projectId=${value}`,
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

export const UpdateProjectById = createAsyncThunk(
  "project/updateProjectById",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Project/update_project",
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

export const DeleteProject = createAsyncThunk(
  "project/deleteProject",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Project/delete_project",
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

export const GetCollections = createAsyncThunk(
  "project/getCollections",
  async () => {
    try {
      return await AdminServices("get", "api/Collection_", null, null);
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
    }
  }
);

export const CreateCollections = createAsyncThunk(
  "project/createCollections",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Collection_/collection_create",
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

export const GetCollectionById = createAsyncThunk(
  "projects/getCollectionsById",
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
export const UpdateCollectionsById = createAsyncThunk(
  "projects/updateCollectionsById",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // "api/Collection_/collection_update",
        "api/Collection_/update_collections",
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

export const DeleteCollections = createAsyncThunk(
  "projects/deleteCollections",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Collection_/collection_delete",
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

export const CreateOperation = createAsyncThunk(
  "projects/createOperation",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `api/Operations/operation_create?collectionId=${value.collections_id}`,
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

export const UpdateOperation = createAsyncThunk(
  "projects/updateOperation",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // `api/Operations/operation_update?collectionId=${value.collections_id}`,
        // `api/Operations/operation_update`,
        `api/Operations/operation_update?project_id=${value?.project_id}`,
        value?.details,
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

export const GetOperationById = createAsyncThunk(
  "projects/getOpertaionById",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        // `api/Operations/operation_get_by_id?operation_id=${value.operation_id}&project_id=${value.project_id}`,
        `api/Operations/operation_get_by_id?project_id=${value?.project_id}&operation_id=${value?.operation_id}`,
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

export const GetOpertionTest = createAsyncThunk(
  "projects/getOperationTest",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `api/Operations/${value?.operationId}/Test`,
        value?.data,
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

export const SoapOperationById = createAsyncThunk(
  "projects/soapOperationById",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `api/SoapOperation/${value?.operationId}`,
        value?.data,
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

export const DeleteOperation = createAsyncThunk(
  "projects/deleteOperation",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Operations/operation_delete",
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

export const PublishProject = createAsyncThunk(
  "projects/PublishProject",
  async (value: any) => {
    try {
      return await AdminServices("post", `api/project/publish`, value, null);
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        throw new Error("UNAUTHORIZED");
      }
      throw new Error(errorHandling(error));
      // console.log("Error Occured: ", error)
    }
  }
);

export const GetProjectPublishLogByProjectId = createAsyncThunk(
  "projects/projectPublishlogByProjectId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_project_publish_log_by_project_id?project_id=${value}`,
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

export const GetChangeHistoryByProjectPublishLogId = createAsyncThunk(
  "projects/getChangeHistoryByProjectPublishLogId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_change_history_by_project_publish_log_id?project_publish_log_id=${value}`,
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

export const GetProjectByProjectId = createAsyncThunk(
  "projects/getProjectByProjectId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/
get_project_by_id?project_id=${value}`,
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

export const ImportFromPostman = createAsyncThunk(
  "projects/importFromPostman",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Import_/import_from_postman",
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

export const UpdateApiScanResponse = createAsyncThunk(
  "projects/updateApiScanResponse",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Import_/import_from_file",
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

export const ImportFromUrl = createAsyncThunk(
  "projects/ImportFromUrl",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Import_/import_from_url",
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

export const CloneCollection = createAsyncThunk(
  "projects/cloneCollection",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Collection_/collection_clone?user_id=" +
          value.user_id +
          "&collection_id=" +
          value.collection_id,
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

export const CloneOperation = createAsyncThunk(
  "projects/cloneOperation",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/Operations/operation_clone?user_id=" +
          value.user_id +
          "&operation_id=" +
          value.operation_id,
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

export const GetCollectionsByProjectId = createAsyncThunk(
  "projects/getCollectionsByProjectId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/get_collections_operations_by_projectid?project_id=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetApiStatusByOpperationId = createAsyncThunk(
  "projects/GetApiStatusByOpperationId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/get_api_status?operation_id=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const ApiStageCreation = createAsyncThunk(
  "projects/apiStageCreation",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        `api/Stages/ApiStage_Creation`,
        value,
        null
      );
    } catch (error: any) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetAllStagesByWorkspaceId = createAsyncThunk(
  "projects/getAllStagesByWorkspaceId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Stages/getallstages_by_workspaceid?workspaceid=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetAllStagesByProjectId = createAsyncThunk(
  "projects/getAllStagesByProjectId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Stages/getallstages_by_projectid?projectid=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetAllAwsImportDataByTeamWsId = createAsyncThunk(
  "projects/getAllAwsImportDataByTeamWsId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        // `api/ImportFromApiGateWay/getall_Awsimportdata_by_Workspaceid?worksspaceid=${value}`,
        `api/ImportFromApiGateWay/getall_Awsimportdata_by_Workspaceid?workspaceid=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const UpdateAwsImport = createAsyncThunk(
  "projects/updateAwsImport",
  async (value: any) => {
    try {
      return await AdminServices(
        "put",
        `api/ImportFromApiGateWay/update_awsimport`,
        value,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetProjectByWorkspaceIdSolrOffset = createAsyncThunk(
  "projects/getProjectByWorkspaceIdSolrOffset",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_project_by_workspace_id_solr_offset?workspaceId=${values?.wsid}&sortByField=${values?.sortByField}&sortByvalue=${values?.sortByValue}&sortDirection=${values?.sortDirection}&start=${values?.startValue}&end=${values?.endValue}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetProjectByWorkspaceIdSolrOffsetPagination = createAsyncThunk(
  "projects/getProjectByWorkspaceIdSolrOffsetPagination",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Project/get_project_by_workspace_id_solr_offset_pagination?workspaceId=${values?.wsid}&sortByField=${values?.sortByField}&sortByValue=${values?.sortByValue}&sortDirection=${values?.sortDirection}&pageNo=${values?.pageNum}&countPerPage=${values?.countPerPageVal}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetApiStatus = createAsyncThunk(
  "projects/GetApiStatus",
  async (values: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Operations/get_api_status?operation_id=${values?.operation_id}&offsetStart=${values?.offsetStart}&offsetEnd=${values?.offsetEnd}&fieldName=${values?.fieldName}&fieldValue=${values?.fieldValue}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetAllSenseDataKeyInOperByOperId = createAsyncThunk(
  "projects/GetAllSenseDataKeyInOperByOperId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `Api/Api_operation_sensitivity/get_all_sensitivedata_key_in_operations_by_operation_id_in_ai?operation_id=${value.operation_id}&project_id=${value.project_id} `,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetAllStandardsKeyInOperByOperId = createAsyncThunk(
  "projects/GetAllStandardsKeyInOperByOperId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Standards/operation_standard_voilations_by_operation_id?operation_id=${value.operation_id}&project_id=${value.project_id} `,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const SensitiveOffsetClickHouse = createAsyncThunk(
  "projects/SensitiveOffsetClickHouse",
  async (values: any) => {
    try {
      return await AdminServices(
        "post",
        `Api/Api_operation_sensitivity/sensitive_offset_clickhouse?operation_id=${values?.operation_id}&offsetStart=${values?.offsetStart}&offsetEnd=${values?.offsetEnd}&fieldName=${values?.fieldName}&fieldValue=${values?.fieldValue}&useWildcard=${values?.useWildcard}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const UpdateOrphanLimit = createAsyncThunk(
  "projects/UpdateOrphanLimit",
  async (data: any) => {
    try {
      return await AdminServices(
        "put",
        "api/Stages/UpdateStages_by_Stageid",
        data,
        null
      );
    } catch (err: any) {
      throw new Error(errorHandling(err));
    }
  }
);
export const LogStashOffsetFromClickhouse = createAsyncThunk(
  "projects/LogStashOffsetFromClickhouse",
  async (values: any) => {
    try {
      return await AdminServices(
        "post",
        `api/Stages/logstash_offset_from_clickhouse?operationId=${values?.operationId}&offset=${values?.offset}&limit=${values?.limit}&searchField=${values?.searchField}&searchValue=${values?.searchValue}&sortBy=${values?.sortBy}&sortField=${values?.sortField}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const BackgroundUrlList = createAsyncThunk(
  "projects/BackgroundUrlList",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Import_/background_url_list?operation_id=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const GetWsdlOperByCollId = createAsyncThunk(
  "projects/GetWsdlOperByCollId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/Collection_/getwsdloperation_by_collectionid?CollectionId=${value}`,
        null,
        null
      );
    } catch (error) {
      throw new Error(errorHandling(error));
    }
  }
);

export const CreateSoapOperations = createAsyncThunk(
  "projects/CreateSoapOperations",
  async (values: any) => {
    try {
      return await AdminServices(
        "post",
        `api/Collection_/create_soap_operations`,
        values,
        null
      );
    } catch (error) {
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

export const resetGatewayStateProject = createAction("Gateway/resetState");

type InitialStateType = {
  loading: boolean;
  loadingValue: boolean;
  loadingApiMangeDashboardCount: boolean;
  loadingProjectsListSolrPagination: boolean;
  apiMangeDahboardCount: apiMangeDahboardCountInterface;
  projectsLists: projectInterface[];
  projectsListsOffset: projectsOffsetInterface[];
  singleProjectData: singleProjectInterface;
  collectionsLists: collectionsInterface[];
  singleCollectionData: singleCollectionInterface;
  loadingOperationLists: boolean;
  operationLists: operationInterface[];
  singleOperationData: singleOperationInterface[];
  saveGetResponseData: saveGetResponseInterface;
  projectPublishDetails: projectPublishInterface;
  currentChangeHistory: currentChangeHistoryInterface[];
  collectionListbyProjectId: collectionListbyProjectIdInterface[];
  currentStage: any;
  opperationStatus: any;
  projectsListSolrOffset: projectSolrOffsetInterface[];
  projectsListSolrPagination: projectSolrPaginationInterface[];
  projectsListSolrCount: number;
  getCollOperTreeLoading: boolean;
  getCollOperTreeData: any[];
  saveAndGetResponseLoading: boolean;
  operationByIdLoading: boolean;
  testLoading: boolean;
};

const initialState: InitialStateType = {
  loading: false,
  loadingValue: false,
  loadingProjectsListSolrPagination: false,
  loadingApiMangeDashboardCount: false,
  apiMangeDahboardCount: {
    total_no_of_projects: 0,
    total_no_of_operations: 0,
  },
  projectsLists: [],
  projectsListsOffset: [],
  singleProjectData: {
    project_id: "",
    tenant_id: "",
    project_name: "",
    summary: "",
    status: "",
    created_at: "2024-04-01T08:51:49.993Z",
    created_by: "",
    updated_at: "2024-04-01T08:51:49.993Z",
    updated_by: "",
    activeVersion: {
      id: "",
      projectId: "",
      version: "",
      status: "",
    },
    active_Version: {
      id: "",
      project_id: "",
      version: "",
      name: "",
      summary: "",
      permission: "",
      status: "",
      created_by: "",
      created_at: "2024-04-01T08:51:49.994Z",
      updated_at: "2024-04-01T08:51:49.994Z",
      updated_by: "",
    },
    versions: [],
    project_publish_details: {
      project_id: "",
      project_unique_number: 0,
      project_name: "",
      publish_url: "",
      project_version: "",
      project_version_id: "",
      publish_id: "",
      publish_version: 0,
      publish_notes: "",
      published_by: "",
      published_on: "2024-04-01T08:51:49.994Z",
      primary_key: "",
      primary_secret: "",
      secondary_key: "",
      secondary_secret: "",
    },
    location: "",
  },
  collectionsLists: [],
  singleCollectionData: {
    collections_id: "",
    project_id: "",
    name: "",
    created_by: "",
    created_at: "2024-04-01T08:36:49.085Z",
    updated_by: "",
    updated_at: "2024-04-01T08:36:49.085Z",
    type: "",
    base_url: "",
    web_service_authentication: "",
    description: "",
    status: "",
    service_type: "",
    wsdl_url: "",
    activeVersionID: "",
    active_vesion: "",
    operations: [],
    projects: [],
    activeVersion: {
      collection_version_id: "",
      collection_id: "",
      version: "",
      status: "",
      created_by: "",
      created_at: "2024-04-01T08:36:49.085Z",
      updated_at: "2024-04-01T08:36:49.085Z",
      updated_by: "",
    },
    collection_versions: [],
  },
  loadingOperationLists: false,
  operationLists: [],
  singleOperationData: [],
  saveGetResponseData: {
    request: {
      collectionName: "",
      collectionVersion: "",
      apiId: "",
      apiName: "",
      payload: {
        user_id: "",
        operationInputs: [],
        operationHeaders: [],
        requestPayload: "",
      },
    },
    serviceInput: {
      request: {
        headers: {
          additionalProp1: {
            options: {
              propertyNameCaseInsensitive: false,
            },
            parent: "",
            root: "",
          },
          additionalProp2: {
            options: {
              propertyNameCaseInsensitive: false,
            },
            parent: "",
            root: "",
          },
          additionalProp3: {
            options: {
              propertyNameCaseInsensitive: false,
            },
            parent: "",
            root: "",
          },
        },
        payload: "",
        method: "",
        url: "",
      },
    },
    serviceOutput: {
      response: {
        headers: {
          additionalProp1: {
            options: {
              propertyNameCaseInsensitive: false,
            },
            parent: "",
            root: "",
          },
          additionalProp2: {
            options: {
              propertyNameCaseInsensitive: false,
            },
            parent: "",
            root: "",
          },
          additionalProp3: {
            options: {
              propertyNameCaseInsensitive: false,
            },
            parent: "",
            root: "",
          },
        },
        status: "",
        statusCode: 100,
        responseBody: "",
      },
    },
    response: {
      additionalProp1: {
        options: {
          propertyNameCaseInsensitive: false,
        },
        parent: "",
        root: "",
      },
      additionalProp2: {
        options: {
          propertyNameCaseInsensitive: false,
        },
        parent: "",
        root: "",
      },
      additionalProp3: {
        options: {
          propertyNameCaseInsensitive: false,
        },
        parent: "",
        root: "",
      },
    },
    operationOutputs: [],
    event_res: {
      result: {
        version: {
          major: 0,
          minor: 0,
          build: 0,
          revision: 0,
          majorRevision: 0,
          minorRevision: 0,
        },
        content: {
          headers: [],
        },
        statusCode: 100,
        reasonPhrase: "",
        headers: [],
        trailingHeaders: [],
        requestMessage: {
          version: {
            major: 0,
            minor: 0,
            build: 0,
            revision: 0,
            majorRevision: 0,
            minorRevision: 0,
          },
          versionPolicy: 0,
          content: {
            headers: [],
          },
          method: {
            method: "",
          },
          requestUri: "",
          headers: [],
          options: {
            additionalProp1: "",
            additionalProp2: "",
            additionalProp3: "",
          },
        },
        isSuccessStatusCode: true,
      },
      lookups: {
        dnsLookupTime: {
          ticks: 0,
          days: 0,
          hours: 0,
          milliseconds: 0,
          microseconds: 0,
          nanoseconds: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
          totalHours: 0,
          totalMilliseconds: 0,
          totalMicroseconds: 0,
          totalNanoseconds: 0,
          totalMinutes: 0,
          totalSeconds: 0,
        },
        tcpHandshakeTime: {
          ticks: 0,
          days: 0,
          hours: 0,
          milliseconds: 0,
          microseconds: 0,
          nanoseconds: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
          totalHours: 0,
          totalMilliseconds: 0,
          totalMicroseconds: 0,
          totalNanoseconds: 0,
          totalMinutes: 0,
          totalSeconds: 0,
        },
        sslHandshakeTime: {
          ticks: 0,
          days: 0,
          hours: 0,
          milliseconds: 0,
          microseconds: 0,
          nanoseconds: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
          totalHours: 0,
          totalMilliseconds: 0,
          totalMicroseconds: 0,
          totalNanoseconds: 0,
          totalMinutes: 0,
          totalSeconds: 0,
        },
        transferStartTime: {
          ticks: 0,
          days: 0,
          hours: 0,
          milliseconds: 0,
          microseconds: 0,
          nanoseconds: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
          totalHours: 0,
          totalMilliseconds: 0,
          totalMicroseconds: 0,
          totalNanoseconds: 0,
          totalMinutes: 0,
          totalSeconds: 0,
        },
        responseTime: {
          ticks: 0,
          days: 0,
          hours: 0,
          milliseconds: 0,
          microseconds: 0,
          nanoseconds: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
          totalHours: 0,
          totalMilliseconds: 0,
          totalMicroseconds: 0,
          totalNanoseconds: 0,
          totalMinutes: 0,
          totalSeconds: 0,
        },
        downloadTime: {
          ticks: 0,
          days: 0,
          hours: 0,
          milliseconds: 0,
          microseconds: 0,
          nanoseconds: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
          totalHours: 0,
          totalMilliseconds: 0,
          totalMicroseconds: 0,
          totalNanoseconds: 0,
          totalMinutes: 0,
          totalSeconds: 0,
        },
        totalTime: {
          ticks: 0,
          days: 0,
          hours: 0,
          milliseconds: 0,
          microseconds: 0,
          nanoseconds: 0,
          minutes: 0,
          seconds: 0,
          totalDays: 0,
          totalHours: 0,
          totalMilliseconds: 0,
          totalMicroseconds: 0,
          totalNanoseconds: 0,
          totalMinutes: 0,
          totalSeconds: 0,
        },
      },
      size: {
        response_HeaderSize: 0,
        response_BodySize: 0,
        request_HeaderSize: 0,
        request_BodySize: 0,
      },
    },
  },
  projectPublishDetails: {
    project_id: "",
    project_unique_number: 0,
    project_name: "",
    publish_url: "",
    project_version: "",
    project_version_id: "",
    publish_id: "",
    publish_version: 0,
    publish_notes: "",
    published_by: "",
    published_on: "",
    primary_key: "",
    primary_secret: "",
    secondary_key: "",
    secondary_secret: "",
  },
  currentChangeHistory: [],
  collectionListbyProjectId: [],
  opperationStatus: [],

  currentStage: "",
  projectsListSolrOffset: [],
  projectsListSolrPagination: [],
  projectsListSolrCount: 0,
  getCollOperTreeLoading: false,
  getCollOperTreeData: [],
  saveAndGetResponseLoading: false,
  operationByIdLoading: false,
  testLoading: false,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setCurrentStage: (state, action) => {
      // Update the state with the selected container value
      state.currentStage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(GetDashboardCount.pending, (state, action) => {
      state.loadingApiMangeDashboardCount = true;
    });

    builder.addCase(GetDashboardCount.fulfilled, (state, action) => {
      state.loadingApiMangeDashboardCount = false;
      state.apiMangeDahboardCount = action.payload;
    });

    builder.addCase(GetDashboardCount.rejected, (state, action) => {
      state.loadingApiMangeDashboardCount = false;
    });
    builder.addCase(GetProjects.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetProjects.fulfilled, (state, action) => {
      state.loading = false;
      // state.projectsLists = action.payload?.projects;
    });

    builder.addCase(GetProjects.rejected, (state, action) => {
      state.loading = false;
    });
    // builder.addCase(GetProjectsByWorkspaceId.pending, (state, action) => {
    //   state.loading = true;
    // });

    // builder.addCase(GetProjectsByWorkspaceId.fulfilled, (state, action) => {
    //   state.loading = false;
    //   // state.projectsLists = action.payload?.projects;
    // });

    // builder.addCase(GetProjectsByWorkspaceId.rejected, (state, action) => {
    //   state.loading = false;
    // });

    builder.addCase(GetProjectByWorkspaceIdOffset.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      GetProjectByWorkspaceIdOffset.fulfilled,
      (state, action) => {
        state.loading = false;
        state.projectsListsOffset = action.payload;
      }
    );

    builder.addCase(GetProjectByWorkspaceIdOffset.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateProjects.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateProjects.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateProjects.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetProjectById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetProjectById.fulfilled, (state, action) => {
      state.loading = false;
      state.singleProjectData = action.payload;
      state.projectPublishDetails =
        action.payload?.project_publish_details || {};
    });

    builder.addCase(GetProjectById.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateProjectById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateProjectById.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateProjectById.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteProject.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(DeleteProject.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteProject.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetCollections.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetCollections.fulfilled, (state, action) => {
      state.loading = false;
      state.collectionsLists = action.payload;
    });

    builder.addCase(GetCollections.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateCollections.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateCollections.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateCollections.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetCollectionById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetCollectionById.fulfilled, (state, action) => {
      state.loading = false;
      state.singleCollectionData = action.payload;
    });

    builder.addCase(GetCollectionById.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateCollectionsById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateCollectionsById.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateCollectionsById.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteCollections.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(DeleteCollections.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(DeleteCollections.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetOperations.pending, (state, action) => {
      state.loading = true;
      state.loadingOperationLists = true;
    });

    builder.addCase(GetOperations.fulfilled, (state, action) => {
      state.loading = false;
      state.loadingOperationLists = false;
      state.operationLists = action.payload;
    });

    builder.addCase(GetOperations.rejected, (state, action) => {
      state.loading = false;
      state.loadingOperationLists = false;
    });

    builder.addCase(CreateOperation.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateOperation.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateOperation.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateOperation.pending, (state, action) => {
      state.saveAndGetResponseLoading = true;
    });

    builder.addCase(UpdateOperation.fulfilled, (state, action) => {
      state.saveAndGetResponseLoading = false;
    });

    builder.addCase(UpdateOperation.rejected, (state, action) => {
      state.saveAndGetResponseLoading = false;
    });

    builder.addCase(GetOperationById.pending, (state, action) => {
      state.operationByIdLoading = true;
    });

    builder.addCase(GetOperationById.fulfilled, (state, action) => {
      state.operationByIdLoading = false;
      state.singleOperationData = action.payload;
    });

    builder.addCase(GetOperationById.rejected, (state, action) => {
      state.operationByIdLoading = false;
    });

    builder.addCase(GetOpertionTest.pending, (state, action) => {
      state.testLoading = true;
    });

    builder.addCase(GetOpertionTest.fulfilled, (state, action) => {
      state.testLoading = false;
      state.saveGetResponseData = action.payload;
    });

    builder.addCase(GetOpertionTest.rejected, (state, action) => {
      state.testLoading = false;
    });

    builder.addCase(SoapOperationById.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(SoapOperationById.fulfilled, (state, action) => {
      state.loading = false;
      state.saveGetResponseData = action.payload;
    });

    builder.addCase(SoapOperationById.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(PublishProject.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(PublishProject.fulfilled, (state, action) => {
      state.loading = false;
      state.projectPublishDetails = action.payload;
    });

    builder.addCase(PublishProject.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      GetProjectPublishLogByProjectId.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetProjectPublishLogByProjectId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetProjectPublishLogByProjectId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetChangeHistoryByProjectPublishLogId.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetChangeHistoryByProjectPublishLogId.fulfilled,
      (state, action) => {
        state.loading = false;
        state.currentChangeHistory = action.payload;
      }
    );

    builder.addCase(
      GetChangeHistoryByProjectPublishLogId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(GetProjectByProjectId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetProjectByProjectId.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetProjectByProjectId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportFromPostman.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ImportFromPostman.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportFromPostman.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateApiScanResponse.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateApiScanResponse.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateApiScanResponse.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportFromUrl.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ImportFromUrl.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ImportFromUrl.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CloneCollection.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CloneCollection.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CloneCollection.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(CloneOperation.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CloneOperation.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CloneOperation.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetCollectionsByProjectId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetCollectionsByProjectId.fulfilled, (state, action) => {
      state.collectionListbyProjectId = action.payload;
      state.loading = false;
    });

    builder.addCase(GetCollectionsByProjectId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetApiStatusByOpperationId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetApiStatusByOpperationId.fulfilled, (state, action) => {
      state.opperationStatus = action.payload;
      state.loading = false;
    });

    builder.addCase(GetApiStatusByOpperationId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ApiStageCreation.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(ApiStageCreation.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ApiStageCreation.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllStagesByWorkspaceId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetAllStagesByWorkspaceId.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllStagesByWorkspaceId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllStagesByProjectId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetAllStagesByProjectId.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllStagesByProjectId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAllAwsImportDataByTeamWsId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      GetAllAwsImportDataByTeamWsId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(GetAllAwsImportDataByTeamWsId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateAwsImport.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateAwsImport.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateAwsImport.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      GetProjectByWorkspaceIdSolrOffset.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdSolrOffset.fulfilled,
      (state, action) => {
        state.loading = false;
        state.projectsListSolrOffset = action.payload.projects;
        state.projectsLists = action.payload.projects;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdSolrOffset.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdSolrOffsetPagination.pending,
      (state, action) => {
        state.loadingProjectsListSolrPagination = true;
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdSolrOffsetPagination.fulfilled,
      (state, action) => {
        state.loadingProjectsListSolrPagination = false;
        state.projectsListSolrPagination = action.payload.projects;
        state.projectsListSolrCount = action.payload.total_count;
        console.log("PaginationData: ", action.payload.projects);
      }
    );

    builder.addCase(
      GetProjectByWorkspaceIdSolrOffsetPagination.rejected,
      (state, action) => {
        state.loadingProjectsListSolrPagination = false;
      }
    );

    builder.addCase(GetApiStatus.pending, (state, action) => {
      state.loadingValue = true;
    });

    builder.addCase(GetApiStatus.fulfilled, (state, action) => {
      state.loadingValue = false;
    });

    builder.addCase(GetApiStatus.rejected, (state, action) => {
      state.loadingValue = false;
    });

    builder.addCase(UpdateOrphanLimit.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(UpdateOrphanLimit.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(UpdateOrphanLimit.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      GetAllSenseDataKeyInOperByOperId.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetAllSenseDataKeyInOperByOperId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetAllSenseDataKeyInOperByOperId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(SensitiveOffsetClickHouse.pending, (state, action) => {
      state.loadingValue = true;
    });

    builder.addCase(SensitiveOffsetClickHouse.fulfilled, (state, action) => {
      state.loadingValue = false;
    });

    builder.addCase(SensitiveOffsetClickHouse.rejected, (state, action) => {
      state.loadingValue = false;
    });

    builder.addCase(LogStashOffsetFromClickhouse.pending, (state, action) => {
      state.loadingValue = true;
    });

    builder.addCase(LogStashOffsetFromClickhouse.fulfilled, (state, action) => {
      state.loadingValue = false;
    });

    builder.addCase(LogStashOffsetFromClickhouse.rejected, (state, action) => {
      state.loadingValue = false;
    });

    builder.addCase(BackgroundUrlList.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(BackgroundUrlList.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(BackgroundUrlList.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetWsdlOperByCollId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetWsdlOperByCollId.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetWsdlOperByCollId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateSoapOperations.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateSoapOperations.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateSoapOperations.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetCollectionOperationTree.pending, (state, action) => {
      state.getCollOperTreeLoading = true;
    });

    builder.addCase(GetCollectionOperationTree.fulfilled, (state, action) => {
      state.getCollOperTreeLoading = false;
      state.getCollOperTreeData = action.payload;
    });

    builder.addCase(GetCollectionOperationTree.rejected, (state, action) => {
      state.getCollOperTreeLoading = false;
    });
    builder.addCase(resetGatewayStateProject, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type projectReducer = ReturnType<typeof projectSlice.reducer>;

export const { setCurrentStage } = projectSlice.actions;

export default projectSlice.reducer;
