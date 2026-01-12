import saveDesignImage from "@/assets/Save-Design.png";
import artGalleryImage from "@/assets/Art-Gallery.png";
import halftoneImage from "@/assets/Half-tone.png";
import undoBtnImage from "@/assets/btn-undo.png";
import redoBtnImage from "@/assets/btn-redo.png";
import addTextImage from "@/assets/Add-Text.png";
import qrCodeImage from "@/assets/Qr-Code.png";
import uploadImage from "@/assets/Upload.png";
import needHelp from "@/assets/needHelp.png";
import danger from "@/assets/danger.png";
import shade1Img from "@/assets/1.png";
import { memo, useRef } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

import { QRCodeGenerator } from "../QRCodeGenerator/QRCodeGenerator";
import { useEditorStore } from "../../store/EditorStore";
import { ImageButton } from "../ImageButton/ImageButton";
import { TextEditor } from "../TextEditor/TextEditor";
import { Gallery } from "../Gallery/Gallery";
import { loadImage } from "../../lib/utils";
import { useModal } from "../../hooks";


export const LeftToolbar = memo(() => {
  const inputRef = useRef(null);
  const {
    addDesign,
    activeSide,
    printArea,
    stageRef,
    setRedo,
    setUndo,
  } = useEditorStore();
  const galleryModal = useModal();
  const textModal = useModal();
  const qrModal = useModal();

  const openExplorer = () => {
    inputRef?.current?.click();
  };

  const handelSelectFile = async (e) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        let image = await loadImage(event.target.result);
        addDesign({
          id: v4(),
          type: "image",
          side: activeSide,
          image: image,
          x: printArea.x + printArea.width / 4,
          y: printArea.y + printArea.height / 4,
          scaleX: 0.5,
          scaleY: 0.5,
          rotation: 0,
        });
      };
      reader.readAsDataURL(file);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const downloadDesign = () => {
    if (!stageRef || !stageRef.current) {
      toast.error("Stage is not ready for download.");
      return;
    }
    const tLayer = stageRef.current.findOne("#transformers-layer");
    tLayer.hide();

    const pLayer = stageRef.current.findOne("#crop-area-layer");
    pLayer.hide();

    const rLayer = stageRef.current.findOne("#delete-button-rect");
    pLayer.hide();

    const textLayer = stageRef.current.findOne("#delete-button-text");
    pLayer.hide();

    const dataURL = stageRef.current?.toDataURL();

    if (!dataURL) return;

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${activeSide}-design.png`;
    link.click();

    tLayer.show();
    pLayer.show();
    rLayer.show();
    textLayer.show();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        id="image-upload-input"
        accept="image/*"
        className="hidden"
        onChange={handelSelectFile}
      />

      <Gallery isOpen={galleryModal.isOpen} onClose={galleryModal.closeModal} />
      <TextEditor isOpen={textModal.isOpen} onClose={textModal.closeModal} />
      <QRCodeGenerator isOpen={qrModal.isOpen} onClose={qrModal.closeModal} />
      <div className="flex flex-col gap-4 w-56 pt-4">
        {/* Help and Danger icons at top */}
        <div className="flex gap-2 ml-[72px] mb-5">
          <div className="rounded-lg">
            <img src={needHelp} alt="Need Help" className="w-8 h-8" />
          </div>
          <div className="rounded-lg">
            <img src={danger} alt="Danger" className="w-8 h-8" />
          </div>
          {/* <div className="rounded-lg">
            <img
              src={undoBtnImage}
              onClick={setUndo}
              alt="Danger"
              className="w-8 h-8"
            />
          </div>
          <div className="rounded-lg">
            <img
              src={redoBtnImage}
              onClick={setRedo}
              alt="Danger"
              className="w-8 h-8"
            />
          </div> */}
        </div>

        {/* Upload button with hidden file input */}
        <ImageButton src={uploadImage} alt="Upload" onClick={openExplorer} />

        {/* Art Gallery button */}
        <ImageButton
          src={artGalleryImage}
          alt="Art Gallery"
          onClick={galleryModal.openModal}
        />

        {/* Add Text button */}
        <ImageButton
          src={addTextImage}
          alt="Add Text"
          onClick={textModal.openModal}
        />

        {/* QR Code button */}
        <ImageButton
          src={qrCodeImage}
          alt="QR Code"
          onClick={qrModal.openModal}
        />

        {/* Halftone button */}
        <ImageButton className="mb-7" src={halftoneImage} alt="Halftone" />

        {/* Save Design button */}
        <div className="mt-6 h-10 w-60">
          <ImageButton
            onClick={downloadDesign}
            src={saveDesignImage}
            alt="Save Design"
          />
        </div>

        {/* Shade image */}
        <ImageButton className="mt-6 w-10" src={shade1Img} alt="Shade" />
      </div>
    </>
  );
});
