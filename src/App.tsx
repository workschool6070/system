import React, { useState, useEffect } from 'react';
import { 
  CURRICULUM_MODULES 
} from './data/curriculumData';
import { 
  StudentProfile, 
  AssessmentResult 
} from './types';
import { Header } from './components/Header';
import { WorksheetView } from './components/WorksheetView';
import { ComprehensiveExam } from './components/ComprehensiveExam';
import { FlashcardsStudy } from './components/FlashcardsStudy';
import { PrintableWorksheet } from './components/PrintableWorksheet';
import { StudentReport } from './components/StudentReport';
import { ProfileModal } from './components/ProfileModal';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  Sparkles, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'worksheets' | 'exam' | 'flashcards' | 'print' | 'report'>('worksheets');
  const [currentModuleId, setCurrentModuleId] = useState<string>(CURRICULUM_MODULES[0].id);

  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('os_html_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      name: 'عبد الله السعيد',
      schoolName: 'ثانوية الملك فهد النموذجية',
      gradeClass: 'الأول الثانوي / 2',
      academicNumber: '4450891'
    };
  });

  const [answers, setAnswers] = useState<{ [questionId: string]: any }>(() => {
    const saved = localStorage.getItem('os_html_student_answers');
    if (saved) {
      try {
        return JSON.parse(saved);
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

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('os_html_student_profile', JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem('os_html_student_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    if (assessmentResult) {
      localStorage.setItem('os_html_assessment_result', JSON.stringify(assessmentResult));
    }
  }, [assessmentResult]);

  // Aggregate questions & points calculation
  const allQuestions = CURRICULUM_MODULES.flatMap(m => m.questions);
  const totalQuestionsCount = allQuestions.length;
  const maxPoints = allQuestions.reduce((acc, q) => acc + q.points, 0);

  const completedQuestionsCount = Object.keys(answers).filter(qId => answers[qId]?.submitted).length;
  const totalPoints = Object.keys(answers).reduce((acc, qId) => {
    return acc + (answers[qId]?.pointsEarned || 0);
  }, 0);

  const completedWorksheetsCount = CURRICULUM_MODULES.filter(m => {
    return m.questions.length > 0 && m.questions.every(q => answers[q.id]?.submitted);
  }).length;

  const handleAnswerQuestion = (questionId: string, answer: any, isCorrect: boolean, pointsEarned: number) => {
    if (answer === null) {
      // reset
      setAnswers(prev => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
      return;
    }

    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        answer,
        isCorrect,
        pointsEarned,
        submitted: true
      }
    }));
  };

  const handleFinishExam = (result: AssessmentResult) => {
    setAssessmentResult(result);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900" dir="rtl">
      
      {/* App Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        setStudent={setStudent}
        totalPoints={totalPoints}
        maxPoints={maxPoints}
        completedQuestionsCount={completedQuestionsCount}
        totalQuestionsCount={totalQuestionsCount}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'worksheets' && (
          <WorksheetView
            modules={CURRICULUM_MODULES}
            currentModuleId={currentModuleId}
            onSelectModule={setCurrentModuleId}
            answers={answers}
            onAnswerQuestion={handleAnswerQuestion}
            onNavigateToExam={() => setActiveTab('exam')}
          />
        )}

        {activeTab === 'exam' && (
          <ComprehensiveExam
            onFinishExam={handleFinishExam}
            onGoToReport={() => setActiveTab('report')}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsStudy />
        )}

        {activeTab === 'report' && (
          <StudentReport
            student={student}
            assessmentResult={assessmentResult}
            totalPoints={totalPoints}
            maxPoints={maxPoints}
            completedWorksheetsCount={completedWorksheetsCount}
            totalWorksheetsCount={CURRICULUM_MODULES.length}
            onTakeExam={() => setActiveTab('exam')}
          />
        )}

        {activeTab === 'print' && (
          <PrintableWorksheet student={student} />
        )}
      </main>

      {/* Footer (Hidden on Print) */}
      <footer className="no-print bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-700">
              منصة أوراق عمل نظم التشغيل وهيكلة HTML للمرحلة الثانوية
            </span>
          </div>
          <div>
            مصممة ومطابقة لمعايير مناهج الحاسب والتقنية الرقمية • العام الدراسي 1447هـ
          </div>
        </div>
      </footer>

      {/* Profile Edit Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        student={student}
        onSave={setStudent}
      />
    </div>
  );
}
