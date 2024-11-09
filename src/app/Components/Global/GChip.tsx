import { styled } from "@mui/system";
import Chip from "@mui/material/Chip";
import theme from "../../../Theme/theme";

// Create a styled component for the Chip component
const StyledChip = styled(Chip)`
  color: ${theme.palette.primaryBlack.main};
  font-family: Inter-Regular;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0px 10px;
`;

export default function GChip(props: any) {
  const { type, label, color, background, icon, handleDelete } = props;

  return (
    <StyledChip
      label={label}
      icon={icon}
      onDelete={handleDelete}
      sx={{
        background:
          type === "primary" ? "#6B21A8" : background ? background : "",
        color: color,
        borderRadius: type === "primary" ? "6px" : "",
        "& svg": {
          fill: type === "primary" ? "#6B7280" : "",
          width: "0.7rem",
          height: "0.7rem",
        },
      }}
    />
  );
}
