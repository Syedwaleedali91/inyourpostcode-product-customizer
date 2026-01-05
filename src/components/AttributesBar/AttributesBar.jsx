import React from 'react';
import widthImage from '@/assets/width.png';
import heightImage from '@/assets/height.png';
import rotateImage from '@/assets/rotate-bottom.png';
import resizeImage from '@/assets/resize-bottom.png';
import bottomLine from '@/assets/Vector 11.png';

export const AttributesBar = ({ layer, onUpdate }) => {
  return (
    <div className="w-full flex justify-center relative">

      {/* Wrapper to control width - matches attribute box width */}
      <div className="relative flex flex-col items-center" style={{ width: '920px', maxWidth: '90vw' }}>

        {/* ───────── Decorative Bottom Line (image only) ───────── */}
        <img
          src={bottomLine}
          alt=""
          className="w-full h-[2px] object-cover mb-5 opacity-90"
        />

        {/* ───────── Attribute Bar (TRANSPARENT, BORDER ONLY) ───────── */}
        <div className="w-full flex justify-center">
          <div
            className="flex items-center justify-center gap-3 px-8 py-4 rounded
                       border border-[375039]
                       bg-transparent backdrop-blur-sm
                       w-full">

            <span className="text-2xl font-josefin text-white font-medium mr-2">
              Attributes:
            </span>

            {/* Width */}
            <img src={widthImage} alt="Width" className="h-9 object-contain cursor-pointer hover:opacity-80" />

            {/* Height */}
            <img src={heightImage} alt="Height" className="h-9 object-contain cursor-pointer hover:opacity-80" />

            {/* Rotate */}
            <img src={rotateImage} alt="Rotate" className="h-9 object-contain cursor-pointer hover:opacity-80" />

            {/* Scale */}
            <img src={resizeImage} alt="Scale" className="h-9 object-contain cursor-pointer hover:opacity-80" />

          </div>
        </div>

      </div>
    </div>
  );
};
