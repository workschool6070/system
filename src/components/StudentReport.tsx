import React from 'react';
import { 
  Printer, 
  TrendingUp, 
  CheckCircle,
  HelpCircle,
  Sparkles,
  Heart,
  Crown
} from 'lucide-react';
import { StudentProfile, AssessmentResult } from '../types';
import { MinistryOfEducationLogo } from './MinistryOfEducationLogo';

interface StudentReportProps {
  student: StudentProfile;
  assessmentResult: AssessmentResult | null;
  totalPoints: number;
  maxPoints: number;
  completedWorksheetsCount: number;
  totalWorksheetsCount: number;
  onTakeExam: () => void;
}

export const StudentReport: React.FC<StudentReportProps> = ({
  student,
  assessmentResult,
  totalPoints,
  maxPoints,
  completedWorksheetsCount,
  totalWorksheetsCount,
  onTakeExam
}) => {
  const overallPercentage = Math.round((totalPoints / Math.max(1, maxPoints)) * 100);
  const gradeLevel = assessmentResult ? assessmentResult.gradeLevel : (overallPercentage >= 90 ? 'ممتاز مرتفع 🌟' : overallPercentage >= 80 ? 'ممتاز' : overallPercentage >= 65 ? 'جيد جداً' : 'جيد');

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Actions */}
      <div className="no-print bg-white rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>لوحة قياس مستوى الاستيعاب والتميز الأكاديمي</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            تقرير الإنجاز وشهادة التميز للطالبة
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            تحليل شامل لأداء الطالبة في المهام الأربعة لنظام التشغيل مع شهادة تميز مصممة ومجهزة للطباعة والحفظ.
          </p>
        </div>

        <button
          onClick={handlePrintCertificate}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-pink-200 transition-transform active:scale-95 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-white" />
          <span>طباعة شهادة التميز (PDF)</span>
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">الدرجة الكلية المكتسبة</span>
          <div className="text-2xl font-black text-rose-600">
            {totalPoints} <span className="text-sm font-normal text-slate-400">/ {maxPoints}</span>
          </div>
          <span className="text-xs text-slate-600 font-bold mt-1 block">نسبة الإنجاز: {overallPercentage}%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">أوراق العمل المنجزة</span>
          <div className="text-2xl font-black text-emerald-600">
            {completedWorksheetsCount} <span className="text-sm font-normal text-slate-400">/ {totalWorksheetsCount}</span>
          </div>
          <span className="text-xs text-slate-600 font-bold mt-1 block">
            {completedWorksheetsCount === totalWorksheetsCount ? 'تم إكمال كافة الأوراق ✓' : 'جارٍ استكمال المتبقي'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">مستوى التقدير</span>
          <div className="text-2xl font-black text-slate-900">
            {gradeLevel}
          </div>
          <span className="text-xs text-slate-600 font-bold mt-1 block">
            {assessmentResult ? 'وفق الاختبار الشامل' : 'وفق حل أوراق العمل'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">جاهزية الاختبار النهائي</span>
          <div className="text-2xl font-black text-amber-600">
            {overallPercentage >= 75 ? 'إتقان وتميز 🌸' : 'تحتاج مراجعة بسيطة'}
          </div>
          <span className="text-xs text-slate-600 font-bold mt-1 block">كفايات مهام نظام التشغيل</span>
        </div>
      </div>

      {/* Strengths & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-emerald-50/70 border border-emerald-200 p-6 rounded-3xl space-y-3">
          <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>نقاط القوة والكفايات المتقنة:</span>
          </h3>
          <ul className="space-y-2 text-xs text-emerald-900">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>فهم دورة حياة العمليات وجدولة المعالج وحالات التبديل السريع وتعدد المهام.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>استيعاب آليات إدارة وتخصيص الذاكرة العشوائية وحمايتها ودور الذاكرة الافتراضية.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
              <span>إدراك وظيفة برامج التشغيل ومعالجة المقاطعات وتنظيم الملفات في الهيكل الشجري.</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 p-6 rounded-3xl space-y-3">
          <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>نصائح وتوجيهات لتعزيز التحصيل:</span>
          </h3>
          <ul className="space-y-2 text-xs text-amber-900">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
              <span>المراجعة الدورية للفروق بين التخزين المؤقت (Buffering) وتجميع الطباعة (Spooling).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
              <span>التدرب على تتبع المسارات الهرمية الشجرية المطلقة والنسبية وضبط صلاحيات الوصول.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
              <span>خوض اختبار قياس الاستيعاب الشامل لتثبيت كفايات المهام الأربعة قبل الاختبارات الرسمية.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 New Certificate matching the exact provided design (شهادة تميز) 🌟 */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-4xl mx-auto rounded-[32px] p-2 sm:p-3 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 shadow-2xl overflow-hidden print-shadow-none print-break-inside-avoid">
        
        {/* Inner Certificate Container */}
        <div className="relative bg-[#fffdf9] rounded-[26px] p-6 sm:p-10 md:p-12 overflow-hidden border-2 border-amber-200/60 flex flex-col justify-between min-h-[580px]">
          
          {/* Top Header Row: Ministry on Right, Ribbon/Medal on Left */}
          <div className="flex items-start justify-between w-full relative z-20">
            {/* Top Right: Ministry of Education Header */}
            <div className="flex flex-col items-start">
              <MinistryOfEducationLogo className="h-16 sm:h-20" />
            </div>

            {/* Top Left: Golden Royal Seal Medal & Dark Blue Ribbons */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
              {/* Hanging Ribbons */}
              <div className="absolute top-10 right-4 w-6 sm:w-7 h-16 sm:h-20 bg-gradient-to-b from-[#152a42] to-[#0d1b2a] rotate-[18deg] rounded-b-md shadow-md z-10" />
              <div className="absolute top-10 right-10 w-6 sm:w-7 h-14 sm:h-18 bg-gradient-to-b from-[#1c3552] to-[#0f2134] rotate-[-15deg] rounded-b-md shadow-md z-10" />
              
              {/* Golden Rosette Medal */}
              <div className="relative z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-yellow-100 p-1 shadow-xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-500 flex flex-col items-center justify-center border-2 border-amber-500/80 text-amber-950 shadow-inner">
                  <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900 drop-shadow-xs fill-amber-700/60" />
                  <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase mt-0.5 text-amber-950">EXCELLENCE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Main Title (شهادة تميّز) with Crown & Golden Rays */}
          <div className="text-center my-4 space-y-1 relative z-10">
            {/* Crown Icon with Sparks */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-amber-500 text-sm select-none">/</span>
              <Crown className="w-9 h-9 sm:w-11 sm:h-11 text-amber-500 fill-amber-400 filter drop-shadow-md" />
              <span className="text-amber-500 text-sm select-none">\</span>
            </div>

            {/* Glowing Big Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#152a42] tracking-normal drop-shadow-xs flex items-center justify-center gap-2">
              <span className="text-amber-400 text-2xl select-none hidden sm:inline">✨</span>
              <span>شَهَادَةُ تَمَيُّـز</span>
              <span className="text-amber-400 text-2xl select-none hidden sm:inline">✨</span>
            </h1>

            <div className="text-lg sm:text-xl font-bold text-[#b8860b] mt-2">
              أمنح بكل فخر
            </div>
            <div className="text-base sm:text-lg font-bold text-[#334155]">
              للطالبة المتميزة
            </div>
          </div>

          {/* Student Name Underlined (Styled cleanly matching image) */}
          <div className="my-2 max-w-lg mx-auto w-full text-center relative z-10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-rose-600 py-1 font-serif">
              {student.name || 'طالبة متميزة'}
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full" />
            <div className="text-xs text-slate-500 font-semibold mt-1">
              {student.schoolName || 'المرحلة الثانوية'} • {student.gradeClass || 'الصف الأول الثانوي'}
            </div>
          </div>

          {/* Main Statement & Praise */}
          <div className="text-center my-3 space-y-2 relative z-10">
            <div className="text-lg sm:text-xl font-black text-slate-800">
              لإتمامها ورقة العمل التفاعليّة بنجاح.
            </div>

            <div className="text-xl sm:text-2xl font-black text-[#152a42] flex items-center justify-center gap-2">
              <span>أحسنتِ.. فخورةٌ بكِ!</span>
              <span className="text-rose-500 text-2xl">💖</span>
            </div>

            {/* Metadata Badges (Preserving required stats: Date, Percentage, Grade) */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <div className="bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-2xs">
                <span>نسبة الإنجاز:</span>
                <span className="text-emerald-700 font-black">{overallPercentage}%</span>
              </div>

              <div className="bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-2xs">
                <span>التقدير العام:</span>
                <span className="text-rose-700 font-black">{gradeLevel}</span>
              </div>

              <div className="bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-2xs">
                <span>تاريخ الاعتماد:</span>
                <span className="text-slate-900 font-black">{new Date().toLocaleDateString('ar-SA')}</span>
              </div>
            </div>
          </div>

          {/* Inspirational Side Quotes (Matching image) */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 items-center justify-between gap-4 mt-6 pt-4 border-t border-amber-200/50">
            
            {/* Right Motivational Quote */}
            <div className="text-right space-y-0.5 text-xs text-amber-800 font-bold hidden sm:block">
              <div className="text-sm font-black text-amber-900">مزيداً من التميّز دائماً</div>
              <div className="text-rose-400 text-base">♡</div>
            </div>

            {/* Middle Star Divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-0.5 bg-amber-300/80 rounded-full" />
              <div className="text-amber-500 text-xl font-bold">★</div>
              <div className="w-12 h-0.5 bg-amber-300/80 rounded-full" />
            </div>

            {/* Left Motivational Quote & Signature */}
            <div className="text-left space-y-0.5 text-xs text-amber-800 font-bold hidden sm:block">
              <div className="text-sm font-black text-amber-900">خطوةٌ جديدة نحو مستقبل مشرق</div>
              <div className="text-rose-400 text-base">♡</div>
            </div>
          </div>

          {/* Bottom Footer: Teacher & Motivational Note */}
          <div className="relative z-10 flex items-center justify-between mt-4 text-xs font-bold text-slate-700 pt-2">
            <div className="border-t-2 border-slate-800 pt-1 px-4 text-center">
              <span className="block font-black text-slate-900 text-sm">معلمة المادة: أنهار الأحمدي</span>
              <span className="text-[10px] text-slate-500 font-normal">الحاسب والتقنية الرقمية</span>
            </div>

            <div className="text-amber-800 font-black text-sm flex items-center gap-1">
              <span>أنتِ قادرةٌ على المزيد</span>
              <span className="text-rose-500">♡</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
