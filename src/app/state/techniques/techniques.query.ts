import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TechniquesStore, TechniquesState } from './techniques.store';

@Injectable({ providedIn: 'root' })
export class TechniquesQuery extends QueryEntity<TechniquesState> {

  constructor(protected store: TechniquesStore) {
    super(store);
  }

}
