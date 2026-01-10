import { useEditorStore } from '../../store/EditorStore';
import { ImageSides } from '../../lib/utils';


export const ViewToggleButtons = () => {
    const {activeSide,setSide} = useEditorStore();
    return (
        <div className="flex items-center gap-3 mt-1">
            {ImageSides.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => setSide(id)}
                    className={`px-3 py-1 rounded border-2 transition-all ${activeSide === id
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-primary/50 text-white hover:border-primary'
                        }`}
                >
                    <span className="font-arcade  ">{label}</span>
                    
                </button>
            ))}
        </div>
    );
};
