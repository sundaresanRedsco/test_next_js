import { Box, Drawer} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import RadioCheckboxComponent from "../../Global/radioCheckboxComponent";
import { SecondaryTypography } from "../../../Styles/signInUp";
import GInput from "../../Global/GInput";
import CancelIcon from "@mui/icons-material/Cancel";
import GButton from "../../Global/GlobalButtons";
import ApiTextField from "../apiTextField";
import { CheckCircle } from "@mui/icons-material";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootStateType } from "../../../Redux/store";
import {
  AddViolatingKeys,
  BulkDeleteViolatingKeys,
  BulkUpdateViolatingKeys,
  DeleteViolatingKeys,
  GetViolatingKeysByStandards,
  SecurityCompilanceReducer,
  UpdateViolatingKeys,
} from "../../../Redux/SecurityCompilance/SecurityCompilanceReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonReducer,
  updateSessionPopup,
} from "../../../Redux/commonReducer";
import toast from "react-hot-toast";
import GlobalLoader from "../../Global/GlobalLoader";
import GDialogBox from "../../Global/GDialogBox";
import GsearchBar from "../../Global/GsearchBar";
import GlobalCircularLoader from "../../Global/GlobalCircularLoader";
import CustomModeEditIcon from "../../CustomModeEditIcon";
import CustomDeleteIcon from "../../CustomDeleteIcon";

function CompilanceTable(props: any) {
  const { open, onClose, nameData, nestedData, idData } = props;

  const dispatch = useDispatch<any>();

  const { loading, getKeys, violatingLoading } = useSelector<
    RootStateType,
    SecurityCompilanceReducer
  >((state) => state.compilances.securityCompilanes);

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  const [switchState, setSwitchState] = useState<any>();
  const [createState, setCreateState] = useState<any>(false);
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [errorEditedName, setErrorEditedName] = useState({ name: "" });
  const [rowData, setRowData] = useState<any>(getKeys);
  const [deleteValueClicked, setDeleteValueClicked] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [bulkEditMode, setBulkEditMode] = useState(false);
  const [bulkDeleteMode, setBulkDeleteMode] = useState(false);

  console.log(editedName, "editedNamesss");
  console.log(bulkEditMode, "bulkEditModesss");

  console.log(createState, "createStatecreateState");
  console.log(switchState, "switchStateswitchStatessdsd");
  console.log(editId, "editId");
  console.log(deleteId, "deleteIddeleteId");
  console.log(userProfile?.user?.tenant_id, "userProfileuserProfile");
  console.log(getKeys, "eeerergetKeys");
  console.log(idData, "idDatasdsdsd");

  const tableHeaders = [
    { key: "namede", label: "" },

    { key: "name", label: "Name" },
    { key: "ismasked", label: "Masked" },
    { key: "isEncrypted", label: "Encrypted" },
    { key: "isNotPresnted", label: "Not Presnted" },
    { key: "action", label: "Action" },
  ];

  useEffect(() => {
    // if (wsid) {
    let addGatewayDetails = {
      Standard_key_id: idData,
      tenant_id: userProfile?.user?.tenant_id,
    };

    dispatch(GetViolatingKeysByStandards(addGatewayDetails))
      .unwrap()
      .then()
      .catch((errr: any) => {
        if (errr.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        }
      });
    // }
    console.log("samplesdsd");

    return () => {
      console.log("Component is unmounting");
    };
  }, [idData]);

  useEffect(() => {
    setRowData(getKeys);
  }, [getKeys]);

  const [masked, setMasked] = useState<any>();
  const [encrupted, setEncrupted] = useState<any>();
  const [presented, setPresented] = useState<any>();
  const [types, setTypes] = useState<any>();
  const [maskedClose, setMaskedClose] = useState<any>();
  const [initialCheckboxState, setInitialCheckboxState] = useState<any>({});
  const [filterStyle, setFilterStyle] = useState("blur(0px)");
  console.log(maskedClose, "maskedClosemaskedClose");
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [editedValues, setEditedValues] = useState<any>([]);
  const [checkedRows, setCheckedRows] = useState<any>([]);
  const [updateResponse, setUpdateResponse] = useState<any>();

  console.log(updateResponse, "updateResponse");

  console.log(checkedRows, "checkedRowscheckedRows");

  console.log(editedValues, "editedValueseditedValues");

  // setFilterStyle("blur(0px)");

  console.log(types, "typestypes");
  console.log(masked, "maskedmasked");
  console.log(presented, "maskepresentedpresentedpresenteddmasked");
  console.log(encrupted, "encruptedencrupted");
  console.log(rowData, "getKeysrowData");

  const handleAddRow = () => {
    const newRow = {
      id: rowData.length + 1,
      name: "",
      is_masked: false,
      is_encrypted: false,
      isnot_presented: false,
      standardKey_id: "",
      is_inbuild: false,
    };
    // switchState
    setSwitchState(true);
    setRowData([newRow, ...rowData]);
    setEditId(newRow.id);
    setCreateState(true);
    setFilterStyle("blur(1px)");
    setEditedName("");
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  };

  // const handleEditClick = (
  //   id: any,
  //   name: any,
  //   isMasked: any,
  //   isEncrypted: any,
  //   notpresent: any
  // ) => {
  //   setEditId(id);
  //   setEditedName(name);
  //   setSwitchState(true);
  //   setCreateState(false);
  //   setInitialCheckboxState({
  //     is_masked: isMasked,
  //     is_encrypted: isEncrypted,
  //     is_not_presented: notpresent,
  //   });
  // };

  const handleEditClick = (
    id: any,
    name: any,
    is_masked: any,
    is_encrypted: any,
    is_not_presented: any
  ) => {
    setEditId(id);
    setSwitchState(true);

    setEditedValues((prev: any) => [
      ...prev,
      { id, name, is_masked, is_encrypted, is_not_presented },
    ]);

    setInitialCheckboxState({
      is_masked,
      is_encrypted,
      is_not_presented,
    });
    setEditedName(name);
    setFilterStyle("blur(1px)");

    //     setInitialCheckboxState({
    //   is_masked: is_masked,
    //   is_encrypted: is_encrypted,
    //   // is_not_presented: notpresent,
    // });
  };

  // const handleVilotingClose = () => {
  //   setEditId("");
  //   setEditedName("");
  //   // setEditedValues([])
  //   setErrorEditedName({ name: "" });
  //   setFilterStyle("blur(0px)");
  //   setCreateState(false);
  // if (createState) {
  //   setRowData((prevData: any) =>
  //     prevData.filter((row: { id: string }) => row.id !== editId)
  //   );
  // }
  //   // Revert to initial checkbox states
  //   setRowData((prevData: any) =>
  //     prevData.map((r: any) =>
  //       r.id === editId
  //         ? {
  //             ...r,
  //             is_masked: initialCheckboxState.is_masked,
  //             is_encrypted: initialCheckboxState.is_encrypted,
  //             is_not_presented: initialCheckboxState.is_not_presented,
  //           }
  //         : r
  //     )
  //   );
  // };

  // const handleVilotingClose = () => {
  //   setEditId("");
  //   setEditedValues([]);
  //   setErrorEditedName({ name: "" });
  //   setFilterStyle("blur(0px)");
  //   setCreateState(false);

  //   if (createState) {
  //     setRowData((prevData : any) =>
  //       prevData.filter((row : any) => row.id !== editId)
  //     );
  //   }

  //   // Revert to initial checkbox states
  //   setRowData((prevData : any) =>
  //     prevData.map((r : any) =>
  //       r.id === editId
  //         ? {
  //             ...r,
  //             is_masked: initialCheckboxState.is_masked,
  //             is_encrypted: initialCheckboxState.is_encrypted,
  //             is_not_presented: initialCheckboxState.is_not_presented,
  //           }
  //         : r
  //     )
  //   );
  // };

  const handleVilotingClose = () => {
    setEditId("");
    setEditedValues([]);
    setErrorEditedName({ name: "" });
    setFilterStyle("blur(0px)");
    setCreateState(false);
    setSwitchState(false);
    if (createState) {
      setRowData((prevData: any) =>
        prevData.filter((row: { id: string }) => row.id !== editId)
      );
    }

    // Revert to initial checkbox states
    setRowData((prevData: any) =>
      prevData.map((r: any) =>
        r.id === editId
          ? {
              ...r,
              is_masked: initialCheckboxState.is_masked,
              is_encrypted: initialCheckboxState.is_encrypted,
              is_not_presented: initialCheckboxState.is_not_presented,
            }
          : r
      )
    );
  };

  const handleInputChange = (id: any, field: any, value: any) => {
    setEditedValues((prev: any) => {
      const index = prev.findIndex((item: any) => item.id === id);
      if (index >= 0) {
        const updatedItem = { ...prev[index], [field]: value };
        return [...prev.slice(0, index), updatedItem, ...prev.slice(index + 1)];
      } else {
        return [...prev, { id, [field]: value }];
      }
    });
  };

  const handleSingleInputChange = (e: any) => {
    setEditedName(e.target.value);
  };

  const handleDeleteClose = () => {
    // setAnchorEl(null);
    setDeleteValueClicked(false);
  };

  const handleCheckBoxSingleToggle = (
    id: any,
    type: string,
    currentMask: boolean
  ) => {
    setRowData((prevState: any) =>
      prevState.map((row: any) =>
        row.id === id ? { ...row, [type]: !currentMask } : row
      )
    );

    switch (type) {
      case "is_masked":
        setMasked(!currentMask);
        break;
      case "is_encrypted":
        setEncrupted(!currentMask); // Assuming this is corrected from "setEncrupted"
        break;
      case "is_not_presented":
        setPresented(!currentMask); // Assuming this is corrected from "setPresented"
        break;
      default:
        break;
    }
  };

  // const handleCheckBoxToggle = (id : any, field : any) => {
  //   setEditedValues((prev : any) => {
  //     const index = prev.findIndex((item : any) => item.id === id);
  //     if (index >= 0) {
  //       const updatedItem = { ...prev[index], [field]: !prev[index][field] };
  //       return [...prev.slice(0, index), updatedItem, ...prev.slice(index + 1)];
  //     } else {
  //       return [...prev, { id, [field]: true }];
  //     }
  //   });
  // };

  //   const handleCheckBoxToggle = (id: any, field: any) => {
  //     const newRow : any = rowData.find((r: any) => r.id === id); // Assuming newRow is derived from rows or another data source

  //     setEditId(id);
  //     setEditedValues((prev: any) => {
  //         const index = prev.findIndex((item : any) => item.id === id);
  //         if (index >= 0) {
  //             // Update the existing item
  //             const updatedItem = { ...prev[index], [field]: !prev[index][field] };
  //             return [...prev.slice(0, index), updatedItem, ...prev.slice(index + 1)];
  //         } else {
  //             // Add a new item if it doesn't exist
  //             return [...prev, { id, ...newRow, [field]: true }];
  //         }
  //     });
  // };

  const handleCheckBoxToggle = (id: any, field: any) => {
    const newValue = !getEditedValue(id, field, false); // Toggle the current value of the checkbox

    setEditId(id);

    // Extract the current values for the row with the specified id
    const row = rowData.find((r: any) => r.id === id); // Assuming rows is your data source

    // If row is not found, exit early
    if (!row) return;

    // Prepare the updated object
    const updatedObject = {
      id,
      name: row.name,
      is_masked:
        field === "is_masked"
          ? newValue
          : getEditedValue(id, "is_masked", row.is_masked),
      is_encrypted:
        field === "is_encrypted"
          ? newValue
          : getEditedValue(id, "is_encrypted", row.is_encrypted),
      is_not_presented:
        field === "is_not_presented"
          ? newValue
          : getEditedValue(id, "is_not_presented", row.is_not_presented),
    };

    setEditedValues((prev: any) => {
      const index = prev.findIndex((item: any) => item.id === id);
      if (index >= 0) {
        // Update the existing item
        return [
          ...prev.slice(0, index),
          updatedObject,
          ...prev.slice(index + 1),
        ];
      } else {
        // Add a new item if it doesn't exist
        return [...prev, updatedObject];
      }
    });
  };

  const handleBulkEdit = () => {
    setBulkEditMode(true);
    setFilterStyle("blur(1px)");
  };

  const handleBulkCancel = () => {
    setBulkEditMode(false);
    // bulkEditMode === false
    setFilterStyle("blur(0px)");

    setBulkEditMode(false);
  };

  const handleBulkDelete = () => {
    setBulkDeleteMode(true);
    setFilterStyle("blur(1px)");
  };

  const handleBulkDeleteCancel = () => {
    setBulkDeleteMode(false);
    setCheckedRows([]);
    setFilterStyle("blur(0px)");
  };

  const getEditedValue = (id: any, field: any, defaultValue: any) => {
    const editedItem = editedValues.find((item: any) => item.id === id);
    return editedItem ? editedItem[field] : defaultValue;
  };

  const handleDeleteCheckboxChange = (rowId: string) => {
    setCheckedRows((prevState: any) =>
      prevState.includes(rowId)
        ? prevState.filter((id: any) => id !== rowId)
        : [...prevState, rowId]
    );
  };

  const createVoilatingKeys = () => {
    // const otp = editedName || "";

    // if (otp === "") {
    //   setErrorEditedName({ name: "Name is required" });
    //   return;
    // }

    const voilatingKeyDetails = {
      standard_id: idData,
      tenant_id: userProfile?.user?.tenant_id,
      data: {
        id: createState ? undefined : editId,
        name: editedName,
        is_masked: masked,
        is_encrypted: encrupted, // Assuming corrected from "encrupted"
        // isnot_presented: presented, // Assuming corrected from "presented"
        ...(createState === true
          ? { is_not_presented: presented }
          : { isnot_presented: presented }),
        // is_inbuild: false,
        ...(createState === true && { is_inbuild: false }),
      },
    };

    const action =
      createState === true ? AddViolatingKeys : UpdateViolatingKeys;

    dispatch(action(voilatingKeyDetails))
      .unwrap()
      .then((res: any) => {
        toast.success(createState ? "Created" : "Updated");
        setFilterStyle("blur(0px)");
        handleVilotingClose();

        const addGatewayDetails = {
          Standard_key_id: idData,
          tenant_id: userProfile?.user?.tenant_id,
        };

        dispatch(GetViolatingKeysByStandards(addGatewayDetails))
          .unwrap()
          .then()
          .catch((err: any) => {
            if (err.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });

        console.log("Response: ", res);
      })
      .catch((error: any) => {
        console.log(error, "error Occurred");
        if (error.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        } else {
          toast.error(error.message);
        }
      });
  };

  const deleteVoilatingKeys = () => {
    const DeletevoilatingKeyDetails = {
      voilation_key: deleteId,
    };

    dispatch(DeleteViolatingKeys(DeletevoilatingKeyDetails))
      .unwrap()
      .then((res: any) => {
        handleDeleteClose();
        toast.success("Deleted");

        const addGatewayDetails = {
          Standard_key_id: idData,
          tenant_id: userProfile?.user?.tenant_id,
        };

        dispatch(GetViolatingKeysByStandards(addGatewayDetails))
          .unwrap()
          .then()
          .catch((err: any) => {
            if (err.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });
        console.log("UpdateResponse: ", res);
      })
      .catch((error: any) => {
        console.log(error, "error Occurred");
        if (error.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        } else {
          toast.error(error.message);
        }
      });
  };

  let filteredData = [];
  if (rowData) {
    filteredData = rowData?.filter((data: any) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  console.log(filteredData, "filteredData");

  const bulkUpdateViolatingKeys = () => {
    const violatingKeyBulkDetails = {
      standard_id: idData,
      tenant_id: userProfile?.user?.tenant_id,
      data: {
        violationRequests: editedValues,
      },
    };

    dispatch(BulkUpdateViolatingKeys(violatingKeyBulkDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Updated");
        setBulkEditMode(false);
        // setFilterStyle("blur(0px)");
        // handleViolatingClose();

        const addGatewayDetails = {
          Standard_key_id: idData,
          tenant_id: userProfile?.user?.tenant_id,
        };

        dispatch(GetViolatingKeysByStandards(addGatewayDetails))
          .unwrap()
          .then()
          .catch((err: any) => {
            if (err.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });

        console.log("ResponseBulk: ", res);
        setUpdateResponse(res);
      })
      .catch((error: any) => {
        console.log(error, "error Occurred");
        if (error.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        } else {
          toast.error(error.message);
        }
      });
  };

  const bulkDeleteKeys = () => {
    const KeyDeleteBulkDetails = {
      violationKeys: checkedRows,
    };

    dispatch(BulkDeleteViolatingKeys(KeyDeleteBulkDetails))
      .unwrap()
      .then((res: any) => {
        toast.success("Deleted");
        setBulkEditMode(false);
        // setFilterStyle("blur(0px)");
        // handleViolatingClose();

        const addGatewayDetails = {
          Standard_key_id: idData,
          tenant_id: userProfile?.user?.tenant_id,
        };

        dispatch(GetViolatingKeysByStandards(addGatewayDetails))
          .unwrap()
          .then()
          .catch((err: any) => {
            if (err.message === "UNAUTHORIZED") {
              dispatch(updateSessionPopup(true));
            }
          });

        console.log("ResponseBulk: ", res);
      })
      .catch((error: any) => {
        console.log(error, "error Occurred");
        if (error.message === "UNAUTHORIZED") {
          dispatch(updateSessionPopup(true));
        } else {
          toast.error(error.message);
        }
      });
  };

  return (
    <div>
      {loading && <GlobalLoader />}
      <Drawer
        anchor={"right"}
        open={open}
        onClose={() => {
          onClose(); // Call the function
          setErrorEditedName({ name: "" });
          handleVilotingClose();
          setBulkEditMode(false);
          setBulkDeleteMode(false);
          setCheckedRows([]);
        }}
        PaperProps={{ style: { width: "90%" } }}
      >
        <div
          onClick={() => {
            onClose(); // Call the function
            setErrorEditedName({ name: "" });
            handleVilotingClose();
          }}
          style={{ marginLeft: "2rem" }}
        >
          <div style={{ margin: "1rem 0rem" }}>
            <ArrowBackIosIcon
              sx={{
                fontSize: "0.75rem",
                color: "#64748B",
                cursor: "pointer",
              }}
            />
            <span
              style={{
                cursor: "pointer",
                color: "#64748B",
                fontSize: "0.75rem",
                fontFamily: "Inter-regular",
              }}
            >
              Back
            </span>
          </div>
        </div>
        <div style={{ margin: "1rem 3rem" }}>
          <div className="d-flex" style={{ marginBottom: "1rem" }}>
            <AdminPanelSettingsTwoToneIcon style={{ fontSize: "3rem" }} />
            <div>
              <SecondaryTypography
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  // marginBottom: "1rem",
                  marginTop: "1rem",
                  marginLeft: "1rem",
                }}
              >
                Sensitivity Information
              </SecondaryTypography>

              <SecondaryTypography
                style={{
                  fontSize: "0.6rem",
                  marginLeft: "1rem",
                  marginTop: "0.6rem",
                }}
              >
                {/* {val?.description} */}
                Sensitivity offers APIs inside the data that offers inside
                inside the data<br></br> List of Standards Information
              </SecondaryTypography>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <div>
                <SecondaryTypography
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    margin: "1rem 0rem",
                  }}
                >
                  {nameData} -{" "}
                  {nameData === "GDPR"
                    ? "General Data Protection Regulation"
                    : nameData === "HIPPA"
                    ? "Health Insurance Portability and Accountability Act"
                    : nameData === "PCI_DSS"
                    ? "Payment Card Industry Data Security Standard"
                    : nameData === "FISMA"
                    ? "Federal Information Security Modernization Act"
                    : nameData === "PDPL"
                    ? "Personal Data Protection Law"
                    : ""}
                </SecondaryTypography>

                {/* <GButton
                    buttonType="primary"
                    // label={"Bulk Edit"}
                    label={bulkEditMode === true ? "Cancel Edit" : "Bulk Edit"}
                    // margin="0rem 2rem"
                    marginLeft="2rem"
                    onClickHandler={() => {
                      bulkEditMode === true ? handleBulkCancel() : handleBulkEdit() ;
                    }}
                    // onClickHandler={handleBulkEdit}
                    // disabled={createState === true}
                  /> */}

                {/* <GButton
                    buttonType="primary"
                    // label={"Bulk Edit"}
                    label={"UpdateSvane Changes"}
                    // margin="0rem 2rem"
                    marginLeft="2rem"
                    onClickHandler={() => {
                      bulkUpdateViolatingKeys();
                    }}
                    // onClickHandler={handleBulkEdit}
                    // disabled={createState === true}
                  /> */}

                {/* <GButton
                    buttonType="primary"
                    label={bulkDeleteMode === true ? "Cancel Delete" : "Bulk Delete"}
                    // label={ "Bulk Delete"}
                    // margin="0rem 2rem"
                    marginLeft="2rem"
                    onClickHandler={() => {
                      bulkDeleteMode === true ? handleBulkDeleteCancel() : handleBulkDelete() ;
                    }}
                 
                  /> */}
                {/* 
<GButton
                    buttonType="primary"
                    // label={"Bulk Edit"}
                    label={ "Delete Save"}
                    // margin="0rem 2rem"
                    marginLeft="2rem"
                    onClickHandler={() => {
                      bulkDeleteKeys()
                    }}
                 
                  /> */}
              </div>

              <div style={{ marginRight: "2rem", marginTop: "0.6rem" }}>
                {/* <GsearchBar
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setSearchQuery(e.target.value)}
                  placeholder={"datas"}
                /> */}
                <span style={{ filter: filterStyle }}>
                  <GButton
                    buttonType="primary"
                    label={"Add"}
                    margin="0rem 2rem"
                    marginLeft="2rem"
                    onClickHandler={() => {
                      handleAddRow();
                    }}
                    disabled={
                      createState === true ||
                      bulkEditMode === true ||
                      bulkDeleteMode === true ||
                      switchState === true
                    }
                  />
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  bulkEditMode === true || bulkDeleteMode === true
                    ? "space-between"
                    : "flex-end",
                marginBottom: "2rem",
                marginRight: "2rem",
              }}
            >
              {(bulkEditMode === true || bulkDeleteMode === true) && (
                <div>
                  <GButton
                    buttonType="secondary"
                    label={"Cancel"}
                    margin="0rem 2rem"
                    // marginLeft="2rem"
                    onClickHandler={() => {
                      bulkDeleteMode === true
                        ? handleBulkDeleteCancel()
                        : handleBulkCancel();
                    }}

                    // bulkDeleteMode === true ? handleBulkDeleteCancel() : handleBulkDelete() ;
                    // disabled={createState === true}
                  />
                  {/* <CancelIcon
                              onClick={() => handleBulkCancel()}
                              style={{
                                cursor: "pointer",
                                fontSize: "20px",
                                color: "#E91E63",
                              }}
                            /> */}
                  {/* <CheckCircle
                              // onClick={() => createVoilatingKeys()}
                              style={{
                                cursor: "pointer",
                                fontSize: "20px",
                                marginLeft: "1rem",
                                color: "#407440",
                              }}
                            /> */}

                  <GButton
                    buttonType="primary"
                    label={"Save"}
                    margin="0rem 2rem"
                    marginLeft="2rem"
                    // onClickHandler={() => {
                    //   handleBulkEdit();
                    // }}
                    // disabled={createState === true}  bulkDeleteMode === true ? handleBulkDeleteCancel() : handleBulkDelete() ;

                    onClickHandler={() => {
                      (bulkDeleteMode === true && bulkDeleteKeys()) ||
                        (bulkEditMode === true && bulkUpdateViolatingKeys());
                    }}
                  />
                </div>
              )}

              <div>
                {/* {bulkDeleteMode == false && ( */}
                <CustomModeEditIcon
                  disabled={bulkDeleteMode && true}
                  style={{
                    color: "#6c757d",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                  onClick={() => handleBulkEdit()}
                />
                {/* )} */}

                {/* {bulkEditMode === false && ( */}
                <CustomDeleteIcon
                  disabled={bulkEditMode && true}
                  style={{
                    color: "#adb5bd",
                    marginLeft: "2rem",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                  onClick={() => handleBulkDelete()}
                />
                {/* )} */}
              </div>
            </div>
          </div>
          <TableContainer
            component={Paper}
            style={{
              maxHeight: "20rem",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
            ref={tableContainerRef}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeaders?.map((header) => (
                    <TableCell
                      key={header?.key}
                      align="center"
                      style={{
                        position: "sticky",
                        top: 0,
                        background: "white",
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.6rem",
                          fontFamily: "Inter-regular",
                          fontWeight: "600",
                        }}
                      >
                        <span style={{ marginRight: "1rem" }}>
                          {header.label}
                        </span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody style={{ position: "relative" }}>
                {getKeys?.length <= 0 && (
                  <GlobalCircularLoader open={violatingLoading} />
                )}

                {filteredData.length === 0 ? (
                  <TableRow style={{ height: "22rem" }}>
                    <TableCell colSpan={12}>
                      <Box>
                        <p
                          style={{ alignItems: "center", textAlign: "center" }}
                        >
                          No data found.
                        </p>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((row: any, index: any) => (
                    <TableRow key={index} style={{ height: "70px" }}>
                      {/* Add the checkbox cell here */}
                      <TableCell
                        style={{ width: "3%", padding: "8px" }}
                        align="center"
                      >
                        {row?.is_inbuild === false &&
                          bulkDeleteMode === true && (
                            <input
                              style={{ cursor: "pointer", marginRight: "10px" }}
                              type="checkbox"
                              checked={checkedRows.includes(row.id)}
                              onChange={() =>
                                handleDeleteCheckboxChange(row.id)
                              }
                            />
                          )}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "0.6rem",
                          width: "25%",
                          padding: "8px",
                        }}
                        align="center"
                      >
                        {(bulkEditMode && row?.is_inbuild === false) ||
                        (editId === row.id && row?.is_inbuild === false) ? (
                          <div>
                            <ApiTextField
                              margin={"0px"}
                              maxWidth={"20px"}
                              width={"100%"}
                              display={"block"}
                              padding={"0px !important"}
                              // value={editedName}
                              value={
                                bulkEditMode === false
                                  ? editedName
                                  : getEditedValue(row.id, "name", row.name)
                              }
                              // value={bulkEditMode === false ? editedName : getEditedValue(row.id, "name", row.name)}
                              dataTest={"project-name-input"}
                              fontSize="0.6rem"
                              height="0px !important"
                              borderColor="#9CA3AF"
                              borderRadius="4px"
                              // onChange={(e: any) => handleInputChange(row.id, "name", e.target.value)}
                              // onChange={handleSingleInputChange}
                              onChange={
                                bulkEditMode === true
                                  ? (e: any) =>
                                      handleInputChange(
                                        row.id,
                                        "name",
                                        e.target.value
                                      )
                                  : handleSingleInputChange
                              }
                            />
                            <span
                              style={{
                                fontFamily: "Inter-regular",
                                fontSize: "0.5rem",
                                color: "#d32f2f",
                              }}
                            >
                              {errorEditedName?.name}
                            </span>
                          </div>
                        ) : (
                          <SecondaryTypography style={{ fontSize: "0.6rem" }}>
                            {row.name}
                          </SecondaryTypography>
                        )}
                      </TableCell>
                      <TableCell style={{ fontSize: "0.6rem" }} align="center">
                        <RadioCheckboxComponent
                          checked={
                            bulkEditMode === false
                              ? row?.is_masked
                              : getEditedValue(
                                  row.id,
                                  "is_masked",
                                  row?.is_masked
                                )
                          }
                          // onChange={() => handleCheckBoxToggle(row.id, "is_masked")}
                          onChange={() =>
                            bulkEditMode === false
                              ? handleCheckBoxSingleToggle(
                                  row.id,
                                  "is_masked",
                                  row?.is_masked
                                )
                              : handleCheckBoxToggle(row.id, "is_masked")
                          }
                          disabled={editId !== row.id && !bulkEditMode}
                          checkedColor={"#6B21A8"}
                        />
                      </TableCell>
                      <TableCell style={{ fontSize: "0.6rem" }} align="center">
                        <RadioCheckboxComponent
                          // checked={getEditedValue(row.id, "is_encrypted", row?.is_encrypted)}
                          checked={
                            bulkEditMode === false
                              ? row?.is_encrypted
                              : getEditedValue(
                                  row.id,
                                  "is_encrypted",
                                  row?.is_masked
                                )
                          }
                          buttonWidth="15px"
                          disabled={editId !== row.id && !bulkEditMode}
                          // onChange={() => handleCheckBoxToggle(row.id, "is_encrypted")}
                          onChange={() =>
                            bulkEditMode === false
                              ? handleCheckBoxSingleToggle(
                                  row.id,
                                  "is_encrypted",
                                  row?.is_encrypted
                                )
                              : handleCheckBoxToggle(row.id, "is_encrypted")
                          }
                          checkedColor={"#6B21A8"}
                        />
                      </TableCell>
                      <TableCell style={{ fontSize: "0.6rem" }} align="center">
                        <RadioCheckboxComponent
                          // checked={getEditedValue(row.id, "is_not_presented", row?.is_not_presented)}
                          checked={
                            bulkEditMode === false
                              ? row?.is_not_presented
                              : getEditedValue(
                                  row.id,
                                  "is_not_presented",
                                  row?.is_not_presented
                                )
                          }
                          buttonWidth="15px"
                          disabled={editId !== row.id && !bulkEditMode}
                          // onChange={() => handleCheckBoxToggle(row.id, "is_not_presented")}
                          onChange={() =>
                            bulkEditMode === false
                              ? handleCheckBoxSingleToggle(
                                  row.id,
                                  "is_not_presented",
                                  row?.is_not_presented
                                )
                              : handleCheckBoxToggle(row.id, "is_not_presented")
                          }
                          checkedColor={"#6B21A8"}
                        />
                      </TableCell>
                      <TableCell
                        style={{ width: "15%", height: "20px" }}
                        align="center"
                      >
                        {editId === row.id &&
                        bulkEditMode === false &&
                        switchState === true ? (
                          <div>
                            <CancelIcon
                              onClick={() => handleVilotingClose()}
                              style={{
                                cursor: "pointer",
                                fontSize: "14px",
                                color: "#E91E63",
                              }}
                            />
                            <CheckCircle
                              onClick={() => createVoilatingKeys()}
                              style={{
                                cursor: "pointer",
                                fontSize: "14px",
                                marginLeft: "1rem",
                                color: "#407440",
                              }}
                            />
                          </div>
                        ) : (
                          <>
                            {/* {bulkEditMode === false &&
                            bulkDeleteMode === false ? ( */}
                            <CustomModeEditIcon
                              // disabled={}
                              disabled={
                                (bulkEditMode && true) ||
                                (bulkDeleteMode && true)
                              }
                              style={{
                                color: "#6c757d",
                                cursor: "pointer",
                                fontSize: "14px",
                              }}
                              onClick={() =>
                                handleEditClick(
                                  row.id,
                                  row.name,
                                  row.is_masked,
                                  row.is_encrypted,
                                  row.is_not_presented
                                )
                              }
                            />
                            {/* <ModeEditIcon
                              // disabled={}
                                style={{
                                  color: "#6c757d",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                }}
                                onClick={() =>
                                  handleEditClick(
                                    row.id,
                                    row.name,
                                    row.is_masked,
                                    row.is_encrypted,
                                    row.is_not_presented
                                  )
                                }
                              /> */}
                            {/* // ) : (
                            //   "-"
                            // )} */}
                            {row?.is_inbuild === false && (
                              // bulkEditMode === false &&
                              // bulkDeleteMode === false &&
                              <CustomDeleteIcon
                                disabled={
                                  (bulkDeleteMode && true) ||
                                  (bulkEditMode && true)
                                }
                                style={{
                                  color: "#adb5bd",
                                  marginLeft: "2rem",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                }}
                                onClick={() => {
                                  setDeleteValueClicked(true);
                                  setDeleteId(row?.id);
                                }}
                              />
                            )}
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {deleteValueClicked === true && (
          <>
            <div>
              <GDialogBox
                openVal={deleteValueClicked}
                dialogContentText={`Are you sure to delete ${editedName}?`}
                confirmVal={"Confirm"}
                cancelVal={"Cancel"}
                onClickConfirmHandler={deleteVoilatingKeys}
                onClickCancelHandler={handleDeleteClose}
              />
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
}
export default CompilanceTable;
