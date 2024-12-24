export const isPointInBox = (
  point: { x: number; y: number },
  box: { x: number; y: number; height: number; width: number }
) => {
  return (
    point.x > box.x &&
    point.x <= box.x + box.width &&
    point.y > box.y &&
    point.y <= box.y + box.height
  );
};
