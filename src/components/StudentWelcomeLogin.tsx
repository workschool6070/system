import React, { useState } from 'react';
import { 
  Sparkles, 
  User, 
  School, 
  Layers, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  ChevronLeft,
  Info,
  Cpu,
  HardDrive,
  FolderTree,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { StudentProfile } from '../types';
import { MinistryOfEducationLogo } from './MinistryOfEducationLogo';
import { LESSON_INTRODUCTION } from '../data/curriculumData';

interface StudentWelcomeLoginProps {
  student: StudentProfile;
  onStart: (updatedStudent: StudentProfile) => void;
}

export const StudentWelcomeLogin: React.FC<StudentWelcomeLoginProps> = ({
  student,
  onStart
}) => {
  const [name, setName] = useState(student.name || '');
  const [gradeClass, setGradeClass] = useState(student.gradeClass || 'الأول الثانوي / 1');
  const [schoolName, setSchoolName] = useState(student.schoolName || 'المرحلة الثانوية');
  const [showLessonSummary, setShowLessonSummary] = useState(true);
  const [error, setError] = useState('');

  const quickClasses = ['الأول الثانوي / 1', 'الأول الثانوي / 2', 'الأول الثانوي / 3', 'الأول الثانوي / 4'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('يرجى إدخال اسم الطالبة للمتابعة واستخراج شهادة التميز باسمك');
      return;
    }
    setError('');
    onStart({
      ...student,
      name: name.trim(),
      gradeClass: gradeClass.trim(),
      schoolName: schoolName.trim()
    });
  };

  return (
    <div className="max-w-xl mx-auto py-2 sm:py-6 px-3 sm:px-4 space-y-4">
      {/* Main Card */}
      <div className="bg-white rounded-3xl sm:rounded-[32px] border border-rose-100 shadow-xl overflow-hidden">
        
        {/* Header Ribbon / Logo */}
        <div className="bg-gradient-to-b from-rose-50/80 via-pink-50/40 to-white p-6 sm:p-8 text-center border-b border-rose-100/60 relative">
          
          <div className="flex justify-center mb-4">
            <MinistryOfEducationLogo className="h-16 sm:h-20" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-bold mb-3 border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>مقرر الحاسب والتقنية الرقمية • المرحلة الثانوية</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            أوراق عمل مهام نظام التشغيل التفاعلية
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">
            معلمة المادة: <span className="font-bold text-rose-700">أنهار الأحمدي</span>
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          
          <div className="text-center sm:text-right">
            <h2 className="text-base sm:text-lg font-black text-slate-800 flex items-center justify-center sm:justify-start gap-2">
              <User className="w-5 h-5 text-rose-500" />
              <span>تسجيل دخول الطالبة</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              أدخلي بياناتك لتسجيل أدائك والحصول على شهادة التميز فور إكمال المهام
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Student Name */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-bold text-slate-700">
              اسم الطالبة <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="مثال: سارة محمد الغامدي"
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 bg-slate-50/50 focus:bg-white text-sm font-bold text-slate-900 transition-all outline-hidden text-right"
              autoFocus
            />
          </div>

          {/* Grade and Class */}
          <div className="space-y-2 text-right">
            <label className="block text-xs font-bold text-slate-700">
              الصف والشعبة
            </label>
            <input
              type="text"
              value={gradeClass}
              onChange={(e) => setGradeClass(e.target.value)}
              placeholder="مثال: الأول الثانوي / 1"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-rose-500 bg-slate-50/50 focus:bg-white text-xs sm:text-sm font-semibold text-slate-800 transition-all outline-hidden text-right"
            />
            {/* Quick selectors */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickClasses.map((cls) => (
                <button
                  type="button"
                  key={cls}
                  onClick={() => setGradeClass(cls)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                    gradeClass === cls
                      ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {/* School Name */}
          <div className="space-y-1.5 text-right">
            <label className="block text-xs font-bold text-slate-700">
              المدرسة (اختياري)
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="مثال: ثانوية اليرموك للبنات"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-rose-500 bg-slate-50/50 focus:bg-white text-xs sm:text-sm font-semibold text-slate-800 transition-all outline-hidden text-right"
            />
          </div>

          {/* Points Breakdown Alert */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 text-right space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>نظام احتساب النقاط والدرجات (20 نقطة كليّة):</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              يتكون التقييم من <strong>4 مهام متسلسلة</strong>، ولكل مهمة <strong>5 درجات</strong> (سؤالين × 2.5 درجة). عند إجابتك الصحيحة على كامل المهام الأربعة ستحصلين على الدرجة النهائية <strong>20 من 20</strong> مع شهادة التميز 🌸.
            </p>
          </div>

          {/* Start Action Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-pink-200 transition-all active:scale-[0.98] min-h-[52px]"
          >
            <span>ابدئي ورقة العمل التفاعلية</span>
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

        </form>
      </div>

      {/* ========================================================================= */}
      {/* 📚 Educational Lesson Introduction Card (شرح الدرس التأسيسي) 📚 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-rose-100 shadow-sm p-5 sm:p-7 space-y-4 text-right">
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div className="flex items-center gap-2 text-rose-800 font-black text-sm sm:text-base">
            <BookOpen className="w-5 h-5 text-rose-500" />
            <span>{LESSON_INTRODUCTION.title}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowLessonSummary(!showLessonSummary)}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-100"
          >
            <span>{showLessonSummary ? 'طي الشرح' : 'عرض الشرح'}</span>
            {showLessonSummary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showLessonSummary && (
          <div className="space-y-4 animate-fade-in">
            {/* Definition Box */}
            <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              <strong className="text-rose-800 block mb-1">💡 ما هو نظام التشغيل (OS)؟</strong>
              {LESSON_INTRODUCTION.definition}
            </div>

            {/* 4 Core Functions Grid */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-700 block">
                المهام الأربعة الرئيسية لنظام التشغيل في هذا الدرس:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LESSON_INTRODUCTION.coreFunctions.map((fn) => (
                  <div key={fn.number} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-right space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                          {fn.number}
                        </span>
                        <span>{fn.title}</span>
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {fn.points} درجات
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                      {fn.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>اقرئي شرح كل مهمة داخل ورقة العمل قبل الإجابة لتحصلي على الدرجة الكاملة (20/20)! 🌸</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
