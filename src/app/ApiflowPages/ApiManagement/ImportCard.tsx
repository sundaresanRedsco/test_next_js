import { Box } from "@mui/material";
import { styled } from "@mui/system";
import GlobalHeader from "../../ApiFlowComponents/Global/GlobalHeader";
import GlobalCard from "../../ApiFlowComponents/Global/GlobalCard";
import { setAddTabs } from "../../Redux/tabReducer";
import { useDispatch } from "react-redux";

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.V2SectionBackgroundColor.main};
  // padding: 10px 25px;
`;

function ImportCardPage(props: any) {
  const { id, onCloseHandler } = props;
  const dispatch = useDispatch<any>();

  const CardList = [
    {
      buttonText: "Add / Import API End points",
      name: "Add / Import API End points",
      subtext: "Add/Import Api endpoints",
      subPoints1: "Import from Postman or Swagger",
      subPoints2: "Import Directly from AWS,Azure,GCP",
      subPoints3: "Add & test manually Endpoints Add & test manually Endpoints",
      onClick: () => {
        dispatch(setAddTabs("import_Environment"));
      },
    },
    {
      name: "Try API Flow Sample Data Set",
      buttonText: "Explore API Flow",
      subtext: "Try our API collection sample projects",
      subPoints1: "",
      subPoints2: "",
      subPoints3: "",
      onClick: () => {},
    },
    {
      name: "API Flow Basics",
      buttonText: "Explore API Flow",
      subtext: "Intro to API Flow",
      subPoints1: "What is API Flow ?",
      subPoints2: "How to define Data flow ?",
      subPoints3: "How to discover security risks ?",
      onClick: () => {},
    },
    {
      name: "Integrations",
      buttonText: "Configure Now",
      subtext: "Configure integrated plugins",
      subPoints1: "Add GCP ,Azure, AWS gateways ?",
      subPoints2: "Add SEIM Tools ?",
      subPoints3: "Add Tickets Support Systems ?",
      onClick: () => {},
    },
  ];

  return (
    <div>
      <GlobalHeader id={id} onCloseHandler={onCloseHandler} />
      <CardContainer
        style={{
          padding: "10px 0px",
        }}
      >
        <GlobalCard CardList={CardList} />
      </CardContainer>
    </div>
  );
}

export default ImportCardPage;
