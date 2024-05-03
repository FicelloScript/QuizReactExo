import React, { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_SCORE':
      return { ...state, score: action.payload };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    default:
      return state;
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, { score: 0, questions: [] });

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}

export { QuizProvider, useQuiz };
