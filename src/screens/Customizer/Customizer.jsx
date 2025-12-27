import React, { useState } from 'react';
import { 
  Upload, 
  ImageOff, 
  Image, 
  Type, 
  QrCode, 
  Layers, 
  Save,
  Maximize2,
  RotateCw,
  Wand2,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  Undo2,
  Redo2,
  Maximize,
  ZoomIn,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { useCustomizer } from '@/hooks/useCustomizer';
import {
  CyberButton,
  ImageUploader,
  Gallery,
  TextEditor,
  QRCodeGenerator,
  LayersPanel,
  AttributesBar,
  ColorPicker,
  HalftoneSelector,
  ShirtCanvas
} from '@/components/index.js';

export const Customizer = () => {
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

  const handleUpload = (imageData) => {
    addLayer('image', imageData, { width: 80, height: 80 });
  };

  const handleBgRemove = () => {
    // Placeholder for background removal logic
    if (selectedLayer && selectedLayer.type === 'image') {
      // In a real app, this would call a background removal API
      alert('Background removal applied! (Placeholder)');
    }
  };

  const handleGallerySelect = (imageUrl) => {
    addLayer('image', imageUrl, { width: 80, height: 80 });
  };

  const handleAddText = ({ text, fontSize, color }) => {
    addLayer('text', text, { fontSize, color, width: 100, height: 30 });
  };

  const handleAddQR = (url) => {
    addLayer('qrcode', url, { width: 80, height: 80 });
  };

  const handleResize = () => {
    setActiveMode(activeMode === 'resize' ? null : 'resize');
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
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-display font-bold text-xl text-primary">
            IP<span className="text-foreground text-sm ml-1">IN YOUR<br/>POSTCODE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-primary/20 rounded-full px-4 py-2 border border-primary">
          <span className="text-primary font-display text-sm">←</span>
          <h1 className="font-display text-foreground text-lg">Create your Own Epic</h1>
        </div>
        
        <div className="panel-cyber px-4 py-2">
          <span className="font-display text-primary">Total Price: $ {totalPrice}</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row p-4 gap-4">
        {/* Left toolbar */}
        <div className="flex flex-col gap-3 w-full lg:w-48">
          <div className="flex gap-2 mb-2">
            <button className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all">
              <HelpCircle size={18} />
            </button>
            <button className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all">
              <AlertTriangle size={18} />
            </button>
          </div>
          
          <ImageUploader onUpload={handleUpload} />
          
          <CyberButton onClick={handleBgRemove} icon={<ImageOff size={18} />}>
            BG Remove
          </CyberButton>
          
          <CyberButton onClick={() => setShowGallery(true)} icon={<Image size={18} />}>
            Art Gallery
          </CyberButton>
          
          <CyberButton onClick={() => setShowTextEditor(true)} icon={<Type size={18} />}>
            Add Text
          </CyberButton>
          
          <CyberButton onClick={() => setShowQRGenerator(true)} icon={<QrCode size={18} />}>
            QR Code
          </CyberButton>
          
          <CyberButton onClick={() => setShowLayers(true)} icon={<Layers size={18} />}>
            Layers
          </CyberButton>
          
          <CyberButton 
            variant="primary" 
            onClick={handleSaveDesign} 
            icon={<Save size={18} />}
            className="mt-auto"
          >
            Save Design
          </CyberButton>
        </div>

        {/* Center canvas */}
        <div className="flex-1 flex flex-col items-center">
          {/* Top toolbar */}
          <div className="flex gap-2 mb-4">
            <button className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all">
              <Undo2 size={18} />
            </button>
            <button className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all">
              <Redo2 size={18} />
            </button>
            <button className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all">
              <Maximize size={18} />
            </button>
            <button className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all">
              <Grid3X3 size={18} />
            </button>
            <button className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all">
              <ZoomIn size={18} />
            </button>
          </div>
          
          <ShirtCanvas
            layers={visibleLayers}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
            onUpdateLayer={updateLayer}
            shirtColor={shirtColor}
            side={side}
          />
        </div>

        {/* Right toolbar */}
        <div className="flex flex-col gap-3 w-full lg:w-48">
          <CyberButton 
            onClick={handleResize} 
            icon={<Maximize2 size={18} />}
            className={activeMode === 'resize' ? 'border-primary' : ''}
          >
            Resize
          </CyberButton>
          
          <CyberButton onClick={handleRotate} icon={<RotateCw size={18} />}>
            Rotate
          </CyberButton>
          
          <CyberButton 
            onClick={handleEffects} 
            icon={<Wand2 size={18} />}
            className={activeMode === 'effects' ? 'border-primary' : ''}
          >
            Effects
          </CyberButton>
          
          <div className="relative">
            <CyberButton 
              onClick={() => setShowHalftone(!showHalftone)} 
              icon={<Grid3X3 size={18} />}
              className="w-full"
            >
              Halftone
            </CyberButton>
            <HalftoneSelector
              isOpen={showHalftone}
              onClose={() => setShowHalftone(false)}
              selected={selectedLayer?.effects?.halftone}
              onSelect={handleHalftone}
            />
          </div>
          
          <div className="py-2">
            <ColorPicker selectedColor={shirtColor} onSelect={setShirtColor} />
          </div>
          
          <CyberButton 
            onClick={() => setSide(side === 'front' ? 'back' : 'front')}
            className="flex items-center justify-center"
          >
            <span className="flex items-center gap-1">
              Back
              <ChevronLeft size={16} className="text-primary" />
              <ChevronRight size={16} className="text-primary" />
              Front
            </span>
          </CyberButton>
          
          <CyberButton 
            variant="primary" 
            onClick={handleDone}
            className="mt-auto"
          >
            Done
          </CyberButton>
        </div>
      </main>

      {/* Bottom attributes bar */}
      <div className="p-4">
        <AttributesBar layer={selectedLayer} onUpdate={updateLayer} />
      </div>

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
  );
};
