import { useState } from 'react';
import type { QuizQuestion } from '../types/schema';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  passMark: number;
  onFinish: (score: number) => void;
}

export default function Quiz({ questions, passMark, onFinish }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (selected === null) return;
    const isCorrect = selected === questions[currentIdx].correctIndex;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    } else {
      setIsFinished(true);
      onFinish(Math.round((newScore / questions.length) * 100));
    }
  };

  if (isFinished) {
    const passed = (score / questions.length) >= passMark;
    return (
      <div className="bg-stone-800 p-6 rounded-lg text-center border border-stone-700">
        <h3 className="text-2xl font-bold text-stone-100 mb-2">Quiz Complete!</h3>
        <p className="text-stone-400 mb-4">You scored {score} out of {questions.length}</p>
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded ${passed ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
          {passed ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span className="font-bold">{passed ? 'Passed!' : 'Keep practicing and try again.'}</span>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="bg-stone-800 p-6 rounded-lg border border-stone-700">
      <div className="mb-4 text-sm text-stone-500 font-bold uppercase tracking-wider">Question {currentIdx + 1} of {questions.length}</div>
      <h3 className="text-xl font-bold text-stone-100 mb-6">{q.question}</h3>
      <div className="space-y-3 mb-8">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`w-full text-left px-4 py-3 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${selected === idx ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={selected === null}
        className="w-full bg-amber-500 text-stone-900 font-bold py-3 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-900"
      >
        {currentIdx === questions.length - 1 ? 'Finish' : 'Next Question'}
      </button>
    </div>
  );
}
