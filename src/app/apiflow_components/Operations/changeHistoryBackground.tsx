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

const getUpdatedJson = (item: any) => ({
  ...item,
  value: item.value + " (updated)",
});

const JsonComparisonList = (props: any) => {
  const { openDrawer, setOpenDrawer, backgroundDetails } = props;
  const { changeHistoryBackground } = useSelector<
    RootStateType,
    endpointReducer
  >((state) => state.apiManagement.endpoint);

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
                  "& .MuiTypography-body1": { color: "white" }, // Primary text color
                  "& .MuiTypography-body2": { color: "lightgray" }, // Secondary text color
                }}
                secondary={`Created At: ${new Date(
                  item?.created_at
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
