import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmPageRoutingModule } from './farm-routing.module';

import { FarmPage } from './farm.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmPageRoutingModule,
    TranslateModule,
    IonicSelectableModule
  ],
  declarations: [FarmPage]
})
export class FarmPageModule {}
