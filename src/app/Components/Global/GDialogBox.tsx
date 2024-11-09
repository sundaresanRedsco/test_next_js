import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import theme from "../../../Theme/theme";
import CloseIcon from "@mui/icons-material/Close";

export default function GDialogBox(props: any) {
  const {
    openVal,
    dialogContentText,
    confirmVal,
    cancelVal,
    onClickConfirmHandler,
    onClickCancelHandler,
    textFieldVisibleVal,
    textFieldLabel,
    textFieldvalue,
    textFieldHandler,
    dialogTitleText,
    variant,
    fullWidth,
    width,
    height,
    size,
    error,
    startAdornment,
    endAdornment,
    endIcon,
    confirmBtnColor,
    noCloseIcon,
  } = props;

  const [open, setOpen] = React.useState(openVal);
  const [textFieldVisible, setTextFieldVisbile] = useState(textFieldVisibleVal);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={openVal}
        onClose={onClickCancelHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        PaperProps={{
          style: {
            background: "#121212", // Set background color
            borderRadius: '10px', // Set border-radius
            // boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow
            // boxShadow: "0px 4px 8px #FFFFFF1A", // Add box shadow
            boxShadow: "10px 4px 15px 0px #FFFFFF1A", // Add box shadow
            color: "#FFFFFF",
            backdropFilter: "blur(10px)",
            padding:"10px"
          },
        }}
        BackdropProps={{
          style: {
            backdropFilter: "blur(5px)", // Apply blur to the content outside of the dialog
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            fontFamily: "FiraSans-Bold",
            fontSize: "16px",
            fontWeight: 800,
            color: "#FFFFFF",
          }}
        >
          {dialogTitleText || "Confirm the Action"}
          {noCloseIcon !== true && (
            <CloseIcon
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#FFFFFF",
                fontFamily: "FiraSans-Regular",
              }}
              onClick={onClickCancelHandler}
            />
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              fontFamily: "FiraSans-Regular",
              fontSize: "0.8rem",
              color: "#FFFFFF",
            }}
          >
            {dialogContentText}
          </DialogContentText>
          {textFieldVisible === true && (
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={textFieldLabel}
                type="text"
                fullWidth={fullWidth || true}
                variant={variant || "standard"}
                onChange={textFieldHandler}
                value={textFieldvalue || ""}
                style={{
                  width: width,
                  height: height,
                }}
                size={size || "small"}
                error={error ? true : false}
                onInput={() => error && props.errorHandler("")}
                InputProps={{
                  startAdornment: startAdornment,
                  endAdornment: endAdornment ? (
                    endAdornment
                  ) : (
                    <InputAdornment position="end">{endIcon}</InputAdornment>
                  ),
                }}
              />
              {error && <FormHelperText error>{error}</FormHelperText>}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {cancelVal?.trim() !== "" && (
            <Button
              style={{
                // background: `${theme.palette.LGrayishBlue.main}`,
                border: "1px solid #F3F3F340",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
                padding: "5px 12px",
                fontFamily: "FiraSans-Regular",
                textTransform: "none",
                fontSize: "14px",
                color: "#FFFFFF",
              }}
              onClick={onClickCancelHandler}
            >
              {cancelVal}
            </Button>
          )}
          <Button
            style={{
              // background: "#DB424D",
              background: confirmBtnColor ? confirmBtnColor : `#7A43FE`,
              color: `${theme.palette.mainWhite.main}`,
              padding: "5px 12px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
              fontFamily: "FiraSans-Regular",
              textTransform: "none",
              fontSize: "14px",
            }}
            onClick={onClickConfirmHandler}
            autoFocus
          >
            {confirmVal}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
