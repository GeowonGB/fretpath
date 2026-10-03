import { getStage } from '../data';
import { roadmap } from '../data/curriculum';
import { useProgressStore } from '../lib/progress';
import { unlockReason } from '../lib/gating';
import { Lock, Unlock, CheckCircle, ChevronRight, AlertTriangle, Code2, Clock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Roadmap() {
  const stageProgress = useProgressStore((state) => state.stageProgress);
  const markChapter = useProgressStore((state) => state.markChapter);
  const recordTest = useProgressStore((state) => state.recordTest);
  const navigate = useNavigate();

  const debugCompleteStage = (stageId: string, chapters: any[]) => {
    chapters.forEach(ch => markChapter(stageId, ch.id));
    recordTest(stageId, 100);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-100 mb-6">Your Journey Map</h1>
        <p className="text-stone-400 text-lg">
          Follow the tiles below to achieve guitar mastery. Complete 80% of a stage or pass its final test to unlock the next level.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {roadmap.map((rStage, index) => {
          const progress = stageProgress[rStage.id];
          
          let isLocked = false;
          
          if (index > 0) {
             const prevRStage = roadmap[index - 1];
             const prevProgress = stageProgress[prevRStage.id];
             const prevDef = getStage(prevRStage.id) || { chapters: new Array(prevRStage.lessons.length), passMark: 0.7, chapterThreshold: 0.8 } as any;
             const lockReason = unlockReason(prevDef, prevProgress);
             isLocked = lockReason === 'locked';
          }

          const def = getStage(rStage.id) || { chapters: new Array(rStage.lessons.length), passMark: 0.7, chapterThreshold: 0.8 } as any;
          const isCompleted = progress?.testScore !== null && (progress.testScore / 100) >= def.passMark;
          const completionRatio = progress ? (progress.chaptersCompleted.length / def.chapters.length) : 0;
          const recommendedTest = !isLocked && completionRatio >= def.chapterThreshold && (!isCompleted);

          return (
            <div 
              key={rStage.id} 
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 transform ${
                isLocked 
                  ? 'bg-stone-900/40 border-stone-800 opacity-70 cursor-not-allowed' 
                  : 'bg-stone-800 border-stone-700 hover:border-amber-500/50 hover:-translate-y-1 shadow-lg'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  isLocked ? 'border-stone-700 text-stone-600 bg-stone-900' :
                  isCompleted ? 'border-amber-500 bg-amber-500 text-stone-900' :
                  'border-amber-500 text-amber-500 bg-stone-900'
                }`}>
                  {isLocked ? <Lock className="w-5 h-5" /> : (isCompleted ? <CheckCircle className="w-6 h-6" /> : <Unlock className="w-5 h-5" />)}
                </span>
                
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-500 block mb-1">
                    Stage 0{index + 1}
                  </span>
                  <span className="text-xs text-stone-400 flex items-center justify-end font-medium">
                    <Clock className="w-3 h-3 mr-1" /> {rStage.timeframe}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-stone-100 mb-2">{rStage.title}</h2>
                <p className="text-stone-300 text-sm italic mb-4">"{rStage.tagline}"</p>
                
                <div className="space-y-2 mb-6">
                  {rStage.goals.slice(0, 2).map((goal, i) => (
                    <div key={i} className="flex items-start text-xs text-stone-400">
                      <Target className="w-3 h-3 mr-2 mt-0.5 text-amber-500/70 shrink-0" />
                      <span>{goal}</span>
                    </div>
                  ))}
                  {rStage.goals.length > 2 && (
                    <div className="text-xs text-stone-500 italic ml-5">
                      + {rStage.goals.length - 2} more goals
                    </div>
                  )}
                </div>
                
                {isLocked ? (
                  <div className="mb-6 bg-stone-900 border border-stone-800 p-3 rounded text-stone-500 text-xs">
                    <p className="font-bold flex items-center mb-1"><Lock className="w-3 h-3 mr-1"/> Locked</p>
                    <p>{rStage.passCriteria}</p>
                  </div>
                ) : (
                  recommendedTest && (
                    <div className="mb-6 flex items-start space-x-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded text-amber-500 text-xs">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>Retake the test to confirm mastery.</p>
                    </div>
                  )
                )}
              </div>

              {!isLocked && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-stone-400 mb-2 font-medium">
                    <span>Chapters: {progress?.chaptersCompleted.length || 0} / {rStage.lessons.length}</span>
                    <span>Best Test: {progress?.testScore !== null && progress?.testScore !== undefined ? `${progress.testScore}%` : 'N/A'}</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 transition-all duration-500" 
                      style={{ width: `${completionRatio * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3 mt-auto">
                <button 
                  disabled={isLocked}
                  onClick={() => navigate(`/stage/${rStage.id}`)}
                  className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center transition-colors ${
                    isLocked 
                      ? 'bg-stone-900 text-stone-600' 
                      : 'bg-amber-500 text-stone-900 hover:bg-amber-400'
                  }`}
                >
                  <span>{isLocked ? 'Locked' : 'Open Stage'}</span>
                  {!isLocked && <ChevronRight className="w-4 h-4 ml-1" />}
                </button>

                {!isLocked && import.meta.env.DEV && def.chapters[0] && (
                  <button 
                    onClick={() => debugCompleteStage(rStage.id, def.chapters)}
                    title="Dev: Auto-Complete Stage"
                    className="w-12 h-12 flex items-center justify-center rounded-lg bg-stone-700 text-stone-400 hover:text-amber-500 hover:bg-stone-600 transition-colors border border-stone-600"
                  >
                    <Code2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
