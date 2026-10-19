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
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            id="Layer_1"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 460 460"
        >
            <radialGradient
                id="SVGID_1_"
                cx="-516.378"
                cy="91.232"
                r="0.5"
                gradientTransform="matrix(460 0 0 460 237762 -41738)"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#EF4444" stopOpacity="0.25"></stop>
                <stop offset="0.65" stopColor="#991B1B" stopOpacity="0.08"></stop>
                <stop offset="1" stopColor="#07080A" stopOpacity="0"></stop>
            </radialGradient>
            <circle cx="230" cy="230" r="230" fill="url(#SVGID_1_)"></circle>
            <linearGradient
                id="SVGID_2_"
                x1="-516.7"
                x2="-515.7"
                y1="90.85"
                y2="91.85"
                gradientTransform="matrix(400 0 0 400 206712 -36308)"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#B91C1C"></stop>
                <stop offset="0.45" stopColor="#DC2626"></stop>
                <stop offset="1" stopColor="#450A0A"></stop>
            </linearGradient>
            <path
                fill="none"
                stroke="url(#SVGID_2_)"
                strokeWidth="12"
                d="M155 30h150c69 0 125 56 125 125v150c0 69-56 125-125 125H155c-69 0-125-56-125-125V155C30 86 86 30 155 30z"
            ></path>
            <linearGradient
                id="SVGID_3_"
                x1="-514.891"
                x2="-513.928"
                y1="99.877"
                y2="100.841"
                gradientTransform="matrix(168 0 0 184 86652 -18220)"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#F43F5E"></stop>
                <stop offset="0.25" stopColor="#DC2626"></stop>
                <stop offset="0.55" stopColor="#991B1B"></stop>
                <stop offset="0.85" stopColor="#35060A"></stop>
                <stop offset="1" stopColor="#120406"></stop>
            </linearGradient>
            <path
                fill="url(#SVGID_3_)"
                d="M164.8 150c-10.4 0-18.8 8.4-18.8 18.8V250c0 46 38 84 84 84s84-38 84-84v-42.8L262 182v70.9c0 8.7-6.1 19.7-13.7 24-25 14.2-50.3-3.3-50.3-26.9V150z"
            ></path>
            <linearGradient
                id="SVGID_4_"
                x1="-511.488"
                x2="-510.488"
                y1="98.098"
                y2="99.098"
                gradientTransform="matrix(80.51 52.29 -26.14 40.26 44002.602 22895.46)"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#F43F5E"></stop>
                <stop offset="0.4" stopColor="#DC2626"></stop>
                <stop offset="0.8" stopColor="#991B1B"></stop>
                <stop offset="1" stopColor="#1A0407"></stop>
            </linearGradient>
            <path
                fill="url(#SVGID_4_)"
                d="m279.4 113.9 40.3 26.1c11.1 7.2 14.3 22.1 7.1 33.2s-22.1 14.3-33.2 7.1l-40.3-26.2c-11.1-7.2-14.3-22.1-7.1-33.2s22.1-14.2 33.2-7"
            ></path>
        </svg>
    );
};

export default UnsealLogo;