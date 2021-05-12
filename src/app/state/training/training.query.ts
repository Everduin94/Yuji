import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TrainingStore, TrainingState } from './training.store';

@Injectable({ providedIn: 'root' })
export class TrainingQuery extends Query<TrainingState> {

  constructor(protected store: TrainingStore) {
    super(store);
  }

}
