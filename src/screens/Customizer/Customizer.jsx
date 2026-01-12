import { ShirtCanvas, TopNavbar, SecondNavbar, LeftToolbar, RightToolbar, ViewToggleButtons, DecorativeVectors, } from "@/components/index.js";
import geminiBackground from "@/assets/gemini.png";
import ShirtRight from "@/assets/shirt/right.png";
import ShirtFront from "@/assets/shirt/front.png";
import ShirtLeft from "@/assets/shirt/left.png";
import ShirtBack from "@/assets/shirt/back.png";
import shade2 from "@/assets/shade-image-2.png";


export const Customizer = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background with gemini.png */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: `url('${geminiBackground}')`,
          filter: "  brightness(0.4) contrast(1.1)",
          zIndex: 0,
        }}
      />

      {/* Dark overlay for better content visibility */}
      <div className="fixed inset-0 bg-black/20" style={{ zIndex: 1 }} />

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navbar - Logo only */}
        <TopNavbar />

        {/* Second Navbar - Back button, title, and price */}
        <SecondNavbar totalPrice={6.0} />

        <DecorativeVectors />

        {/* Main content - CENTER LAYOUT with proper spacing */}
        <main className="flex-1 flex items-start justify-center p-4 md:p-8 ml-[22px]">
          <div className="flex items-start justify-center gap-0 md:gap-2 w-full max-w-[1600px] mx-auto">
            {/* Left toolbar */}
            <LeftToolbar />

            {/* Center canvas */}
            <div className="flex-1 flex flex-col items-center w-fit">
              <ShirtCanvas frontShirt={ShirtFront} backShirt={ShirtBack}
              shirtLeft={ShirtLeft} shirtRight={ShirtRight}
              />

              <ViewToggleButtons />

              {/* Shade Image 2 under view toggles */}
              <div className="mt-4">
                <img
                  src={shade2}
                  alt="Shade 2"
                  className="w-full max-w-[500px] h-auto object-contain mx-auto opacity-80"
                />
              </div>
            </div>

            <div />
            <RightToolbar />
          </div>
        </main>
      </div>
    </div>
  );
};
