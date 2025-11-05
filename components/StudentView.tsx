
import React, { useState } from 'react';
import { TestType, Tests, Answers, RecommendationResult } from '../types';
import { generateRecommendations } from '../services/geminiService';
import Card from './Card';
import Button from './Button';
import Select from './Select';
import Input from './Input';
import Results from './Results';

interface StudentViewProps {
  tests: Tests;
}

const StudentView: React.FC<StudentViewProps> = ({ tests }) => {
  const [testType, setTestType] = useState<TestType>('career');
  const [currentTest, setCurrentTest] = useState<TestType | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [results, setResults] = useState<RecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startTest = () => {
    setCurrentTest(testType);
    setAnswers({});
    setResults(null);
  };

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers(prev => ({ ...prev, [index]: value }));
  };

  const submitTest = async () => {
    if (!currentTest) return;
    setIsLoading(true);
    setResults(null);
    const questions = tests[currentTest];
    const resultString = await generateRecommendations(currentTest, questions, answers);
    try {
      const parsedResult: RecommendationResult = JSON.parse(resultString);
      setResults(parsedResult);
    } catch (e) {
      console.error("Failed to parse recommendation result:", e);
      setResults({
        recommendations: ["Parsing Error"],
        reasoning: "There was an issue processing the AI's response. It might not be valid JSON."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const allQuestionsAnswered = currentTest ? tests[currentTest].every((_, i) => answers[i] && answers[i].trim() !== '') : false;

  return (
    <div className="space-y-6">
      {!currentTest ? (
        <Card title="Take an Assessment">
          <div className="space-y-4">
            <Select
              label="Select Test Type"
              value={testType}
              onChange={(e) => setTestType(e.target.value as TestType)}
              options={[
                { value: 'career', label: 'Career Test' },
                { value: 'personality', label: 'Personality Test' },
                { value: 'skills', label: 'Skills Evaluation' },
              ]}
            />
            <Button onClick={startTest}>Start Test</Button>
          </div>
        </Card>
      ) : (
        <Card title={`${currentTest.charAt(0).toUpperCase() + currentTest.slice(1)} Test`}>
          <div className="space-y-4">
            {tests[currentTest].map((question, i) => (
              <Input
                key={i}
                label={`Question ${i + 1}: ${question}`}
                value={answers[i] || ''}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
                placeholder="Your answer here..."
              />
            ))}
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
              <Button onClick={submitTest} disabled={isLoading || !allQuestionsAnswered}>
                {isLoading ? 'Getting Recommendations...' : 'Submit Answers'}
              </Button>
              <Button onClick={() => setCurrentTest(null)} variant="secondary">
                Change Test
              </Button>
            </div>
             {!allQuestionsAnswered && <p className="text-sm text-yellow-600 mt-2">Please answer all questions to submit.</p>}
          </div>
        </Card>
      )}

      {(isLoading || results) && <Results loading={isLoading} results={results} />}
    </div>
  );
};

export default StudentView;
