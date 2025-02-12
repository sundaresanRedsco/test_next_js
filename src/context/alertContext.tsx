import React, { createContext, useContext, useState } from "react";
import GlobalAlert from "../app/apiflow_components/global/GlobalAlert";

interface AlertContextType {
  showAlert: (
    type: "Error" | "Success",
    name: string,
    message: string,
    subClickText: string,

    onCloseClick?: () => void,
    onClickHandler?: () => void
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<{
    visible: boolean;
    type: "Error" | "Success";
    name: string;
    message: string;
    subClickText: string;
    onClickHandler?: () => void;
    onCloseClick?: () => void;
  }>({
    visible: false,
    type: "Success",
    name: "",
    subClickText: "",
    message: "",
  });

  const showAlert = (
    type: "Error" | "Success",
    name: string,
    message: string,
    subClickText: string,
    onCloseClick?: () => void,
    onClickHandler?: () => void
  ) => {
    setAlert({
      visible: true,
      type,
      name,
      message,
      subClickText,
      onClickHandler,
      onCloseClick,
    });
  };

  const handleClose = () => {
    setAlert({ ...alert, visible: false });
    if (alert.onCloseClick) alert.onCloseClick();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.visible && (
        <GlobalAlert
          name={alert.name}
          AlertText={alert.message}
          subClickText={alert.subClickText}
          type={alert.type}
          onClickHandler={alert.onClickHandler}
          onCloseClick={handleClose}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
