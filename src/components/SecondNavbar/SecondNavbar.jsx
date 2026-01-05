import React from 'react';
import { useNavigate } from 'react-router-dom';
import backButtonImage from '@/assets/Frame 46.png';
import vector1 from '@/assets/Vector 1.png';
import continueBtn from '@/assets/continue.png'

export const SecondNavbar = ({ totalPrice }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <nav className="relative bg-gradient-to-r bg-[hsl(120,100%,25%)] border-b border-border px-16 py-3.5">
      <div className="flex items-center justify-between ">
        {/* Left side - Back button */}
        <button
          onClick={handleBackClick}
          className="flex items-center justify-center hover:opacity-80 transition-all duration-200"
          title="Go back to home"
        >
          <img
            src={backButtonImage}
            alt="Back"
            className="w-35 h-12 object-contain"
          />
        </button>

        {/* Right side - Total price and continue button */}
        <div className="flex items-center gap-4">
          {/* Total price div exactly fitting text */}
          <div className="panel-cyber px-9 py-[10px] rounded flex items-center justify-center">
            <h1 className="font-arcade text-white whitespace-nowrap text-xl">
              Total Price: ${totalPrice}
            </h1>
          </div>

          {/* Continue button */}
          <img src={continueBtn} alt="" className="w-35 h-16" />
        </div>
      </div>

      {/* Decorative vector line as bottom overlay */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-[2px]"
        style={{
          backgroundImage: `url(${vector1})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 2px',
          pointerEvents: 'none',
        }}
      />
    </nav>
  );
};
