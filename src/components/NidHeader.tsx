import React from 'react';
import { EcLogo } from './EcLogo';

interface NidHeaderProps {
  onHomeClick?: () => void;
}

export const NidHeader: React.FC<NidHeaderProps> = ({ onHomeClick }) => {
  return (
    <div
      id="nid-official-header"
      className="w-full relative overflow-hidden bg-gradient-to-r from-[#143e2e] via-[#1a4f3b] to-[#205e46] text-white px-4 sm:px-6 py-3 shadow-sm rounded-t-sm"
      style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: EC Logo + Titles */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="shrink-0 drop-shadow-sm">
            <EcLogo size={58} />
          </div>
          <div>
            <h1 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-white font-sans leading-tight">
              Bangladesh Election Commission
            </h1>
            <p className="text-xs sm:text-sm md:text-[15px] font-medium text-[#FFE875] tracking-normal mt-0.5 font-sans">
              National Identity Registration Wing (NIDW)
            </p>
          </div>
        </div>

        {/* Right: Home button */}
        <div className="shrink-0 no-print">
          <button
            type="button"
            onClick={onHomeClick}
            className="bg-[#007bff] hover:bg-[#0069d9] active:bg-[#0056b3] text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};
