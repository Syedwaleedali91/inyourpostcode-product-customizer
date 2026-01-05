import React from 'react';
import logoImage from '@/assets/logo-fin1.png';

export const TopNavbar = () => {
  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center">
        <img
          src={logoImage}
          alt="InYourPostCode Logo"
          className="pl-10 w-30 h-20"
        />
      </div>
    </nav>
  );
};
