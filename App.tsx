
import React, { useState, useCallback } from 'react';
import { TestType, Tests } from './types';
import Header from './components/Header';
import Nav from './components/Nav';
import StudentView from './components/StudentView';
import AdminView from './components/AdminView';

const initialTests: Tests = {
  career: [
    "Do you enjoy solving complex puzzles and problems?",
    "Are you interested in working with technology and data?",
    "Do you prefer tasks that have clear, tangible outcomes?",
  ],
  personality: [
    "Do you feel more energized after spending time with a large group of people or after spending time alone?",
    "When making decisions, do you rely more on logic and facts or on your feelings and intuition?",
    "Do you prefer having a detailed plan or do you like to keep your options open and be spontaneous?",
  ],
  skills: [
    "On a scale of 1-5, how would you rate your ability to lead a team?",
    "On a scale of 1-5, how comfortable are you with public speaking?",
    "On a scale of 1-5, how proficient are you in creative writing or design?",
  ],
};

const App: React.FC = () => {
  const [view, setView] = useState<'student' | 'admin'>('student');
  const [tests, setTests] = useState<Tests>(initialTests);

  const addQuestion = useCallback((type: TestType, question: string) => {
    if (question.trim()) {
      setTests(prevTests => ({
        ...prevTests,
        [type]: [...prevTests[type], question.trim()],
      }));
    }
  }, []);

  const removeQuestion = useCallback((type: TestType, index: number) => {
    setTests(prevTests => ({
      ...prevTests,
      [type]: prevTests[type].filter((_, i) => i !== index),
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <Nav activeView={view} setView={setView} />
      <main className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        {view === 'student' && <StudentView tests={tests} />}
        {view === 'admin' && (
          <AdminView
            tests={tests}
            addQuestion={addQuestion}
            removeQuestion={removeQuestion}
          />
        )}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>&copy; 2024 AI Career Assessment Tool. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
