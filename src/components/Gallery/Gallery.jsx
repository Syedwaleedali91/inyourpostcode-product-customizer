import { X, Upload, FolderPlus } from "lucide-react";
import wm4 from "@/assets/watermarks/w-4.png";
import wm3 from "@/assets/watermarks/w-3.png";
import wm2 from "@/assets/watermarks/w-2.png";
import wm1 from "@/assets/watermarks/w-1.png";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { v4 } from "uuid";

import { useEditorStore } from "../../store/EditorStore";
import { CyberButton } from "../CyberButton/CyberButton";
import { loadImage } from "../../lib/utils";


const defaultImages = [wm1, wm2, wm3, wm4];

export const Gallery = ({ isOpen, onClose }) => {
  const [images, setImages] = useState(defaultImages);
  const inputRef = useRef(null);
  const { activeSide,designs, addDesign, printArea,stageRef,saveHistory,currentState,redo,undo} = useEditorStore();
  console.log(currentState,'current state')
  console.log(redo,'redo')
  console.log(undo,'undo')
  console.log(designs,'designs')

  if (!isOpen) return null;

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages((prev) => [event.target?.result, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectImage = async (img) => {
    try {
      if(stageRef.current){
        saveHistory(stageRef.current.toJSON())
      }else{
        toast.error("Failed to save history.");
      }
      const image = await loadImage(img);

      const design ={
        id: v4(),
        type: "image",
        side: activeSide,
        image: image,
        x: printArea.x + printArea.width / 4,
        y: printArea.y + printArea.height / 4,
        scaleX: activeSide === "left" || activeSide === "right" ? 0.2 : 0.5,
        scaleY: activeSide === "left" || activeSide === "right" ? 0.2 : 0.5,
        rotation: 0,
        baseWidth: image.width,
        baseHeight: image.height,
      }
      saveHistory(design)
      addDesign(design); 
      onClose();
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="panel-cyber w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-foreground">
              Art Gallery
            </h3>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          </div>

          <CyberButton
            variant="primary"
            className="w-full mb-4"
            icon={<Upload size={18} />}
            onClick={handleUploadClick}
          >
            Upload Image
          </CyberButton>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="mb-4">
            <h4 className="font-body text-foreground mb-2">My Folder</h4>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm">
              <FolderPlus size={16} />
              Create Folder
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <h4 className="font-body text-foreground mb-3">Images</h4>
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectImage(img)}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-[0_0_15px_hsl(142_76%_56%/0.4)] bg-card"
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
