import { useEffect } from "react";

import { ReactNode } from "react";

const GlobalContextMenu = ({
  x,
  y,
  onCloseContextMenu,
  parentRef,
  children,
}: {
  x: number;
  y: number;
  onCloseContextMenu: () => void;
  parentRef: React.RefObject<HTMLElement>;
  children: ReactNode;
}) => {
  const menuStyle: React.CSSProperties = {
    position: "absolute",
    top: `${y}px`,
    left: `${x}px`,
    zIndex: 9999,
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  useEffect(() => {
    const clickListener = (event: MouseEvent) => {
      const menuParent = parentRef?.current;
      if (!menuParent || !menuParent.contains(event.target as Node)) {
        onCloseContextMenu();
      }
    };

    document.addEventListener("mousedown", clickListener);

    return () => {
      document.removeEventListener("mousedown", clickListener);
    };
  }, [onCloseContextMenu, parentRef]);

  return <div style={menuStyle}>{children}</div>;
};

export default GlobalContextMenu;
