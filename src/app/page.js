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
        fileData: reader.result, // store the file as base64
        fileName: file.name,     // store the file name
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
      <div className="min-h-screen bg-[#E7ECF3] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#001C46]">Hey IB Folks! Unsure about the quality of your answers? <span className="text-[#4E86FF]">We get you.</span></h1>
          </div>

          <div className='flex flex-col lg:flex-row items-center justify-between p-6 rounded-lg'>
            <div className="w-[720px] h-[516px] bg-white border-2 rounded-lg p-6 mr-4">
              <div className="w-[660px] h-[200px] bg-[#F6F9FF] flex items-center justify-center border-2 rounded-lg">
                <FileUploader handleChange={handleChange} name="file" types={['PDF']} />
              </div>
              {file && <p className="mt-4 text-gray-600">File: {file.name}</p>}
              <div className="mt-6">
                <div className="mb-2 text-[#001C46]">Select your course & subject*</div>
                <div className='flex gap-4'>
                  <Select onValueChange={setCourse}>
                    <SelectTrigger className="p-3 border border-gray-300 rounded-lg bg-white">
                      <SelectContent>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                  <Select onValueChange={setSubject}>
                    <SelectTrigger className="p-3 border border-gray-300 rounded-lg bg-white">
                      <SelectContent>
                        <SelectItem value="Math">Math</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </SelectTrigger>
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
               <Button onClick={handleEvaluate} className="bg-[#4E86FF] text-white w-full py-3 rounded-lg">
        Evaluate your Score
      </Button>
            </div>

            <div className="hidden lg:block w-full lg:w-1/2 pl-10">
              <Image src="/assets/CourseworkImage.svg" alt="Evaluate your coursework" width={290} height={528} />
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#001C46]">My coursework</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {[1, 2, 3].map((_, index) => (
                <Card key={index} className="flex bg-white rounded-lg shadow-md p-4">
                    <Image src="/assets/page.svg" alt={`Coursework Image ${index + 1}`} width={100} height={142} />
                  <CardHeader>
                    <CardTitle>How does the temperature of a Copper...</CardTitle>
                    <CardDescription>Physics HL</CardDescription>
                  <CardContent>
                    <p>Word Count: 3284</p>
                  </CardContent>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button className="text-[#4E86FF]">View all</Button>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#001C46]">Explore coursework</h2>
            <div className="flex space-x-4 mt-4">
              <Button className="bg-[#4E86FF] text-white">All</Button>
              <Button className="text-[#4E86FF]">IA Example</Button>
              <Button className="text-[#4E86FF]">EE Example</Button>
              <Button className="text-[#4E86FF]">IO Example</Button>
              <Button className="text-[#4E86FF]">Tok Example</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <Card key={index} className="flex bg-white rounded-lg shadow-md p-4">
                    <Image src="/assets/page.svg" alt={`Coursework Image ${index + 1}`} width={100} height={142} />
                  <CardHeader>
                    <CardTitle>How does the temperature of a Copper...</CardTitle>
                    <CardDescription>Physics HL</CardDescription>
                  <CardContent>
                    <p>Word Count: 3284</p>
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
