import React from 'react';
import { 
  Award, 
  Printer, 
  TrendingUp, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { StudentProfile, AssessmentResult } from '../types';

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

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Actions */}
      <div className="no-print bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold mb-1">
            <TrendingUp className="w-4 h-4" />
            <span>لوحة قياس مستوى الاستيعاب الأكاديمي</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            تقرير الإنجاز وشهادة الإتقان لمهام نظام التشغيل
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            تحليل شامل ودقيق لأداء الطالب في المهام الأربعة لنظام التشغيل: إدارة العمليات، الذاكرة، أجهزة الإدخال والإخراج، والملفات.
          </p>
        </div>

        <button
          onClick={handlePrintCertificate}
          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Printer className="w-4 h-4 text-amber-300" />
          <span>طباعة الشهادة والتقرير (PDF)</span>
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">الدرجة الكلية التراكمية</span>
          <div className="text-2xl font-black text-indigo-600">
            {totalPoints} <span className="text-sm font-normal text-slate-400">/ {maxPoints}</span>
          </div>
          <span className="text-xs text-slate-600 font-bold mt-1 block">نسبة التحصيل: {overallPercentage}%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">أوراق العمل المنجزة</span>
          <div className="text-2xl font-black text-emerald-600">
            {completedWorksheetsCount} <span className="text-sm font-normal text-slate-400">/ {totalWorksheetsCount}</span>
          </div>
          <span className="text-xs text-slate-600 font-bold mt-1 block">
            {completedWorksheetsCount === totalWorksheetsCount ? 'تم إكمال كافة الوحدات ✓' : 'جارٍ استكمال المتبقي'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">مستوى الاستيعاب التقديري</span>
          <div className="text-2xl font-black text-slate-900">
            {assessmentResult ? assessmentResult.gradeLevel : (overallPercentage >= 80 ? 'متميز' : 'جيد')}
          </div>
          <span className="text-xs text-slate-600 font-bold mt-1 block">
            {assessmentResult ? 'وفق الاختبار المعياري' : 'وفق حل أوراق العمل'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">جاهزية الاختبار الفصلي</span>
          <div className="text-2xl font-black text-amber-600">
            {overallPercentage >= 75 ? 'جاهزية عالية' : 'تحتاج مراجعة'}
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

      {/* Printable Certificate of Achievement */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-indigo-700/50 shadow-xl relative overflow-hidden print-shadow-none print-break-inside-avoid">
        {/* Decorative Watermark */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 border-4 border-double border-amber-400/40 p-6 sm:p-10 rounded-2xl bg-slate-950/40 text-center space-y-6">
          
          {/* Certificate Header */}
          <div className="flex items-center justify-between text-xs text-amber-200/80 font-bold border-b border-amber-400/20 pb-4">
            <div>المملكة العربية السعودية • وزارة التعليم</div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <Award className="w-5 h-5" />
              <span>شهادة إتقان واجتياز</span>
            </div>
            <div>المرحلة الثانوية • الحاسب والتقنية الرقمية</div>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-wide">
              شهادة تميز في كفايات ومهام نظام التشغيل
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تشهد إدارة منصة أوراق العمل التعليمية بأن الطالب المتميز:
            </p>
            <div className="text-xl sm:text-2xl font-black text-white underline decoration-amber-400 decoration-2 underline-offset-8 py-1">
              {student.name || 'طالب متميز'}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              المقيد بمدرسة <strong className="text-amber-200">({student.schoolName || 'المرحلة الثانوية'})</strong> بالصف <strong className="text-amber-200">({student.gradeClass || 'الأول الثانوي'})</strong>، قد أتم بنجاح حل أوراق العمل والتقييمات الذاتية لمهام نظام التشغيل (إدارة العمليات، إدارة الذاكرة، إدارة أجهزة الإدخال والإخراج، وإدارة الملفات) بنسبة إنجاز بلغت <strong className="text-emerald-400 font-bold text-sm">({overallPercentage}%)</strong> وبتقدير <strong className="text-amber-300 font-bold text-sm">({assessmentResult?.gradeLevel || 'ممتاز'})</strong>.
            </p>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-amber-400/20 grid grid-cols-2 gap-6 text-xs text-slate-300 font-bold">
            <div className="text-right space-y-1">
              <span className="text-slate-400 block text-[10px]">معلم مادة الحاسب والتقنية الرقمية:</span>
              <span>أستاذ المادة</span>
            </div>
            <div className="text-left space-y-1" dir="ltr">
              <span className="text-slate-400 block text-[10px]">تاريخ الاعتماد:</span>
              <span>{new Date().toLocaleDateString('ar-SA')}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
