"use client";
import { useSignUpStore } from "@/store/useSignUpStore";
import React, { useState } from "react";
// import GPopup from "@/app/apiflow_components/global/GPopup";

export default function useGPopup() {
  const { open, setopen, handleOpen, message } = useSignUpStore();
  const handleClose = () => {
    setopen(false);
  };

  const PopUpComponent = ({
    width,
    height,
  }: {
    width?: string;
    height?: string;
  }) => {
    return (
      //   <GPopup
      //     height={height}
      //     width={width}
      //     isOpen={open}
      //     handleClose={handleClose}
      //     message={message}
      //   />
      <></>
    );
  };
  return { PopUpComponent, handleClose, handleOpen, open };
}
