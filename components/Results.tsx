
import React from 'react';
import { RecommendationResult } from '../types';
import Card from './Card';

interface ResultsProps {
  loading: boolean;
  results: RecommendationResult | null;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-teal-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-teal-500 delay-200"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-teal-500 delay-400"></div>
        <span className="text-gray-600">Analyzing your answers...</span>
    </div>
);

const Results: React.FC<ResultsProps> = ({ loading, results }) => {
  if (loading) {
    return (
      <Card title="Generating Your Results">
        <LoadingSpinner />
      </Card>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <Card title="Your Personalized Career Recommendations">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Based on your answers, we recommend:</h3>
          <ul className="list-disc list-inside space-y-1 pl-2">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="text-teal-700 font-medium">{rec}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Reasoning:</h3>
          <p className="text-gray-600 bg-gray-50 p-3 rounded-md border border-gray-200">
            {results.reasoning}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Results;
