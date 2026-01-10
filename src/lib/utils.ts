import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PRINT_AREA_RATIO = {
  front: { width: 0.4, height: 0.5, offsetY: 0 },
  back: { width: 0.4, height: 0.5, offsetY: 0 },
  left: { width: 0.165, height: 0.22, offsetY: -0.15 }, 
  right: { width: 0.165, height: 0.22, offsetY: -0.15 }
};


export const loadImage = (file: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = file;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

export const ImageSides = [
  { id: 'front', label: 'FRONT' },
  { id: 'right', label: 'RIGHT' },
  { id: 'back', label: 'BACK' },
  { id: 'left', label: 'LEFT' }
];

export const FONT_LIST = [
  { label: "Poppins", css: "Poppins" },
  { label: "Montserrat", css: "Montserrat" },
  { label: "Playfair Display", css: "Playfair Display" },
];