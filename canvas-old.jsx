{/* Shirt/Hoodie or Product Image - PROPERLY SIZED TO FIT */}
      <div className="relative z-10 w-full max-w-md md:max-w-lg flex items-center justify-center" style={{ maxHeight: '85vh' }} ref={canvasRef}>
        {productImage ? (
          // Display product image as the canvas - FITS IN VIEWPORT
          <div
            className="relative w-full h-auto drop-shadow-2xl bg-cover bg-center rounded-lg overflow-visible"
            style={{
              aspectRatio: '1 / 1.3',
              backgroundImage: `url(${productImage})`,
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
              pointerEvents: 'none',
              maxHeight: '85vh',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          >
            {/* Design area overlay for product image - FULL SHIRT COVERAGE */}
            <div
              className="absolute inset-0"
              style={{ pointerEvents: 'all' }}
            >
              {layers.map(renderLayer)}
            </div>
          </div>
        ) : (
          // Display default SVG shirt - FITS IN VIEWPORT
          <svg
            viewBox="0 0 300 400"
            className="w-full h-auto drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))', maxHeight: '85vh' }}
          >
            {/* Hoodie body */}
            <path
              d="M50 100 Q50 80 80 70 L100 60 Q150 45 200 60 L220 70 Q250 80 250 100 L250 380 Q250 395 235 395 L65 395 Q50 395 50 380 Z"
              fill={shirtColor}
              stroke="#333"
              strokeWidth="2"
            />
            {/* Hood */}
            <path
              d="M80 70 Q80 20 150 10 Q220 20 220 70"
              fill={shirtColor === '#ffffff' ? '#e5e5e5' : shirtColor}
              stroke="#333"
              strokeWidth="2"
            />
            {/* Hood inner */}
            <ellipse
              cx="150"
              cy="65"
              rx="50"
              ry="35"
              fill="#4ade80"
            />
            {/* Left sleeve */}
            <path
              d="M50 100 L20 180 Q15 200 30 210 L60 200 L50 120"
              fill={shirtColor}
              stroke="#333"
              strokeWidth="2"
            />
            {/* Right sleeve */}
            <path
              d="M250 100 L280 180 Q285 200 270 210 L240 200 L250 120"
              fill={shirtColor}
              stroke="#333"
              strokeWidth="2"
            />
            {/* Pocket */}
            <path
              d="M100 280 L200 280 L200 340 Q200 360 180 360 L120 360 Q100 360 100 340 Z"
              fill="none"
              stroke="#333"
              strokeWidth="1.5"
            />
            {/* Center line */}
            <line x1="150" y1="70" x2="150" y2="280" stroke="#333" strokeWidth="1" strokeDasharray="5,5" />
            {/* Drawstrings */}
            <path d="M130 70 L125 140" stroke="#4ade80" strokeWidth="3" />
            <path d="M170 70 L175 140" stroke="#4ade80" strokeWidth="3" />
          </svg>
        )}

        {/* Design area overlay for SVG shirt - FULL SHIRT COVERAGE */}
        {!productImage && (
          <div
            className="absolute inset-0"
            style={{ pointerEvents: 'all' }}
          >
            {layers.map(renderLayer)}
          </div>
        )}

        {/* Side indicator */}

      </div>