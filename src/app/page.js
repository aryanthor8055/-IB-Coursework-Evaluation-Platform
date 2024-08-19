"use client";
import { useEffect, useState } from "react";
import useEvaluationStore from "@/store/store";
import { useRouter } from "next/navigation";
import { FileUploader } from "react-drag-drop-files";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import GeneralInfo from "@/components/General-Info/GeneralInfo";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const addEvaluation = useEvaluationStore((state) => state.addEvaluation);
  const evaluations = useEvaluationStore((state) => state.evaluations);
  const initializeStore = useEvaluationStore((state) => state.initializeStore);
  const router = useRouter();

  useEffect(() => {
    initializeStore(); // Initialize store with data from local storage
  }, [initializeStore]);

  const handleChange = (file) => {
    setFile(file);
  };

  const handleEvaluate = () => {
    if (!file || !course || !subject || !title) {
      alert("Please fill in all fields and upload a file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const newEvaluation = {
        id: Date.now(),
        fileData: reader.result,
        fileName: file.name,
        overallScore: 13,
        remark: "Excellent",
        date: new Date().toLocaleDateString(),
        criteria: [
          {
            name: "Criterion A",
            score: 7,
            shortDescription: "Research Question and Hypothesis",
            description:
              "This criterion focuses on the clarity and appropriateness of the research question and hypothesis.",
            strengths: [
              "Clearly defined research question.",
              "Hypothesis is well-justified based on background research.",
            ],
            scopeOfImprovement: [
              "Consider adding more context to the hypothesis.",
              "Expand on the background research to support the hypothesis further.",
            ],
          },
          {
            name: "Criterion B",
            score: 5,
            shortDescription: "Methodology and Experimentation",
            description:
              "This criterion assesses the appropriateness and thoroughness of the methods used in the experiment.",
            strengths: [
              "Experiment design is well-structured.",
              "Data collection is consistent and reliable.",
            ],
            scopeOfImprovement: [
              "Include a control group for comparison.",
              "Discuss potential sources of error in more detail.",
            ],
          },
          {
            name: "Criterion C",
            score: 3,
            shortDescription: "Data Analysis and Interpretation",
            description:
              "This criterion evaluates the quality of data analysis and interpretation of results.",
            strengths: [
              "Data is presented clearly with appropriate graphs.",
              "Interpretation of results is logical and well-argued.",
            ],
            scopeOfImprovement: [
              "Apply more advanced statistical analysis.",
              "Consider alternative interpretations of the data.",
            ],
          },
        ],
        course,
        subject,
        title,
        wordCount: 2388,
        readTime: "18 min",
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
          <div className="flex flex-col lg:flex-row items-center justify-between p-6 rounded-lg">
            <div className="w-[740px] h-[626px]">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-[#001C46]">
                  Hey IB Folks! Unsure about the quality of your answers?{" "}
                  <span className="text-[#4E86FF]">We get you.</span>
                </h1>
              </div>
              <div className="h-[516px] bg-white border-2 rounded-lg p-6">
                <div className="w-[660px] h-[200px] bg-[#F6F9FF] flex items-center justify-center border-2 rounded-lg">
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    types={["PDF"]}
                  />
                </div>
                {file && (
                  <p className="mt-4 text-gray-600">File: {file.name}</p>
                )}
                <div className="mt-6">
                  <div className="mb-2 text-[#001C46]">
                    Select your course & subject*
                  </div>
                  <div className="flex gap-4">
                    {/* Select for Coursework Type */}
                    <Select onValueChange={setCourse}>
                      <SelectTrigger className="p-3 border border-gray-300 rounded-lg bg-white">
                        {course || (
                          <span className="text-slate-500">Coursework Type</span>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IO Example">IO Example</SelectItem>
                        <SelectItem value="EE Example">
                        EE Example
                        </SelectItem>
                        <SelectItem value="IA Example">IA Example</SelectItem>
                        <SelectItem value="Tok Example">Tok Example</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Select for Subject */}
                    <Select onValueChange={setSubject}>
                      <SelectTrigger className="p-3 border border-gray-300 rounded-lg bg-white">
                        {subject || (
                          <span className="text-slate-500">Subject</span>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Math">Math</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 text-[#001C46]">
                    Enter your essay title* (Required)
                  </div>
                  <Input
                    type="text"
                    placeholder="How nation works..."
                    className="w-full p-3 border border-[#F1C40F] rounded-lg bg-white mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleEvaluate}
                  className="bg-[#4E86FF] text-white w-[245px] gap-2 rounded-3xl"
                >
                  <Image
                    src="/assets/evaluate-btn.svg"
                    width={24}
                    height={24}
                  />
                  Evaluate your Score
                </Button>
              </div>
            </div>

            <div className="hidden lg:block w-full lg:w-1/2 pl-10">
              <Image
                src="/assets/CourseworkImage.svg"
                alt="Evaluate your coursework"
                width={344}
                height={626}
                className="max-w-fit"
              />
            </div>
          </div>

          <div className="mt-12 ml-6">
            <h2 className="text-xl font-bold text-[#001C46]">My coursework</h2>
            <div className="flex gap-4 flex-wrap">
              {evaluations.length > 0 ? (
                evaluations.map((evaluation, index) => (
                  <Card
                    key={index}
                    className="flex bg-white rounded-lg shadow-md p-4 w-[440px] h-[172px]"
                  >
                    <Image
                      src="/assets/page.svg"
                      alt={`Coursework Image ${index + 1}`}
                      width={100}
                      height={142}
                    />
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm">
                        {evaluation.title}
                      </CardTitle>
                      <CardDescription>{evaluation.course}</CardDescription>
                      <CardContent className="p-1">
                        <Badge variant="outline" className='m-1'>👩‍🎓{evaluation.subject}</Badge>
                        <Badge variant="outline" className='m-1'>⏰{evaluation.readTime}</Badge>
                        <Badge variant="outline" className='m-1'>
                          📄{evaluation.wordCount} words
                        </Badge>
                        <Badge variant="outline" className='m-1'>
                          ⭐{evaluation.overallScore}/7
                        </Badge>
                        <Badge variant="outline" className='m-1'>🏆{evaluation.remark}</Badge>
                      </CardContent>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <div className="text-center w-full text-gray-500">
                  No previous Coursework Present
                </div>
              )}
            </div>
            {
              evaluations.length > 4 && ( <div className="text-center mt-2 cursor-pointer">
                <span className='text-[#98A1BB]'>
                  View all
                </span>
              </div>)
            }
           
          </div>

          <div className="mt-12 ml-6">
            <h2 className="text-xl font-bold text-[#001C46]">Explore coursework</h2>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all" className="text-[#6947BF]">All</TabsTrigger>
                <TabsTrigger value="IA Example">IA Example</TabsTrigger>
                <TabsTrigger value="EE Example">EE Example</TabsTrigger>
                <TabsTrigger value="IO Example">IO Example</TabsTrigger>
                <TabsTrigger value="Tok Example">Tok Example</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
              <div className="flex gap-4 flex-wrap mt-2">
            {[1, 2, 3, 4].map((_, index) => (
                <Card key={index} className="flex bg-white rounded-lg shadow-md p-4 w-[440px] h-[172px] p-1">
                  <Image src="/assets/page.svg" alt={`Coursework Image ${index + 1}`} width={100} height={142} />
                  <CardHeader className='p-3'>
                    <CardTitle className="text-sm">How does the temperature of a Copper...</CardTitle>
                    <CardDescription>How does the temperature of a Copper pipe affect the time it takes.. </CardDescription>
                    <CardContent className="p-1">
                      <Badge variant="outline" className="m-1">👩‍🎓Physics HL</Badge>
                      <Badge variant="outline" className="m-1">⏰18 min read</Badge>
                      <Badge variant="outline" className="m-1">📄2388 words</Badge>
                      <Badge variant="outline" className="m-1">⭐7/7</Badge>
                      <Badge variant="outline" className="m-1">👌English</Badge>
                    </CardContent>
                  </CardHeader>
                </Card>
              ))}
            </div>
              </TabsContent>

              <TabsContent value="IA Example">
                {/* Engineering-specific content */}
                <div className="text-center w-full text-gray-500">
                  No Engineering Coursework Present
                </div>
              </TabsContent>

              <TabsContent value="mba">
                {/* MBA-specific content */}
                <div className="text-center w-full text-gray-500">
                  No MBA Coursework Present
                </div>
              </TabsContent>

              <TabsContent value="medical">
                {/* Medical-specific content */}
                <div className="text-center w-full text-gray-500">
                  No Medical Coursework Present
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
