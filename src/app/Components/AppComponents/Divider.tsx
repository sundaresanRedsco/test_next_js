import React from "react";

export default function Divider(props: any) {
  const { borderColor, width } = props;
  const [componentProperties, setComponentProperties] = React.useState({
    componentId: "Divider",
    type: "Divider",
    id: "",
    properties: {
      style: {
        dividerStyle: {
          border: "1px solid ",
          borderColor: borderColor || "",
          margin: "10px 0",
          width: width || "100%", // Add width here
          height: "2px", // Add height here
          // Add more styling properties as needed
        },
      },
      action: {},
    },
  });

  return (
    <div
      style={{
        ...componentProperties.properties.style.dividerStyle,
      }}
    ></div>
  );
}
