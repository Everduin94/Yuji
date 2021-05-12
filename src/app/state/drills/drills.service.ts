import { Injectable } from '@angular/core';
import { DrillsState, DrillsStore } from './drills.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { DrillsQuery } from './drills.query';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'drills' })
export class DrillsService extends CollectionService<DrillsState> {

  all$ = this.drillsQuery.selectAll();
  active$ = this.drillsQuery.selectActive();

  constructor(private drillsStore: DrillsStore, private drillsQuery: DrillsQuery) {
    super(drillsStore);
  }

  setActive(drill) {
    this.drillsStore.setActive(drill);
  }

  localRemove(id) {
    this.store.remove(id);
  }

  isOnServer(id) {
    return this.drillsQuery.hasEntity(id);
  }

  reset() {
    this.drillsStore.reset();
  }


}
