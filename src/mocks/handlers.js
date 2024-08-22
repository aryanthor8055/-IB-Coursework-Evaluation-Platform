import { http, HttpResponse } from "msw";
export const handlers = [
    http.get("/api/evaluate", (resolver) => {
    return HttpResponse.json(
        {
            id: Date.now(),
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
        }
    );
    }),
   ];