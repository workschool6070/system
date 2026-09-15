import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { THEMES, ThemeMode } from '../types/theme';

export const ThemeSelector: React.FC = () => {
  const { themeMode, setThemeMode, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="theme-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-pink-200/80 hover:border-pink-300 bg-white/90 shadow-xs hover:shadow-sm text-slate-700 transition-all text-xs font-bold"
        title="تغيير ألوان المظهر"
      >
        <span className="text-sm">{theme.icon}</span>
        <span className="hidden sm:inline text-slate-700">{theme.name.split(' ')[0]}</span>
        <Palette className="w-3.5 h-3.5 text-pink-500" />
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 sm:right-auto sm:left-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-pink-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-100 px-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-xs font-bold text-slate-800">اختاري المظهر والألوان المفضلة:</span>
          </div>

          <div className="space-y-1.5">
            {(Object.keys(THEMES) as ThemeMode[]).map((mode) => {
              const item = THEMES[mode];
              const isSelected = mode === themeMode;

              return (
                <button
                  key={mode}
                  onClick={() => {
                    setThemeMode(mode);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-right transition-all text-xs ${
                    isSelected
                      ? 'bg-rose-50/80 border border-rose-200 font-bold text-slate-900 shadow-2xs'
                      : 'hover:bg-slate-50 border border-transparent text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {isSelected && <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500 text-white font-bold">الحالي</span>}
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal leading-tight mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Visual Color Dot */}
                  <div className="flex items-center gap-1">
                    <div className={`w-4 h-4 rounded-full ${item.primary} shadow-2xs`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
