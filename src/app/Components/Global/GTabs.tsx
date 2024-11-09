import * as React from "react";
import { styled } from "@mui/system";
import theme from "../../../Theme/theme";

const TabsContainer = styled("div")({
  display: "flex",
  overflow: "hidden",
});

const TabButton = styled("button")(({ theme }) => ({
  border: "none",
  backgroundColor: "transparent",
  color: theme.palette.teritiaryColor.main,
  textTransform: "capitalize",
  fontSize: "0.8rem",
  cursor: "pointer",
  borderBottom: "2px solid transparent",
  marginRight: "5px",
}));

const ActiveTabButton = styled(TabButton)(({ theme }) => ({
  backgroundColor: theme.palette.mainWhite.main,
  color: theme.palette.mainWhite.main,
  borderBottom: `2px solid ${theme.palette.mainWhite.main}`,
}));

export default function GTabs(props: any) {
  const { tabsList } = props;
  const [value, setValue] = React.useState(tabsList[0].id);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <TabsContainer className="mx-3">
      {tabsList.map((tab: any, index: number) => (
        <TabButton
          key={tab.id}
          sx={
            value === tab.id
              ? {
                  color: theme.palette.mainWhite.main,
                  borderBottom: "2px solid ",
                  borderColor: theme.palette.mainWhite.main,
                }
              : {}
          }
          onClick={() => handleChange(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabsContainer>
  );
}
