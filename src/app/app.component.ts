import { Component } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import copy from "copy-to-clipboard";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: "app-root",
  template: `
    <button tippy="Helpful Message" hotkeys="1" (hotkey)="showToast()" >
      Intro
    </button>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
    :host {
      display: block;
      padding: 50px;
    }
    `
  ],
})
export class AppComponent {
  title = "angular-starter-project";

  constructor(private toast: HotToastService) {
  }

  showToast() {
    of(100).pipe(
      delay(3000),
      this.toast.observe(
        {
          loading: 'Saving...',
          success: 'Settings saved!',
          error: 'Could not save.',
        }
      )
    ).subscribe();
  
  }
}
