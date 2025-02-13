import React from "react";
import { Button, Typography } from "@mui/material";
import theme from "../../../Theme/theme";
import { PrimaryTypography } from "../../Styles/signInUp";
import GButton from "../global/GlobalButtons";

function DesignerImportPopup(props: any) {
  const {
    PopupOpen,
    PopupClose,
    fileChange,
    fileData,
    dataImport,
    errorBoole,
    dataSave,
  } = props;

  if (!PopupOpen) return null;

  return (
    <div>
      {/* Overlay: Adjust zIndex to ensure it is behind the modal but above other content */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 999,
          pointerEvents: "none", // Disable interaction with the overlay
        }}
      />

      {/* Modal Content */}
      <div
        style={{
          position: "fixed",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: "450px",
          backgroundColor: "white",
          padding: "1rem 1.5rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "0.8rem",
              marginBottom: "2rem",
            }}
          >
            Import Json File
          </Typography>
          <h1
            style={{ fontSize: "0.8rem", cursor: "pointer" }}
            onClick={PopupClose}
          >
            X
          </h1>
        </div>
        <div>
          <PrimaryTypography
            style={{
              fontWeight: "600",
              fontSize: "0.6rem",
              marginTop: "1rem",
            }}
          >
            Select JsonFile
          </PrimaryTypography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Button
                component="span"
                variant="outlined"
                style={{
                  textTransform: "none",
                  marginTop: "0.8rem",
                  width: "150px",
                  color: `${theme.palette.secondaryColor.main}`,
                  backgroundColor: "transparent",
                  border: `1.5px solid ${theme.palette.secondaryColor.main}`,
                }}
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                Select File
              </Button>
              <br />
              <input
                type="file"
                accept=".json"
                id="fileInput"
                style={{ display: "none" }}
                onChange={fileChange}
              />
              {fileData && <p>Selected file: {fileData}</p>}
            </div>
            <div>
              <GButton
                buttonType="primary"
                label={`Imports`}
                onClickHandler={dataImport}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "1rem ",
            }}
          >
            <div>
              <GButton
                buttonType="secondary"
                // disabled={errorBoole}
                label={`Cancel`}
                onClickHandler={PopupClose}
                dataTest="save-project-btn"
              />
            </div>
            <div
              style={{
                filter: errorBoole ? "blur(1px)" : "",
                marginLeft: "1rem",
              }}
            >
              <GButton
                buttonType="primary"
                disabled={errorBoole}
                label={`Save`}
                onClickHandler={dataSave}
                dataTest="save-project-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignerImportPopup;
