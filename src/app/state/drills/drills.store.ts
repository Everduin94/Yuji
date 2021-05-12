import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Drill } from './drill.model';

export interface DrillsState extends EntityState<Drill>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'drills',
  resettable: true
})
export class DrillsStore extends EntityStore<DrillsState> {

  constructor() {
    super();
  }

}
