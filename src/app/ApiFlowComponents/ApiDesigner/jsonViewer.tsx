import React, { useState } from "react";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { SecondaryTypography } from "../../Styles/signInUp";
import theme from "../../../Theme/theme";

const CollapsibleSection = ({ title, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          // margin: "5px 0",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SecondaryTypography
          style={{
            margin: "5px",
            color: `#FFFFFF`,
            fontWeight: 900,
            fontSize:'12px'
          }}
        >
          {isOpen ? (
            <KeyboardArrowUpOutlinedIcon style={{ fontSize: "15px" }} />
          ) : (
            <KeyboardArrowDownOutlinedIcon style={{ fontSize: "15px" }} />
          )}
          {title}
        </SecondaryTypography>
      </div>
      {isOpen && <div style={{ paddingLeft: "10px" }}>{children}</div>}
    </div>
  );
};

const JsonViewer = ({ data }: any) => {
  const renderValue = (key: any, value: any) => {
    if (Array.isArray(value)) {
      return (
        <CollapsibleSection key={key} title={key}>
          {value.map((item, index) => (
            <div key={index} style={{ marginLeft: "10px" }}>
              {typeof item === "object" && item !== null ? (
                <CollapsibleSection title={`Item ${index + 1}`}>
                  <JsonViewer data={item} />
                </CollapsibleSection>
              ) : (
                <SecondaryTypography style={{ color:"#FFFFFF"}}>
                  {JSON.stringify(item)}
                </SecondaryTypography>
              )}
            </div>
          ))}
        </CollapsibleSection>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <CollapsibleSection key={key} title={key}>
          <JsonViewer data={value} />
        </CollapsibleSection>
      );
    }
    return (
      <div key={key} style={{ marginLeft: "10px", display: "flex" }}>
        <SecondaryTypography
          style={{
            marginRight: "10px",
            color: `#FFFFFF`,
          }}
        >
          {`${key}: `}
        </SecondaryTypography>
        <SecondaryTypography
          style={{
            color: `#FFFFFF`,
          }}
        >
          {` ${JSON.stringify(value)}`}
        </SecondaryTypography>
      </div>
    );
  };

  return (
    <div>
      {Object?.entries(data).map(([key, value]) => renderValue(key, value))}
    </div>
  );
};

export default JsonViewer;
