import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';
import { ModalController  } from '@ionic/angular';
import { ModalLocationPage } from '../modal-location/modal-location.page';
import { Geolocation, Geoposition, GeolocationOptions  } from '@ionic-native/geolocation/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { NetworkService } from 'src/app/services/network.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Arreglos para almacenar info del back para selects
  departments = [];
  sideWalks = [];
  citys = [];

  //data ingreso
  department: any;
  city: any;
  sideWalk: any;
  farm_name: any;
  documento_tecnico: any;

  isConnected = false;
  constructor(
    public navCtrl: NavController,
    public request: RequestService,
    private toast: ToastService,
    public storageService: StorageService,
    private platform: Platform,
    private router: Router,
    public modalCtrl: ModalController,
    public geolocation: Geolocation,
    public fileChooser: FileChooser,
    public filePath: FilePath,
    public base64: Base64,
    private networkService: NetworkService,
    private db: DatabaseService
  ) {}

  ngOnInit() {
    localStorage.clear();
    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
      if (!this.isConnected) {
        this.db.getDatabaseState().subscribe(rdy => {
          if (rdy) {
            console.log("lista");
          }
        });
      }else{
        console.log("conectado");
      }
    });
  }

  ionViewWillEnter(){
    this.getDepartment();
  }

  image_base(){
    this.fileChooser.open().then((fileuri)=>{
      this.filePath.resolveNativePath(fileuri).then((nativepath)=>{
        this.base64.encodeFile(nativepath).then((base64string)=>{
          alert(base64string);
        })
      })
    })
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
      component: ModalLocationPage,
      cssClass: 'modal-location'
    });
    return await modal.present();
  }

  //Obtiene la posicion actual automaticamente
  getActuallyLocation(){
    localStorage.clear();
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      localStorage.setItem('latitude', String(geoposition.coords.latitude));
      localStorage.setItem('longitude', String(geoposition.coords.longitude));
      this.toast.presentToast('Localización almacenada', 'success-toast', 1000);
    }); 
  }

  //Validacion de campos requeridos en formulario de inicio
  validateFormLogin(){
    if(this.documento_tecnico == undefined){
      this.toast.presentToast('El Documento del Técnico es Requerido', 'error-toast', 3000);
    }else if(this.farm_name == undefined){
      this.toast.presentToast('El Nombre de la Finca es Requerido', 'error-toast', 3000);
    }else if(this.department == undefined){
      this.toast.presentToast('El Departamento es Requerido', 'error-toast', 3000);
    }else if(this.city == undefined){
      this.toast.presentToast('El Municipio es Requerido', 'error-toast', 3000);
    }else if(this.sideWalk == undefined){
      this.toast.presentToast('La Vereda es Requerida', 'error-toast', 3000);
    }else if(localStorage.getItem('latitude') == null && localStorage.getItem('longitude') == null){
      this.toast.presentToast('Debe ingresar u obtener la Localización', 'error-toast', 3000);
    }else{
      this.saveInfoLogin();
    }
  }

  //Metodo para almacenar información del formulario de login
  saveInfoLogin(){
    let data = {
      nombre: this.farm_name,
      id_vereda: this.sideWalk.id,
      longitud: localStorage.getItem('longitude'),
      latitud: localStorage.getItem('latitude'),
      documento_tecnico: this.documento_tecnico
    }

    this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
      this.isConnected = connected;
      if (!this.isConnected) {
        this.db.addFarm(data)
        .then(_ => {
            console.log("lo hizo");
        });
      }else{
        this.request.postData('finca/api/save_finca_inicial', data, {}).then(data => {
          if(data.code == 0) {
            localStorage.setItem('farmId', data.idFinca[0].lastval);
            this.toast.presentToast(data.message, "success-toast", 3000);
            this.navCtrl.navigateForward('/inicio');
          } else {
            this.toast.presentToast(data.error, "error-toast", 3000);
          }
        });
      }
    });


  }

}
