import React from 'react';
import { 
  Sparkles, 
  User, 
  CheckCircle2,
  GraduationCap,
  Award,
  ChevronRight,
  LogOut,
  Layers
} from 'lucide-react';
import { StudentProfile } from '../types';

interface HeaderProps {
  currentStep: 'login' | 'tasks' | 'report';
  currentModuleIndex: number;
  totalModulesCount: number;
  student: StudentProfile;
  totalPoints: number;
  maxPoints: number;
  completedQuestionsCount: number;
  totalQuestionsCount: number;
  onGoToLogin: () => void;
  onGoToReport: () => void;
  onSelectModuleIndex: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  currentModuleIndex,
  totalModulesCount,
  student,
  totalPoints,
  maxPoints,
  completedQuestionsCount,
  totalQuestionsCount,
  onGoToLogin,
  onGoToReport,
  onSelectModuleIndex
}) => {
  const progressPercent = Math.min(100, Math.round((completedQuestionsCount / Math.max(1, totalQuestionsCount)) * 100));

  if (currentStep === 'login') {
    return null; // The login screen has its own beautiful centered header
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs select-none">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        
        {/* Main Bar */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Right: Student Identity */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onGoToLogin}
              title="تعديل بيانات الطالبة أو تغيير الحساب"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0 transition-colors"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="text-right min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-black text-slate-900 truncate block">
                  {student.name || 'طالبة متميزة'}
                </span>
                <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-1.5 py-0.5 rounded-md border border-rose-100 hidden sm:inline">
                  {student.gradeClass || 'الأول الثانوي'}
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 truncate">
                معلمة المادة: <strong className="text-rose-700">أنهار الأحمدي</strong>
              </div>
            </div>
          </div>

          {/* Left: Points & Navigation shortcut */}
          <div className="flex items-center gap-2">
            
            {/* Live Score Badge */}
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-amber-900 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <div className="text-right">
                <span className="text-[9px] text-amber-700 font-bold block leading-none">النقاط</span>
                <span className="text-xs sm:text-sm font-black text-amber-900 leading-none">
                  {totalPoints} <span className="text-[9px] font-normal text-amber-600">/ {maxPoints}</span>
                </span>
              </div>
            </div>

            {/* Certificate Quick Button */}
            {currentStep === 'tasks' ? (
              <button
                onClick={onGoToReport}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-xs hover:from-rose-600 hover:to-pink-600 transition-all active:scale-95 shrink-0"
              >
                <Award className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">شهادة الإتقان</span>
              </button>
            ) : (
              <button
                onClick={() => onSelectModuleIndex(0)}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-xs hover:bg-black transition-all active:scale-95 shrink-0"
              >
                <Layers className="w-3.5 h-3.5 text-rose-300" />
                <span>مراجعة المهام</span>
              </button>
            )}

          </div>
        </div>

        {/* Step Progression Tabs (Mobile-Friendly Linear Steps) */}
        {currentStep === 'tasks' && (
          <div className="flex items-center justify-between gap-1 pb-2 pt-1 border-t border-rose-50/60 overflow-x-auto no-scrollbar">
            {[0, 1, 2, 3].map((idx) => {
              const isActive = currentModuleIndex === idx;
              const isPast = currentModuleIndex > idx;
              const taskNames = ['العمليات', 'الذاكرة', 'الملحقات', 'الملفات'];

              return (
                <button
                  key={idx}
                  onClick={() => onSelectModuleIndex(idx)}
                  className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-xl text-center text-[11px] font-bold transition-all flex items-center justify-center gap-1 border ${
                    isActive
                      ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center ${
                    isActive ? 'bg-white text-rose-600' : isPast ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isPast ? '✓' : idx + 1}
                  </span>
                  <span className="truncate">{taskNames[idx]}</span>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
};
