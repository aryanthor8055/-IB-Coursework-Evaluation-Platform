'use client';

import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useEvaluationStore from '@/store/store';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import 'react-circular-progressbar/dist/styles.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import GeneralInfo from '@/components/General-Info/GeneralInfo';
import { IoCheckmarkCircleSharp, IoInformationCircle } from "react-icons/io5";
import { Card } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { enableMocking } from '@/mocks/browser';

// Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

const EvaluationDisplayContent = () => {
  const { evaluations, initializeStore } = useEvaluationStore();
  const [evaluation, setEvaluation] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const searchParams = useSearchParams();
  const evaluationId = searchParams.get('id');

  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  useLayoutEffect(() => {
    (async () => {
      await enableMocking();
      const res = await fetch("/api/evaluate");
      const response = await res.json();
    })();
  }, []);

  useEffect(() => {
    if (evaluationId) {
      const evalData = evaluations.find((e) => e.id === parseInt(evaluationId));
      setEvaluation(evalData);
    }
  }, [evaluationId, evaluations]);

  const getRemarkColor = (score) => {
    if (score > 12) {
      return 'text-green-500'; 
    } else if (score >= 5 && score <= 12) {
      return 'text-yellow-500'; 
    } else {
      return 'text-red-500';
    }
  };

  if (!evaluation) return <Spinner />;

  return (
    <div className="flex flex-col min-h-screen bg-[#E7ECF3] p-20 pl-32">
      <Sidebar />
      <GeneralInfo />
      <div className="flex justify-between items-start">
        {/* PDF Viewer Section */}
        <div className="bg-white p-2 rounded-lg shadow-lg w-[858px]">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-bold text-[#001C46]">IB Economic Paper IA2 .pdf</h2>
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex items-center text-sm text-[#001C46]">
                <ZoomOutButton />
                <ZoomPopover />
                <ZoomInButton />
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-[#4E86FF] text-sm"
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
          </div>

          {isExpanded && (
            <div className="border rounded-lg overflow-hidden" style={{ height: '450px' }}>
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer fileUrl={evaluation.fileData} plugins={[zoomPluginInstance]} />
              </Worker>
            </div>
          )}
        </div>

        {/* Overall Score and Criteria Section */}
        <div className="px-6 pr-10">
          {/* Overall Score Card */}
          <Card className="bg-white w-[400px] h-[120px] rounded-3xl p-4 flex justify-between items-center">
            <div>
              <h4 className="text-sm">Overall Score</h4>
              <h2 className="text-lg font-semibold">Remark:  <span className={`text-lg font-semibold ${getRemarkColor(evaluation.overallScore)}`}>
              <span>{evaluation.remark}</span>
            </span></h2>
              <p className="text-xs text-gray-600">Evaluated on {evaluation.date}</p>
            </div>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={evaluation.overallScore}
                maxValue={20}
                text={`${evaluation.overallScore}/20`}
                styles={buildStyles({
                  pathColor: evaluation.overallScore >= 12 ? '#00c851' : evaluation.overallScore >= 5 ? '#ffbb33' : '#ff3547',
                  textColor: '#001C46',
                  trailColor: '#e0e0e0',
                  textSize: '25px',
                })}
                className='font-bold'
              />
            </div>
          </Card>

          {/* Criteria Section */}
          <div className="mt-6">
            <Accordion type="single" collapsible>
              {evaluation.criteria.map((criterion, index) => (
                <AccordionItem key={index} value={`criterion-${index}`} className="bg-white rounded-3xl p-2 px-3 mb-4 w-[400px]">
                  <AccordionTrigger>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className='w-10 h-10'>
                          <CircularProgressbar
                            value={criterion.score}
                            maxValue={10}
                            text={`${criterion.score}/10`}
                            styles={buildStyles({
                              pathColor: criterion.score >= 7 ? '#00c851' : criterion.score >= 5 ? '#ffbb33' : '#ff3547',
                              textColor: '#001C46',
                              trailColor: '#e0e0e0',
                              textSize: '25px',
                            })}
                            className='font-bold'
                          />
                        </div>
                        <div>
                          <h4 className="text-xs w-fit text-[#98A1BB]">{criterion.name}</h4>
                          <p className="text-sm text-gray-600">{criterion.shortDescription}</p>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-gray-600 mt-2">
                    <p className="mb-2 text-sm text-[#5B6170]">{criterion.description}</p>
                    <div className="mt-2">
                      <h5 className="font-extrabold text-[#001C46] text-xl">Strengths</h5>
                      <ul className="list-none pl-3 mt-1 p-3 border rounded-md border-green-500">
                        {criterion.strengths.map((strength, idx) => (
                          <div className='flex gap-2' key={idx}>
                            <IoCheckmarkCircleSharp color='green' className='mt-1' size={15}/>
                            <li className="mb-1 text-sm font-bold">{strength}</li>
                          </div>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-extrabold text-[#001C46] text-xl">Scope of Improvement</h5>
                      <ul className="list-none pl-3 mt-1 p-3 border rounded-md border-yellow-500">
                        {criterion.scopeOfImprovement.map((improvement, idx) => (
                          <div className='flex gap-2' key={idx}>
                            <IoInformationCircle color='#F9C94E' className='mt-1' size={15}/>
                            <li className="mb-1 text-sm font-bold">{improvement}</li>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <button className="p-2 px-3 font-mono font-extrabold bg-white text-[#6947BF] text-base rounded-2xl">
            <span className='underline'>Check Detailed Evaluation </span>&#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

const EvaluationDisplay = () => (
  <Suspense fallback={<Spinner />}>
    <EvaluationDisplayContent />
  </Suspense>
);

export default EvaluationDisplay;
