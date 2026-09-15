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
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorksheetModule } from '../types';
import { QuestionCard } from './QuestionCard';

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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Module Selector Pills */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {modules.map((mod, idx) => {
            const modAnswered = mod.questions.filter(q => answers[q.id]?.submitted).length;
            const isDone = modAnswered === mod.questions.length && mod.questions.length > 0;
            const isActive = mod.id === currentModule.id;

            return (
              <button
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-bold ${
                  isActive ? 'bg-indigo-800 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {idx + 1}
                </span>
                <span>{mod.shortTitle}</span>
                {isDone && <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-500'}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Hero & Objectives */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs mb-2">
            <BookOpen className="w-4 h-4" />
            <span>مقرر تقنية المعلومات والحاسب • المرحلة الثانوية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
            {currentModule.title}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            {currentModule.description}
          </p>

          {/* Learning Objectives Grid */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-4">
            <h3 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>الأهداف التعليمية ومخرجات التعلم المستهدفة:</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {currentModule.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Notes Summary */}
          {currentModule.summaryNotes && (
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-3.5 text-xs text-indigo-950 space-y-1">
              <strong className="block font-bold text-indigo-900">💡 إضاءة معرفية سريعة قبل البدء:</strong>
              {currentModule.summaryNotes.map((note, i) => (
                <p key={i} className="text-slate-700">• {note}</p>
              ))}
            </div>
          )}
        </div>

        {/* Live Module Progress Card */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">إنجاز الورقة:</span>
              <strong className="text-slate-900 font-bold text-sm">{answeredCount} من {totalQuestions} سؤال</strong>
            </div>
            <div className="border-r border-slate-200 pr-4">
              <span className="text-slate-500 block">الدرجة المحققة:</span>
              <strong className="text-indigo-700 font-bold text-sm">{earnedModulePoints} من {totalModulePoints} درجة</strong>
            </div>
            <div className="border-r border-slate-200 pr-4">
              <span className="text-slate-500 block">دقة الإجابات:</span>
              <strong className="text-emerald-700 font-bold text-sm">
                {answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0}%
              </strong>
            </div>
          </div>

          {isModuleCompleted && (
            <div className="flex items-center gap-2">
              <button
                onClick={triggerCelebration}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>أحسنت! احتفل بالإنجاز</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-5">
        {currentModule.questions.map((q, idx) => (
          <QuestionCard
            key={q.id}
            question={q}
            questionIndex={idx}
            userAnswer={answers[q.id]}
            onAnswer={onAnswerQuestion}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200">
        <button
          disabled={currentModuleIndex === 0}
          onClick={handlePrevModule}
          className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
          <span>الورقة السابقة</span>
        </button>

        <div className="text-xs text-slate-500 font-medium">
          ورقة {currentModuleIndex + 1} من {modules.length}
        </div>

        {currentModuleIndex < modules.length - 1 ? (
          <button
            onClick={handleNextModule}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs"
          >
            <span>الورقة التالية</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onNavigateToExam}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs"
          >
            <span>الانتقال للاختبار الشامل</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
