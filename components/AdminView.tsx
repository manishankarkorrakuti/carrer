
import React, { useState } from 'react';
import { TestType, Tests } from '../types';
import Card from './Card';
import Button from './Button';
import Select from './Select';
import Input from './Input';

interface AdminViewProps {
  tests: Tests;
  addQuestion: (type: TestType, question: string) => void;
  removeQuestion: (type: TestType, index: number) => void;
}

const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
);


const AdminView: React.FC<AdminViewProps> = ({ tests, addQuestion, removeQuestion }) => {
  const [adminTestType, setAdminTestType] = useState<TestType>('career');
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    addQuestion(adminTestType, newQuestion);
    setNewQuestion('');
  };

  return (
    <div className="space-y-6">
      <Card title="Manage Assessments">
        <div className="space-y-4">
          <Select
            label="Test Type"
            value={adminTestType}
            onChange={(e) => setAdminTestType(e.target.value as TestType)}
            options={[
              { value: 'career', label: 'Career Test' },
              { value: 'personality', label: 'Personality Test' },
              { value: 'skills', label: 'Skills Evaluation' },
            ]}
          />
          <Input
            label="New Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter new question text..."
          />
          <Button onClick={handleAddQuestion} disabled={!newQuestion.trim()}>
            Add Question
          </Button>
        </div>
      </Card>

      <Card title={`${adminTestType.charAt(0).toUpperCase() + adminTestType.slice(1)} Questions`}>
        {tests[adminTestType].length > 0 ? (
          <ul className="space-y-3">
            {tests[adminTestType].map((q, i) => (
              <li key={i} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
                <span className="text-gray-700">{q}</span>
                <button
                  onClick={() => removeQuestion(adminTestType, i)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove question"
                >
                  <XCircleIcon />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No questions for this test type yet.</p>
        )}
      </Card>
    </div>
  );
};

export default AdminView;
