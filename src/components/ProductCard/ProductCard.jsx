import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CyberButton } from '@/components/index.js';

export const ProductCard = ({ imageUrl, imageAlt = 'Product' }) => {
  const navigate = useNavigate();

  const handleCustomizeClick = () => {
    navigate('/customizer', { 
      state: { initialProductImage: imageUrl } 
    });
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-primary/30 bg-card hover:shadow-3xl hover:shadow-primary/40 transition-all duration-300">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 h-80 flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className="w-full h-full object-cover hover:scale-90 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Premium Custom Design
          </h2>
          <p className="font-body text-muted-foreground">
            Personalize your own epic shirt with our powerful design tools. Create something unique that represents your style.
          </p>
        </div>

        {/* Button */}
        <CyberButton 
          variant="primary"
          onClick={handleCustomizeClick}
          className="w-full text-center justify-center py-3"
        >
          Customize Design
        </CyberButton>
      </div>
    </div>
  );
};
