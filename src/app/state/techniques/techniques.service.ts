import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { TechniquesQuery } from './techniques.query';
import { TechniquesState, TechniquesStore } from './techniques.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'techniques' })
export class TechniquesService extends CollectionService<TechniquesState>{

  write;
  all$ = this.query.selectAll();

  constructor(private techniquesStore: TechniquesStore, private query: TechniquesQuery, private toast: HotToastService) {
    super(techniquesStore);
    this.write = this.batch();
  }

  localRemove(id) {
    this.remove(id, {write: this.write});
    this.techniquesStore.remove(id);
  }

  localAdd(entry) {
    this.add(entry, {write: this.write});
    this.techniquesStore.add(entry);
  }

  localUpdate(entry) {
    this.update(entry, {write: this.write});
    this.techniquesStore.update(entry);
  }

  reset() {
    this.techniquesStore.reset();
  }

  save() {
    const commit:Promise<void> = this.write.commit();
    commit.then(success => this.toast.success("Saved Drill"))
    .catch(error => this.toast.error("Could not save Drill!"))
    this.write = this.batch();
  }

}
