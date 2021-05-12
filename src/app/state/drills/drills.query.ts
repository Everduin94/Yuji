import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { DrillsStore, DrillsState } from './drills.store';

@Injectable({ providedIn: 'root' })
export class DrillsQuery extends QueryEntity<DrillsState> {

  constructor(protected store: DrillsStore) {
    super(store);
  }

}
