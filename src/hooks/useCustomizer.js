import { useState, useCallback } from 'react';

const initialLayer = {
  id: Date.now(),
  type: 'image',
  content: '',
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  rotation: 0,
  effects: {
    halftone: null,
    brightness: 100,
    contrast: 100,
  },
};

export const useCustomizer = () => {
  const [layers, setLayers] = useState([]);
  const [selectedLayerId, setSelectedLayerId] = useState(null);
  const [side, setSide] = useState('front');
  const [shirtColor, setShirtColor] = useState('#1a1a1a');
  const [basePrice] = useState(5.00);
  
  const calculatePrice = useCallback(() => {
    let price = basePrice;
    layers.forEach(layer => {
      if (layer.type === 'image') price += 1.50;
      if (layer.type === 'text') price += 0.50;
      if (layer.type === 'qrcode') price += 1.00;
      if (layer.effects.halftone) price += 0.50;
    });
    return price.toFixed(2);
  }, [layers, basePrice]);

  const addLayer = useCallback((type, content, options = {}) => {
    const newLayer = {
      ...initialLayer,
      id: Date.now(),
      type,
      content,
      side,
      ...options,
    };
    setLayers(prev => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
    return newLayer.id;
  }, [side]);

  const updateLayer = useCallback((id, updates) => {
    setLayers(prev => 
      prev.map(layer => 
        layer.id === id ? { ...layer, ...updates } : layer
      )
    );
  }, []);

  const removeLayer = useCallback((id) => {
    setLayers(prev => prev.filter(layer => layer.id !== id));
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  }, [selectedLayerId]);

  const moveLayerUp = useCallback((id) => {
    setLayers(prev => {
      const index = prev.findIndex(l => l.id === id);
      if (index < prev.length - 1) {
        const newLayers = [...prev];
        [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
        return newLayers;
      }
      return prev;
    });
  }, []);

  const moveLayerDown = useCallback((id) => {
    setLayers(prev => {
      const index = prev.findIndex(l => l.id === id);
      if (index > 0) {
        const newLayers = [...prev];
        [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]];
        return newLayers;
      }
      return prev;
    });
  }, []);

  const selectedLayer = layers.find(l => l.id === selectedLayerId);
  const visibleLayers = layers.filter(l => l.side === side);

  return {
    layers,
    visibleLayers,
    selectedLayer,
    selectedLayerId,
    setSelectedLayerId,
    side,
    setSide,
    shirtColor,
    setShirtColor,
    totalPrice: calculatePrice(),
    addLayer,
    updateLayer,
    removeLayer,
    moveLayerUp,
    moveLayerDown,
  };
};
