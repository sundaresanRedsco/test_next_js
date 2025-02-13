import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { create } from "jsondiffpatch";
import { useSelector } from "react-redux";
import { RootStateType } from "@/app/Redux/store";
import { endpointReducer } from "@/app/Redux/apiManagement/endpointReducer";
import GButton from "../global/GlobalButtons";
import { Info } from "@mui/icons-material";

const initialData = [
  { id: 1, name: "Item 1", value: "A", createdAt: new Date().toISOString() },
  { id: 2, name: "Item 2", value: "B", createdAt: new Date().toISOString() },
];

const getUpdatedJson = (item: any) => ({
  ...item,
  value: item.value + " (updated)",
});

const dummyData = [
  {
    changes_tracking_id: "1e7e822e590d4b28b7274a146cd09ed0",
    entity_id: "a8945652231849bb84247d125e2446b7",
    entity_type: "OPERATIONS",
    workspace_id: "30f2121717f047f7a697ba641778c479",
    tenant_id: "3f4ae55ce20f4d28a2588baec949e25f",
    version_name: "null",
    parent_entity_id: "b93d2204cea54a43a826be33f4743956",
    parent_entity_type: "COLLECTIONS",
    updated_at: "1970-01-01T00:00:00Z",
    updated_by: "",
    change_type: "ADD",
    new_json:
      '{"collection":null,"id":"a8945652231849bb84247d125e2446b7","name":"GET_pets_EMlUe","description":"null","pass_through_forheaders":true,"pass_through_forinputs":true,"pass_through_foroutputs":true,"pass_through_authorization":true,"pass_through_queryparameters":true,"created_by":"98131162f853492696443d260ebae676","created_at":"2025-02-12T12:30:01.5836324+05:30","updated_by":"98131162f853492696443d260ebae676","updated_at":"2025-02-12T12:30:01.5836335+05:30","status":"ACTIVE","security_type":"","soap_action":"","endpoint_url":"https://m87de4m3te.execute-api.ap-south-1.amazonaws.com/dev","soap_version":"","response_encoding":"","server_auth_mode":"","binding_name":"","soap_input_message":"","http_method":"GET","collections_id":"b93d2204cea54a43a826be33f4743956","collection_version_id":"c3eda33e85024b338503fe7c14c00f8b","publish_name":"","method_name":"/pets","OperationHeaders":null,"OperationInputs":null,"OperationOutputs":null,"operation_Authorizations":null,"operation_queryparamaeters":null,"PassThroughPayload":null,"PassThroughHeaders":null,"endpoint_status":"SHADOW","private_or_public":null,"full_url":"https://m87de4m3te.execute-api.ap-south-1.amazonaws.com/dev/pets","stage_id":"f7b1fb33c2c5439da7d5f47982f0328a","base_path":"/dev/pets","intent":null,"sector":null,"orphan_status":null,"sys_id":null,"input_type":"null","raw_payload":"","raw_output":"","location":"ap-south-1","location_type":"REGIONAL","tenant_id":"3f4ae55ce20f4d28a2588baec949e25f","project_id":"cc9e3e5fd3884c04a0881500bc268c3c"}',
    old_json: "",
    created_at: "2025-02-12T07:00:04Z",
    created_by: "stokes@yopmail.com",
  },
];

const JsonComparisonList = (props: any) => {
  const { openDrawer, setOpenDrawer, backgroundDetails } = props;
  const { changeHistoryBackground } = useSelector<
    RootStateType,
    endpointReducer
  >((state) => state.apiManagement.endpoint);
  const [data] = useState(initialData);
  const [selectedJson, setSelectedJson] = useState<any>(null);
  const [newJson, setNewJson] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleItemClick = (item: any) => {
    setSelectedJson(item);
    setNewJson(getUpdatedJson(item));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "rgba(18, 18, 18, 0.5)",
            width: "400px",
            color: "white",
            padding: "10px",
            fontFamily: "FiraSans-Regular",
          },
        }}
      >
        <Typography variant="h5" gutterBottom>
          History
        </Typography>
        <List>
          {changeHistoryBackground?.map((item: any) => (
            <ListItem
              component="div"
              key={item?.changes_tracking_id}
              onClick={() => handleItemClick(JSON.parse(item?.new_json))}
            >
              <Info style={{ marginRight: "5px" }} />
              <ListItemText
                sx={{
                  color: "white",
                }}
                primary={item.change_type}
                secondary={`Created At: ${new Date(
                  item?.createdAt
                ).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>JSON Comparison</DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2}>
            {/* Left Column - Old JSON */}
            <Grid2 size={6}>
              <Typography variant="h6">Original JSON</Typography>
              <pre
                style={{
                  background: "#f4f4f4",
                  padding: "10px",
                  borderRadius: "5px",
                  overflowX: "auto",
                }}
              >
                {selectedJson && JSON.stringify(selectedJson, null, 2)}
              </pre>
            </Grid2>

            {/* Right Column - Updated JSON */}
            <Grid2 size={6}>
              <Typography variant="h6">Updated JSON</Typography>
              <pre
                style={{
                  background: "#e8f5e9",
                  padding: "10px",
                  borderRadius: "5px",
                  overflowX: "auto",
                }}
              >
                {backgroundDetails &&
                  JSON.stringify(backgroundDetails, null, 2)}
              </pre>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <GButton
            buttonType="secondary"
            label="Close"
            marginRight="10px"
            background="transparent"
            padding="5px 20px"
            fontSize="12px"
            radius="10px"
            onClickHandler={handleClose}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JsonComparisonList;
