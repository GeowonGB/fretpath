import { useParams, Link, useNavigate } from 'react-router-dom';
import { getStage } from '../data';
import { useProgressStore } from '../lib/progress';
import { ArrowLeft, CheckCircle, Circle, PlayCircle } from 'lucide-react';

export default function StagePage() {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const stage = getStage(stageId || '');
  const progress = useProgressStore((state) => state.stageProgress[stageId || '']);

  if (!stage) return <div className="p-12 text-center text-stone-400">Stage not found.</div>;

  const isTestPassed = progress?.testScore !== null && (progress?.testScore / 100) >= stage.passMark;

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl focus:outline-none">
      <Link to="/roadmap" className="inline-flex items-center text-amber-500 hover:text-amber-400 mb-8 transition-colors focus:ring-2 focus:ring-amber-500 rounded px-2 py-1 -ml-2">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Roadmap
      </Link>
      
      <h1 className="text-4xl font-bold text-stone-100 mb-4">{stage.title}</h1>
      <p className="text-stone-400 text-lg mb-12">{stage.description}</p>
      
      <div className="space-y-4 mb-12">
        {stage.chapters.map((ch, idx) => {
          const isCompleted = progress?.chaptersCompleted.includes(ch.id);
          
          return (
            <button 
              key={ch.id} 
              onClick={() => navigate(`/stage/${stage.id}/${ch.id}`)}
              className="w-full text-left bg-stone-800 border border-stone-700 p-6 rounded-lg flex justify-between items-center hover:border-amber-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <div>
                <span className="text-sm font-bold text-stone-500 uppercase tracking-widest block mb-1">Chapter {idx + 1}</span>
                <h3 className="text-xl font-bold text-stone-100 mb-1">{ch.title}</h3>
                <p className="text-stone-400 text-sm">{ch.summary}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                {isCompleted ? (
                  <span className="inline-flex items-center text-amber-500 text-sm font-bold">
                    <CheckCircle className="w-4 h-4 mr-1" /> Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center text-stone-500 text-sm font-bold">
                    <Circle className="w-4 h-4 mr-1" /> Not started
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-stone-800 pt-12">
        <h2 className="text-2xl font-bold text-stone-100 mb-4">Stage Assessment</h2>
        <button 
          onClick={() => navigate(`/stage/${stage.id}/test`)}
          className={`w-full text-left p-6 rounded-lg flex justify-between items-center transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 border ${isTestPassed ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500' : 'bg-stone-800 border-stone-700 hover:border-amber-500/50'}`}
        >
          <div>
            <h3 className="text-xl font-bold text-stone-100 mb-1">Final Test</h3>
            <p className="text-stone-400 text-sm">Pass with {stage.passMark * 100}% to confirm mastery.</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {progress?.testScore !== null ? (
              <span className={`text-sm font-bold ${isTestPassed ? 'text-amber-500' : 'text-stone-400'}`}>
                Score: {progress.testScore}%
              </span>
            ) : (
              <span className="inline-flex items-center bg-amber-500 text-stone-900 px-4 py-2 rounded font-bold text-sm">
                <PlayCircle className="w-4 h-4 mr-2" /> Take Test
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
