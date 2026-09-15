import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { Question, AssessmentResult, CategoryType, McqQuestion, ScenarioQuestion } from '../types';

interface ComprehensiveExamProps {
  onFinishExam: (result: AssessmentResult) => void;
  onGoToReport: () => void;
}

export const ComprehensiveExam: React.FC<ComprehensiveExamProps> = ({
  onFinishExam,
  onGoToReport
}) => {
  // Aggregate representative exam questions from all 4 OS modules
  const [examQuestions] = useState<Question[]>(() => {
    const all = CURRICULUM_MODULES.flatMap(m => m.questions);
    return all.slice(0, 12); // 12 comprehensive assessment questions across all 4 OS tasks
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState<{ [qId: string]: any }>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const currentQ = examQuestions[currentIdx];

  const handleSelectAnswer = (ans: any) => {
    if (isSubmitted) return;
    setExamAnswers(prev => ({ ...prev, [currentQ.id]: ans }));
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);

    let totalScore = 0;
    let maxScore = 0;

    const catScores: { [key in CategoryType]: { score: number; maxScore: number; percentage: number } } = {
      process_management: { score: 0, maxScore: 0, percentage: 0 },
      memory_management: { score: 0, maxScore: 0, percentage: 0 },
      io_management: { score: 0, maxScore: 0, percentage: 0 },
      file_management: { score: 0, maxScore: 0, percentage: 0 }
    };

    examQuestions.forEach(q => {
      maxScore += q.points;
      catScores[q.category].maxScore += q.points;

      const userAns = examAnswers[q.id];
      let isCorrect = false;

      if (q.type === 'mcq' || q.type === 'scenario') {
        isCorrect = userAns === (q as any).correctOptionId;
      } else if (q.type === 'true_false') {
        isCorrect = userAns === q.isCorrect;
      } else if (q.type === 'matching') {
        if (userAns && typeof userAns === 'object') {
          isCorrect = q.pairs.every(p => userAns[p.id] === p.id);
        }
      } else if (q.type === 'ordering') {
        if (Array.isArray(userAns)) {
          isCorrect = userAns.every((it, idx) => it.order === idx + 1);
        }
      }

      if (isCorrect) {
        totalScore += q.points;
        catScores[q.category].score += q.points;
      }
    });

    // Calculate percentage per category
    Object.keys(catScores).forEach(cat => {
      const c = cat as CategoryType;
      if (catScores[c].maxScore > 0) {
        catScores[c].percentage = Math.round((catScores[c].score / catScores[c].maxScore) * 100);
      }
    });

    const percentage = Math.round((totalScore / Math.max(1, maxScore)) * 100);

    let gradeLevel: AssessmentResult['gradeLevel'] = 'بحاجة لمراجعة';
    if (percentage >= 90) gradeLevel = 'ممتاز';
    else if (percentage >= 80) gradeLevel = 'جيد جداً';
    else if (percentage >= 65) gradeLevel = 'جيد';

    const strengths: string[] = [];
    const areasForImprovement: string[] = [];

    if (catScores.process_management.percentage >= 75) strengths.push('إدارة العمليات وحالات دورة الحياة وتعدد المهام');
    else areasForImprovement.push('مفاهيم إدارة العمليات وجدولة المعالج');

    if (catScores.memory_management.percentage >= 75) strengths.push('إدارة الذاكرة الرئيسية والذاكرة الافتراضية');
    else areasForImprovement.push('آليات تخصيص الذاكرة والذاكرة الافتراضية');

    if (catScores.io_management.percentage >= 75) strengths.push('إدارة أجهزة الإدخال والإخراج وبرامج التشغيل');
    else areasForImprovement.push('إدارة المقاطعات وبرامج تشغيل الأجهزة والتخزين المؤقت');

    if (catScores.file_management.percentage >= 75) strengths.push('إدارة الملفات والنظم الهيكلية وصلاحيات الوصول');
    else areasForImprovement.push('هيكلية المجلدات الشجرية ونظم وأذونات الملفات');

    const result: AssessmentResult = {
      totalScore,
      maxScore,
      percentage,
      categoryScores: catScores,
      strengths: strengths.length > 0 ? strengths : ['الإلمام بأساسيات الحاسب ونظم التشغيل'],
      areasForImprovement: areasForImprovement.length > 0 ? areasForImprovement : ['مراجعة متقدمة لحالات المعالجة وإدارة الذاكرة'],
      gradeLevel,
      timestamp: new Date().toLocaleDateString('ar-SA')
    };

    setAssessmentResult(result);
    onFinishExam(result);

    if (percentage >= 80) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRetake = () => {
    setIsSubmitted(false);
    setExamAnswers({});
    setCurrentIdx(0);
    setTimeLeft(15 * 60);
    setAssessmentResult(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            اختبار قياس الاستيعاب الشامل لمهام نظام التشغيل
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            اختبار معياري موحد يقيس إتقانك للمهام الأربعة الأساسية: إدارة العمليات، الذاكرة، الإدخال/الإخراج، والملفات.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isSubmitted && (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-mono font-bold">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}

          <div className="px-4 py-2 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold">
            السؤال {currentIdx + 1} من {examQuestions.length}
          </div>
        </div>
      </div>

      {/* When Submitted -> Show Summary Card */}
      {isSubmitted && assessmentResult ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <Award className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
              التقدير العام: {assessmentResult.gradeLevel}
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              نتيجة تقييم مستوى الاستيعاب: {assessmentResult.percentage}%
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              حصلت على {assessmentResult.totalScore} درجة من إجمالي {assessmentResult.maxScore} درجة.
            </p>
          </div>

          {/* Competency Mastery Breakdown for the 4 Tasks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">إدارة العمليات (Process)</span>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">{assessmentResult.categoryScores.process_management.percentage}%</span>
                <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${assessmentResult.categoryScores.process_management.percentage}%` }} />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">إدارة الذاكرة (Memory)</span>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">{assessmentResult.categoryScores.memory_management.percentage}%</span>
                <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${assessmentResult.categoryScores.memory_management.percentage}%` }} />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">إدارة أجهزة الإدخال والإخراج (I/O)</span>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">{assessmentResult.categoryScores.io_management.percentage}%</span>
                <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${assessmentResult.categoryScores.io_management.percentage}%` }} />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">إدارة الملفات (Files)</span>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">{assessmentResult.categoryScores.file_management.percentage}%</span>
                <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${assessmentResult.categoryScores.file_management.percentage}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={onGoToReport}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs"
            >
              <FileCheck className="w-4 h-4" />
              <span>عرض التقرير المفصل واستخراج الشهادة</span>
            </button>
            <button
              onClick={handleRetake}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة الاختبار</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Exam Question */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Question Stepper */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
            {examQuestions.map((q, i) => {
              const hasAns = examAnswers[q.id] !== undefined;
              const isCurr = i === currentIdx;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center justify-center ${
                    isCurr
                      ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-200'
                      : hasAns
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                {currentQ.difficulty} • {currentQ.points} درجات
              </span>
              <span className="text-xs text-slate-500">{currentQ.title}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options Display */}
          {currentQ.type === 'mcq' && (
            <div className="space-y-2.5">
              {(currentQ as McqQuestion).options.map((opt, i) => {
                const isSelected = examAnswers[currentQ.id] === opt.id;
                const letters = ['أ', 'ب', 'ج', 'د'];
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectAnswer(opt.id)}
                    className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {letters[i] || opt.id}
                    </span>
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: true, label: 'صح (صحيحة)' },
                { val: false, label: 'خطأ (غير صحيحة)' }
              ].map(item => {
                const isSelected = examAnswers[currentQ.id] === item.val;
                return (
                  <button
                    key={String(item.val)}
                    onClick={() => handleSelectAnswer(item.val)}
                    className={`p-4 rounded-xl border text-xs sm:text-sm font-bold transition-all text-center ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}

          {currentQ.type === 'scenario' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                {(currentQ as ScenarioQuestion).scenario}
              </div>
              <div className="space-y-2">
                {(currentQ as ScenarioQuestion).options.map((opt, i) => {
                  const isSelected = examAnswers[currentQ.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectAnswer(opt.id)}
                      className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation & Submit */}
          <div className="flex items-center justify-between pt-5 border-t border-slate-100">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابق</span>
            </button>

            {currentIdx < examQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs"
              >
                <span>التالي</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>تسليم وإنهاء الاختبار</span>
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
