import { CommonModule } from "@angular/common";
import { NgModule, OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { DrillsService } from "../state/drills";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-drills",
  template: `
    <mat-card>
      <mat-card-header>
        <h4 style="color: var(--primary-color); margin-bottom: 0;">Drills</h4>
      </mat-card-header>
      <ng-container *ngIf="drills$ | async as drills">
        <mat-card
          class="basic-margin clickable"
          *ngFor="let drill of drills"
          (click)="activate(drill.id)"
        >
          {{ drill.name }} | {{ drill.description }}
        </mat-card>
      </ng-container>
      <button mat-button color="primary" (click)="activate(null)">+New Drill</button>
    </mat-card>
  `,
  styles: [],
})
export class DrillsComponent implements OnInit, OnDestroy {
  drills$;

  subscription = new Subscription();

  constructor(private ds: DrillsService) {}

  ngOnInit() {
    this.subscription.add(
      this.ds.syncCollection().subscribe()
    );
    this.drills$ = this.ds.all$;
  }

  activate(id) {
    this.ds.setActive(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@NgModule({
  declarations: [DrillsComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [DrillsComponent],
})
export class DrillsModule {}
