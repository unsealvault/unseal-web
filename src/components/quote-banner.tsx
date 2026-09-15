'use client';

const QuoteBanner = () => {
  return (
    <section className="relative flex min-h-90 w-full select-none items-center justify-center overflow-hidden border-y border-border/40 bg-[#050608] px-4 py-16 sm:min-h-105 sm:px-6 sm:py-20 lg:min-h-120 lg:px-12 lg:py-24">
      {/* Cinematic ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_42%_58%,rgba(185,28,28,0.42)_0%,rgba(127,29,29,0.22)_35%,rgba(5,6,8,0.95)_75%)]" />

      <div className="pointer-events-none absolute bottom-10 left-0 right-0 h-32 bg-[radial-gradient(ellipse_70%_40%_at_50%_60%,rgba(220,38,38,0.2)_0%,transparent_70%)] blur-3xl sm:h-40" />

      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#050608] via-transparent to-[#050608]" />

      {/* Mountain & silhouette artwork */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg
          className="h-full w-full object-cover"
          viewBox="0 0 1440 460"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="cinematic-fog"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="3"
                result="noise"
              />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.07 0"
              />
              <feComposite in2="SourceGraphic" in="gl" operator="over" />
            </filter>

            <linearGradient
              id="mistGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#2b060a" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#140305" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#050608" stopOpacity="1" />
            </linearGradient>

            <linearGradient
              id="farMountain"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#1c070a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#090304" stopOpacity="1" />
            </linearGradient>

            <linearGradient
              id="rightSlopeGrad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#160507" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#0a0305" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#050608" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Film noise */}
          <rect
            width="100%"
            height="100%"
            filter="url(#cinematic-fog)"
            opacity="0.6"
          />

          {/* Far mountain range */}
          <path
            d="M0 310 C150 280 280 320 440 285 C600 250 720 295 880 270 C1040 245 1200 280 1440 250 L1440 460 L0 460 Z"
            fill="url(#farMountain)"
          />

          {/* Middle mist valley */}
          <path
            d="M0 350 C120 330 250 360 380 335 C520 310 660 340 820 320 C1000 300 1180 345 1440 315 L1440 460 L0 460 Z"
            fill="url(#mistGrad)"
          />

          {/* Soft valley reflection */}
          <path
            d="M320 400 C450 385 550 390 620 415 C540 410 420 415 320 400 Z"
            fill="#dc2626"
            opacity="0.18"
            className="blur-xs"
          />

          {/* Right mountain slope */}
          <path
            d="M860 460 C970 425 1090 390 1210 385 C1310 380 1385 398 1440 418 L1440 460 Z"
            fill="url(#rightSlopeGrad)"
          />

          {/* Crescent moon */}
          <g transform="translate(390, 115)">
            <circle
              cx="10"
              cy="10"
              r="14"
              fill="#f43f5e"
              opacity="0.2"
              className="blur-sm"
            />

            <path
              d="M13 2 A11 11 0 0 0 13 22 A9 9 0 0 1 13 2 Z"
              fill="#ffe4e6"
              className="drop-shadow-[0_0_8px_rgba(255,228,230,0.85)]"
            />
          </g>

          {/* Left cliff & sitting person silhouette */}
          <g transform="translate(140, 155)">
            <path
              d="M-140 305 L-30 250 Q10 200 65 210 Q95 215 115 235 Q140 250 170 305 L-140 305 Z"
              fill="#060204"
            />

            <path
              d="M-20 255 L35 218 L80 230 L125 305 L70 305 Z"
              fill="#030102"
              opacity="0.7"
            />

            <g transform="translate(82, 125)">
              <path
                d="M16 8 C16 3 24 2 27 6 C30 10 29 16 26 18 C22 20 16 16 16 8 Z"
                fill="#030102"
              />

              <path
                d="M12 18 C6 28 3 42 2 62 L38 62 C38 48 35 32 30 18 C26 15 16 15 12 18 Z"
                fill="#030102"
              />

              <path
                d="M4 48 C-8 52 -16 64 -18 78 L12 78 C18 68 15 56 4 48 Z"
                fill="#030102"
              />

              <path
                d="M28 47 C38 52 45 64 48 78 L18 78 C21 64 25 54 28 47 Z"
                fill="#030102"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Quote content */}
      <div className="relative z-10 mx-auto max-w-4xl space-y-3 text-center sm:space-y-4">
        <p className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-red-500 sm:text-xs sm:tracking-[0.42em]">
          — A PLACE FOR WHAT MATTERS —
        </p>

        <h2 className="font-serif text-3xl font-normal leading-[1.2] tracking-tight text-[#fbf8f3] drop-shadow-md sm:text-5xl sm:leading-[1.22] lg:text-[54px]">
          <span>&ldquo;Some words are worth</span>

          <span className="mt-1 block sm:mt-2">
            <span className="font-normal text-red-500">waiting</span> for.&rdquo;
          </span>
        </h2>
      </div>
    </section>
  );
};

export default QuoteBanner;