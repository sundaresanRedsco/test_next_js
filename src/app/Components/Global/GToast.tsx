import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { InfoIcon } from "../../Assests/icons";

const InfoTypography = styled(Typography)`
  color: #7f1d1d;
  font-family: Inter-Regular;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 10px;
`;

export default function GToast(props: any) {
  const { alertText } = props;

  return (
    <section className="GToast">
      <Box
        sx={{
          padding: "8px",
          margin: "10px 0px",
          border: " 1px solid #F87171",
          background: "#FEF2F2",
          borderRadius: "5px",
        }}
      >
        <InfoTypography>
          <InfoIcon
            style={{ width: "0.8rem", height: "0.8rem", marginRight: "5px" }}
          />
          {alertText
            ? alertText
            : "2 published projects are changed and wait for re-publishing"}
        </InfoTypography>
      </Box>
    </section>
  );
}
