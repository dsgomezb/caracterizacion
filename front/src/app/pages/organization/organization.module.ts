import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationPageRoutingModule } from './organization-routing.module';

import { OrganizationPage } from './organization.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationPageRoutingModule,
    TranslateModule,
    IonicSelectableModule
  ],
  declarations: [OrganizationPage]
})
export class OrganizationPageModule {}
