import React from 'react';
import { 
  BookOpen, 
  Award, 
  Printer, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  User, 
  GraduationCap
} from 'lucide-react';
import { StudentProfile } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ThemeSelector } from './ThemeSelector';

interface HeaderProps {
  activeTab: 'worksheets' | 'exam' | 'flashcards' | 'print' | 'report';
  setActiveTab: (tab: 'worksheets' | 'exam' | 'flashcards' | 'print' | 'report') => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  totalPoints: number;
  maxPoints: number;
  completedQuestionsCount: number;
  totalQuestionsCount: number;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  student,
  totalPoints,
  maxPoints,
  completedQuestionsCount,
  totalQuestionsCount,
  onOpenProfile
}) => {
  const { theme } = useTheme();
  const progressPercent = Math.min(100, Math.round((completedQuestionsCount / Math.max(1, totalQuestionsCount)) * 100));

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr ${theme.gradientHeader} text-white flex items-center justify-center shadow-md ${theme.glowShadow} shrink-0`}>
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.primaryBorder} flex items-center gap-1`}>
                  <Sparkles className="w-3 h-3" />
                  <span>المرحلة الثانوية • الحاسب والتقنية الرقمية</span>
                </span>
                <span className="text-xs text-slate-400 hidden md:inline">
                  العام الدراسي 1447هـ
                </span>
              </div>
              <h1 className="text-base sm:text-lg lg:text-xl font-black text-slate-900 leading-tight flex items-center gap-1.5 mt-0.5">
                <span>أوراق عمل مهام نظام التشغيل التفاعلية</span>
                <span className="text-sm">🌸</span>
              </h1>
            </div>
          </div>

          {/* Student Profile, Theme Selector & Live Score */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Selector Palette */}
            <ThemeSelector />

            {/* Live Progress Chip */}
            <div className="hidden lg:flex flex-col items-end border-l border-slate-200 pl-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>الأسئلة المنجزة: {completedQuestionsCount} من {totalQuestionsCount}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
                <span className="text-xs font-bold text-slate-700">{progressPercent}%</span>
              </div>
            </div>

            {/* Score Badge */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/80 px-2.5 sm:px-3 py-1.5 rounded-xl text-amber-800 shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <div className="text-right">
                <span className="text-[10px] text-amber-700 font-bold block leading-none">مجموع النقاط</span>
                <span className="text-xs sm:text-sm font-black text-amber-900 leading-none">{totalPoints} <span className="text-[10px] font-normal text-amber-600">/ {maxPoints}</span></span>
              </div>
            </div>

            {/* Student Profile Button */}
            <button
              id="student-profile-btn"
              onClick={onOpenProfile}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border border-pink-200/70 hover:border-pink-300 hover:bg-pink-50/50 transition-colors bg-white text-slate-700 shadow-2xs"
              title="تعديل بيانات الطالبة والمدرسة"
            >
              <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4" />
              </div>
              <div className="text-right hidden md:block">
                <span className="text-xs font-bold text-slate-800 block leading-tight truncate max-w-[110px]">
                  {student.name || 'طالبة'}
                </span>
                <span className="text-[10px] text-pink-600 font-semibold block leading-none truncate max-w-[110px]">
                  {student.gradeClass || 'الصف الأول الثانوي'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 space-x-reverse overflow-x-auto no-scrollbar py-2 border-t border-slate-100/80">
          <button
            id="tab-worksheets"
            onClick={() => setActiveTab('worksheets')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'worksheets'
                ? theme.navActive
                : 'text-slate-600 hover:text-slate-900 hover:bg-pink-50/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>أوراق العمل التفاعلية</span>
          </button>

          <button
            id="tab-exam"
            onClick={() => setActiveTab('exam')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'exam'
                ? theme.navActive
                : 'text-slate-600 hover:text-slate-900 hover:bg-pink-50/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>الاختبار الشامل والتقييم</span>
          </button>

          <button
            id="tab-flashcards"
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'flashcards'
                ? theme.navActive
                : 'text-slate-600 hover:text-slate-900 hover:bg-pink-50/60'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>بطاقات المراجعة والاستذكار</span>
          </button>

          <button
            id="tab-report"
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'report'
                ? theme.navActive
                : 'text-slate-600 hover:text-slate-900 hover:bg-pink-50/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>تقرير الأداء وشهادة الإتقان</span>
          </button>

          <button
            id="tab-print"
            onClick={() => setActiveTab('print')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === 'print'
                ? theme.navActive
                : 'text-slate-600 hover:text-slate-900 hover:bg-pink-50/60'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>طباعة وتصدير (PDF)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
