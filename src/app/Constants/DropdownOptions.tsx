import { translate } from "../Helpers/helpersFunctions";
import {
  AwsWhite,
  AzureSignUp,
  GCPSignUp,
  SwaggerSignUp,
} from "@/app/Assests/icons";

export const gatewayList = [
  {
    name: `${translate("gatewayList.AWS")}`,
    label: `${translate("gatewayList.AWS")}`,
    icon: <AwsWhite height={"40px"} />,
    clickable: "AWS",
  },
  {
    name: `${translate("gatewayList.AZURE")}`,
    label: `${translate("gatewayList.AZURE")}`,
    icon: <AzureSignUp height={"40px"} />,
    clickable: "AZURE",
  },
  {
    name: `${translate("gatewayList.GCP")}`,
    label: `${translate("gatewayList.GCP")}`,
    icon: <GCPSignUp height={"40px"} />,
    clickable: "GCP",
  },

  {
    name: `${translate("gatewayList.SWAGGER_NAME")}`,
    label: `${translate("gatewayList.SWAGGER")}`,
    icon: <SwaggerSignUp height={"40px"} />,
    clickable: "SWAGGER",
  },

  // {
  //   name: "HTTP, RESTful, SOAP and WSDL",
  //   label: "HTTP",
  //   icon: <RestAPISignUp height={"40px"} />,
  //   clickable: "HTTP",
  // },
  // {
  //   name: "API Discovery via traffic monitoring",
  //   label: "Load Balancer",
  //   icon: <LoadBalancerSignUp height={"40px"} />,
  //   clickable: "APISIX",
  // },
];

export const timesData = [
  { id: 0, name: "5 mins" },
  { id: 1, name: "10 mins" },
  { id: 2, name: "15 mins" },
  { id: 3, name: "20 mins" },
];
export const awsRegions = [
  { id: 1, region: "us-east-1" },
  { id: 2, region: "us-east-2" },
  { id: 3, region: "us-west-1" },
  { id: 4, region: "us-west-2" },
  { id: 5, region: "ca-central-1" },
  { id: 6, region: "sa-east-1" },
  { id: 7, region: "eu-west-1" },
  { id: 8, region: "eu-west-2" },
  { id: 9, region: "eu-central-1" },
  { id: 10, region: "eu-west-3" },
  { id: 11, region: "eu-north-1" },
  { id: 12, region: "ap-south-1" },
  { id: 13, region: "ap-southeast-1" },
  { id: 14, region: "ap-southeast-2" },
  { id: 15, region: "ap-northeast-1" },
  { id: 16, region: "ap-northeast-2" },
  { id: 17, region: "ap-northeast-3" },
  { id: 18, region: "ap-east-1" },
  { id: 19, region: "me-south-1" },
  { id: 20, region: "af-south-1" },
];
