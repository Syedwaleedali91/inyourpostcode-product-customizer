import { Group, Rect, Text } from "react-konva";


export function DeleteButton({
  x,
  y,
  onClick,
}: {
  x: number;
  y: number;
  onClick: () => void;
}) {
  return (
    <Group x={x} y={y} onClick={onClick}>
      <Rect
        id="delete-button-rect"
        width={20}
        height={20}
        fill="#008000"
        cornerRadius={4}
        shadowBlur={4}
      />
      <Text
        id="delete-button-text"
        text="✕"
        fontSize={14}
        fill="white"
        align="center"
        verticalAlign="middle"
        width={20}
        height={20}
      />
    </Group>
  );
}
