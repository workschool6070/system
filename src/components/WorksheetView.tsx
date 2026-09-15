import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Award, 
  Check,
  RotateCcw,
  Info,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorksheetModule } from '../types';
import { QuestionCard } from './QuestionCard';

interface WorksheetViewProps {
  modules: WorksheetModule[];
  currentModuleIndex: number;
  onSelectModuleIndex: (index: number) => void;
  answers: { [questionId: string]: any };
  onAnswerQuestion: (questionId: string, answer: any, isCorrect: boolean, pointsEarned: number) => void;
  onGoToReport: () => void;
}

export const WorksheetView: React.FC<WorksheetViewProps> = ({
  modules,
  currentModuleIndex,
  onSelectModuleIndex,
  answers,
  onAnswerQuestion,
  onGoToReport
}) => {
  const [showExplanation, setShowExplanation] = useState<boolean>(true);
  const currentModule = modules[currentModuleIndex] || modules[0];

  // Calculate module stats
  const totalQuestions = currentModule.questions.length;
  const answeredCount = currentModule.questions.filter(q => answers[q.id]?.submitted).length;
  const correctCount = currentModule.questions.filter(q => answers[q.id]?.isCorrect).length;
  const totalModulePoints = currentModule.questions.reduce((acc, q) => acc + q.points, 0);
  const earnedModulePoints = currentModule.questions.reduce((acc, q) => {
    return acc + (answers[q.id]?.isCorrect ? q.points : 0);
  }, 0);

  // Global points
  const allQuestions = modules.flatMap(m => m.questions);
  const totalGlobalPoints = allQuestions.reduce((a, b) => a + b.points, 0);
  const earnedGlobalPoints = modules.reduce((modAcc, mod) => {
    return modAcc + mod.questions.reduce((qAcc, q) => {
      return qAcc + (answers[q.id]?.isCorrect ? q.points : 0);
    }, 0);
  }, 0);

  const isModuleCompleted = answeredCount === totalQuestions;
  const isLastModule = currentModuleIndex === modules.length - 1;

  const handleNext = () => {
    if (!isLastModule) {
      onSelectModuleIndex(currentModuleIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onGoToReport();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentModuleIndex > 0) {
      onSelectModuleIndex(currentModuleIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Roadmap & Global Score Bar */}
      <div className="bg-white rounded-2xl border border-rose-100 p-3 sm:p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-1.5 text-slate-800">
            <Layers className="w-4 h-4 text-rose-500" />
            <span>تسلسل المهام الأربعة:</span>
          </div>
          <div className="text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            مجموع نقاطك الكلية: <strong className="text-rose-600 text-sm font-black">{earnedGlobalPoints}</strong> من <strong>{totalGlobalPoints}</strong>
          </div>
        </div>

        {/* 4 Steps Chips with Points */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 pt-1">
          {modules.map((mod, idx) => {
            const modAnswered = mod.questions.filter(q => answers[q.id]?.submitted).length;
            const modIsDone = modAnswered === mod.questions.length && mod.questions.length > 0;
            const modEarned = mod.questions.reduce((acc, q) => acc + (answers[q.id]?.isCorrect ? q.points : 0), 0);
            const modTotal = mod.questions.reduce((acc, q) => acc + q.points, 0);
            const isCurrent = idx === currentModuleIndex;

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModuleIndex(idx)}
                className={`p-2 rounded-xl text-center transition-all border ${
                  isCurrent
                    ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                    : modIsDone
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="text-[11px] font-black leading-tight truncate">
                  المهمة {idx + 1}
                </div>
                <div className={`text-[10px] font-bold mt-0.5 ${
                  isCurrent ? 'text-rose-100' : modIsDone ? 'text-emerald-700' : 'text-slate-500'
                }`}>
                  {modEarned} / {modTotal} درجة
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Task Header Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-rose-100 p-4 sm:p-6 shadow-xs relative overflow-hidden space-y-3">
        
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>المهمة ({currentModuleIndex + 1} من {modules.length}): {currentModule.shortTitle}</span>
          </span>

          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
            درجات هذه المهمة: <strong className="text-rose-600 font-black">{earnedModulePoints}</strong> من <strong>{totalModulePoints}</strong> درجات
          </span>
        </div>

        {/* Task Title */}
        <h2 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
          {currentModule.title}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {currentModule.description}
        </p>

        {/* =============================================================== */}
        {/* 📖 Concept Lesson Card for this Specific Task (شرح مفهوم المهمة) */}
        {/* =============================================================== */}
        {currentModule.lessonExplanation && (
          <div className="mt-3 bg-gradient-to-br from-rose-50/70 via-pink-50/40 to-amber-50/40 border border-rose-200/80 rounded-2xl p-4 sm:p-5 space-y-3 text-right">
            <div className="flex items-center justify-between pb-2 border-b border-rose-200/60">
              <div className="flex items-center gap-2 text-rose-900 font-black text-xs sm:text-sm">
                <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{currentModule.lessonExplanation.conceptTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-[11px] font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 bg-white px-2 py-0.5 rounded-lg border border-rose-200"
              >
                <span>{showExplanation ? 'إخفاء الشرح' : 'قراءة الشرح'}</span>
                {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showExplanation && (
              <div className="space-y-3 text-xs sm:text-sm animate-fade-in">
                <p className="text-slate-700 leading-relaxed font-medium">
                  {currentModule.lessonExplanation.overview}
                </p>

                {/* Key Bullet Points */}
                <div className="space-y-1.5 bg-white/80 p-3 rounded-xl border border-rose-100">
                  <span className="font-black text-slate-800 text-xs block mb-1">أبرز المفاهيم المستفادة:</span>
                  {currentModule.lessonExplanation.keyPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2 text-slate-700 text-xs leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Real world example */}
                <div className="p-2.5 bg-amber-100/60 border border-amber-200 rounded-xl text-[11px] sm:text-xs text-amber-950">
                  <strong>🌸 مثال واقعي للتبسيط:</strong> {currentModule.lessonExplanation.realWorldExample}
                </div>

                {/* Golden rule */}
                <div className="text-[11px] sm:text-xs font-black text-rose-900 bg-rose-100/70 p-2 rounded-xl text-center">
                  ✨ {currentModule.lessonExplanation.goldenRule}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Celebration Banner when completed */}
        {isModuleCompleted && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>أحسنتِ! تم حل أسئلة هذه المهمة وكسب ({earnedModulePoints} من {totalModulePoints}) درجات 🌸</span>
            </div>
            <button
              onClick={triggerCelebration}
              className="text-[11px] font-bold bg-emerald-600 text-white px-3 py-1 rounded-xl shrink-0 active:scale-95"
            >
              احتفال 🎉
            </button>
          </div>
        )}
      </div>

      {/* Interactive Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-slate-900 font-black text-sm sm:text-base">
            <BookOpen className="w-4 h-4 text-rose-500" />
            <span>الأسئلة التفاعلية لهذه المهمة ({totalQuestions} أسئلة • {totalModulePoints} درجات):</span>
          </div>
          <span className="text-[11px] text-slate-500 font-bold">
            كل سؤال = 2.5 درجة
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

      {/* Linear Sequential Navigation Bar (Mobile First Bottom Bar) */}
      <div className="bg-white p-4 rounded-2xl sm:rounded-3xl border border-rose-100 shadow-md flex items-center justify-between gap-3 sticky bottom-3 z-30">
        
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentModuleIndex === 0}
          className={`flex-1 sm:flex-initial py-3 px-4 sm:px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all min-h-[46px] ${
            currentModuleIndex === 0
              ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>المهمة السابقة</span>
        </button>

        {/* Next or Finish Button */}
        {!isLastModule ? (
          <button
            onClick={handleNext}
            className="flex-1 sm:flex-initial py-3 px-5 sm:px-8 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-md shadow-pink-200 flex items-center justify-center gap-2 transition-all active:scale-95 min-h-[46px]"
          >
            <span>الانتقال للمهمة التالية ({currentModuleIndex + 2} من 4)</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 sm:flex-initial py-3 px-5 sm:px-8 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white shadow-lg shadow-rose-200 flex items-center justify-center gap-2 transition-all active:scale-95 min-h-[46px] animate-pulse"
          >
            <Award className="w-4 h-4 text-amber-200" />
            <span>عرض تقرير الأداء النهائي وشهادة التميز 🌟</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

      </div>

    </div>
  );
};
