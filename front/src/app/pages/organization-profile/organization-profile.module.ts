import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationProfilePageRoutingModule } from './organization-profile-routing.module';

import { OrganizationProfilePage } from './organization-profile.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationProfilePageRoutingModule,
    TranslateModule,
    IonicSelectableModule
  ],
  declarations: [OrganizationProfilePage]
})
export class OrganizationProfilePageModule {}
