import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { FormControl } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const StyledApiCallFormControl = styled(FormControl)`
  margin: 0rem;
`;

const TextContainer = styled("div")`
  display: flex;
`;

const LineNumbers = styled("div")`
  font-size: 0.8rem;
  width: 45px;
  color: ${({ theme }) => theme.palette.mainWhite.main};

  padding: 15px;
  border-radius: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TextOutlinedInput = styled(TextareaAutosize)`
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 15px;
  border-radius: 0px 12px 12px 0px;
  background: transparent;
  color: ${({ theme }) => theme.palette.mainWhite.main};

  svg {
    width: 1rem;
    height: 1rem;
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.secondaryColor.main};
    opacity: 1; /* Ensure placeholder text is fully visible */
  }
`;

export default function TextBody(props: any) {
  const { placeholder, width, minRows, defaultValue, onChange } = props;

  const [text, setText] = useState(defaultValue);

  const [lineNumbersContent, setLineNumbersContent] = useState<any>([]);

  const handleChange = (event: any) => {
    setText(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const lines = text.split("\n");
  const numLines = Math.max(lines.length, minRows);

  useEffect(() => {
    const newLineNumbersContent = Array.from(
      { length: numLines },
      (_, index) => <div key={index}>{index + 1}</div>,
    );

    setLineNumbersContent(newLineNumbersContent);
  }, [text, minRows]);

  return (
    <div>
      <StyledApiCallFormControl>
        <TextContainer>
          <LineNumbers>{lineNumbersContent}</LineNumbers>
          <TextOutlinedInput
            style={{ width: width }}
            placeholder={placeholder}
            value={text}
            defaultValue={defaultValue}
            onChange={handleChange}
            minRows={minRows}
          />
        </TextContainer>
      </StyledApiCallFormControl>
    </div>
  );
}
