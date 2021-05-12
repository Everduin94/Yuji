import { CommonModule } from "@angular/common";
import { Input, NgModule } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { guid, ID } from "@datorama/akita";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, shareReplay, startWith, switchMap, take, tap } from "rxjs/operators";
import { createDrill, createDrillForm, DESCRIPTION, DrillsService, NAME } from "../state/drills";
import { TechniquesService } from "../state/techniques";
import { TechniquesFormModule } from "./techniques-form.component";
import { TechniquesModule } from "./techniques.component";

@Component({
  selector: "app-drills-form",
  template: `
    <mat-card [formGroup]="form">
      <mat-card-header style="flex-direction: row-reverse">
      <button mat-button color="warn" [disabled]="!this.ds.isOnServer(activeId$ | async)" (click)="remove()">-Remove Drill</button>
      </mat-card-header>
      <mat-card-content class="grid">
        <mat-form-field class="row-input">
          <mat-label>Name</mat-label>
          <input matInput [formControlName]="name"/>
        </mat-form-field>

        <mat-form-field class="row-input">
          <mat-label>Description</mat-label>
          <input matInput [formControlName]="description"/>
        </mat-form-field>

        <h4 class="techniques-header">Techniques</h4>
        <app-techniques [drillId]="activeId$ | async"></app-techniques>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button color="primary" (click)="add()">Save Drill</button>
      </mat-card-actions>
    </mat-card>

    <ng-container *ngIf="techniqueSync$ | async"></ng-container>
  `,
  styles: [`
    .grid {
      display: grid;
      grid-template-rows: repeat(3, max-content)
    }

    .techniques-header {
      color: var(--primary-color);
      margin-left: 8px;
      margin-bottom: 4px;
      font-weight: 500;
    }
  `],
})
export class DrillsFormComponent implements OnInit {

  form;
  activeId$: Observable<ID>;
  techniqueSync$;

  readonly name = NAME;
  readonly description = DESCRIPTION;

  constructor(public ds: DrillsService, 
    private ts: TechniquesService, 
    private fb: FormBuilder) {}

  ngOnInit(): void {

    this.form = this.fb.group(createDrillForm());

    /**
     * Note: I don't like this code being in the component either.
     */
    this.activeId$ = this.ds.active$.pipe(
      tap(active => active ? this.form.patchValue(active) : undefined),
      map(active => active ? active.id : guid()),
      shareReplay({
        bufferSize: 1,
        refCount: true
      }) // Don't run guid() on second subscribe.
    );

    /**
     * I don't like that drillId is not a constant. / There isn't a list of known prop names.
     * - But I don't know best practices here.
     * - Having constant is good, but accessing everything like obj[MYPROP] is maybe weird.
     */
    this.techniqueSync$ = this.activeId$.pipe(
      distinctUntilChanged(),
      tap(id => this.ts.reset()),
      switchMap(id => this.ts.syncCollection(ref => ref.where("drillId", "==", id))
    ));    
  }

  /**
   * Notes
   * - I don't like that I have to take(1) sub here
   *  - But I do activeId$ | async somewhere else (can't do this in event binding).
   * - **Too much surface area for a very simple task.**
   */
  add() {
    this.activeId$.pipe(
      take(1),
      tap(id => {
        const {name, description} = this.form.value;
        this.ds.add(createDrill({id, name, description}));
        this.ts.save();
      })
    ).subscribe()
  }

  /**
   * Notes
   * - I don't like the code being in the component.
   * - I think injecting ts in ds could cause issues. Need "controller" service?
   * - I don't like all the take 1 business. Need Subject to pass events to listener?
   *   - "ng-neat" From Event? 
   */
  remove() { 
    this.activeId$.pipe(
      take(1),
      switchMap(id => this.ts.all$.pipe(
          take(1),
          tap(allTechniques => {
            this.ts.remove(allTechniques.map(t => t.id) as string[])
            this.ds.remove(id as string);
            this.ds.setActive(null);
          })
        ))
    ).subscribe();
  }
}

@NgModule({
  declarations: [DrillsFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatInputModule, TechniquesModule, TechniquesFormModule],
  exports: [DrillsFormComponent],
})
export class DrillsFormModule {}