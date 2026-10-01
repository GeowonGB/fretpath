import { useParams, Link, useNavigate } from 'react-router-dom';
import { getStage, STAGES } from '../data';
import { useProgressStore } from '../lib/progress';
import { isUnlocked } from '../lib/gating';
import { ArrowLeft, Trophy, Lock } from 'lucide-react';
import Quiz from '../components/Quiz';

export default function TestPage() {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const stage = getStage(stageId || '');
  const recordTest = useProgressStore(s => s.recordTest);
  const stageProgress = useProgressStore(s => s.stageProgress);

  if (!stage) return <div className="p-12 text-center text-stone-400">Stage not found.</div>;

  const currentIdx = STAGES.findIndex(s => s.id === stage.id);
  const nextStage = STAGES[currentIdx + 1];

  const handleTestFinish = (score: number) => {
    recordTest(stage.id, score);
  };

  const progress = stageProgress[stage.id];
  const hasTakenTest = progress?.testScore !== null;
  const passed = hasTakenTest && (progress.testScore! / 100) >= stage.passMark;
  
  let nextUnlocked = false;
  if (nextStage) {
    nextUnlocked = isUnlocked(currentIdx + 1, STAGES, stageProgress);
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-2xl">
      <Link to={`/stage/${stage.id}`} className="inline-flex items-center text-amber-500 hover:text-amber-400 mb-8 transition-colors focus:ring-2 focus:ring-amber-500 rounded px-2 py-1 -ml-2">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Stage
      </Link>

      <h1 className="text-4xl font-bold text-stone-100 mb-2">{stage.title} Final Test</h1>
      <p className="text-stone-400 text-lg mb-12">Pass this test with a score of {stage.passMark * 100}% or higher to prove your mastery.</p>

      {hasTakenTest && (
        <div className={`mb-12 p-8 rounded-lg border text-center ${passed ? 'bg-amber-500/10 border-amber-500' : 'bg-red-500/10 border-red-500/30'}`}>
          <Trophy className={`w-12 h-12 mx-auto mb-4 ${passed ? 'text-amber-500' : 'text-red-400'}`} />
          <h2 className="text-2xl font-bold text-stone-100 mb-2">Previous Score: {progress.testScore}%</h2>
          <p className={passed ? 'text-amber-400' : 'text-red-400'}>
            {passed ? 'You have passed this stage!' : 'You did not pass. Review the chapters and try again.'}
          </p>
          
          {nextStage && (
            <div className="mt-8 pt-8 border-t border-stone-700/50">
              <h3 className="text-lg font-bold text-stone-100 mb-3">Next Step: {nextStage.title}</h3>
              {nextUnlocked ? (
                <div>
                  <p className="text-stone-400 mb-4">The next stage is unlocked! {passed ? 'You passed the test.' : 'You unlocked it by completing chapters, but passing this test is still recommended.'}</p>
                  <button onClick={() => navigate(`/stage/${nextStage.id}`)} className="bg-amber-500 text-stone-900 font-bold px-6 py-2 rounded hover:bg-amber-400 transition-colors focus:ring-2 focus:ring-amber-500">
                    Go to Next Stage
                  </button>
                </div>
              ) : (
                <div className="text-stone-500 flex items-center justify-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Still locked. Complete chapters or pass this test.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-stone-100 mb-6">{hasTakenTest ? 'Retake Test' : 'Start Test'}</h2>
        <Quiz questions={stage.finalTest} passMark={stage.passMark} onFinish={handleTestFinish} />
      </div>
    </div>
  );
}
