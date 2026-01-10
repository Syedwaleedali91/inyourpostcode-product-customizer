import { Eye, EyeOff, Lock, Unlock, Trash2, Frame, Scan } from "lucide-react";
import rotateBottomImage from "@/assets/rotate-bottom.png";
import shade3 from "@/assets/shade image 3.png";
import heightImage from "@/assets/height.png";
import needHelp from "@/assets/needHelp.png";
import widthImage from "@/assets/width.png";
import danger from "@/assets/danger.png";
import React, { useMemo } from "react";

import { useEditorStore } from "../../store/EditorStore";


export const RightToolbar = () => {
  const {
    activeSide,
    designs,
    activeDesignId,
    setActiveDesign,
    removeDesign,
    updateDesign,
  } = useEditorStore();

  const selectedDesign = useMemo(
    () => designs[activeSide]?.find((item) => item?.id === activeDesignId),
    [activeSide, activeDesignId, designs]
  );

  const imageWidth = useMemo(() => {
    if (!selectedDesign) {
      return 0;
    } else {
      return selectedDesign?.baseWidth * selectedDesign.scaleX;
    }
  }, [selectedDesign]);

  const imageHeight = useMemo(() => {
    if (!selectedDesign) {
      return 0;
    } else {
      return selectedDesign?.baseHeight * selectedDesign.scaleX;
    }
  }, [selectedDesign]);

  const handleSetDesignActive = (design) => {
    if (!design?.locked && !design?.hidden) {
      setActiveDesign(design?.id);
    }
  };

  const handleRemoveDesign = (id) => {
    removeDesign(id);
  };

  const handleToggleVisibility = (id) => {
    updateDesign(id, {
      hidden: !designs[activeSide]?.find((item) => item?.id === id)?.hidden,
    });
  };

  const handleToggleLock = (id) => {
    let currentState = designs[activeSide]?.find(
      (item) => item?.id === id
    )?.locked;
    updateDesign(id, {
      locked: !currentState,
    });
    setActiveDesign(currentState ? id : null);
  };

  return (
    <div className="flex flex-col gap-5 w-80 pt-4 h-full">
      {/* Help and Danger icons at top - Mirrored from LeftToolbar */}
      <div className="flex gap-2 justify-end mr-[72px] mb-5">
        <div className="rounded-lg">
          <img src={danger} alt="Danger" className="w-8 h-8" />
        </div>
        <div className="rounded-lg">
          <img src={needHelp} alt="Need Help" className="w-8 h-8" />
        </div>
      </div>

      {/* ATTRIBUTES Panel */}
      <div className="bg-transparent p-0">
        <h2 className="text-white font-arcade text-lg  mb-4">ATTRIBUTES:</h2>
        <div className="grid grid-cols-2 gap-3">
          {/* WIDTH - Clickable Image */}
          <div
            className={`
            ${!selectedDesign ? "cursor-not-allowed" : "cursor-pointer"}
            flex flex-row items-center  gap-2 bg-black rounded-sm p-2 border border-[#375039] shadow-[#518B5A] shadow-md`}
          >
            <img
              alt="height"
              src="/attributes/width.png"
              height={18}
              width={18}
            />

            <input
              className={`${
                !selectedDesign ? "cursor-not-allowed" : ""
              } bg-transparent w-10/12 h-full mt-1 outline-none`}
              disabled={selectedDesign ? false : true}
              type="number"
              value={imageWidth ? Number(imageWidth).toFixed(2) : ""}
              onChange={(e) => {
                const newWidth = Number(e.target.value);
                updateDesign(activeDesignId, {
                  scaleX: newWidth / selectedDesign.baseWidth,
                });
              }}
              placeholder="WIDTH"
            />

            {/* <img src={widthImage} alt="Width" className="w-full h-auto" /> */}
          </div>

          {/* HEIGHT - Clickable Image */}
          <div
            className={`
            ${!selectedDesign ? "cursor-not-allowed" : "cursor-pointer"}
            flex flex-row items-center  gap-2 bg-black rounded-sm p-2 border border-[#375039] shadow-[#518B5A] shadow-md`}
          >
            {/* <Scan color="#B0B0B0" size={18} /> */}
            <img
              alt="height"
              src="/attributes/height.png"
              height={18}
              width={18}
            />
            <input
              className={`${
                !selectedDesign ? "cursor-not-allowed" : ""
              } bg-transparent w-10/12 h-full mt-1 outline-none`}
              disabled={selectedDesign ? false : true}
              type="number"
              value={imageHeight ? Number(imageHeight).toFixed(2) : ""}
              onChange={(e) => {
                const newHeight = Number(e.target.value);
                updateDesign(activeDesignId, {
                  scaleY: newHeight / selectedDesign?.baseHeight || 0,
                });
              }}
              placeholder="WIDTH"
            />

            {/* <img src={widthImage} alt="Width" className="w-full h-auto" /> */}
          </div>

          {/* ROTATE - Clickable Image */}
          <div
            className={`
            ${!selectedDesign ? "cursor-not-allowed" : "cursor-pointer"}
            flex flex-row items-center  gap-2 bg-black rounded-sm p-2 border border-[#375039] shadow-[#518B5A] shadow-md`}
          >
            {/* <Scan color="#B0B0B0" size={18} /> */}
            <img
              alt="height"
              src="/attributes/rotate.png"
              height={16}
              width={16}
            />
            <input
              className={`${
                !selectedDesign ? "cursor-not-allowed" : ""
              } bg-transparent w-10/12 h-full mt-1 outline-none`}
              disabled={selectedDesign ? false : true}
              type="number"
              value={Math.round(selectedDesign?.rotation)}
              onChange={(e) => {
                updateDesign(activeDesignId, {
                  rotation: Number(e.target.value),
                });
              }}
              placeholder="WIDTH"
            />

            {/* <img src={widthImage} alt="Width" className="w-full h-auto" /> */}
          </div>

          {/* ROTATE (second button) - For incremental rotation */}
          <div
            className={`
            ${!selectedDesign ? "cursor-not-allowed" : "cursor-pointer"}
            flex flex-row items-center  gap-2 bg-black rounded-sm p-2 border border-[#375039] shadow-[#518B5A] shadow-md`}
          >
            {/* <Scan color="#B0B0B0" size={18} /> */}
            <img
              alt="height"
              src="/attributes/scale.png"
              height={16}
              width={16}
            />
            <input
              className={`${
                !selectedDesign ? "cursor-not-allowed" : ""
              } bg-transparent w-10/12 h-full mt-1 outline-none`}
              disabled={selectedDesign ? false : true}
              type="number"
              value={Math.round(selectedDesign?.scaleX * 100)}
              onChange={(e) => {
                const scale = Number(e.target.value) / 100;
                updateDesign(activeDesignId, {
                  scaleX: scale,
                  scaleY: scale,
                });
              }}
              placeholder="WIDTH"
            />

            {/* <img src={widthImage} alt="Width" className="w-full h-auto" /> */}
          </div>
        </div>
      </div>

      {designs[activeSide]?.length ? (
        <>
          {/* LAYERS Panel */}
          <div className="bg-transparent p-0">
            <h2 className="text-white  font-arcade  mb-4">LAYERS:</h2>

            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-2">
              {designs[activeSide].length === 0 ? (
                <p className="text-white/50 text-xs">No layers yet</p>
              ) : (
                designs[activeSide]
                  .slice()
                  .reverse()
                  .map((layer, index) => (
                    <div
                      key={layer.id}
                      onClick={() => handleSetDesignActive(layer)}
                      className={`flex items-center gap-3 px-3 py-2 rounded transition-all ${
                        layer?.locked ? "opacity-70" : "cursor-pointer"
                      } ${
                        activeDesignId === layer?.id
                          ? " border border-lime-500"
                          : "bg-black/30 border border-transparent hover:border-primary/40"
                      }`}
                    >
                      {/* Layer thumbnail/icon */}
                      <div className="w-10 h-10 rounded flex items-center justify-center bg-black/50 flex-shrink-0">
                        {layer?.type === "text" && (
                          <span className="text-primary text-lg font-bold">
                            T
                          </span>
                        )}

                        {layer?.type === "image" && (
                          <img
                            src={layer?.image?.currentSrc}
                            alt=""
                            className="w-full h-full object-contain rounded"
                          />
                        )}

                        {layer?.type === "qr" && (
                          <span className="text-primary text-xs font-bold">
                            QR
                          </span>
                        )}
                      </div>

                      {/* Layer info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-display text-xs truncate uppercase font-bold">
                          LAYER {index + 1}
                        </p>
                        <p className="text-primary text-xs">
                          OPL:{" "}
                          {layer.type === "image"
                            ? Math.round(layer?.image?.width)
                            : ""}
                        </p>
                      </div>

                      {/* Layer controls */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          disabled={layer?.locked}
                          onClick={() => handleToggleVisibility(layer.id)}
                          className={`w-6 h-6 flex items-center justify-center text-primary ${
                            layer?.locked
                              ? "cursor-default"
                              : "hover:bg-primary hover:text-black cursor-pointer"
                          } transition-all rounded`}
                          title={layer?.hidden ? "Show layer" : "Hide layer"}
                        >
                          {layer?.hidden ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </button>

                        <button
                          onClick={() => handleToggleLock(layer.id)}
                          className="w-6 h-6 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all rounded"
                          title={layer?.locked ? "Unlock layer" : "Lock layer"}
                        >
                          {layer?.locked ? (
                            <Lock size={14} />
                          ) : (
                            <Unlock size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => handleRemoveDesign(layer.id)}
                          disabled={layer?.locked}
                          className={`w-6 h-6 flex items-center justify-center transition-all rounded ${
                            !layer?.locked &&
                            "text-red-500 hover:bg-red-500 hover:text-white"
                          }`}
                          title="Delete layer"
                        >
                          <Trash2 size={14} className="text-primary" />
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Bottom Shade Image */}
          <div className="mt-auto flex justify-end mr-[72px]">
            <img
              src={shade3}
              alt="Shade 3"
              className="w-[295px] h-auto object-contain"
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
