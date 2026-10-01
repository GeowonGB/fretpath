import type { Stage } from '../types/schema';
import { stage1 } from './stage1';

export const STAGES: Stage[] = [
  stage1
  // Add stage2, stage3 etc here in the future
];

export function getStage(id: string): Stage | undefined {
  return STAGES.find(s => s.id === id);
}
