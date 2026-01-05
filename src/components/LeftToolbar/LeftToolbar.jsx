import React from 'react';
import { ImageButton } from '../ImageButton/ImageButton';

// Import button images from assets
import uploadImage from '@/assets/Upload.png';
import artGalleryImage from '@/assets/Art Gallery.png';
import addTextImage from '@/assets/Add Text.png';
import qrCodeImage from '@/assets/Qr Code.png';
import halftoneImage from '@/assets/Half tone.png';
import saveDesignImage from '@/assets/Save Design.png';
import shade1Img from '@/assets/1.png';
import needHelp from '@/assets/needHelp.png';
import danger from '@/assets/danger.png';

export const LeftToolbar = ({
    onUploadClick,
    onGalleryClick,
    onAddTextClick,
    onQRCodeClick,
    onHalftoneClick,
    onSaveDesignClick
}) => {
    return (
        <div className="flex flex-col gap-4 w-56 pt-4">
            {/* Help and Danger icons at top */}
            <div className="flex gap-2 mb-2 ml-[72px] mb-5">
                <div className="rounded-lg">
                    <img src={needHelp} alt="Need Help" className="w-8 h-8" />
                </div>
                <div className="rounded-lg">
                    <img src={danger} alt="Danger" className="w-8 h-8" />
                </div>
            </div>

            {/* Upload button with hidden file input */}
            <ImageButton
                src={uploadImage}
                alt="Upload"
                onClick={onUploadClick}
            />

            {/* Art Gallery button */}
            <ImageButton
                src={artGalleryImage}
                alt="Art Gallery"
                onClick={onGalleryClick}
            />

            {/* Add Text button */}
            <ImageButton
                src={addTextImage}
                alt="Add Text"
                onClick={onAddTextClick}
            />

            {/* QR Code button */}
            <ImageButton
                src={qrCodeImage}
                alt="QR Code"
                onClick={onQRCodeClick}
            />

            {/* Halftone button */}
            <ImageButton
                className="mb-7"
                src={halftoneImage}
                alt="Halftone"
                onClick={onHalftoneClick}
            />

            {/* Save Design button */}
            <div className="mt-6 h-10 w-60">
                <ImageButton
                    src={saveDesignImage}
                    alt="Save Design"
                    onClick={onSaveDesignClick}
                />
            </div>

            {/* Shade image */}
            <ImageButton
                className="mt-6 w-10"
                src={shade1Img}
                alt="Shade"
            />
        </div>
    );
};
