import React from 'react';

export const MinistryOfEducationLogo: React.FC<{ className?: string }> = ({ className = 'h-14' }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Official Saudi Ministry of Education SVG Iconic Dot Curves */}
      <svg
        viewBox="0 0 280 120"
        className="w-auto h-full max-h-12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Wing Dot Arc */}
        {/* Row 1 (Top) */}
        <circle cx="20" cy="22" r="7" fill="#149c88" />
        <circle cx="42" cy="26" r="6.5" fill="#18a490" />
        <circle cx="64" cy="33" r="6" fill="#22b39d" />
        <circle cx="86" cy="43" r="5.5" fill="#2cc4ad" />
        <circle cx="106" cy="56" r="5" fill="#3dd3bc" />
        <circle cx="122" cy="71" r="4.5" fill="#5ee2cc" />

        {/* Row 2 (Middle) */}
        <circle cx="20" cy="45" r="6.5" fill="#149c88" />
        <circle cx="42" cy="49" r="6" fill="#18a490" />
        <circle cx="64" cy="56" r="5.5" fill="#22b39d" />
        <circle cx="86" cy="65" r="5" fill="#2cc4ad" />
        <circle cx="106" cy="76" r="4.5" fill="#3dd3bc" />
        <circle cx="122" cy="90" r="4" fill="#5ee2cc" />

        {/* Row 3 (Bottom) */}
        <circle cx="20" cy="68" r="6" fill="#149c88" />
        <circle cx="42" cy="72" r="5.5" fill="#18a490" />
        <circle cx="64" cy="79" r="5" fill="#22b39d" />
        <circle cx="86" cy="88" r="4.5" fill="#2cc4ad" />
        <circle cx="106" cy="98" r="4" fill="#3dd3bc" />

        {/* Center Pivot Point */}
        <circle cx="140" cy="106" r="3.5" fill="#22b39d" />

        {/* Right Wing Dot Arc */}
        {/* Row 1 (Top) */}
        <circle cx="260" cy="22" r="7" fill="#149c88" />
        <circle cx="238" cy="26" r="6.5" fill="#18a490" />
        <circle cx="216" cy="33" r="6" fill="#22b39d" />
        <circle cx="194" cy="43" r="5.5" fill="#2cc4ad" />
        <circle cx="174" cy="56" r="5" fill="#3dd3bc" />
        <circle cx="158" cy="71" r="4.5" fill="#5ee2cc" />

        {/* Row 2 (Middle) */}
        <circle cx="260" cy="45" r="6.5" fill="#149c88" />
        <circle cx="238" cy="49" r="6" fill="#18a490" />
        <circle cx="216" cy="56" r="5.5" fill="#22b39d" />
        <circle cx="194" cy="65" r="5" fill="#2cc4ad" />
        <circle cx="174" cy="76" r="4.5" fill="#3dd3bc" />
        <circle cx="158" cy="90" r="4" fill="#5ee2cc" />

        {/* Row 3 (Bottom) */}
        <circle cx="260" cy="68" r="6" fill="#149c88" />
        <circle cx="238" cy="72" r="5.5" fill="#18a490" />
        <circle cx="216" cy="79" r="5" fill="#22b39d" />
        <circle cx="194" cy="88" r="4.5" fill="#2cc4ad" />
        <circle cx="174" cy="98" r="4" fill="#3dd3bc" />
      </svg>

      {/* Official Typography from Identity */}
      <div className="text-center mt-1">
        <div className="text-[#0e8f7c] font-black text-sm sm:text-base tracking-tight leading-none font-sans">
          وزارة التـعـلـيـم
        </div>
        <div className="text-[#758488] text-[9px] sm:text-[10px] font-medium tracking-wider uppercase leading-tight mt-0.5">
          Ministry of Education
        </div>
        <div className="text-slate-600 text-[9px] sm:text-[10px] font-bold leading-tight mt-0.5">
          المملكة العربية السعودية
        </div>
      </div>
    </div>
  );
};
