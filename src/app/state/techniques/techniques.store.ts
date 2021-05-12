import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Technique } from './technique.model';

export interface TechniquesState extends EntityState<Technique>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'techniques',
  resettable: true
})
export class TechniquesStore extends EntityStore<TechniquesState> {

  constructor() {
    super();
  }

}
