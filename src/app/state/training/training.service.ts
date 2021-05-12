import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayUpdate } from '@datorama/akita';
import { TrainingQuery } from './training.query';
import { TrainingStore } from './training.store';

@Injectable({ providedIn: 'root' })
export class TrainingService {

  isRunning$ = this.trainingQuery.select(({running}) => running);
  state$ = this.trainingQuery.select();

  constructor(private trainingStore: TrainingStore, private trainingQuery: TrainingQuery) {
  }

  getState = () => this.trainingQuery.getValue();
  updateRunning = (value) => this.trainingStore.update(_ => ({running: value}));
  updateVoice = (value) => this.trainingStore.update(_ => ({voice: value}));
  updateTechniques = (value) => this.trainingStore.update(_ => ({techniques: value}));
  updateTechnique = (id, value) => this.trainingStore.update(({ techniques }) => ({
    techniques: arrayUpdate(techniques, id, value)
  }));
  updateMessage = (value) => this.trainingStore.update(_ => ({message: value}));
  updateDelay = (value) => this.trainingStore.update(_ => ({delay: value}));
  updateStatus = (value) => this.trainingStore.update(_ => ({status: value}));
  updateLastTechnique = (value) => this.trainingStore.update(_ => ({lastTechnique: value}));
  
  
  speak(message) {
    this.updateMessage(message);
    const state = this.trainingQuery.getValue();
    state.utterance.voice = state.voice;
    state.utterance.text = state.message;
    state.synthesis.speak(state.utterance);
  }

}
