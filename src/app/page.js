'use client';
import { useEffect, useState } from 'react';
import useEvaluationStore from '@/store/store';
import { useRouter } from 'next/navigation';
import { FileUploader } from 'react-drag-drop-files';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar/Sidebar';
import GeneralInfo from '@/components/General-Info/GeneralInfo';
import { Badge } from "@/components/ui/badge"

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const addEvaluation = useEvaluationStore((state) => state.addEvaluation);
  const router = useRouter();

  const handleChange = (file) => {
    setFile(file);
  };

  const handleEvaluate = () => {
    if (!file || !course || !subject || !title) {
      alert('Please fill in all fields and upload a file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const newEvaluation = {
        id: Date.now(),
        fileData: reader.result, 
        fileName: file.name,    
        overallScore: 13,
        remark: 'Excellent',
        date: new Date().toLocaleDateString(),
        criteria: [
          { name: 'Criterion A', score: 7 },
          { name: 'Criterion B', score: 5 },
          { name: 'Criterion C', score: 3 },
        ],
        course,
        subject,
        title,
      };

      addEvaluation(newEvaluation);
      router.push(`/Evaluation-Display?id=${newEvaluation.id}`);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Sidebar />
      <GeneralInfo />
      <div className="min-h-screen bg-[#E7ECF3] p-20 px-60">
        <div className="max-w-7xl mx-auto">
          <div className='flex flex-col lg:flex-row items-center justify-between p-6 rounded-lg'>
            <div className="w-[740px] h-[626px]">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-[#001C46]">Hey IB Folks! Unsure about the quality of your answers? <span className="text-[#4E86FF]">We get you.</span></h1>
              </div>
              <div className='h-[516px] bg-white border-2 rounded-lg p-6'>
                <div className="w-[660px] h-[200px] bg-[#F6F9FF] flex items-center justify-center border-2 rounded-lg">
                  <FileUploader handleChange={handleChange} name="file" types={['PDF']} />
                </div>
                {file && <p className="mt-4 text-gray-600">File: {file.name}</p>}
                <div className="mt-6">
                  <div className="mb-2 text-[#001C46]">Select your course & subject*</div>
                  <div className='flex gap-4'>
                    {/* Select for Coursework Type */}
                    <Select onValueChange={setCourse}>
                      <SelectTrigger className="p-3 border border-gray-300 rounded-lg bg-white">
                        {course || <span className="text-slate-500">Coursework Type</span>}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Select for Subject */}
                    <Select onValueChange={setSubject}>
                      <SelectTrigger className="p-3 border border-gray-300 rounded-lg bg-white">
                        {subject || <span className="text-slate-500">Subject</span>}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Math">Math</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 text-[#001C46]">Enter your essay title* (Required)</div>
                  <Input
                    type="text"
                    placeholder="How nation works..."
                    className="w-full p-3 border border-[#F1C40F] rounded-lg bg-white mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <Button onClick={handleEvaluate} className={`bg-[#4E86FF] text-white w-[245px] gap-2 rounded-3xl`}>
                  <Image src="/assets/evaluate-btn.svg" width={24} height={24}/>
                  Evaluate your Score
                </Button>
              </div>
            </div>

            <div className="hidden lg:block w-full lg:w-1/2 pl-10">
              <Image src="/assets/CourseworkImage.svg" alt="Evaluate your coursework" width={344} height={626} className='max-w-fit'/>
            </div>
          </div>

          <div className="mt-12 ml-6">
            <h2 className="text-xl font-bold text-[#001C46]">My coursework</h2>
            <div className="flex gap-4 flex-wrap">
              {[1, 2].map((_, index) => (
                <Card key={index} className="flex bg-white rounded-lg shadow-md p-4 w-[440px] h-[172px] p-1">
                  <Image src="/assets/page.svg" alt={`Coursework Image ${index + 1}`} width={100} height={142} />
                  <CardHeader className='p-3'>
                    <CardTitle className="text-sm">How does the temperature of a Copper...</CardTitle>
                    <CardDescription>How does the temperature of a Copper pipe affect the time it takes.. </CardDescription>
                    <CardContent className="p-1">
                      <Badge variant="outline">👩‍🎓Physics HL</Badge>
                      <Badge variant="outline">⏰18 min read</Badge>
                      <Badge variant="outline">📄2388 words</Badge>
                      <Badge variant="outline">⭐7/7</Badge>
                      <Badge variant="outline">👌English</Badge>
                    </CardContent>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="text-center mt-2 cursor-pointer">
              <span className='text-[#98A1BB]'>
                View all
              </span>
            </div>
          </div>

          <div className="mt-12 ml-6">
            <h2 className="text-xl font-bold text-[#001C46]">Explore coursework</h2>
            <div className="flex space-x-4 mt-4 cursor-pointer">
              <span className="bg-white p-1 rounded text-[#4E86FF]">All</span>
              <span className="text-[#98A1BB] p-1">IA Example</span>
              <span className="text-[#98A1BB] p-1">EE Example</span>
              <span className="text-[#98A1BB] p-1">IO Example</span>
              <span className="text-[#98A1BB] p-1">Tok Example</span>
            </div>
            <div className="flex gap-4 flex-wrap mt-2">
              {[1, 2, 3, 4].map((_, index) => (
                <Card key={index} className="flex bg-white rounded-lg shadow-md p-4 w-[440px] h-[172px] p-1">
                  <Image src="/assets/page.svg" alt={`Coursework Image ${index + 1}`} width={100} height={142} />
                  <CardHeader className='p-3'>
                    <CardTitle className="text-sm">How does the temperature of a Copper...</CardTitle>
                    <CardDescription>How does the temperature of a Copper pipe affect the time it takes.. </CardDescription>
                    <CardContent className="p-1">
                      <Badge variant="outline">👩‍🎓Physics HL</Badge>
                      <Badge variant="outline">⏰18 min read</Badge>
                      <Badge variant="outline">📄2388 words</Badge>
                      <Badge variant="outline">⭐7/7</Badge>
                      <Badge variant="outline">👌English</Badge>
                    </CardContent>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
