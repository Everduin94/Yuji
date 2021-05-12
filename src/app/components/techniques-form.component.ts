import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { tap } from "rxjs/operators";
import {
  CALLOUT,
  createTechniqueForm,
  DELAY,
  PROBABILITY,
  TechniquesService,
} from "../state/techniques";

@Component({
  selector: "app-techniques-form",
  template: `
    <mat-card class="basic-margin" [formGroup]="form">
      <mat-card-header class="mat-card-header-grid">
        <div class="header-text">{{form?.get('callout')?.value || 'Technique'}}</div>
        <button mat-button color="warn" (click)="removeEvent(technique.id)">
          X
        </button>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field class="row-input">
          <mat-label>Callout</mat-label>
          <input matInput [formControlName]="callout" type="text" />
        </mat-form-field>

        <mat-form-field class="row-input">
          <mat-label>Delay</mat-label>
          <input matInput [formControlName]="delay" type="number" />
        </mat-form-field>

        <mat-form-field class="row-input">
          <mat-label>Probability</mat-label>
          <input
            matInput
            [value]="1"
            [formControlName]="probability"
            type="number"
          />
        </mat-form-field>
      </mat-card-content>
    </mat-card>

    <ng-container *ngIf="formChanges$ | async"></ng-container>
  `,
  styles: [`
    .header-text {
      font-weight: 600;
      margin-right: 50%;
    }

    .mat-card-header-grid {
      display: grid;
      grid-template-columns: 0 1fr max-content;
      grid-template-rows: 1fr;
      align-items: center;
      margin-bottom: 5px;
    }
  `],
})
export class TechniquesFormComponent implements OnInit {
  form: FormGroup;
  formChanges$;
  @Input() technique;
  @Output() remove = new EventEmitter();

  readonly probability = PROBABILITY;
  readonly delay = DELAY;
  readonly callout = CALLOUT;

  constructor(private fb: FormBuilder, private ts: TechniquesService) {}

  ngOnInit(): void {
    this.form = this.fb.group(createTechniqueForm(this.technique));
    this.formChanges$ = this.form.valueChanges.pipe(
      tap((changes) => this.ts.localUpdate(changes))
    );
  }

  removeEvent(id) {
    this.remove.emit(id);
  }
}

@NgModule({
  declarations: [TechniquesFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [TechniquesFormComponent],
})
export class TechniquesFormModule {}
