import React from 'react';

export const EcLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 52 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`inline-block select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="বাংলাদেশ নির্বাচন কমিশন লোগো"
    >
      <defs>
        <path
          id="textPathTop"
          d="M 16,50 A 34,34 0 1,1 84,50"
          fill="none"
        />
        <path
          id="textPathBottom"
          d="M 84,50 A 34,34 0 0,1 16,50"
          fill="none"
        />
        <radialGradient id="greenRim" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#0B5330" />
          <stop offset="100%" stopColor="#063820" />
        </radialGradient>
        <radialGradient id="redDisc" cx="50%" cy="50%" r="50%">
          <stop offset="65%" stopColor="#D62828" />
          <stop offset="100%" stopColor="#A81D1D" />
        </radialGradient>
      </defs>

      {/* Outer scalloped/gold ring */}
      <circle cx="50" cy="50" r="48" fill="url(#greenRim)" stroke="#E5C158" strokeWidth="2.5" />

      {/* Fine inner border */}
      <circle cx="50" cy="50" r="39" fill="none" stroke="#E5C158" strokeWidth="1" strokeDasharray="2,2" />

      {/* Red inner circle */}
      <circle cx="50" cy="50" r="30" fill="url(#redDisc)" stroke="#FFE898" strokeWidth="1.2" />

      {/* Circular text "বাংলাদেশ নির্বাচন কমিশন" */}
      <text fill="#FFE898" fontSize="8.2" fontWeight="bold" letterSpacing="0.4" fontFamily="sans-serif">
        <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
          বাংলাদেশ নির্বাচন কমিশন
        </textPath>
      </text>

      {/* Star symbols on sides */}
      <text fill="#FFE898" fontSize="6" x="12" y="52" textAnchor="middle">★</text>
      <text fill="#FFE898" fontSize="6" x="88" y="52" textAnchor="middle">★</text>

      {/* English subtext at bottom curve */}
      <text fill="#FFE898" fontSize="5.5" fontWeight="600" letterSpacing="0.5" fontFamily="sans-serif">
        <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
          BANGLADESH
        </textPath>
      </text>

      {/* Center symbol: Scales of Justice & Ballot Box Emblem */}
      {/* Central star / scales */}
      <g transform="translate(50, 50) scale(0.65)">
        {/* Scale beam */}
        <line x1="-16" y1="-3" x2="16" y2="-3" stroke="#FFE898" strokeWidth="2.5" strokeLinecap="round" />
        {/* Center column */}
        <line x1="0" y1="-8" x2="0" y2="15" stroke="#FFE898" strokeWidth="2.5" strokeLinecap="round" />
        {/* Top finial */}
        <circle cx="0" cy="-9" r="2.5" fill="#FFE898" />
        {/* Left pan strings */}
        <line x1="-14" y1="-2" x2="-20" y2="7" stroke="#FFE898" strokeWidth="1" />
        <line x1="-14" y1="-2" x2="-8" y2="7" stroke="#FFE898" strokeWidth="1" />
        {/* Left pan */}
        <path d="M -22,7 Q -14,14 -6,7 Z" fill="#FFE898" />

        {/* Right pan strings */}
        <line x1="14" y1="-2" x2="8" y2="7" stroke="#FFE898" strokeWidth="1" />
        <line x1="14" y1="-2" x2="20" y2="7" stroke="#FFE898" strokeWidth="1" />
        {/* Right pan */}
        <path d="M 6,7 Q 14,14 22,7 Z" fill="#FFE898" />

        {/* Base */}
        <path d="M -10,15 L 10,15 L 6,18 L -6,18 Z" fill="#FFE898" />
      </g>
    </svg>
  );
};
