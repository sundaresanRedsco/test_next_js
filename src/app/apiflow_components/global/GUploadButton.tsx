import GButton from "@/app/Components/Global/GlobalButtons";
import { SecondarySignInUPTypography } from "@/app/Styles/signInUp";
import { Close, FileUpload } from "@mui/icons-material";
import { Box, FormHelperText, IconButton, Stack } from "@mui/material";
import React, { useRef, useState } from "react";

type Props = { label?: string; fileHandler: any; helperText?: string };

export default function GUploadButton({
  label,
  fileHandler,
  helperText,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setfile] = useState<any>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      fileHandler(files[0]);
      setfile(files[0]);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleClearFile = () => {
    setfile(null);
  };
  return (
    <Stack>
      {file ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            border: "1.5px solid gray",
            borderRadius: "10px",
          }}
        >
          <SecondarySignInUPTypography
            sx={{
              color: "gray",
            }}
          >
            {file?.name}
          </SecondarySignInUPTypography>
          <IconButton
            onClick={handleClearFile}
            size="small"
            sx={{ color: "red" }}
          >
            <Close />
          </IconButton>
        </Box>
      ) : (
        <GButton
          label={label || "Select File"}
          background="#F3F3F31A"
          margin="0"
          padding="10px"
          color="white"
          type="button"
          icon={<FileUpload />}
          iconPosition="start"
          onClickHandler={handleButtonClick}
        />
      )}
      {helperText && (
        <FormHelperText
          sx={{
            fontSize: "10px",
            margin: "0px",
            fontFamily: "Firasans-regular",
            color: "#d32f2f",
          }}
        >
          {helperText}
        </FormHelperText>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Stack>
  );
}
