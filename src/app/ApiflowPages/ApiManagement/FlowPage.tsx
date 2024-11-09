import { useEffect, useState } from "react";
import GlobalHeader from "../../ApiFlowComponents/Global/GlobalHeader";
import { useDispatch, useSelector } from "react-redux";
import { GetApiDesignFlowByDesignFlowId } from "../../Redux/apiManagement/flowReducer";
import { Box, styled } from "@mui/material";
import FlowDesigner from "./FlowDesigner";
import { RootStateType } from "@/app/Redux/store";
import { CommonReducer } from "@/app/Redux/commonReducer";
import { setCookies } from "@/app/Helpers/helpersFunctions";

const CardContainer = styled(Box)`
  background: ${({ theme }) => theme.palette.V2SectionBackgroundColor.main};
`;

export default function FlowPage(props: any) {
  const { id, onCloseHandler } = props;
  const [flowInfo, setFlowInfo] = useState<any>({});
  const dispatch = useDispatch<any>();

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );

  function getPartAfterUnderscore(str: string) {
    // Find the index of the first underscore
    const index = str.indexOf("_");

    // Check if the underscore is found
    if (index !== -1) {
      // Return the part after the first underscore
      return str.slice(index + 1);
    } else {
      // Return an empty string if no underscore is found
      return "";
    }
  }
  const flowID = getPartAfterUnderscore(id);

  // Example usage

  useEffect(() => {
    if (flowID) {
      dispatch(GetApiDesignFlowByDesignFlowId(flowID))
        .unwrap()
        .then((res: any) => {
          setFlowInfo(res);
          setCookies(
            process.env.NEXT_PUBLIC_COOKIE_FLOWID ?? "",
            res.id,
            userProfile?.user?.expiration_time
          );
        })
        .catch((err: any) => {});
    }
  }, [flowID]);

  return (
    <>
      <GlobalHeader
        id={id}
        onCloseHandler={onCloseHandler}
        label={flowInfo?.name}
      />
      <CardContainer>
        <FlowDesigner apiFlow_Id={flowID} />
      </CardContainer>
    </>
  );
}
