import { Component, OnInit, ViewChild } from '@angular/core';
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
  organizations = [];

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
  attached_organization: any;
  id_organization : any;
  public_service = [];
  products_activities = [];
  
  //Variables para llenar campo inciales
  initial_name: any;
  farm_id: any;
  initial_latitude: any;
  initial_longitude: any;

  show_input_organization = false;

  constructor(    
    public navCtrl: NavController,
    public request: RequestService,
    private toast: ToastService,
    public storageService: StorageService,
    private platform: Platform,
    private router: Router,
    public modalCtrl: ModalController
    ) {
     }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.via_type = undefined;
    this.via_status = undefined;
    this.gas = undefined;
    this.latitude = undefined;
    this.longitude = undefined;
    this.altitude = undefined;
    this.soil_analysis = undefined;
    this.total_hectares = undefined;
    this.access_roads_availability = undefined;
    this.municipal_head_distance = undefined;
    this.water_type = undefined;
    this.electricity = undefined;
    this.aqueduct = undefined;
    this.septic_tank = undefined;
    this.internet = undefined;
    this.cellphone = undefined;
    this.productive_infrastructure = undefined;
    this.operator_tv_type = undefined;
    this.earth_trend = undefined
    this.attached_organization = undefined
    this.television = undefined;
    this.public_service = [];
    this.products_activities = [];
    this.id_organization = undefined;
    this.show_input_organization = false;

    this.getTypeProperties();
    this.getProductsActivities();
    this.getEarthTrend();
    this.getPublicService();
    this.getTypeVia();
    this.getStatusVia();
    this.getGasTypes();
    this.getWaterTypes();
    this.getOperatorTvType();
    this.getOrganizations();
    this.getFarmInformation();
  }

  showInputOrganization(value){
    this.show_input_organization = value;
  }

  //Organizaciones
  getOrganizations(){
    this.request.postData('organizacion/api/get_all_organizacion', null, {}).then(data => {
      if(data.code == 0){
        this.organizations = data.data;
        this.organizations.unshift({id:0, nombre: "No esta en la lista"});
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
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
    if(this.via_type == undefined){
      this.toast.presentToast('El tipo de via es requerido', 'error-toast', 3000);
    }else if(this.attached_organization == undefined){
      this.toast.presentToast('Adscrito a Organización requerido', 'error-toast', 3000);
    }else if(this.attached_organization == 'true' && this.id_organization == undefined){
      this.toast.presentToast('La Organización es requerida', 'error-toast', 3000);
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
      id_estado_tendencia_tierra: this.earth_trend,
      public_service: this.public_service,
      products_activities: this.products_activities,
      adscrita_organizacion: this.attached_organization,
      id_organizacion: this.id_organization
    };
    this.request.postData('finca/api/update_finca', data, {}).then(data => {
      if(data.code == 0) {
        this.toast.presentToast(data.message, "success-toast", 3000);
        if(this.attached_organization == 'true' && this.id_organization.id == 0){
          this.navCtrl.navigateForward('/organization');
        }else{
          //this.navCtrl.navigateForward('/inquest');
          this.navCtrl.navigateForward('/organization-profile');
        }
      } else {
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

}
