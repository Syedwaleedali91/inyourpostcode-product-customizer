import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { CyberButton } from '../CyberButton/CyberButton';

export const ImageUploader = ({ onUpload }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onUpload(event.target?.result);
      };
      reader.readAsDataURL(file);
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
