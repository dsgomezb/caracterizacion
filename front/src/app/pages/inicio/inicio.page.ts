import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';
import { ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  //Arreglos para almacenar info del back para selects
  departments = [];
  citys = [];
  
  civilStatus = [];
  schoolLevel = [];
  populationType = [];
  genderType = [];
  characterizations = [];
  documentType = [];
  occupations = [];
  typeAffiliation = [];
  ethnicGroup = [];

  //data ingreso ngModels
  characterization: any;
  department: any;
  city: any;
  live_in_farm: any;
  document_type: any;
  time_in_farm: any;
  dni: any;
  names: any;
  lastnames: any;
  address: any;
  neighborhood: any;
  phone: any;
  email: any;
  birth_date: any;
  gender: any;
  civil_status: any;
  peopleBurden: any;
  school_level: any;
  population_type: any;
  occupation: any;
  type_affiliation: any;
  ethnic_group: any;

  
  constructor(
    public navCtrl: NavController,
    public request: RequestService,
    private toast: ToastService,
    public storageService: StorageService,
    private platform: Platform,
    private router: Router,
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.getDepartment();
  }

  ionViewWillEnter(){
    this.getCivilStatus();
    this.getSchoolLevel();
    this.getPopulationType();
    this.getGenderTypes();
    this.getCharacterization();
    this.getDocumentType();
    this.getOccupation();
    this.getTypeAffiliation();
    this.getEthnicGroup();
  }

  //Obtener la caracterización poblacional
  getCharacterization(){
    this.request.postData('persona/api/get_tipo_persona', null, {}).then(data => {
      if(data.code == 0){
        this.characterizations = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Api para obtener ocupaciones
  getOccupation(){
    this.request.postData('persona/api/get_ocupacion', null, {}).then(data => {
      if(data.code == 0){
        this.occupations = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Api para obtener tipos de afiliacion
  getTypeAffiliation(){
    this.request.postData('persona/api/get_tipo_afiliacion', null, {}).then(data => {
      if(data.code == 0){
        this.typeAffiliation = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Api para obtener tlos grupos etnicos
  getEthnicGroup(){
    this.request.postData('persona/api/get_grupo_etnico', null, {}).then(data => {
      if(data.code == 0){
        this.ethnicGroup = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Obtener los tipo de documento
  getDocumentType(){
    this.request.postData('persona/api/get_tipo_documento', null, {}).then(data => {
      if(data.code == 0){
        this.documentType = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Obtener los tipos de género
  getGenderTypes(){
    this.request.postData('persona/api/get_generos', null, {}).then(data => {
      if(data.code == 0){
        this.genderType = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Obtener los estados civiles
  getCivilStatus(){
    this.request.postData('persona/api/get_estados_civil', null, {}).then(data => {
      if(data.code == 0){
        this.civilStatus = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Obtener los niveles de escolaridad
  getSchoolLevel(){
    this.request.postData('persona/api/get_nivel_escolaridad', null, {}).then(data => {
      if(data.code == 0){
        this.schoolLevel = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Obtener los tipos de Población
  getPopulationType(){
    this.request.postData('persona/api/get_tipo_poblacion', null, {}).then(data => {
      if(data.code == 0){
        this.populationType = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
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
}
