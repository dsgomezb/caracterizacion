import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';
import { ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-inquest',
  templateUrl: './inquest.page.html',
  styleUrls: ['./inquest.page.scss'],
})
export class InquestPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public request: RequestService,
    private toast: ToastService,
    public storageService: StorageService,
    private platform: Platform,
    private router: Router,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

}
