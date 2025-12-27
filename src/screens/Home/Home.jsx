import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shirt, Sparkles, Palette, Layers } from 'lucide-react';
import { CyberButton } from '@/components/index.js';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-glow-pulse" />
        <div className="absolute bottom-32 right-32 w-3 h-3 bg-primary rounded-full animate-glow-pulse animation-delay-500" />
        <div className="absolute top-40 right-40 w-2 h-2 bg-primary rounded-full animate-glow-pulse animation-delay-1000" />
      </div>
      
      <div className="relative z-10 text-center max-w-3xl">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
              <Shirt size={32} className="text-primary-foreground" />
            </div>
            <div className="text-left">
              <h2 className="font-display font-bold text-2xl text-primary">IP</h2>
              <p className="font-body text-sm text-muted-foreground leading-tight">IN YOUR<br/>POSTCODE</p>
            </div>
          </div>
        </div>
        
        {/* Hero text */}
        <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mb-4 text-glow">
          Create Your Own
          <span className="block text-primary">Epic Design</span>
        </h1>
        
        <p className="font-body text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
          Design custom hoodies and shirts with our powerful editor. Upload images, add text, QR codes, and more.
        </p>
        
        {/* CTA Button */}
        <CyberButton 
          variant="primary" 
          onClick={() => navigate('/customizer')}
          className="text-lg px-8 py-4 mb-16"
        >
          <Sparkles size={20} />
          Start Designing
        </CyberButton>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="panel-cyber text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Palette size={24} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Custom Colors</h3>
            <p className="font-body text-sm text-muted-foreground">Choose from multiple shirt colors and customize every element</p>
          </div>
          
          <div className="panel-cyber text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Layers size={24} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Layer System</h3>
            <p className="font-body text-sm text-muted-foreground">Add multiple images, text, and effects with full control</p>
          </div>
          
          <div className="panel-cyber text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Special Effects</h3>
            <p className="font-body text-sm text-muted-foreground">Apply halftone patterns, resize, rotate, and more</p>
          </div>
        </div>
      </div>
    </div>
  );
};
