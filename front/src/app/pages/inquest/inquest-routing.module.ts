import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InquestPage } from './inquest.page';

const routes: Routes = [
  {
    path: '',
    component: InquestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquestPageRoutingModule {}
