import { Divider } from "@mui/material";

interface GDividerProps {
  color?: string;
  margin?: string;
}

const GDivider = (props: any) => {
  const { color, margin } = props;

  return (
    <div>
      <Divider
        sx={{
          color: color || "#EEEEEE",
          margin: margin || "10px 0px",
          fontWeight: 600,
        }}
      />
    </div>
  );
};

export default GDivider;
