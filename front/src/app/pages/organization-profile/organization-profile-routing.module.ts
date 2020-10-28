import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationProfilePage } from './organization-profile.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationProfilePageRoutingModule {}
