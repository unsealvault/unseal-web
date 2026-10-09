import React from "react";

interface UnsealLogoProps {
    size?: number;
    className?: string;
}

const UnsealLogo = ({
    size = 460,
    className = "",
}: UnsealLogoProps) => {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 460 460"
            // width={size}
            // height={size}
            className={className}
            aria-label="Unseal Logo"
            role="img"
        >
            <defs>
                <style>{`
          .cls-1 {
            fill: url(#radial-gradient);
          }

          .cls-2 {
            fill: none;
            stroke-width: 12px;
            stroke: url(#linear-gradient);
          }

          .cls-3 {
            fill: url(#linear-gradient-2);
          }

          .cls-4 {
            fill: url(#linear-gradient-3);
          }
        `}</style>

                <radialGradient
                    id="radial-gradient"
                    cx="-276.9"
                    cy="0.71"
                    r="0.5"
                    gradientTransform="translate(127602 -98) scale(460)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#ef4444" stopOpacity="0.25" />
                    <stop offset="0.65" stopColor="#991b1b" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#07080a" stopOpacity="0" />
                </radialGradient>

                <linearGradient
                    id="linear-gradient"
                    x1="-277.3"
                    y1="0.25"
                    x2="-276.3"
                    y2="1.25"
                    gradientTransform="translate(110978 -42) scale(400)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#b91c1c" />
                    <stop offset="0.45" stopColor="#dc2626" />
                    <stop offset="1" stopColor="#450a0a" />
                </linearGradient>

                <linearGradient
                    id="linear-gradient-2"
                    x1="-276.32"
                    y1="8.51"
                    x2="-275.32"
                    y2="9.51"
                    gradientTransform="translate(46598 -1394) scale(168 184)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#f43f5e" />
                    <stop offset="0.25" stopColor="#dc2626" />
                    <stop offset="0.55" stopColor="#991b1b" />
                    <stop offset="0.85" stopColor="#35060a" />
                    <stop offset="1" stopColor="#120406" />
                </linearGradient>

                <linearGradient
                    id="linear-gradient-3"
                    x1="-275.02"
                    y1="6.56"
                    x2="-274.02"
                    y2="7.56"
                    gradientTransform="matrix(80.51 52.29 -26.14 40.26 22593.6 14235.26)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor="#f43f5e" />
                    <stop offset="0.4" stopColor="#dc2626" />
                    <stop offset="0.8" stopColor="#991b1b" />
                    <stop offset="1" stopColor="#1a0407" />
                </linearGradient>
            </defs>

            <circle
                className="cls-1"
                cx="230"
                cy="230"
                r="230"
            />

            <path
                className="cls-2"
                d="M181,56H331A125,125,0,0,1,456,181V331A125,125,0,0,1,331,456H181A125,125,0,0,1,56,331V181A125,125,0,0,1,181,56Z"
                transform="translate(-26 -26)"
            />

            <path
                className="cls-3"
                d="M172,176V276c0,46,38,84,84,84s84-38,84-84V208H288v68a32,32,0,0,1-64,0V176Z"
                transform="translate(-26 -26)"
            />

            <path
                className="cls-4"
                d="M300.1,133.1l40.3,26.1a24,24,0,0,1,7.1,33.2h0a24,24,0,0,1-33.2,7.1L274,173.3a24,24,0,0,1-7.1-33.2h0A24,24,0,0,1,300.1,133.1Z"
                transform="translate(-26 -26)"
            />
        </svg>
    );
};

export default UnsealLogo;