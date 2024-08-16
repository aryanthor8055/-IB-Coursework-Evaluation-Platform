'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useEvaluationStore from '@/store/store';

const EvaluationDisplay = () => {
  const { evaluations, initializeStore } = useEvaluationStore();
  const [evaluation, setEvaluation] = useState(null);

  const searchParams = useSearchParams();
  const evaluationId = searchParams.get('id');
  useEffect(() => {
    initializeStore(); // Initialize the store after the component mounts
  }, [initializeStore]);
  useEffect(() => { // Load the data from localStorage into Zustand store

    if (evaluationId) {
      const evalData = evaluations.find(e => e.id === parseInt(evaluationId));
      setEvaluation(evalData);
    }
  }, [evaluationId, evaluations]);

  if (!evaluation) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#E7ECF3] p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-[#001C46] mb-4">Evaluation Summary</h2>
        <div className="mb-4">
          <div className="text-lg text-[#001C46]">Overall Score: {evaluation.overallScore}/20</div>
          <div className="text-sm text-[#001C46]">Remark: {evaluation.remark}</div>
          <div className="text-sm text-[#001C46]">Evaluated on: {evaluation.date}</div>
        </div>
        <div className="space-y-4">
          {evaluation.criteria.map((criterion, index) => (
            <div key={index} className="p-4 bg-[#F6F9FF] rounded-lg">
              <div className="text-[#001C46] font-semibold">{criterion.name}</div>
              <div className="text-sm text-gray-600">{criterion.score}/7</div>
            </div>
          ))}
        </div>

        {/* Display the PDF file */}
        {evaluation.fileData && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-[#001C46] mb-2">Uploaded PDF:</h3>
            <iframe
              src={evaluation.fileData}
              width="100%"
              height="500px"
              className="border rounded-lg"
              title="Evaluation PDF"
            ></iframe>
          </div>
        )}

        <button className="mt-6 py-2 px-4 bg-[#4E86FF] text-white rounded-lg">Check Detailed Evaluation</button>
      </div>
    </div>
  );
};

export default EvaluationDisplay;
