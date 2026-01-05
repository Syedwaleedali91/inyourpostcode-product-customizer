import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCustomizer } from '@/hooks/useCustomizer';
import {
  Gallery,
  TextEditor,
  QRCodeGenerator,
  LayersPanel,
  ShirtCanvas,
  TopNavbar,
  SecondNavbar,
  LeftToolbar,
  RightToolbar,
  ViewToggleButtons,
  DecorativeVectors
} from '@/components/index.js';
import geminiBackground from '@/assets/gemini.png';
import shade2 from '@/assets/shade image 2.png';



export const Customizer = () => {
  const location = useLocation();
  const {
    layers,
    visibleLayers,
    selectedLayer,
    selectedLayerId,
    setSelectedLayerId,
    side,
    setSide,
    shirtColor,
    setShirtColor,
    totalPrice,
    addLayer,
    updateLayer,
    removeLayer,
    moveLayerUp,
    moveLayerDown,
  } = useCustomizer();

  const [showGallery, setShowGallery] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showQRGenerator, setShowQRGenerator] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [showHalftone, setShowHalftone] = useState(false);
  const [activeMode, setActiveMode] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [uploadKey, setUploadKey] = useState(0);
  const [layer, setLayers] = useState('');

  // Initialize with product image from home page
  useEffect(() => {
    if (location.state?.initialProductImage) {
      setProductImage(location.state.initialProductImage);
    }
  }, [location.state]);

  const handleUpload = (imageData) => {
    addLayer('image', imageData, { width: 80, height: 80 });
  };

  // const handleBgRemove = () => {
  //   // Placeholder for background removal logic
  //   if (selectedLayer && selectedLayer.type === 'image') {
  //     // In a real app, this would call a background removal API
  //     alert('Background removal applied! (Placeholder)');
  //   }
  // };

  const handleGallerySelect = (imageUrl) => {
    addLayer('image', imageUrl, { width: 80, height: 80 });
  };

  const handleAddText = ({ text, fontSize, color }) => {
    addLayer('text', text, { fontSize, color, width: 100, height: 30 });
  };

  const handleAddQR = (url) => {
    addLayer('qrcode', url, { width: 80, height: 80 });
  };

  // const handleResize = () => {
  //   setActiveMode(activeMode === 'resize' ? null : 'resize');
  // };

  const handleDeleteLayer = (layerId) => {
    setLayers(prevLayers => prevLayers.filter(layer => layer.id !== layerId));
    if (selectedLayerId === layerId) {
      setSelectedLayerId(null);
    }
  };

  const handleRotate = () => {
    if (selectedLayer) {
      updateLayer(selectedLayerId, { rotation: (selectedLayer.rotation + 15) % 360 });
    }
  };

  const handleEffects = () => {
    setActiveMode(activeMode === 'effects' ? null : 'effects');
  };

  const handleHalftone = (pattern) => {
    if (selectedLayer) {
      updateLayer(selectedLayerId, {
        effects: { ...selectedLayer.effects, halftone: pattern }
      });
    }
  };

  const handleSaveDesign = () => {
    const designData = { layers, shirtColor };
    console.log('Design saved:', designData);
    alert('Design saved successfully!');
  };

  const handleDone = () => {
    alert(`Order complete! Total: $${totalPrice}`);
  };



  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with gemini.png */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url('${geminiBackground}')`,
          filter: '  brightness(0.4) contrast(1.1)',
          zIndex: 0,

        }}
      />

      {/* Dark overlay for better content visibility */}
      <div
        className="fixed inset-0 bg-black/20"
        style={{ zIndex: 1 }}
      />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navbar - Logo only */}
        <TopNavbar />

        {/* Second Navbar - Back button, title, and price */}
        <SecondNavbar totalPrice={totalPrice} />

        <DecorativeVectors />

        {/* Main content - CENTER LAYOUT with proper spacing */}
        <main className="flex-1 flex items-start justify-center p-4 md:p-8 ml-[22px]">
          <div className="flex items-start justify-center gap-0 md:gap-2 w-full max-w-[1600px] mx-auto">

            {/* Left toolbar */}
            {/* Hidden file input for Upload functionality */}
            <input
              key={uploadKey}
              type="file"
              id="image-upload-input"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    handleUpload(event.target.result);
                  };
                  reader.readAsDataURL(file);
                  setUploadKey(prev => prev + 1);
                }
              }}
            />

            <LeftToolbar
              onUploadClick={() => document.getElementById('image-upload-input').click()}
              onGalleryClick={() => setShowGallery(true)}
              onAddTextClick={() => setShowTextEditor(true)}
              onQRCodeClick={() => setShowQRGenerator(true)}
              onHalftoneClick={() => setShowHalftone(!showHalftone)}
              onSaveDesignClick={handleSaveDesign}
            />

            {/* Center canvas */}
            <div className="flex-1 flex flex-col items-center w-fit">
              <ShirtCanvas
                layers={visibleLayers}
                selectedLayerId={selectedLayerId}
                onSelectLayer={setSelectedLayerId}
                onUpdateLayer={updateLayer}
                shirtColor={shirtColor}
                onDeleteLayer={handleDeleteLayer}
                side={side}
                productImage={productImage}
              />

              <ViewToggleButtons
                currentSide={side}
                onSideChange={setSide}
              />

              {/* Shade Image 2 under view toggles */}
              <div className="mt-4">
                <img src={shade2} alt="Shade 2" className="w-full max-w-[500px] h-auto object-contain mx-auto opacity-80" />
              </div>
            </div>

            <div>

            </div>

            {/* Right toolbar */}
            <RightToolbar


              layers={layers}
              selectedLayerId={selectedLayerId}
              selectedLayer={selectedLayer}
              onSelectLayer={setSelectedLayerId}
              onUpdateLayer={updateLayer}
              onRemoveLayer={removeLayer}
            />
          </div>
        </main>

        {/* Bottom attributes bar */}
        {/* <div className="p-4">
          <AttributesBar layer={selectedLayer} onUpdate={updateLayer} />
        </div> */}

        {/* Modals */}
        <Gallery
          isOpen={showGallery}
          onClose={() => setShowGallery(false)}
          onSelect={handleGallerySelect}
        />

        <TextEditor
          isOpen={showTextEditor}
          onClose={() => setShowTextEditor(false)}
          onAdd={handleAddText}
        />

        <QRCodeGenerator
          isOpen={showQRGenerator}
          onClose={() => setShowQRGenerator(false)}
          onGenerate={handleAddQR}
        />

        <LayersPanel
          isOpen={showLayers}
          onClose={() => setShowLayers(false)}
          layers={layers}
          selectedLayerId={selectedLayerId}
          onSelect={setSelectedLayerId}
          onMoveUp={moveLayerUp}
          onMoveDown={moveLayerDown}
          onRemove={removeLayer}
        />
      </div>
    </div>
  );
};