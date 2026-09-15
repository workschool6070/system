import React, { useState } from 'react';
import { X, User, School, GraduationCap, Hash, Check } from 'lucide-react';
import { StudentProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onSave: (updated: StudentProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave
}) => {
  const [formData, setFormData] = useState<StudentProfile>(student);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">بيانات الطالب والمدرسة</h3>
              <p className="text-xs text-slate-500">تظهر في أوراق العمل والشهادات المطبوعة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              <span>اسم الطالب الثلاثي:</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: عبد الله أحمد السعيد"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-indigo-600" />
              <span>اسم المدرسة الثانوية:</span>
            </label>
            <input
              type="text"
              required
              value={formData.schoolName}
              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
              placeholder="مثال: ثانوية الملك فهد النموذجية"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>الصف والشعبة:</span>
              </label>
              <input
                type="text"
                value={formData.gradeClass}
                onChange={(e) => setFormData({ ...formData, gradeClass: e.target.value })}
                placeholder="الأول الثانوي / 1"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-indigo-600" />
                <span>الرقم الأكاديمي:</span>
              </label>
              <input
                type="text"
                value={formData.academicNumber}
                onChange={(e) => setFormData({ ...formData, academicNumber: e.target.value })}
                placeholder="4450123"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>حفظ البيانات</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
