import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Info,
  Check,
  GripVertical
} from 'lucide-react';
import { 
  Question, 
  McqQuestion, 
  TrueFalseQuestion, 
  MatchingQuestion, 
  OrderingQuestion, 
  ScenarioQuestion 
} from '../types';

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  userAnswer: any;
  onAnswer: (questionId: string, answer: any, isCorrect: boolean, pointsEarned: number) => void;
  showFeedbackDirectly?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionIndex,
  userAnswer,
  onAnswer,
  showFeedbackDirectly = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<any>(userAnswer?.answer || null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(userAnswer?.submitted || false);

  // For Matching type
  const [matchingState, setMatchingState] = useState<{ [termId: string]: string }>(
    userAnswer?.answer || {}
  );
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);

  // For Ordering / Drag and Drop type
  const [orderedItems, setOrderedItems] = useState<{ id: string; text: string; order: number }[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    if (userAnswer) {
      setSelectedAnswer(userAnswer.answer);
      setIsSubmitted(userAnswer.submitted || false);
      if (question.type === 'matching') {
        setMatchingState(userAnswer.answer || {});
      } else if (question.type === 'ordering') {
        setOrderedItems(userAnswer.answer || [...(question as OrderingQuestion).items].sort(() => Math.random() - 0.5));
      }
    } else {
      setSelectedAnswer(null);
      setIsSubmitted(false);
      if (question.type === 'ordering') {
        const shuffled = [...(question as OrderingQuestion).items].sort(() => Math.random() - 0.5);
        setOrderedItems(shuffled);
      }
    }
  }, [question, userAnswer]);

  // Handle MCQ
  const handleMcqSelect = (optionId: string) => {
    if (isSubmitted) return;
    const isCorrect = optionId === (question as McqQuestion).correctOptionId;
    setSelectedAnswer(optionId);
    setIsSubmitted(true);
    onAnswer(question.id, optionId, isCorrect, isCorrect ? question.points : 0);
  };

  // Handle True / False
  const handleTrueFalseSelect = (val: boolean) => {
    if (isSubmitted) return;
    const isCorrect = val === (question as TrueFalseQuestion).isCorrect;
    setSelectedAnswer(val);
    setIsSubmitted(true);
    onAnswer(question.id, val, isCorrect, isCorrect ? question.points : 0);
  };

  // Handle Matching
  const handleSelectTerm = (termId: string) => {
    if (isSubmitted) return;
    setSelectedTermId(termId === selectedTermId ? null : termId);
  };

  const handleSelectDefinition = (defId: string) => {
    if (isSubmitted || !selectedTermId) return;
    const updated = { ...matchingState, [selectedTermId]: defId };
    setMatchingState(updated);
    setSelectedTermId(null);

    const q = question as MatchingQuestion;
    if (Object.keys(updated).length === q.pairs.length) {
      const allCorrect = q.pairs.every(p => updated[p.id] === p.id);
      setIsSubmitted(true);
      setSelectedAnswer(updated);
      onAnswer(question.id, updated, allCorrect, allCorrect ? question.points : 0);
    }
  };

  const handleClearMatchingPair = (termId: string) => {
    if (isSubmitted) return;
    const updated = { ...matchingState };
    delete updated[termId];
    setMatchingState(updated);
  };

  // Handle Ordering / Drag & Drop
  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    if (isSubmitted) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= orderedItems.length) return;

    const newItems = [...orderedItems];
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setOrderedItems(newItems);
  };

  // Native HTML5 Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (isSubmitted) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    if (isSubmitted) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    if (isSubmitted) return;
    e.preventDefault();
    setDragOverIndex(null);
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      return;
    }

    const newItems = [...orderedItems];
    const [movedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, movedItem);

    setOrderedItems(newItems);
    setDraggedIndex(null);
  };

  const handleSubmitOrder = () => {
    if (isSubmitted) return;
    const isCorrect = orderedItems.every((item, idx) => item.order === idx + 1);
    setIsSubmitted(true);
    setSelectedAnswer(orderedItems);
    onAnswer(question.id, orderedItems, isCorrect, isCorrect ? question.points : 0);
  };

  // Handle Scenario
  const handleScenarioSelect = (optionId: string) => {
    if (isSubmitted) return;
    const q = question as ScenarioQuestion;
    const isCorrect = optionId === q.correctOptionId;
    setSelectedAnswer(optionId);
    setIsSubmitted(true);
    onAnswer(question.id, optionId, isCorrect, isCorrect ? question.points : 0);
  };

  const handleReset = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setMatchingState({});
    setSelectedTermId(null);
    if (question.type === 'ordering') {
      setOrderedItems([...(question as OrderingQuestion).items].sort(() => Math.random() - 0.5));
    }
    onAnswer(question.id, null, false, 0);
  };

  const isUserCorrect = userAnswer?.isCorrect;

  return (
    <div 
      id={`question-card-${question.id}`}
      className={`rounded-2xl border transition-all duration-200 bg-white p-5 sm:p-6 shadow-xs ${
        isSubmitted
          ? isUserCorrect
            ? 'border-emerald-200 bg-emerald-50/20'
            : 'border-rose-200 bg-rose-50/20'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Header Info */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-sm flex items-center justify-center border border-indigo-100">
            س{questionIndex + 1}
          </span>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{question.title}</h3>
            <span className="text-[11px] text-slate-500">{question.difficulty}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {question.points} درجات
          </span>
          {isSubmitted && (
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
              title="إعادة المحاولة"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">إعادة</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="text-base text-slate-800 font-medium leading-relaxed mb-5">
        {question.question}
      </div>

      {/* ========================================================================= */}
      {/* 1. MCQ Question */}
      {/* ========================================================================= */}
      {question.type === 'mcq' && (
        <div className="grid grid-cols-1 gap-2.5">
          {(question as McqQuestion).options.map((opt, i) => {
            const letters = ['أ', 'ب', 'ج', 'د'];
            const isSelected = selectedAnswer === opt.id;
            const isTargetCorrect = opt.id === (question as McqQuestion).correctOptionId;
            
            let btnClasses = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800 bg-white';
            if (isSubmitted) {
              if (isTargetCorrect) {
                btnClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold shadow-xs';
              } else if (isSelected && !isTargetCorrect) {
                btnClasses = 'border-rose-400 bg-rose-50 text-rose-900';
              } else {
                btnClasses = 'border-slate-100 opacity-60 text-slate-600 bg-slate-50/50';
              }
            } else if (isSelected) {
              btnClasses = 'border-indigo-600 bg-indigo-50/60 text-indigo-900';
            }

            return (
              <button
                key={opt.id}
                id={`q-${question.id}-opt-${opt.id}`}
                disabled={isSubmitted}
                onClick={() => handleMcqSelect(opt.id)}
                className={`w-full text-right p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 ${btnClasses}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                    isSubmitted && isTargetCorrect
                      ? 'bg-emerald-600 text-white'
                      : isSubmitted && isSelected
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {letters[i] || opt.id}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </div>
                {isSubmitted && isTargetCorrect && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
                {isSubmitted && isSelected && !isTargetCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. True / False Question */}
      {/* ========================================================================= */}
      {question.type === 'true_false' && (
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: true, label: 'صح (صحيحة)', icon: CheckCircle, color: 'emerald' },
            { val: false, label: 'خطأ (غير صحيحة)', icon: XCircle, color: 'rose' }
          ].map(item => {
            const isSelected = selectedAnswer === item.val;
            const isTargetCorrect = item.val === (question as TrueFalseQuestion).isCorrect;

            let cardClass = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
            if (isSubmitted) {
              if (isTargetCorrect) {
                cardClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
              } else if (isSelected && !isTargetCorrect) {
                cardClass = 'border-rose-400 bg-rose-50 text-rose-900';
              } else {
                cardClass = 'border-slate-100 opacity-50 bg-slate-50';
              }
            }

            return (
              <button
                key={String(item.val)}
                id={`q-${question.id}-tf-${item.val}`}
                disabled={isSubmitted}
                onClick={() => handleTrueFalseSelect(item.val)}
                className={`p-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${cardClass}`}
              >
                <item.icon className={`w-5 h-5 ${
                  isSubmitted 
                    ? isTargetCorrect ? 'text-emerald-600' : 'text-rose-500'
                    : isSelected ? 'text-indigo-600' : 'text-slate-400'
                }`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. Matching Question */}
      {/* ========================================================================= */}
      {question.type === 'matching' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-100">
            💡 <strong>طريقة الإجابة:</strong> اضغط على المصطلح من العمود الأيمن أولاً، ثم اضغط على التعريف المناسب له في العمود الأيسر للتوصيل.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column A: Terms */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 block mb-1">المصطلحات والمفاهيم:</span>
              {(question as MatchingQuestion).pairs.map((p) => {
                const matchedDefId = matchingState[p.id];
                const matchedDef = (question as MatchingQuestion).pairs.find(x => x.id === matchedDefId);
                const isSelected = selectedTermId === p.id;
                const isCorrect = isSubmitted && matchedDefId === p.id;

                let borderStyle = 'border-slate-200 bg-white hover:border-indigo-300';
                if (isSubmitted) {
                  borderStyle = isCorrect ? 'border-emerald-500 bg-emerald-50/50' : 'border-rose-300 bg-rose-50/50';
                } else if (isSelected) {
                  borderStyle = 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200';
                } else if (matchedDefId) {
                  borderStyle = 'border-indigo-300 bg-indigo-50/30';
                }

                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectTerm(p.id)}
                    className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${borderStyle}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-900">{p.term}</span>
                      {matchedDefId && !isSubmitted && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClearMatchingPair(p.id);
                          }}
                          className="text-[10px] text-rose-500 hover:underline"
                        >
                          إلغاء الربط
                        </button>
                      )}
                    </div>
                    {matchedDef && (
                      <div className="text-[11px] text-indigo-700 bg-white/80 p-1.5 rounded-md border border-indigo-100 flex items-center gap-1 font-normal">
                        <span>🔗 تم التوصيل: {matchedDef.definition.slice(0, 45)}...</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Column B: Definitions */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 block mb-1">التعريفات والوظائف:</span>
              {[...(question as MatchingQuestion).pairs]
                .sort((a, b) => a.definition.localeCompare(b.definition))
                .map((p) => {
                  const isUsed = Object.values(matchingState).includes(p.id);
                  const isCandidate = !!selectedTermId;

                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectDefinition(p.id)}
                      className={`p-3 rounded-xl border text-xs sm:text-sm transition-all leading-relaxed ${
                        isSubmitted
                          ? 'border-slate-200 bg-slate-50 text-slate-700'
                          : isCandidate
                          ? 'border-indigo-400 bg-indigo-50/40 hover:bg-indigo-100/70 cursor-pointer shadow-xs font-medium text-indigo-950'
                          : isUsed
                          ? 'border-slate-200 bg-slate-100/70 text-slate-400'
                          : 'border-slate-200 bg-white text-slate-800'
                      }`}
                    >
                      {p.definition}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. Ordering / Drag & Drop Question */}
      {/* ========================================================================= */}
      {question.type === 'ordering' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-600 bg-indigo-50/60 p-2.5 rounded-lg border border-indigo-100 flex items-center justify-between gap-2">
            <span>🖐️ <strong>السحب والإفلات المباشر:</strong> اسحب البطاقات للأعلى أو الأسفل، أو استخدم الأسهم للترتيب.</span>
            <span className="text-[11px] font-bold text-indigo-700">عدد العناصر: {orderedItems.length}</span>
          </p>

          <div className="space-y-2.5">
            {orderedItems.map((item, idx) => {
              const isItemCorrect = isSubmitted && item.order === idx + 1;
              const isDraggingThis = draggedIndex === idx;
              const isOverThis = dragOverIndex === idx;

              return (
                <div
                  key={item.id}
                  draggable={!isSubmitted}
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 select-none ${
                    isDraggingThis
                      ? 'opacity-40 border-indigo-400 bg-indigo-50/50 scale-[0.98]'
                      : isOverThis
                      ? 'border-indigo-600 bg-indigo-100/60 ring-2 ring-indigo-400'
                      : isSubmitted
                      ? isItemCorrect
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-medium'
                        : 'border-rose-300 bg-rose-50 text-rose-950'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs text-slate-800'
                  } ${!isSubmitted ? 'cursor-grab active:cursor-grabbing' : ''}`}
                >
                  <div className="flex items-center gap-2.5 flex-1">
                    {!isSubmitted && (
                      <span className="text-slate-400 hover:text-indigo-600 cursor-grab shrink-0 p-1" title="اسحب لإعادة الترتيب">
                        <GripVertical className="w-4 h-4" />
                      </span>
                    )}
                    <span className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{item.text}</span>
                  </div>

                  {!isSubmitted && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveOrder(idx, 'up')}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 disabled:opacity-20 transition-colors"
                        title="تحريك لأعلى"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === orderedItems.length - 1}
                        onClick={() => handleMoveOrder(idx, 'down')}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 disabled:opacity-20 transition-colors"
                        title="تحريك لأسفل"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {isSubmitted && (
                    <span className="text-xs font-bold shrink-0">
                      {isItemCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <span className="text-rose-600 font-mono text-xs">الصحيح: {item.order}</span>
                      )}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {!isSubmitted && (
            <button
              onClick={handleSubmitOrder}
              className="mt-3 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>تأكيد واعتماد الترتيب للتصحيح التلقائي</span>
            </button>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. Scenario Question */}
      {/* ========================================================================= */}
      {question.type === 'scenario' && (
        <div className="space-y-4">
          {(question as ScenarioQuestion).scenario && (
            <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-xl text-xs sm:text-sm text-indigo-950 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-indigo-900 font-bold mb-1">تفاصيل السيناريو التحليلي:</strong>
                {(question as ScenarioQuestion).scenario}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700">اختر الإجراء أو التفسير الصحيح:</h4>
            {(question as ScenarioQuestion).options.map((opt, i) => {
              const isSelected = selectedAnswer === opt.id;
              const isTargetCorrect = opt.id === (question as ScenarioQuestion).correctOptionId;

              let btnClasses = 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800 bg-white';
              if (isSubmitted) {
                if (isTargetCorrect) {
                  btnClasses = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isSelected && !isTargetCorrect) {
                  btnClasses = 'border-rose-400 bg-rose-50 text-rose-900';
                } else {
                  btnClasses = 'border-slate-100 opacity-60 bg-slate-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isSubmitted}
                  onClick={() => handleScenarioSelect(opt.id)}
                  className={`w-full text-right p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnClasses}`}
                >
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="leading-snug">{opt.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* Feedback & Pedagogical Explanation */}
      {/* ========================================================================= */}
      {(isSubmitted || showFeedbackDirectly) && (
        <div className={`mt-5 p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all ${
          isUserCorrect
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            : 'bg-amber-50/90 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-center justify-between font-bold mb-1.5">
            <div className="flex items-center gap-1.5">
              {isUserCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">إجابة صحيحة وممتازة! (+{question.points} درجات)</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span className="text-amber-900">ملاحظة تعليمية وتصويب الإجابة:</span>
                </>
              )}
            </div>
          </div>

          <p className="text-slate-700 mt-1">{question.explanation}</p>

          {question.type === 'true_false' && (question as TrueFalseQuestion).correctionIfFalse && (
            <p className="mt-2 p-2 rounded-lg bg-white/70 border border-amber-200/60 text-slate-800 font-medium">
              💡 <strong>التصويب الدقيق:</strong> {(question as TrueFalseQuestion).correctionIfFalse}
            </p>
          )}

          {question.type === 'ordering' && (
            <p className="mt-2 p-2 rounded-lg bg-white/70 border border-indigo-100 text-indigo-900 font-mono text-[11px]">
              📌 <strong>التسلسل الصحيح:</strong> {(question as OrderingQuestion).orderedDescription}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
