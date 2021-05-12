import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Subscription } from "rxjs";
import { createTechnique, TechniquesService } from "../state/techniques";
import { TechniquesFormModule } from "./techniques-form.component";

@Component({
  selector: "app-techniques",
  template: `
    <ng-container *ngIf="techniques$ | async as techniques">
      <ng-container class="basic-margin" *ngFor="let technique of techniques">
        <app-techniques-form
          [technique]="technique"
          (remove)="remove($event)"
        ></app-techniques-form>
      </ng-container>
    </ng-container>
    <button mat-button color="accent" (click)="add()">+Add Technique</button>
  `,
  styles: [],
})
export class TechniquesComponent implements OnInit, OnDestroy {
  techniques$;

  @Input() drillId;

  subscription = new Subscription();

  constructor(private ts: TechniquesService) {}

  ngOnInit(): void {
    this.techniques$ = this.ts.all$;
  }

  remove(id) {
    this.ts.localRemove(id);
  }

  add() {
    this.ts.localAdd(createTechnique({ drillId: this.drillId }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@NgModule({
  declarations: [TechniquesComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule, TechniquesFormModule],
  exports: [TechniquesComponent],
})
export class TechniquesModule {}
