'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useEvaluationStore from '@/store/store';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'react-circular-progressbar/dist/styles.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import GeneralInfo from '@/components/General-Info/GeneralInfo';

const EvaluationDisplay = () => {
  const { evaluations, initializeStore } = useEvaluationStore();
  const [evaluation, setEvaluation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const searchParams = useSearchParams();
  const evaluationId = searchParams.get('id');

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  useEffect(() => {
    if (evaluationId) {
      const evalData = evaluations.find((e) => e.id === parseInt(evaluationId));
      setEvaluation(evalData);
    }
  }, [evaluationId, evaluations]);

  if (!evaluation) return <div>Loading...</div>;

  return (
    <>
      <Sidebar />
      <div className="flex flex-col min-h-screen bg-[#E7ECF3] p-8 pr-12 pl-24">
        <div className="flex justify-between">
          <GeneralInfo />

          <div className="flex-1 ml-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-bold text-[#001C46]">IB Economic Paper IA2 .pdf</h2>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-4 text-[#4E86FF] flex items-center text-sm"
              >
                {isExpanded ? (
                  <>
                    Collapse <MdExpandLess size={20} />
                  </>
                ) : (
                  <>
                    Expand & view your file <MdExpandMore size={20} />
                  </>
                )}
              </button>
            </div>

            {isExpanded && (
              <div className="border rounded-lg mb-6 overflow-hidden" style={{ height: '500px' }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                  <Viewer fileUrl={evaluation.fileData} />
                </Worker>
              </div>
            )}
          </div>

          <div className="ml-8 w-96 bg-white p-6 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <CircularProgressbar
                  value={evaluation.overallScore}
                  maxValue={20}
                  text={`${evaluation.overallScore}/20`}
                  styles={buildStyles({
                    pathColor: '#4E86FF',
                    textColor: '#001C46',
                    trailColor: '#e0e0e0',
                    textSize: '16px',
                  })}
                />
              </div>
              <div className="text-lg font-semibold text-[#4E86FF]">{evaluation.remark}</div>
              <div className="text-xs text-[#001C46]">Evaluated on: {evaluation.date}</div>
            </div>
            <div className="space-y-4 mt-6">
              {evaluation.criteria.map((criterion, index) => (
                <div key={index} className="p-4 bg-[#F6F9FF] rounded-lg">
                  <div className="flex justify-between items-center text-sm font-semibold text-[#001C46]">
                    <div className="flex items-center space-x-2">
                      <CircularProgressbar
                        value={criterion.score}
                        maxValue={7}
                        text={`${criterion.score}/7`}
                        styles={buildStyles({
                          pathColor: '#4E86FF',
                          textColor: '#001C46',
                          trailColor: '#e0e0e0',
                          textSize: '10px',
                        })}
                        className="w-8 h-8"
                      />
                      <span>{criterion.name}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{criterion.description}</div>
                </div>
              ))}
            </div>
            <button className="mt-6 py-2 px-4 w-full bg-[#4E86FF] text-white rounded-lg text-sm">
              Check Detailed Evaluation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvaluationDisplay;
