import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../Redux/store";
import { CommonReducer, updateUserProfile } from "../Redux/commonReducer";
import { signIn } from "next-auth/react";

export default function useSessionUpdate() {
  const dispatch = useDispatch<any>();

  const { userProfile } = useSelector<RootStateType, CommonReducer>(
    (state) => state.common
  );
  const handleUpdateSessionData = async (newData: any) => {
    const res = await fetch("/api/auth/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const data = await res.json();

    if (data) {
      const updatedUser: any = {
        ...userProfile,
        user: { ...userProfile?.user, ...newData },
      };
      dispatch(updateUserProfile(updatedUser));
      await signIn("credentials", {
        user: JSON.stringify(data.user),
        redirect: false,
      });
      window.location.reload();
    }
  };
  return { handleUpdateSessionData };
}
