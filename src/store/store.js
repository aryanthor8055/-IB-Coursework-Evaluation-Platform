import { create } from 'zustand';

const useEvaluationStore = create((set, get) => ({
  evaluations: [],
  initializeStore: () => {
    if (typeof window !== 'undefined' && get().evaluations.length === 0) { // Check if window is available and if evaluations are not already set
      const storedEvaluations = (localStorage.getItem('evaluations')) || [];
      set({ evaluations: storedEvaluations });
    }
  },
  addEvaluation: (evaluation) => set((state) => {
    const updatedEvaluations = [...state.evaluations, evaluation];
    if (typeof window !== 'undefined') { 
      localStorage.setItem('evaluations',(updatedEvaluations));
    }
    return { evaluations: updatedEvaluations };
  }),
  getEvaluationById: (id) => {
    return get().evaluations.find(evaluation => evaluation.id === id);
  },
}));

export default useEvaluationStore;
