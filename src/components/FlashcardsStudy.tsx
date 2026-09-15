import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  RotateCcw, 
  Sparkles,
  Lightbulb
} from 'lucide-react';
import { OS_FLASHCARDS } from '../data/curriculumData';
import { CategoryType } from '../types';

export const FlashcardsStudy: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryType>('all');
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const filteredCards = selectedCategory === 'all'
    ? OS_FLASHCARDS
    : OS_FLASHCARDS.filter(c => c.category === selectedCategory);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleToggleMastered = (id: string) => {
    if (masteredIds.includes(id)) {
      setMasteredIds(masteredIds.filter(i => i !== id));
    } else {
      setMasteredIds([...masteredIds, id]);
    }
  };

  const isMastered = currentCard ? masteredIds.includes(currentCard.id) : false;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold mb-1">
            <Layers className="w-4 h-4" />
            <span>المراجعة الذكية لمفاهيم مهام نظام التشغيل</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            بطاقات الاستذكار السريع (Flashcards)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            راجع المفاهيم الأساسية لمهام نظام التشغيل الأربعة واختبر سرعة استحضارك للمعلومات.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'process_management', label: 'العمليات' },
            { id: 'memory_management', label: 'الذاكرة' },
            { id: 'io_management', label: 'الإدخال/الإخراج' },
            { id: 'file_management', label: 'الملفات' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                setSelectedCategory(f.id as any);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === f.id
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Counter */}
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>بطاقة {currentIndex + 1} من {filteredCards.length}</span>
        <span>المتقن: {masteredIds.length} من {OS_FLASHCARDS.length} بطاقة</span>
      </div>

      {/* Interactive Card */}
      {currentCard && (
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full min-h-[260px] sm:min-h-[290px] rounded-3xl border-2 border-indigo-100 hover:border-indigo-300 bg-gradient-to-b from-indigo-50/40 to-white p-8 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center relative group shadow-xs select-none"
        >
          <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-bold">
            {currentCard.topic}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            className="absolute top-4 left-4 p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-indigo-600 shadow-xs flex items-center gap-1 text-xs"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">اقلب البطاقة</span>
          </button>

          {!isFlipped ? (
            /* Front */
            <div className="space-y-3 max-w-lg">
              <span className="text-xs text-slate-400 font-bold block">السؤال / المفهوم</span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {currentCard.front}
              </h4>
              <p className="text-xs text-indigo-600 font-medium">
                (انقر على البطاقة لعرض الإجابة والشرح)
              </p>
            </div>
          ) : (
            /* Back */
            <div className="space-y-4 max-w-lg">
              <span className="text-xs text-indigo-600 font-bold block">الإجابة والتوضيح</span>
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {currentCard.back}
              </p>
              {currentCard.keyTakeaway && (
                <div className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-xl text-xs flex items-center justify-center gap-2 max-w-md mx-auto">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                  <span><strong>خلاصة سريعة:</strong> {currentCard.keyTakeaway}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5"
        >
          <ChevronRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        {currentCard && (
          <button
            onClick={() => handleToggleMastered(currentCard.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              isMastered
                ? 'bg-emerald-600 text-white'
                : 'border border-slate-200 bg-white hover:bg-emerald-50 text-slate-700'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isMastered ? 'تم الإتقان ✓' : 'تحديد كمُتقن'}</span>
          </button>
        )}

        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs"
        >
          <span>التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
