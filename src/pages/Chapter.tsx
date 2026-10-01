import { useParams, Link, useNavigate } from 'react-router-dom';
import { getStage } from '../data';
import { useProgressStore } from '../lib/progress';
import { ArrowLeft, Lightbulb, AlertTriangle, ListChecks } from 'lucide-react';
import Quiz from '../components/Quiz';

function TunerPlaceholder() {
  return <div className="bg-stone-900 border border-stone-700 p-8 text-center text-stone-500 rounded my-4">Interactive Tuner Component</div>;
}

function FretboardPlaceholder() {
  return <div className="bg-stone-900 border border-stone-700 p-8 text-center text-stone-500 rounded my-4">Interactive Fretboard Component</div>;
}

function StringQuizPlaceholder() {
  return <div className="bg-stone-900 border border-stone-700 p-8 text-center text-stone-500 rounded my-4">String Name Quiz Component</div>;
}

export default function ChapterPage() {
  const { stageId, chapterId } = useParams();
  const navigate = useNavigate();
  const stage = getStage(stageId || '');
  const chapter = stage?.chapters.find(c => c.id === chapterId);
  const markChapter = useProgressStore(s => s.markChapter);

  if (!stage || !chapter) return <div className="p-12 text-center text-stone-400">Chapter not found.</div>;

  const handleQuizFinish = (score: number) => {
    if ((score / 100) >= 0.66) {
      markChapter(stage.id, chapter.id);
    }
  };

  const chIndex = stage.chapters.findIndex(c => c.id === chapter.id);
  const prevCh = stage.chapters[chIndex - 1];
  const nextCh = stage.chapters[chIndex + 1];

  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <Link to={`/stage/${stage.id}`} className="inline-flex items-center text-amber-500 hover:text-amber-400 mb-8 transition-colors focus:ring-2 focus:ring-amber-500 rounded px-2 py-1 -ml-2">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Stage
      </Link>

      <h1 className="text-4xl font-bold text-stone-100 mb-2">{chapter.title}</h1>
      <p className="text-stone-400 text-lg mb-12">{chapter.summary}</p>

      <div className="space-y-8 mb-16">
        {chapter.blocks.map(block => {
          switch (block.type) {
            case 'text':
              return <p key={block.id} className="text-stone-300 leading-relaxed text-lg">{block.content}</p>;
            case 'tip':
              return (
                <div key={block.id} className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r">
                  <div className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-400">{block.content}</p>
                  </div>
                </div>
              );
            case 'mistakes':
              return (
                <div key={block.id} className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
                  <h4 className="flex items-center text-red-500 font-bold mb-4">
                    <AlertTriangle className="w-5 h-5 mr-2" /> Common Mistakes
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-stone-300">
                    {block.items?.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              );
            case 'practice':
              return (
                <div key={block.id} className="bg-stone-800 border border-stone-700 p-6 rounded-lg">
                  <h4 className="flex items-center text-stone-100 font-bold mb-4">
                    <ListChecks className="w-5 h-5 mr-2 text-amber-500" /> Practice Task ({block.minutes} mins)
                  </h4>
                  <ul className="space-y-3">
                    {block.items?.map((item, i) => (
                      <li key={i} className="flex items-center text-stone-300">
                        <div className="w-5 h-5 rounded border border-stone-600 mr-3 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            case 'widget':
              if (block.widgetType === 'tuner') return <TunerPlaceholder key={block.id} />;
              if (block.widgetType === 'fretboard') return <FretboardPlaceholder key={block.id} />;
              if (block.widgetType === 'stringQuiz') return <StringQuizPlaceholder key={block.id} />;
              return null;
            default:
              return null;
          }
        })}
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-stone-100 mb-6">Chapter Quiz</h2>
        <Quiz questions={chapter.quiz} passMark={0.66} onFinish={handleQuizFinish} />
      </div>

      <div className="flex justify-between border-t border-stone-800 pt-8">
        {prevCh ? (
          <button onClick={() => navigate(`/stage/${stage.id}/${prevCh.id}`)} className="text-stone-400 hover:text-stone-100 transition-colors focus:ring-2 focus:ring-stone-500 rounded px-4 py-2">
            &larr; Previous Chapter
          </button>
        ) : <div></div>}
        
        {nextCh ? (
          <button onClick={() => navigate(`/stage/${stage.id}/${nextCh.id}`)} className="text-amber-500 hover:text-amber-400 transition-colors font-bold focus:ring-2 focus:ring-amber-500 rounded px-4 py-2">
            Next Chapter &rarr;
          </button>
        ) : (
          <button onClick={() => navigate(`/stage/${stage.id}/test`)} className="bg-amber-500 text-stone-900 hover:bg-amber-400 transition-colors font-bold rounded px-6 py-2 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-900">
            Take Stage Test
          </button>
        )}
      </div>
    </div>
  );
}
