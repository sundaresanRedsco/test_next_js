import React from "react";

type Props = {};

export default function Connecter({}: Props) {
  return (
    <svg
      width="94"
      height="115"
      viewBox="0 0 94 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_48_18)">
        <path
          d="M16.976 15.975C46.976 15.975 46.976 98.678 76.976 98.678"
          stroke="#55CCFF"
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeDasharray="3 3"
        />
      </g>
      <g filter="url(#filter0_d_48_18)">
        <circle cx="15" cy="15" r="5" fill="#55CCFF" />
        <circle cx="15" cy="15" r="4.5" stroke="white" strokeOpacity="0.4" />
      </g>
      <g filter="url(#filter1_d_48_18)">
        <circle cx="79" cy="100" r="5" fill="#55CCFF" />
        <circle cx="79" cy="100" r="4.5" stroke="white" strokeOpacity="0.4" />
      </g>
      <defs>
        <filter
          id="filter0_d_48_18"
          x="0"
          y="0"
          width="30"
          height="30"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.478431 0 0 0 0 0 0.831373 0 0 0 0 0.980392 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_48_18"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_48_18"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_48_18"
          x="64"
          y="85"
          width="30"
          height="30"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.478431 0 0 0 0 0 0.831373 0 0 0 0 0.980392 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_48_18"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_48_18"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_48_18">
          <rect
            width="61"
            height="85"
            fill="white"
            transform="translate(16 15)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
