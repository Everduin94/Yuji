import { Component } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import copy from "copy-to-clipboard";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { DrillsService } from "./state/drills";

@Component({
  selector: "app-root",
  template: `
    <ng-container *ngIf="ds.active$ | async as active">
      <app-training></app-training>
    </ng-container>
    <app-drills></app-drills>
    <app-drills-form></app-drills-form>
  `,
  styles: [
    `
      :host {
        display: grid;
        gap: 8px;
        padding: 4px;
      }
    `,
  ],
})
export class AppComponent {
  title = "angular-starter-project";

  constructor(private toast: HotToastService, public ds: DrillsService) {}

  showToast() {
    of(100)
      .pipe(
        delay(3000),
        this.toast.observe({
          loading: "Saving...",
          success: "Settings saved!",
          error: "Could not save.",
        })
      )
      .subscribe();
  }
}
