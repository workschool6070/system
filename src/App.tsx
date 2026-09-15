import React, { useState, useEffect } from 'react';
import { CURRICULUM_MODULES } from './data/curriculumData';
import { StudentProfile, AssessmentResult } from './types';
import { Header } from './components/Header';
import { StudentWelcomeLogin } from './components/StudentWelcomeLogin';
import { WorksheetView } from './components/WorksheetView';
import { StudentReport } from './components/StudentReport';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'login' | 'tasks' | 'report'>('login');
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);

  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('os_html_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: '',
      schoolName: 'المرحلة الثانوية',
      gradeClass: 'الأول الثانوي / 1',
      academicNumber: ''
    };
  });

  const [answers, setAnswers] = useState<{ [questionId: string]: any }>(() => {
    const saved = localStorage.getItem('os_html_student_answers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Record<string, any>;
        const validQuestionMap = new Map(CURRICULUM_MODULES.flatMap(m => m.questions.map(q => [q.id, q])));
        const sanitized: { [key: string]: any } = {};
        for (const [key, val] of Object.entries(parsed)) {
          const matchedQ = validQuestionMap.get(key);
          if (matchedQ && typeof val === 'object' && val !== null) {
            sanitized[key] = {
              ...val,
              pointsEarned: (val as any).isCorrect ? matchedQ.points : 0
            };
          }
        }
        return sanitized;
      } catch (e) {}
    }
    return {};
  });

  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(() => {
    const saved = localStorage.getItem('os_html_assessment_result');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  // Persistence
  useEffect(() => {
    if (student.name) {
      localStorage.setItem('os_html_student_profile', JSON.stringify(student));
    }
  }, [student]);

  useEffect(() => {
    localStorage.setItem('os_html_student_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (assessmentResult) {
      localStorage.setItem('os_html_assessment_result', JSON.stringify(assessmentResult));
    }
  }, [assessmentResult]);

  // Calculations
  const allQuestions = CURRICULUM_MODULES.flatMap(m => m.questions);
  const totalQuestionsCount = allQuestions.length;
  const maxPoints = allQuestions.reduce((acc, q) => acc + q.points, 0);

  const completedQuestionsCount = allQuestions.filter(q => answers[q.id]?.submitted).length;
  const totalPoints = CURRICULUM_MODULES.reduce((modAcc, module) => {
    const modEarned = module.questions.reduce((qAcc, q) => {
      const userAns = answers[q.id];
      return qAcc + (userAns?.isCorrect ? q.points : 0);
    }, 0);
    return modAcc + modEarned;
  }, 0);

  const completedWorksheetsCount = CURRICULUM_MODULES.filter(m => {
    return m.questions.length > 0 && m.questions.every(q => answers[q.id]?.submitted);
  }).length;

  const handleStartWorksheet = (updatedStudent: StudentProfile) => {
    setStudent(updatedStudent);
    setCurrentStep('tasks');
    setCurrentModuleIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerQuestion = (questionId: string, answer: any, isCorrect: boolean, _pointsEarned: number) => {
    if (answer === null) {
      setAnswers(prev => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
      return;
    }

    const matchedQ = allQuestions.find(q => q.id === questionId);
    const validPoints = matchedQ ? (isCorrect ? matchedQ.points : 0) : (isCorrect ? 2.5 : 0);

    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        answer,
        isCorrect,
        pointsEarned: validPoints,
        submitted: true
      }
    }));
  };

  const handleResetForNewStudent = () => {
    if (window.confirm('هل تودين تسجيل طالبة جديدة والبدء من جديد؟')) {
      setAnswers({});
      setAssessmentResult(null);
      setStudent({
        name: '',
        schoolName: 'المرحلة الثانوية',
        gradeClass: 'الأول الثانوي / 1',
        academicNumber: ''
      });
      localStorage.removeItem('os_html_student_answers');
      localStorage.removeItem('os_html_assessment_result');
      setCurrentStep('login');
      setCurrentModuleIndex(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f6] text-slate-800 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900" dir="rtl">
      
      {/* Dynamic Header */}
      <Header
        currentStep={currentStep}
        currentModuleIndex={currentModuleIndex}
        totalModulesCount={CURRICULUM_MODULES.length}
        student={student}
        totalPoints={totalPoints}
        maxPoints={maxPoints}
        completedQuestionsCount={completedQuestionsCount}
        totalQuestionsCount={totalQuestionsCount}
        onGoToLogin={() => setCurrentStep('login')}
        onGoToReport={() => {
          setCurrentStep('report');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectModuleIndex={(index) => {
          setCurrentModuleIndex(index);
          setCurrentStep('tasks');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        
        {/* Step 0: Welcome & Student Login */}
        {currentStep === 'login' && (
          <StudentWelcomeLogin
            student={student}
            onStart={handleStartWorksheet}
          />
        )}

        {/* Step 1 to 4: Sequential Tasks */}
        {currentStep === 'tasks' && (
          <WorksheetView
            modules={CURRICULUM_MODULES}
            currentModuleIndex={currentModuleIndex}
            onSelectModuleIndex={setCurrentModuleIndex}
            answers={answers}
            onAnswerQuestion={handleAnswerQuestion}
            onGoToReport={() => {
              setCurrentStep('report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Final Step: Performance Report & Certificate */}
        {currentStep === 'report' && (
          <StudentReport
            student={student}
            assessmentResult={assessmentResult}
            totalPoints={totalPoints}
            maxPoints={maxPoints}
            completedWorksheetsCount={completedWorksheetsCount}
            totalWorksheetsCount={CURRICULUM_MODULES.length}
            onReviewTasks={() => {
              setCurrentStep('tasks');
              setCurrentModuleIndex(0);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNewStudent={handleResetForNewStudent}
          />
        )}

      </main>

      {/* Simplified Mobile-Friendly Footer */}
      <footer className="no-print bg-white/80 border-t border-rose-100 py-4 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-right">
          <div className="flex items-center gap-1.5 font-bold text-slate-700 text-[11px] sm:text-xs">
            <span>🌸</span>
            <span>أوراق عمل مهام نظام التشغيل • معلمة المادة: أنهار الأحمدي</span>
          </div>
          <div className="text-[10px] sm:text-xs text-slate-400">
            مقرر الحاسب والتقنية الرقمية • المرحلة الثانوية 1447هـ
          </div>
        </div>
      </footer>

    </div>
  );
}
