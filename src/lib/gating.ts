import type { StageProgress, Stage } from '../types/schema';

export type UnlockReason = 'test' | 'chapters' | 'locked' | 'first';

export function unlockReason(
  previousStageDef: Stage,
  previousStageProgress: StageProgress | undefined
): UnlockReason {
  if (!previousStageProgress) return 'locked';
  
  if (previousStageProgress.testScore !== null && (previousStageProgress.testScore / 100) >= previousStageDef.passMark) {
    return 'test';
  }
  
  const ratio = previousStageProgress.chaptersCompleted.length / previousStageDef.chapters.length;
  if (ratio >= previousStageDef.chapterThreshold) {
    return 'chapters';
  }
  
  return 'locked';
}

export function isUnlocked(
  stageIndex: number,
  stages: Stage[],
  progressMap: Record<string, StageProgress>
): boolean {
  if (stageIndex === 0) return true;
  
  const previousDef = stages[stageIndex - 1];
  const previousProgress = progressMap[previousDef.id];
  
  const reason = unlockReason(previousDef, previousProgress);
  return reason !== 'locked';
}
