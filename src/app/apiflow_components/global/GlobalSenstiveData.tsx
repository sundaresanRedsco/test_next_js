// GlobalSensitiveData.tsx
import React from "react";

interface GlobalSensitiveDataProps {
  jsonData: string;
}

const sensitiveKeywords: { [key: string]: string } = {
  password: "Password",
  secret: "Secret",
  token: "Token",
  key: "Key",
  api_key: "API Key",
  email: "Email",
  mail: "Email",
  ssn: "Social Security Number",
  "social security": "Social Security Number",
  "driver’s license": "Driver's License",
  passport: "Passport",
  "bank account": "Bank Account",
  "credit card": "Credit Card",
  "debit card": "Debit Card",
  taxpayer: "Taxpayer Information",
  employment: "Employment Information",
  username: "Username",
  address: "Address",
  biometric: "Biometric Information",
};

const GlobalSensitiveData: React.FC<GlobalSensitiveDataProps> = ({
  jsonData,
}) => {
  const highlightSensitiveData = (text: string): JSX.Element[] => {
    const regex = new RegExp(
      `(${Object.keys(sensitiveKeywords).join("|")})`,
      "gi"
    );

    return text.split(regex).map((part, index) => {
      const isSensitive = Object.keys(sensitiveKeywords).some(
        (keyword) => keyword.toLowerCase() === part.toLowerCase()
      );

      
      return (
        <span
          key={index}
          style={{
            backgroundColor: isSensitive ? "#E50001" : "transparent",
            fontFamily: "Inter-Regular",
            fontWeight: isSensitive ? "" : "normal",
            padding: "2px",
            borderRadius: "4px",
            fontSize: "9px",
          }}
        >
          {part}
        </span>
      );
    });
  };

  return <p style={{ fontSize: "11px" }}>{highlightSensitiveData(jsonData)}</p>;
};

export default GlobalSensitiveData;
