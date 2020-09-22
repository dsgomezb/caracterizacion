import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Arreglo para almacenar veredas
  sideWalks = [];
  constructor(
    public navController: NavController,
    public request: RequestService,
    private toast: ToastService,
    public storageService: StorageService,
    private platform: Platform,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getSideWalk();
  }
  
  //Obtiene todas las veredas con sus municipios
  getSideWalk(){
    this.request.postData('finca/api/get_veredas', null, {}).then(data => {
      if(data.code == 0){
        this.sideWalks = data.data;
      }else{
        this.toast.presentToast(data.error, "info-toast", 3000);
      }
    });
  }

  goHome(){
    this.navController.navigateForward('/inicio');
  }

}
