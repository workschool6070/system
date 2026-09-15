import React, { useState } from 'react';
import { 
  Printer, 
  GraduationCap
} from 'lucide-react';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { StudentProfile, WorksheetModule, McqQuestion, TrueFalseQuestion, MatchingQuestion, OrderingQuestion, ScenarioQuestion } from '../types';

interface PrintableWorksheetProps {
  student: StudentProfile;
}

export const PrintableWorksheet: React.FC<PrintableWorksheetProps> = ({ student }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('all');
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);

  const activeModules: WorksheetModule[] = selectedModuleId === 'all'
    ? CURRICULUM_MODULES
    : CURRICULUM_MODULES.filter(m => m.id === selectedModuleId);

  const totalPossiblePoints = activeModules.reduce(
    (acc, m) => acc + m.questions.reduce((qAcc, q) => qAcc + q.points, 0),
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Configuration Toolbar (Hidden on Print) */}
      <div className="no-print bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold mb-1">
              <Printer className="w-4 h-4" />
              <span>إعدادات وتخصيص الطباعة والتصدير</span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              طباعة أوراق عمل مهام نظام التشغيل ونماذج الإجابة
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              يمكنك تصدير ورقة العمل كملف جاهز للطباعة وتوزيعه على طلاب المرحلة الثانوية، أو استخراج نموذج إجابة المعلم المعتمد.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>طباعة الورقة الحالية (PDF)</span>
          </button>
        </div>

        {/* Options Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Module Select */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-700">اختر ورقة العمل:</span>
            <select
              value={selectedModuleId}
              onChange={(e) => setSelectedModuleId(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-hidden focus:border-indigo-500 text-xs"
            >
              <option value="all">كافة المهام الأربعة (الملف الشامل الموحد)</option>
              {CURRICULUM_MODULES.map(m => (
                <option key={m.id} value={m.id}>{m.shortTitle}</option>
              ))}
            </select>
          </div>

          {/* Teacher vs Student Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setIsTeacherMode(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isTeacherMode
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ورقة عمل الطالب (للاختبار والحل)
            </button>
            <button
              onClick={() => setIsTeacherMode(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isTeacherMode
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              نموذج إجابة المعلم (مع الحلول والتعليلات)
            </button>
          </div>
        </div>
      </div>

      {/* Printable Sheet Canvas */}
      <div className="bg-white rounded-2xl border border-slate-300 p-8 sm:p-12 shadow-md print-shadow-none max-w-4xl mx-auto space-y-8 text-black" dir="rtl">
        
        {/* Official Header */}
        <div className="border-b-2 border-black pb-4">
          <div className="flex items-start justify-between gap-4 text-xs font-bold">
            <div className="space-y-1 text-right">
              <div>المملكة العربية السعودية</div>
              <div>وزارة التعليم</div>
              <div>إدارة التعليم • المرحلة الثانوية</div>
              <div>مدرسة: {student.schoolName || '...........................................'}</div>
            </div>

            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-xl border border-black mx-auto flex items-center justify-center font-bold text-base">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="text-sm font-black">
                {isTeacherMode ? '【 نموذج إجابة المعلم المعتمد 】' : '【 ورقة عمل تقييم استيعاب 】'}
              </div>
              <div className="text-[11px]">مقرر: الحاسب والتقنية الرقمية (مهام نظام التشغيل)</div>
            </div>

            <div className="space-y-1 text-left" dir="ltr">
              <div className="text-right">التاريخ: {new Date().toLocaleDateString('ar-SA')}</div>
              <div className="text-right">الصف: {student.gradeClass || 'الأول الثانوي'}</div>
              <div className="text-right">الزمن المقترح: 45 دقيقة</div>
              <div className="text-right">الدرجة الكلية: ({totalPossiblePoints}) درجات</div>
            </div>
          </div>

          {/* Student Info Box */}
          <div className="mt-4 p-2.5 border border-black rounded-lg grid grid-cols-3 gap-2 text-xs">
            <div><strong>اسم الطالب:</strong> {student.name || '...........................................'}</div>
            <div><strong>الفصل / الشعبة:</strong> {student.gradeClass || '................'}</div>
            <div><strong>الرقم الأكاديمي:</strong> {student.academicNumber || '................'}</div>
          </div>
        </div>

        {/* Modules & Questions */}
        {activeModules.map((mod, modIdx) => (
          <div key={mod.id} className="space-y-5 print-break-inside-avoid">
            {/* Section Title */}
            <div className="bg-slate-100 border border-slate-300 p-2.5 rounded-lg flex items-center justify-between font-bold text-xs sm:text-sm">
              <span className="font-black">المهمة ({modIdx + 1}): {mod.title}</span>
              <span className="text-xs text-slate-700">مجموع درجات المهمة: {mod.questions.reduce((a, b) => a + b.points, 0)} درجات</span>
            </div>

            {/* Questions List */}
            <div className="space-y-6 divide-y divide-slate-200">
              {mod.questions.map((q, qIdx) => (
                <div key={q.id} className="pt-4 space-y-3 print-break-inside-avoid">
                  
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-3 text-xs sm:text-sm font-bold">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md border border-black flex items-center justify-center text-xs">
                        {qIdx + 1}
                      </span>
                      <span className="leading-snug">{q.question}</span>
                    </div>
                    <span className="text-xs text-slate-600 shrink-0">({q.points} درجات)</span>
                  </div>

                  {/* MCQ Printable Layout */}
                  {q.type === 'mcq' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mr-8">
                      {(q as McqQuestion).options.map((opt, optIdx) => {
                        const letters = ['أ', 'ب', 'ج', 'د'];
                        const isCorrect = opt.id === (q as McqQuestion).correctOptionId;
                        return (
                          <div 
                            key={opt.id}
                            className={`p-2 rounded-md border flex items-center gap-2 ${
                              isTeacherMode && isCorrect
                                ? 'border-black bg-emerald-50 font-bold'
                                : 'border-slate-300'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[10px] font-bold">
                              {letters[optIdx]}
                            </span>
                            <span>{opt.text}</span>
                            {isTeacherMode && isCorrect && <span className="mr-auto text-emerald-800 text-[11px]">✓ (الإجابة النموذجية)</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* True / False Printable Layout */}
                  {q.type === 'true_false' && (
                    <div className="flex items-center gap-6 text-xs mr-8">
                      <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-md ${isTeacherMode && (q as TrueFalseQuestion).isCorrect ? 'bg-emerald-50 border-black font-bold' : 'border-slate-300'}`}>
                        <div className="w-4 h-4 border border-black rounded-sm flex items-center justify-center">
                          {isTeacherMode && (q as TrueFalseQuestion).isCorrect && '✓'}
                        </div>
                        <span>(  ) عبارة صحيحة</span>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-md ${isTeacherMode && !(q as TrueFalseQuestion).isCorrect ? 'bg-emerald-50 border-black font-bold' : 'border-slate-300'}`}>
                        <div className="w-4 h-4 border border-black rounded-sm flex items-center justify-center">
                          {isTeacherMode && !(q as TrueFalseQuestion).isCorrect && '✓'}
                        </div>
                        <span>(  ) عبارة خاطئة</span>
                      </div>
                    </div>
                  )}

                  {/* Matching Printable Layout */}
                  {q.type === 'matching' && (
                    <div className="grid grid-cols-2 gap-4 text-xs mr-8">
                      <div className="space-y-1.5">
                        <strong className="block text-[11px] border-b pb-1">العمود (أ): المفهوم</strong>
                        {(q as MatchingQuestion).pairs.map((p, idx) => (
                          <div key={p.id} className="p-1.5 border border-slate-300 rounded-md">
                            [{idx + 1}] {p.term}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1.5">
                        <strong className="block text-[11px] border-b pb-1">العمود (ب): الوظيفة / التعريف</strong>
                        {(q as MatchingQuestion).pairs.map((p) => (
                          <div key={p.id} className="p-1.5 border border-slate-300 rounded-md flex items-center gap-2">
                            <span className="w-6 h-5 border border-black rounded-sm text-center font-bold text-[11px]">
                              {isTeacherMode ? (q as MatchingQuestion).pairs.findIndex(x => x.id === p.id) + 1 : ' '}
                            </span>
                            <span>{p.definition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ordering Printable Layout */}
                  {q.type === 'ordering' && (
                    <div className="mr-8 space-y-2 text-xs">
                      <p className="text-slate-600 text-[11px]">رتب الخطوات التالية من 1 إلى {(q as OrderingQuestion).items.length} بوضع الرقم في المربع:</p>
                      <div className="space-y-1.5">
                        {(q as OrderingQuestion).items.map((it) => (
                          <div key={it.id} className="p-2 border border-slate-300 rounded-md flex items-center gap-2">
                            <span className="w-6 h-6 border border-black rounded-sm flex items-center justify-center font-bold text-xs">
                              {isTeacherMode ? it.order : ' '}
                            </span>
                            <span>{it.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Scenario Printable Layout */}
                  {q.type === 'scenario' && (
                    <div className="mr-8 space-y-2 text-xs">
                      <div className="p-2 bg-slate-50 border border-slate-300 rounded-md">
                        <strong>السيناريو:</strong> {(q as ScenarioQuestion).scenario}
                      </div>
                      <div className="space-y-1.5">
                        {(q as ScenarioQuestion).options.map((opt, optIdx) => {
                          const isCorrect = opt.id === (q as ScenarioQuestion).correctOptionId;
                          return (
                            <div 
                              key={opt.id}
                              className={`p-2 border rounded-md flex items-start gap-2 ${
                                isTeacherMode && isCorrect ? 'bg-emerald-50 border-black font-bold' : 'border-slate-300'
                              }`}
                            >
                              <span className="w-4 h-4 border border-black rounded-sm text-center text-[10px] font-bold shrink-0">
                                {isTeacherMode && isCorrect ? '✓' : optIdx + 1}
                              </span>
                              <span>{opt.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Teacher Explanation Footnote */}
                  {isTeacherMode && (
                    <div className="mr-8 p-2 bg-amber-50 border border-amber-200 rounded-md text-[11px] text-amber-950">
                      <strong>شرح المعلم ومعيار التصحيح:</strong> {q.explanation}
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Signature Box */}
        <div className="pt-6 border-t-2 border-black flex items-center justify-between text-xs font-bold">
          <div>توقيع معلم المادة: .......................................</div>
          <div>ختم وتوقيع إدارة المدرسة: .......................................</div>
        </div>
      </div>
    </div>
  );
};
