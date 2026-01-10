import { Upload } from "lucide-react";
import { useRef } from "react";
import { v4 } from "uuid";

import { useEditorStore } from "../../store/EditorStore";
import { CyberButton } from "../CyberButton/CyberButton";
import { loadImage } from "../../lib/utils";


export const ImageUploader = () => {
  const inputRef = useRef(null);
  const { addDesign, printArea, activeSide } = useEditorStore();

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {

        console.log(file)

      let image = await loadImage(file);

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
        baseWidth: image.width,
        baseHeight: image.height,
      });
      } catch (error) {
        console.log(error)
        
      }
    }
  };

  return (
    <>
      <CyberButton onClick={handleClick} icon={<Upload size={18} />}>
        Upload
      </CyberButton>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
};
