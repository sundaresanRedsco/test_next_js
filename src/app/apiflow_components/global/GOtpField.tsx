import { Box, FormHelperText, Stack } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import React from "react";

type Props = {
  value: string;
  onChange: (value: any) => void;
  errMsg?: string;
};

export default function GOtpField({ value, onChange, errMsg }: Props) {
  return (
    <Stack gap={1}>
      <MuiOtpInput
        display="flex"
        gap={1}
        TextFieldsProps={{
          type: "tel",
          inputMode: "numeric",
        }}
        length={6}
        value={value}
        onChange={onChange}
        sx={{
          '& input[type="tel"]': {
            background: "#31244F80",
            color: "white",
            border: "none",
            boxShadow: "0 0 0 1.3px #F3F3F340",
            textAlign: "center",
            borderRadius: "5px",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />
      {errMsg && (
        <FormHelperText
          sx={{
            fontSize: "10px",
            margin: "0px",
            fontFamily: "Firasans-regular",
            color: "#d32f2f",
          }}
        >
          {errMsg}
        </FormHelperText>
      )}
    </Stack>
  );
}
