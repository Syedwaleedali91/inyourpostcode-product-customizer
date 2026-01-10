import { Layer, Rect, Stage, Transformer, Image } from "react-konva";
import { useEffect, useMemo, useRef, useState } from "react";
import useImage from "use-image";

import { useEditorStore } from "../../store/EditorStore";
import { DesignNode, DeleteButton } from "../index";
import group7Image from "../../assets/Group 7.png";
import { PRINT_AREA_RATIO } from "../../lib/utils";


const deleteButtonOffset = 10;

export const ShirtCanvas = ({
  frontShirt,
  backShirt,
  shirtLeft,
  shirtRight,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const transformerRef = useRef(null);
  const [deletePos, setDeletePos] = useState(null);

  const {
    activeSide,
    designs,
    activeDesignId,
    setStageSize,
    stageSize,
    shirtSize,
    setShirtSize,
    scale,
    setScale,
    setPrintArea,
    printArea,
    removeDesign,
    setStageRef,
  } = useEditorStore();

  const [shirtImage] = useImage(
    activeSide === "front"
      ? frontShirt
      : activeSide === "back"
      ? backShirt
      : activeSide === "left"
      ? shirtLeft
      : shirtRight
  );

  const selectedLayer = useMemo(
    () => (designs[activeSide] || []).find((d) => d.id === activeDesignId),
    [activeDesignId, activeSide, designs]
  );

  useEffect(() => {
    if (!transformerRef.current) return;

    const stage = transformerRef.current.getStage();
    if (!stage) return;

    const selectedNode = stage.findOne(`#${activeDesignId}`);
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer()?.batchDraw();

      const box = selectedNode.getClientRect({ skipTransform: false });

      setDeletePos({
        x: box.x + box.width + deleteButtonOffset,
        y: box.y - deleteButtonOffset,
      });
    } else {
      transformerRef.current.nodes([]);
    }
  }, [activeDesignId, designs]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setStageSize(entry.contentRect);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [shirtImage]);

  useEffect(() => {
    if (!shirtImage?.width) return;

    setShirtSize({
      width: shirtImage.width,
      height: shirtImage.height,
    });
  }, [shirtImage]);

  useEffect(() => {
    if (!stageSize?.width || !shirtSize?.width) return;

    // const scale =
    //   Math.min(
    //     stageSize.width / shirtSize.width,
    //     stageSize.height / shirtSize.height
    //   ) * 0.9;

    const scale =
      Math.min(
        stageSize.width / shirtSize.width,
        stageSize.height / shirtSize.height
      ) * (activeSide === "front" || activeSide === "back" ? 0.9 : 1);

    setScale(scale);

    const ratio = PRINT_AREA_RATIO[activeSide];

    const printArea = {
      width: shirtSize?.width * ratio.width * scale,
      height: shirtSize?.height * ratio.height * scale,
      x:
        activeSide === "left"
          ? stageSize?.width / 2.14
          : activeSide === "right"
          ? stageSize?.width / 2.45
          : stageSize.width / 2 - (shirtSize.width * ratio.width * scale) / 2,
      y:
        stageSize?.height / 2 -
        (shirtSize.height * ratio.height * scale) / 2 +
        shirtSize.height * ratio.offsetY * scale,
    };

    setPrintArea(printArea);
  }, [stageSize, shirtSize, activeSide]);

  useEffect(() => {
    if (!canvasRef.current) return;
    setStageRef(canvasRef);
  }, [canvasRef.current]);

  return (
    <div className="relative flex items-center justify-center p-4 md:p-8 w-full h-[90vh] ">
      {/* Glow Platform Effect - Group 7.png ONLY */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">
        {/* Group 7.png - The Main Platform Glow */}
        <img
          src={group7Image}
          alt="Platform glow effect"
          className="max-w-none"
          style={{
            width: "600px",
            height: "auto",
            objectFit: "contain",
            opacity: 1,
            mixBlendMode: "normal",
            transform: "translateY(-20px)",
          }}
        />
      </div>

      <div ref={containerRef} className="w-full min-h-full ">
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          className="bg-transparent!"
          ref={canvasRef}
        >
          {/* SHIRT */}
          <Layer listening={false}>
            <Image
              image={shirtImage}
              x={stageSize.width / 2}
              y={stageSize.height / 2}
              offsetX={shirtSize.width / 2}
              offsetY={shirtSize.height / 2}
              scaleX={scale}
              scaleY={scale}
            />
          </Layer>

          {/* PRINT AREA */}
          <Layer listening={false}>
            <Rect id="crop-area-layer" {...printArea} stroke="#ffff" dash={[3, 3]} />
          </Layer>

          {/* DESIGNS (CLIPPED) */}
          <Layer
            clipFunc={(ctx) => {
              ctx.rect(
                printArea.x,
                printArea.y,
                printArea.width,
                printArea.height
              );
            }}
          >
            {designs[activeSide]
              ?.filter((item) => !item?.hidden)
              ?.map((design) => (
                <DesignNode key={design.id} design={design} />
              ))}
          </Layer>

          {/* UI LAYER (NOT CLIPPED) */}
          <Layer>
            <Transformer
              id="transformers-layer"
              ref={transformerRef}
              borderEnabled={!selectedLayer?.locked}
              rotateEnabled={!selectedLayer?.locked}
              resizeEnabled={!selectedLayer?.locked}
              keepRatio={selectedLayer?.type === "image"}
              enabledAnchors={[
                "top-left",
                "top-right",
                "bottom-left",
                "bottom-right",
              ]}
            />

            {deletePos &&
            activeDesignId &&
            !selectedLayer?.selectedLayer?.locked ? (
              <DeleteButton
                x={deletePos.x}
                y={deletePos.y}
                onClick={() => removeDesign(activeDesignId)}
              />
            ) : (
              ""
            )}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
