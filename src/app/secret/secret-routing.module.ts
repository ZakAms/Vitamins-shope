import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { secretComponent } from './secret.component';

const routes: Routes = [
  { path: '', component: secretComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class secretRoutingModule {
  static components = [secretComponent];
}
