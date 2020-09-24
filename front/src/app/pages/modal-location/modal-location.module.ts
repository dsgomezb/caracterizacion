import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalLocationPageRoutingModule } from './modal-location-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ModalLocationPage } from './modal-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalLocationPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [ModalLocationPage]
})
export class ModalLocationPageModule {}
