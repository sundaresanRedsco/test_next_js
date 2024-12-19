import { memo } from "react";
import { Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";

const ResizableFrame = ({ data }: any) => {
  return (
    <>
      <NodeResizer minWidth={500} minHeight={500} />

      <div style={{ padding: 10 }}>{data.label}</div>
    </>
  );
};

export default memo(ResizableFrame);
