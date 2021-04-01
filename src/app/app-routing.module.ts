import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo.component';


const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    // children: [
      // {
        // path: 'select',
        // loadChildren: () => import(/* webpackChunkName: 'select' */'./components/form-select-screen/form-select.module').then(m => m.FormSelectModule),
        // canLoad: [AuthGuard],
        // canActivate: [AuthGuard]
      // },
      // {path: '', redirectTo: '/select', pathMatch: 'full'},
    // ]
  },

  /*{path: '**', component: PageNotFoundComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
