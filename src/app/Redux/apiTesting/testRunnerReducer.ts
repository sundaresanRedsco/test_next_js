import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminServices } from "../../Services/services";

export const GetTestRunnerList = createAsyncThunk(
  "testRunner/getTestRunnerList",
  async () => {
    try {
      return await AdminServices(
        "get",
        "api/ApiTest/get_testrunner_list",
        null,
        null
      );
    } catch (err: any) {
      // throw new Error(errorHandling(err));
    }
  }
);

export const CreateApiTestRunner = createAsyncThunk(
  "testRunner/createApiTestRunner",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/TestRunner/Create_apiTestRunner",
        value,
        null
      );
    } catch (error) {}
  }
);

export const CreateScannerWithOperation = createAsyncThunk(
  "testRunner/createScannerOperation",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/TestRunner/createScanerWithOperation",
        value,
        null
      );
    } catch (error) {}
  }
);

export const CreateApiPerformanceRunner = createAsyncThunk(
  "testRuner/performanceRunner",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/TestRunner/create_api_performance_runner",
        value,
        null
      );
    } catch (error) {}
  }
);

export const GetManualResByWorkspaceId = createAsyncThunk(
  "testRunner/getManualResponseByWorkspaceId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/TestRunner/get_manualresponse_by_workspaceid?workspace_id=${value}`,
        value,
        null
      );
    } catch (error) {}
  }
);

export const CreateApiManualRunner = createAsyncThunk(
  "testRunner/createApiManualRunner",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        // "api/TestRunner/create_api_manual_runner?user_id=" + value?.user_id,
        `api/TestRunner/create_api_manual_runner`,
        value,
        null
      );
    } catch (error) {}
  }
);

export const GetManualResByManualRunnerId = createAsyncThunk(
  "testRunner/getManualResByManualRunnerId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/TestRunner/get_manualresponse_by_manualrunnerid?manual_test_runnerid=${value}`,
        null,
        null
      );
    } catch (error) {}
  }
);

export const GetFunctionalManRunIterationByManId = createAsyncThunk(
  "testRunner/getFunctionalManRunIterationByManId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/TestRunner/get_functionalManualRunnerIteration_by_manuld?manual_test_runnerid=${value}`,
        null,
        null
      );
    } catch (error) {}
  }
);

export const CreateApiScheduleRunner = createAsyncThunk(
  "testRunner/createApiScheduleRunner",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/TestRunner/create_schedulerunner",
        value,
        null
      );
    } catch (error) {}
  }
);

export const GetScheduleListByWorkspaceId = createAsyncThunk(
  "testRunner/getScheduleListByWorkspaceId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        // `api/ScheduleTestRunner/get_scheduletestrunner_byWorkSpaceId?workspace_id=3018d6b5585e42c2b98e0b069568ad88`,
        // `api/ScheduleTestRunner/get_scheduletestrunner_byWorkSpaceId?workspace_id=bd4fbfae73724ac89ef292445c264d7f`,
        `api/ScheduleTestRunner/get_scheduletestrunner_byWorkSpaceId?workspace_id=${value}`,
        // value,
        null,
        null
      );
    } catch (error) {}
  }
);

export const GetScheduleTestRunnerByScheduleId = createAsyncThunk(
  "testRunner/GetScheduleTestRunnerByScheduleId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/ScheduleTestRunner/get_scheduletestrunner_byScheduleId?api_schedulerunner_id=${value}`,
        null,
        null
      );
    } catch (error) {}
  }
);

export const GetScanDetailsByScanRunnerId = createAsyncThunk(
  "testRunner/GetScanDetailsByScanRunnerId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/ScheduleTestRunner/get_Scandetailsby_ScanRunnerid?api_schedulerunner_id=${value}`,
        null,
        null
      );
    } catch (error) {}
  }
);

export const GetFunScheduleRunnerIdByDetailsId = createAsyncThunk(
  "testRunner/GetFunScheduleRunnerIdByDetailsId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/ScheduleTestRunner/get_functionalschedulelRunnerIteration_by_Schedule_testrunner_details_id?Schedule_testrunner_details_id=${value}`,
        null,
        null
      );
    } catch (error) {}
  }
);

export const GetScheduledRunNowByScheduledId = createAsyncThunk(
  "testRunner/GetScheduledRunNowByScheduledId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/ScheduleTestRunner/ScheduleRunNow_byScheduleId?api_schedulerunner_id=${value}`,
        null,
        null
      );
    } catch (error) {}
  }
);

export const GetApiTestRunnerByTestRunnerId = createAsyncThunk(
  "testRunner/GetApiTestRunnerByTestRunnerId",
  async (value: any) => {
    try {
      return await AdminServices(
        "get",
        `api/TestRunner/get_apiTestRunnerBy_apitestrunnerid?apitestrunner_id=${value}`,
        null,
        null
      );
    } catch (error) {}
  }
);

export const UpdateScheduledRunnerByScheduledId = createAsyncThunk(
  "testRunner/UpdateScheduledRunnerByScheduledId",
  async (value: any) => {
    try {
      return await AdminServices(
        "put",
        `api/ScheduleTestRunner/UdpateScheduleRun_By_Schedulerun_id?api_schedulerunner_id=${value?.scheduledRunnerId}`,
        value,
        null
      );
    } catch (error) {}
  }
);

export const GetScheduleResByWorkspacePagination = createAsyncThunk(
  "testRunner/GetScheduleResByWorkspacePagination",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/ScheduleTestRunner/get_Scheduleresponse_byworkspace_paginations",
        value,
        null
      );
    } catch (error) {}
  }
);

export const GetManualResByWorkspacePagination = createAsyncThunk(
  "testRunner/GetManualResByWorkspacePagination",
  async (value: any) => {
    try {
      return await AdminServices(
        "post",
        "api/TestRunner/get_manualresponse_byworkspace_paginations",
        value,
        null
      );
    } catch (error) {}
  }
);

export const resetGatewayStateTestRunner = createAction("Gateway/resetState");

// export const GetManualResByWorkspacePagination = createAsyncThunk(
//   "testRunner/GetManualResByWorkspacePagination",
//   async (value: any) => {
//     try {
//       return await AdminServices(
//         "get",
//         `api/TestRunner/get_manualresponse_byworkspace_paginations?workspace_id=${value?.workspace_id}&page=${value?.page}&pageSize=${value?.pageSize}&searchKeyword=${value?.searchKeyword}&sortBy=${value?.sortBy}&sortOrder=${value?.sortOrder}`,
//         null,
//         null,
//       )
//     } catch (error) {
//
//     }
//   }
// )

type InitialStateType = {
  loading: boolean;
  testRunnerLists: any[];
  scheduleRunnerLists: any[];
  scheduleRunAtLists: any[];
  scheduleRunnerIterationLists: any[];
};

const initialState: InitialStateType = {
  loading: false,
  testRunnerLists: [],
  scheduleRunnerLists: [],
  scheduleRunAtLists: [],
  scheduleRunnerIterationLists: [],
};

export const testRunnerSlice = createSlice({
  name: "testRunner",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetTestRunnerList.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetTestRunnerList.fulfilled, (state, action) => {
      state.loading = false;
      state.testRunnerLists = action.payload;
    });

    builder.addCase(GetTestRunnerList.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateApiTestRunner.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateApiTestRunner.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateApiTestRunner.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateScannerWithOperation.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateScannerWithOperation.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateScannerWithOperation.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateApiPerformanceRunner.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateApiPerformanceRunner.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateApiPerformanceRunner.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetManualResByManualRunnerId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetManualResByManualRunnerId.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetManualResByManualRunnerId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      GetFunctionalManRunIterationByManId.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetFunctionalManRunIterationByManId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetFunctionalManRunIterationByManId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(CreateApiManualRunner.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateApiManualRunner.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateApiManualRunner.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateApiScheduleRunner.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(CreateApiScheduleRunner.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(CreateApiScheduleRunner.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetScheduleListByWorkspaceId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetScheduleListByWorkspaceId.fulfilled, (state, action) => {
      state.scheduleRunnerLists = action.payload;
      state.loading = false;
    });

    builder.addCase(GetScheduleListByWorkspaceId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      GetScheduleTestRunnerByScheduleId.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetScheduleTestRunnerByScheduleId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetScheduleTestRunnerByScheduleId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(GetScanDetailsByScanRunnerId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(GetScanDetailsByScanRunnerId.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetScanDetailsByScanRunnerId.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      GetFunScheduleRunnerIdByDetailsId.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetFunScheduleRunnerIdByDetailsId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetFunScheduleRunnerIdByDetailsId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetScheduledRunNowByScheduledId.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetScheduledRunNowByScheduledId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetScheduledRunNowByScheduledId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(GetApiTestRunnerByTestRunnerId.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(
      GetApiTestRunnerByTestRunnerId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetApiTestRunnerByTestRunnerId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      UpdateScheduledRunnerByScheduledId.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      UpdateScheduledRunnerByScheduledId.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      UpdateScheduledRunnerByScheduledId.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetScheduleResByWorkspacePagination.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetScheduleResByWorkspacePagination.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetScheduleResByWorkspacePagination.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetManualResByWorkspacePagination.pending,
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addCase(
      GetManualResByWorkspacePagination.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(
      GetManualResByWorkspacePagination.rejected,
      (state, action) => {
        state.loading = false;
      }
    );

    builder.addCase(resetGatewayStateTestRunner, (state, action) => {
      return initialState; // Reset state to initial values
    });
  },
});

export type testRunnerReducer = ReturnType<typeof testRunnerSlice.reducer>;

export default testRunnerSlice.reducer;
