import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Technique } from '../techniques';

export enum TrainingStatus {
  SPEAKING,
  WAITING
}

export interface TrainingState {
  running: boolean;
  utterance: SpeechSynthesisUtterance,
  voice: SpeechSynthesisVoice,
  synthesis: SpeechSynthesis,
  techniques: Technique[],
  message: string,
  delay: number,
  status: TrainingStatus,
  lastTechnique: Technique
}

export function createInitialState(): TrainingState {
  return {
    running: false,
    utterance: new SpeechSynthesisUtterance(),
    voice: window.speechSynthesis?.getVoices()[0],
    synthesis: window.speechSynthesis,
    techniques: [],
    message: '',
    delay: 5000, // Warm up time,
    status: TrainingStatus.SPEAKING,
    lastTechnique: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'training' })
export class TrainingStore extends Store<TrainingState> {

  constructor() {
    super(createInitialState());
  }

}
