import React from 'react';


export const CyberButton = ({ 
  children, 
  onClick, 
  variant = 'default', 
  icon,
  className = '',
  disabled = false,
  type="button"
}) => {
  const baseStyles = `
    relative flex items-center justify-center gap-2 px-5 py-3 
    font-display font-semibold text-sm tracking-wide
    rounded-lg border-2 transition-all duration-300 
    disabled:opacity-50 disabled:cursor-not-allowed
    before:absolute before:inset-0 before:rounded-lg before:opacity-0 before:transition-opacity
    hover:before:opacity-100
  `;
  
  const variants = {
    default: `
      bg-gradient-to-b from-card to-secondary text-foreground 
      border-border shadow-[inset_0_1px_0_rgba(74,222,128,0.1),0_4px_12px_rgba(0,0,0,0.3)]
      hover:border-primary hover:shadow-[inset_0_1px_0_rgba(74,222,128,0.2),0_0_20px_rgba(74,222,128,0.3)]
      before:bg-gradient-to-b before:from-primary/10 before:to-transparent
    `,
    primary: `
      bg-gradient-to-b from-primary to-accent text-primary-foreground 
      border-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_20px_rgba(74,222,128,0.4)]
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_0_30px_rgba(74,222,128,0.6)]
      before:bg-gradient-to-b before:from-white/10 before:to-transparent
    `,
    outline: `
      bg-transparent text-foreground 
      border-border hover:border-primary hover:bg-card/50
    `,
    ghost: `
      bg-transparent text-muted-foreground 
      border-transparent hover:text-foreground hover:bg-card/30
    `,
  };

  return (
    <button
    type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span className={variant === 'primary' ? 'text-primary-foreground' : 'text-primary'}>{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};
