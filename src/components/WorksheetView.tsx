import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  HelpCircle, 
  Award, 
  FileText,
  Clock,
  RotateCcw,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorksheetModule } from '../types';
import { QuestionCard } from './QuestionCard';
import { useTheme } from '../context/ThemeContext';

interface WorksheetViewProps {
  modules: WorksheetModule[];
  currentModuleId: string;
  onSelectModule: (moduleId: string) => void;
  answers: { [questionId: string]: any };
  onAnswerQuestion: (questionId: string, answer: any, isCorrect: boolean, pointsEarned: number) => void;
  onNavigateToExam: () => void;
}

export const WorksheetView: React.FC<WorksheetViewProps> = ({
  modules,
  currentModuleId,
  onSelectModule,
  answers,
  onAnswerQuestion,
  onNavigateToExam
}) => {
  const { theme } = useTheme();
  const currentModule = modules.find(m => m.id === currentModuleId) || modules[0];
  const currentModuleIndex = modules.findIndex(m => m.id === currentModule.id);

  // Calculate module stats
  const totalQuestions = currentModule.questions.length;
  const answeredCount = currentModule.questions.filter(q => answers[q.id]?.submitted).length;
  const correctCount = currentModule.questions.filter(q => answers[q.id]?.isCorrect).length;
  const totalModulePoints = currentModule.questions.reduce((acc, q) => acc + q.points, 0);
  const earnedModulePoints = currentModule.questions.reduce((acc, q) => {
    return acc + (answers[q.id]?.pointsEarned || 0);
  }, 0);

  const isModuleCompleted = answeredCount === totalQuestions;

  const handleNextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      onSelectModule(modules[currentModuleIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevModule = () => {
    if (currentModuleIndex > 0) {
      onSelectModule(modules[currentModuleIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Module Selector Pills */}
      <div className="bg-white/90 backdrop-blur-xs p-3 rounded-2xl border border-pink-100 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {modules.map((mod, idx) => {
            const modAnswered = mod.questions.filter(q => answers[q.id]?.submitted).length;
            const isDone = modAnswered === mod.questions.length && mod.questions.length > 0;
            const isActive = mod.id === currentModule.id;

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? `${theme.navActive}`
                    : 'bg-white hover:bg-pink-50/50 text-slate-700 border border-slate-200/70 hover:border-pink-200'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'
                }`}>
                  {idx + 1}
                </span>
                <span>{mod.shortTitle}</span>
                {isDone && <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Module Overview Card */}
      <div className="bg-white rounded-3xl border border-pink-100/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.primaryBorder} flex items-center gap-1`}>
                <Sparkles className="w-3 h-3" />
                <span>ورقة العمل #{currentModuleIndex + 1}</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {totalQuestions} أسئلة تفاعلية • {totalModulePoints} نقطة
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">
              {currentModule.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {currentModule.description}
            </p>

            {/* Learning Objectives Chips */}
            {currentModule.learningObjectives && currentModule.learningObjectives.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-pink-500" />
                  <span>الأهداف التعليمية المكتسبة:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentModule.learningObjectives.map((obj, i) => (
                    <div key={i} className="text-[11px] sm:text-xs bg-rose-50/70 border border-rose-100 text-rose-800 px-2.5 py-1 rounded-lg">
                      🌸 {obj}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Module Progress Box */}
          <div className="bg-gradient-to-br from-rose-50/50 via-pink-50/40 to-purple-50/40 border border-rose-100 rounded-2xl p-5 shrink-0 flex flex-col items-center justify-center text-center min-w-[210px] space-y-3">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-pink-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-rose-500 transition-all duration-700 ease-out"
                  strokeDasharray={`${(answeredCount / Math.max(1, totalQuestions)) * 100}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-rose-900">
                {Math.round((answeredCount / Math.max(1, totalQuestions)) * 100)}%
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-800 block">
                {answeredCount} من {totalQuestions} تم حلها
              </span>
              <span className="text-[11px] text-rose-700 font-semibold mt-0.5 block">
                {earnedModulePoints} من {totalModulePoints} نقطة
              </span>
            </div>

            {isModuleCompleted && (
              <button
                onClick={triggerCelebration}
                className="text-[11px] font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 px-3 py-1 rounded-full shadow-xs transition-transform active:scale-95 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-200" />
                <span>أحسنتِ يا بطلة! 🎉</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-slate-800 font-black text-base">
            <BookOpen className="w-5 h-5 text-rose-500" />
            <span>الأنشطة والأسئلة التفاعلية:</span>
          </div>
          <span className="text-xs text-slate-500">
            أجيبي على الأسئلة للحصول على التغذية الراجعة والنقاط
          </span>
        </div>

        {currentModule.questions.map((question, idx) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionIndex={idx}
            userAnswer={answers[question.id]}
            onAnswer={onAnswerQuestion}
          />
        ))}
      </div>

      {/* Navigation Footer between Modules */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-pink-100 flex items-center justify-between gap-3 shadow-xs">
        <button
          onClick={handlePrevModule}
          disabled={currentModuleIndex === 0}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            currentModuleIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-white border border-pink-200 hover:bg-pink-50 text-slate-700'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>الورقة السابقة</span>
        </button>

        {currentModuleIndex < modules.length - 1 ? (
          <button
            onClick={handleNextModule}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-md shadow-rose-200 transition-all"
          >
            <span>الانتقال للورقة التالية</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onNavigateToExam}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-md shadow-amber-200 transition-all"
          >
            <Award className="w-4 h-4 text-amber-200" />
            <span>الانتقال للاختبار الشامل النهائي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
