import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';
import { ModalController  } from '@ionic/angular';
import { ParseLocation } from '@angular/compiler';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.page.html',
  styleUrls: ['./farm.page.scss'],
})
export class FarmPage implements OnInit {
  //Arreglos para almacenar info del back para selects
  farmInitial = [];
  typeProperties = [];
  productsActivities = [];
  earthTrend = [];
  publicService = [];
  typeVia = [];
  statusVia = [];
  gasTypes = [];
  waterTypes = [];
  OperatorTvType = [];

  //data ingreso ngModels
  via_type: any; //ya
  via_status: any; //ya
  gas: any; //ya
  latitude: any;
  longitude: any;
  altitude: any; //ya
  soil_analysis: any; //ya
  total_hectares: any; //ya
  access_roads_availability: any; //ya
  municipal_head_distance: any; //ya
  water_type: any; //ya
  electricity: any; //ya
  aqueduct: any; //ya
  septic_tank: any; //ya
  internet: any; //ya
  cellphone: any; //ya
  productive_infrastructure: any; //ya
  television: any; //ya
  operator_tv_type: any //ya
  earth_trend: any; //ya
  public_service = [];
  products_activities = [];

  //Variables para llenar campo inciales
  initial_name: any;
  farm_id: any;
  initial_latitude: any;
  initial_longitude: any;

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
    this.getFarmInformation();
  }

  ionViewWillEnter(){
    this.getTypeProperties();
    this.getProductsActivities();
    this.getEarthTrend();
    this.getPublicService();
    this.getTypeVia();
    this.getStatusVia();
    this.getGasTypes();
    this.getWaterTypes();
    this.getOperatorTvType();
  }
  //Tipos de operadores
  getOperatorTvType(){
    this.request.postData('finca/api/get_operator_tv', null, {}).then(data => {
      if(data.code == 0){
        this.OperatorTvType = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Tipos de gases
  getWaterTypes(){
    this.request.postData('finca/api/get_tipos_agua', null, {}).then(data => {
      if(data.code == 0){
        this.waterTypes = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Tipos de gases
  getGasTypes(){
    this.request.postData('finca/api/get_tipos_gases', null, {}).then(data => {
      if(data.code == 0){
        this.gasTypes = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Estado via
  getStatusVia(){
    this.request.postData('finca/api/get_estado_via', null, {}).then(data => {
      if(data.code == 0){
        this.statusVia = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Tipo via
  getTypeVia(){
    this.request.postData('finca/api/get_tipo_via', null, {}).then(data => {
      if(data.code == 0){
        this.typeVia = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Servicios públicos
  getPublicService(){
    this.request.postData('finca/api/get_servicios_publicos', null, {}).then(data => {
      if(data.code == 0){
        this.publicService = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Tendencias tierra
  getEarthTrend(){
    this.request.postData('finca/api/get_tendencias_tierra', null, {}).then(data => {
      if(data.code == 0){
        this.earthTrend = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Obtener los tipos de predios
  getTypeProperties(){
    this.request.postData('finca/api/get_tipo_predios', null, {}).then(data => {
      if(data.code == 0){
        this.typeProperties = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Obtener actividades productivas
  getProductsActivities(){
    this.request.postData('finca/api/get_actividades_productivas', null, {}).then(data => {
      if(data.code == 0){
        this.productsActivities = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Captura la informacion inicial de la finca
  getFarmInformation(){
    let data = {
      id_finca: localStorage.getItem('farmId')
    };
    this.request.postData('finca/api/get_finca_id', data, {}).then(data => {
      if(data.code == 0){
        this.farmInitial = data.data;
        this.initial_name = this.farmInitial[0].nombre;
        this.farm_id = this.farmInitial[0].id;
        this.initial_latitude = this.farmInitial[0].latitud;
        this.initial_longitude = this.farmInitial[0].longitud;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Validacion de formulario de Finca
  validateFormFarm(){
    console.log(this.public_service);
    console.log(this.products_activities);
    if(this.via_type == undefined){
      this.toast.presentToast('El tipo de via es requerido', 'error-toast', 3000);
    }else{
      this.saveFarmQuiz();
    }
  }

  //Almacenar formulario de finca
  saveFarmQuiz(){
    let data = {
      id: localStorage.getItem('farmId'),
      id_tipo_via: this.via_type,
      id_estado_via: this.via_status,
      id_gas: this.gas,
      altitud: this.altitude,
      analisis_suelos_2_anos: this.soil_analysis,
      area_total_hectareas: this.total_hectares,
      disponibilidad_vias_acceso: this.access_roads_availability,
      distancia_cabecera: this.municipal_head_distance,
      id_agua: this.water_type,
      electricidad: this.electricity,
      acueducto: this.aqueduct,
      pozo_septico: this.septic_tank,
      internet: this.internet,
      celular: this.cellphone,
      infraestructura_productiva_existente: this.productive_infrastructure,
      television: this.television,
      id_opeador_tv: this.operator_tv_type,
      id_estado_tendencia_tierra: this.earth_trend
    };
    this.request.postData('finca/api/update_finca', data, {}).then(data => {
      if(data.code == 0) {
        this.toast.presentToast(data.message, "success-toast", 3000);
        this.navCtrl.navigateForward('/farm');
      } else {
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

}
