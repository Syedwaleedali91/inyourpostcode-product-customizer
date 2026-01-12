import { Design, useEditorStore } from "@/store/EditorStore";
import { Image, Text } from "react-konva";
import { useRef } from "react";


export function DesignNode({ design }: { design: Design }) {
  const nodeRef = useRef<any>(null);

  const updateDesign = useEditorStore((s) => s.updateDesign);
  const setActiveDesign = useEditorStore((s) => s.setActiveDesign);
  const activeDesignState = useEditorStore((s) => s.currentState);
  const saveHistory = useEditorStore((s) => s.saveHistory);

  const commonProps = {
    id: design.id,
    ref: nodeRef,
    x: design.x,
    y: design.y,
    scaleX: design.scaleX,
    scaleY: design.scaleY,
    rotation: design.rotation,
    draggable: !design?.locked,
    onClick: () => (design?.locked ? {} : setActiveDesign(design.id)),
    onTap: () => (design?.locked ? {} : setActiveDesign(design.id)),

    onDragEnd: (e: any) => {
      const updatedDesign = {
        x: e.target.x(),
        y: e.target.y(),
      };
      updateDesign(design.id, updatedDesign);
      saveHistory({ ...activeDesignState, ...updatedDesign });

    },

    onTransformEnd: (e: any) => {
      const node = e.target;
      const updatedDesign = {
        x: node.x(),
        y: node.y(),
        scaleX: node.scaleX(),
        scaleY: node.scaleY(),
        rotation: node.rotation(),
      }
      updateDesign(design.id, updatedDesign);
      saveHistory({ ...activeDesignState, ...updatedDesign });
    },
  };

  if (design.type === "image") {
    return <Image image={design.image} {...commonProps} />;
  }

  if (design.type === "text") {
    return (
      <Text
        {...commonProps}
        text={design.text}
        fontSize={design.fontSize}
        fontFamily={design.fontFamily}
        fontStyle={String(design.fontWeight)}
        fill={design.color}
        onDblClick={(e) => {
          const textNode = e.target;
          const stage = textNode.getStage();
          const position = textNode.absolutePosition();
          const stageBox = stage?.container().getBoundingClientRect();

          const textarea = document.createElement("textarea");
          document.body.appendChild(textarea);

          textarea.value = design.text;
          textarea.style.position = "absolute";
          if (stageBox) {
            textarea.style.top = `${stageBox.top + position.y}px`;
            textarea.style.left = `${stageBox.left + position.x}px`;
          }

          textarea.style.fontSize = `${design.fontSize}px`;
          textarea.style.fontFamily = design.fontFamily;
          textarea.style.transform = `rotate(${design.rotation}deg)`;
          textarea.style.border = "1px solid #3b82f6";
          textarea.style.padding = "4px";
          textarea.style.background = "white";
          textarea.style.outline = "none";
          textarea.style.zIndex = "9999";

          textarea.focus();

          textarea.onblur = () => {
            updateDesign(design.id, { text: textarea.value });
            document.body.removeChild(textarea);
          };
        }}
      />
    );
  }

  return null;
}
