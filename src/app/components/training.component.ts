import { CommonModule } from "@angular/common";
import { Component, NgModule, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { combineLatest, interval, of } from "rxjs";
import { filter, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Technique, TechniquesService } from "../state/techniques";
import { TrainingService } from "../state/training";
import { TrainingStatus } from "../state/training/training.store";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-training",
  template: `
    <mat-card class="grid">
      <ng-container *ngIf="trs.isRunning$ | async as running">
        <mat-progress-spinner
          class="basic-margin"
          color="accent"
          mode="indeterminate"
          diameter="50"
        >
        </mat-progress-spinner>
      </ng-container>
      <div>
        <button mat-button color="primary" (click)="start()">Start</button>
        <button mat-button color="warn" (click)="stop()">Stop</button>
      </div>
    </mat-card>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-rows: max-content max-content;
        align-items: center;
        justify-items: center;
      }
    `,
  ],
})
export class TrainingComponent implements OnInit {
  constructor(public trs: TrainingService, public ts: TechniquesService) {}

  ngOnInit(): void {
    this.trs.isRunning$
      .pipe(
        switchMap((isRunning) => {
          if (isRunning) return interval(1000);
          else return of(null);
        }),
        filter((i) => i),
        withLatestFrom(combineLatest([this.trs.state$, this.ts.all$])),
        tap(([i, state]) => {
          /**
           * Rewrite last technique logic.
           * We need something simpler
           * Also need catch @ .25 and lower, reset.
           * 
           * What if we just subtract from everything and then reset back to original at 0.
           * - if number is less than .25 set 0.
           */
          const [trainingState, techniquesState] = state;
          if (trainingState.status == TrainingStatus.WAITING) return;
          const lottery = this.techniqueLottery(trainingState.techniques);
          const technique = lottery[this.getRandomInt(lottery.length)];
          this.trs.speak(technique.callout);
          this.trs.updateStatus(TrainingStatus.WAITING);
          this.trs.updateTechniques(techniquesState);

          setTimeout(() => {
            // TODO: Add concept to "coding concepts" to update a found value in an array.
            const probability = technique.probability - technique.probability * 0.5;
            if (probability > 0.25) this.trs.updateTechnique(technique.id, { probability });
            this.trs.updateStatus(TrainingStatus.SPEAKING);
          }, technique.delay * 1000);
        })
      )
      .subscribe();

    // TODO: Put somewhere else.
    this.ts.all$.pipe(tap((all) => this.trs.updateTechniques(all))).subscribe();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  techniqueLottery(techniques: Technique[]): Technique[] {
    const base = 4;
    return techniques
      .map((tech) =>
        [...Array(base * tech.probability).keys()].map((i) => tech)
      )
      .reduce((acc, curr) => [...acc, ...curr], []);
  }

  start() {
    this.trs.updateRunning(true);
  }

  stop() {
    this.trs.updateRunning(false);
  }
}

@NgModule({
  declarations: [TrainingComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  exports: [TrainingComponent],
})
export class TrainingModule {}
