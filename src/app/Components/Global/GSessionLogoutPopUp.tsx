import React, { useEffect, useState } from "react";
import GDialogBox from "./GDialogBox";
import { useNavigate } from "react-router-dom";
import { SIGNINUP_PATH } from "../../Utilities/pathConstants";
import { logout } from "../../Services/auth";
import { useDispatch } from "react-redux";

export default function GSessionLogoutPopUp(props: any) {
  const { dialogBoxVal } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [dialogBoxVisible, setDeleteDialogBoxVisible] = useState(false);

  const handleFunctions = () => {
    localStorage.clear();
    window?.location?.reload();
    setDeleteDialogBoxVisible(false);
    dispatch(logout());
    navigate(SIGNINUP_PATH);
  };

  useEffect(() => {
    setDeleteDialogBoxVisible(dialogBoxVal);
  }, [dialogBoxVal]);

  return (
    <div>
      <GDialogBox
        openVal={dialogBoxVisible}
        noCloseIcon={false}
        dialogTitleText={"Session Expired."}
        dialogContentText={`Your session expired. Login to continue.`}
        cancelVal={""}
        confirmVal={"Back to Login"}
        onClickConfirmHandler={handleFunctions}
        // onClickCancelHandler={handleFunctions}
      />
    </div>
  );
}
