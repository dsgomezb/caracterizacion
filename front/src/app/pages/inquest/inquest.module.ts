import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquestPageRoutingModule } from './inquest-routing.module';

import { InquestPage } from './inquest.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquestPageRoutingModule,
    TranslateModule,
    IonicSelectableModule
  ],
  declarations: [InquestPage]
})
export class InquestPageModule {}
