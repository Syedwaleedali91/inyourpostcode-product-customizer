import React from 'react';
import { Eye, EyeOff, Lock, Unlock, Trash2 } from 'lucide-react';
import widthImage from '@/assets/width.png';
import heightImage from '@/assets/height.png';
import rotateBottomImage from '@/assets/rotate-bottom.png';
import needHelp from '@/assets/needHelp.png';
import danger from '@/assets/danger.png';
import shade3 from '@/assets/shade image 3.png';

export const RightToolbar = ({
    layers,
    selectedLayerId,
    selectedLayer,
    onSelectLayer,
    onUpdateLayer,
    onRemoveLayer
}) => {
    // Track visibility and lock state for each layer
    const [layerStates, setLayerStates] = React.useState({});

    const toggleVisibility = (layerId, e) => {
        e.stopPropagation();
        setLayerStates(prev => ({
            ...prev,
            [layerId]: {
                ...prev[layerId],
                visible: !(prev[layerId]?.visible ?? true)
            }
        }));
    };

    const toggleLock = (layerId, e) => {
        e.stopPropagation();
        setLayerStates(prev => ({
            ...prev,
            [layerId]: {
                ...prev[layerId],
                locked: !(prev[layerId]?.locked ?? false)
            }
        }));
    };

    return (
        <div className="flex flex-col gap-5 w-80 pt-4 h-full">

            {/* Help and Danger icons at top - Mirrored from LeftToolbar */}
            <div className="flex gap-2 mb-2 justify-end mr-[72px] mb-5">
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

                {selectedLayer ? (
                    <div className="grid grid-cols-2 gap-3">
                        {/* WIDTH - Clickable Image */}
                        <button
                            onClick={() => {
                                // Could open a modal or adjust width
                                const newWidth = prompt('Enter width:', selectedLayer.width || 100);
                                if (newWidth) onUpdateLayer(selectedLayerId, { width: parseInt(newWidth) });
                            }}
                            className="transition-all hover:scale-105 active:scale-95"
                        >
                            <img src={widthImage} alt="Width" className="w-full h-auto" />
                        </button>

                        {/* HEIGHT - Clickable Image */}
                        <button
                            onClick={() => {
                                const newHeight = prompt('Enter height:', selectedLayer.height || 100);
                                if (newHeight) onUpdateLayer(selectedLayerId, { height: parseInt(newHeight) });
                            }}
                            className="transition-all hover:scale-105 active:scale-95"
                        >
                            <img src={heightImage} alt="Height" className="w-full h-auto" />
                        </button>

                        {/* ROTATE - Clickable Image */}
                        <button
                            onClick={() => {
                                const newRotation = prompt('Enter rotation (0-360):', selectedLayer.rotation || 0);
                                if (newRotation) onUpdateLayer(selectedLayerId, { rotation: parseInt(newRotation) % 360 });
                            }}
                            className="transition-all hover:scale-105 active:scale-95"
                        >
                            <img src={rotateBottomImage} alt="Rotate" className="w-full h-auto" />
                        </button>

                        {/* ROTATE (second button) - For incremental rotation */}
                        <button
                            onClick={() => {
                                onUpdateLayer(selectedLayerId, { rotation: ((selectedLayer.rotation || 0) + 15) % 360 });
                            }}
                            className="transition-all hover:scale-105 active:scale-95"
                        >
                            <img src={rotateBottomImage} alt="Rotate" className="w-full h-auto" />
                        </button>
                    </div>
                ) : (
                    <p className="text-white/50 text-xs">No layer selected</p>
                )}
            </div>

            {/* LAYERS Panel */}
            <div className="bg-transparent p-0">
                <h2 className="text-white  font-arcade  mb-4">LAYERS:</h2>

                <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-2">
                    {layers.length === 0 ? (
                        <p className="text-white/50 text-xs">No layers yet</p>
                    ) : (
                        layers.slice().reverse().map((layer, index) => {
                            const reversedIndex = layers.length - 1 - index;
                            const isVisible = layerStates[layer.id]?.visible ?? true;
                            const isLocked = layerStates[layer.id]?.locked ?? false;

                            return (
                                <div
                                    key={layer.id}
                                    onClick={() => !isLocked && onSelectLayer(layer.id)}
                                    className={`flex items-center gap-3 px-3 py-2 rounded transition-all ${isLocked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                                        } ${selectedLayerId === layer.id
                                            ? ' border border-lime '
                                            : 'bg-black/30 border border-transparent hover:border-primary/40'
                                        }`}
                                >
                                    {/* Layer thumbnail/icon */}
                                    <div className="w-10 h-10 rounded flex items-center justify-center bg-black/50 flex-shrink-0">
                                        {layer.type === 'text' ? (
                                            <span className="text-primary text-lg font-bold">T</span>
                                        ) : layer.type === 'image' ? (
                                            <img src={layer.content} alt="" className="w-full h-full object-contain rounded" />
                                        ) : (
                                            <span className="text-primary text-xs font-bold">QR</span>
                                        )}
                                    </div>

                                    {/* Layer info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-display text-xs truncate uppercase font-bold">
                                            LAYER {reversedIndex + 1}
                                        </p>
                                        <p className="text-primary text-xs">OPL:{Math.round(layer.width || 100)}</p>
                                    </div>

                                    {/* Layer controls */}
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <button
                                            onClick={(e) => toggleVisibility(layer.id, e)}
                                            className="w-6 h-6 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all rounded"
                                            title={isVisible ? "Hide layer" : "Show layer"}
                                        >
                                            {isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                                        </button>
                                        <button
                                            onClick={(e) => toggleLock(layer.id, e)}
                                            className="w-6 h-6 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all rounded"
                                            title={isLocked ? "Unlock layer" : "Lock layer"}
                                        >
                                            {isLocked ? <Lock size={14} /> : <Unlock size={14} />}
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!isLocked) {
                                                    onRemoveLayer(layer.id);
                                                }
                                            }}
                                            disabled={isLocked}
                                            className={`w-6 h-6 flex items-center justify-center transition-all rounded ${isLocked
                                                ? 'text-gray-600 cursor-not-allowed'
                                                : 'text-red-500 hover:bg-red-500 hover:text-white'
                                                }`}
                                            title="Delete layer"
                                        >
                                            <Trash2 size={14} className='text-primary' />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Bottom Shade Image */}
            <div className="mt-auto flex justify-end mr-[72px]">
                <img src={shade3} alt="Shade 3" className="w-[295px] h-auto object-contain" />
            </div>
        </div>
    );
};
