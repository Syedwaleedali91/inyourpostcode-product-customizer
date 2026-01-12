import { create } from "zustand";


export type DesignType = "image" | "text";
export type Side = "front" | "back" | "left" | "right";

export interface Design {
  id: string;
  type: DesignType;
  side: Side;

  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;

  baseWidth?: number;
  baseHeight?: number;

  image?: HTMLImageElement;

  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  color?: string;
  hidden?: boolean;
  locked?: boolean;
}

interface Size {
  width: number;
  height: number;
}

interface PrintArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EditorState {
  undo: any[];
  redo: any[];
  currentState:Design | null;
  stageRef?: any;
  activeSide: Side;
  activeDesignId: string | null;

  designs: Record<Side, Design[]>;

  stageSize: Size;
  shirtSize: Size;
  scale: number;
  printArea: PrintArea;

  setRedo: (redo: any[]) => void;
  setUndo: (undo: any[]) => void;

  saveHistory: (data: any) => void;

  setStageSize: (size: Size) => void;
  setShirtSize: (size: Size) => void;
  setScale: (scale: number) => void;
  setPrintArea: (area: PrintArea) => void;

  setSide: (side: Side) => void;
  setStageRef: (ref: any) => void;
  setDimensions: (name: string, value: any) => void;
  setActiveDesign: (id: string | null) => void;

  addDesign: (design: Design) => void;
  updateDesign: (id: string, payload: Partial<Design>) => void;
  removeDesign: (id: string) => void;
}

export const useEditorStore = create<EditorState>((set,get) => ({
  undo: [],
  redo: [],
  currentState: null,
  stageRef: null,
  activeSide: "front",
  activeDesignId: null,
  stageSize: { width: 0, height: 0 },
  shirtSize: { width: 0, height: 0 },
  scale: 1,
  printArea: { x: 0, y: 0, width: 0, height: 0 },

  setUndo: () => {
    const {undo,redo, activeSide, currentState} = get();
    if(!undo.length) return;
    const applyToCurrent = undo[undo.length - 1];
    if(!applyToCurrent) return;
    set({
      redo: [currentState,...redo],
      undo: undo.length === 1 ? [] : undo.slice(0, -1),
      currentState:applyToCurrent
    });
    set((state) => ({
      designs: {
        ...state.designs,
        [activeSide]:state.designs[activeSide].map((d) =>
          d.id === applyToCurrent.id ? { ...d, ...applyToCurrent } : d
        ) 
      },
      activeDesignId: applyToCurrent.id,
    }));
  },

  setRedo: () => {
    const {undo,redo, activeSide,currentState} = get();
    if(!redo.length) return;
    const applyToCurrent = redo[0];
    if(!applyToCurrent) return;
    set({
      undo: [...undo, currentState],
      redo: redo.slice(1),
      currentState:applyToCurrent
    });
    set((state) => ({
      designs: {
        ...state.designs,
        [activeSide]:state.designs[activeSide].map((d) =>
          d.id === applyToCurrent.id ? { ...d, ...applyToCurrent } : d
        ) 
      },
      activeDesignId: applyToCurrent.id,
    }));
  },

  saveHistory: (data) =>{
    let currentState = get().currentState;
    let undo = [];
    if(get().undo.length){
      undo.push(...get().undo);
    }
    if(currentState){
      undo.push(currentState);
    }
    set(() => ({
      undo,
      redo: [],
      currentState: data,
    }))
  },

  setStageSize: (stageSize) => set({ stageSize }),
  setShirtSize: (shirtSize) => set({ shirtSize }),
  setScale: (scale) => set({ scale }),
  setPrintArea: (printArea) => set({ printArea }),

  designs: {
    front: [],
    back: [],
    left: [],
    right: [],
  },

  setSide: (side) => set({ activeSide: side, activeDesignId: null }),
  setStageRef: (ref: any) => set({ stageRef: ref }),

  setDimensions: (name: string, value: any) =>
    set((state) => ({
      ...state,
      [name]: value,
    })),

  setActiveDesign: (id) => set({ activeDesignId: id }),

  addDesign: (design) => {
    set((state) => ({
      designs: {
        ...state.designs,
        [design.side]: [...state.designs[design.side], design],
      },
      activeDesignId: design.id,
    }));
  },

  updateDesign: (id, payload) =>
    set((state) => ({
      designs: {
        front: state.designs.front.map((d) =>
          d.id === id ? { ...d, ...payload } : d
        ),
        back: state.designs.back.map((d) =>
          d.id === id ? { ...d, ...payload } : d
        ),
        left: state.designs.left.map((d) =>
          d.id === id ? { ...d, ...payload } : d
        ),
        right: state.designs.right.map((d) =>
          d.id === id ? { ...d, ...payload } : d
        ),
      },
    })),

  removeDesign: (id) =>
    set((state) => ({
      designs: {
        front: state.designs.front.filter((d) => d.id !== id),
        back: state.designs.back.filter((d) => d.id !== id),
        left: state.designs.left.filter((d) => d.id !== id),
        right: state.designs.right.filter((d) => d.id !== id),
      },
      activeDesignId: null,
    })),
}));
