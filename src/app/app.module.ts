import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDatabaseService } from "./services/tests/in-memory-database.service";
import { environment } from "../environments/environment";
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { HttpClientModule } from "@angular/common/http";
import { httpInterceptorProviders } from "./interceptors";
import { HotToastModule, HotToastService } from "@ngneat/hot-toast";
import { TippyModule } from "@ngneat/helipopper";
import { HotkeysModule } from "@ngneat/hotkeys";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoComponent } from "./demo.component";
import { CopyToClipboardModule, COPY_TO_CLIPBOARD_HANDLER } from "@ngneat/copy-to-clipboard";
import copy from "copy-to-clipboard";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DrillsModule } from './components/drills.component';
import { AkitaNgRouterStoreModule } from "@datorama/akita-ng-router-store";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { DrillsFormModule } from './components/drills-form.component';
import { TechniquesModule } from "./components/techniques.component";
import { TechniquesFormModule } from "./components/techniques-form.component";
import { TrainingModule } from "./components/training.component";
import { ServiceWorkerModule } from '@angular/service-worker';

const firebaseConfig = {
  apiKey: "AIzaSyCsScr5EJPrsoNbc69n6b_09p0WycvaI9E",
  authDomain: "yuji-backend.firebaseapp.com",
  projectId: "yuji-backend",
  storageBucket: "yuji-backend.appspot.com",
  messagingSenderId: "1025488064134",
  appId: "1:1025488064134:web:fbc66e6b0c3e3a86c44b07",
  measurementId: "G-XD4HYL3SJH"
};

@NgModule({
  declarations: [AppComponent, DemoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AkitaNgRouterStoreModule,
    // !environment.production
    //   ? HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabaseService, {
    //       delay: 0,
    //       passThruUnknownUrl: true,
    //     })
    //   : [],
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    HotToastModule.forRoot(),
    TippyModule.forRoot(),
    HotkeysModule,
    BrowserAnimationsModule,
    CopyToClipboardModule,
    DrillsModule,
    DrillsFormModule,
    TechniquesModule,
    TechniquesFormModule,
    TechniquesModule,
    TrainingModule,
    MatCardModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: COPY_TO_CLIPBOARD_HANDLER,
      useFactory(toaster: HotToastService) {
        return function (text) {
          toaster.success("Copied..");
          copy(text);
        };
      },
      deps: [HotToastService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
