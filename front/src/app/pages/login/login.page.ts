import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';
import { ModalController  } from '@ionic/angular';
import { LocationComponent } from '../../components/location/location.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Arreglo para almacenar veredas
  departments = [];
  sideWalks = [];
  citys = [];

  constructor(
    public navController: NavController,
    public request: RequestService,
    private toast: ToastService,
    public storageService: StorageService,
    private platform: Platform,
    private router: Router,
    public modalCtrl: ModalController

  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getDepartment();
  }
  
  //Obtener los departamentos
  getDepartment(){
    this.request.postData('finca/api/get_departamentos', null, {}).then(data => {
      if(data.code == 0){
        this.departments = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Obtiene los municipios con un departamento determinado
  getCity(event){
    let data = {
      id_departamento: event.value.id_departamento_dane
    }
    this.request.postData('finca/api/get_municipios', data, {}).then(data => {
      if(data.code == 0){
        this.citys = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Obtiene todas las veredas de un municipio determinado
  getSideWalk(event){
    let data = {
      id_municipio_dane: event.value.id_municipio_dane
    }
    this.request.postData('finca/api/get_veredas', data, {}).then(data => {
      if(data.code == 0){
        this.sideWalks = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Modal para ingrear la localizacion en caso de que no se tenga internet
  async modalEnterLocation(){
    const modal = await this.modalCtrl.create({
      component: LocationComponent,
      cssClass: 'modal-small'
    });
    return await modal.present();
  }
 
  goHome(){
    this.navController.navigateForward('/inicio');
  }

}
