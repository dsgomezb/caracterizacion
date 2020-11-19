import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttachmentPageRoutingModule } from './attachment-routing.module';

import { AttachmentPage } from './attachment.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttachmentPageRoutingModule,
    IonicSelectableModule,
    TranslateModule
  ],
  declarations: [AttachmentPage]
})
export class AttachmentPageModule {}
