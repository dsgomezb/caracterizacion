import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';
import { ModalController  } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Plugins, CameraResultType, CameraSource, Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

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
  foto: any;
  extension_documento: any;
  id_finca: any;

  constructor(
    public navCtrl: NavController,
    public request: RequestService,
    private toast: ToastService,
    public storageService: StorageService,
    private platform: Platform,
    private router: Router,
    public modalCtrl: ModalController,
    private camera: Camera,
    public fileChooser: FileChooser,
    public filePath: FilePath,
    public base64: Base64
  ) {
    this.id_finca = localStorage.getItem('farmId');
   }

  ngOnInit() {
    this.getDepartment();
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

  //Obtener la caracterizaci??n poblacional
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

  //Obtener los tipos de g??nero
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

  //Obtener los tipos de Poblaci??n
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

  //Funcion para validar formulario de caracterizacion
  validateFormInit(){
    this.saveInfoInitialQuiz();
  }

  //Metodo para almacenar informaci??n de la encuensta inicial
  saveInfoInitialQuiz(){
    let data = {
      id_tipo_persona: this.characterization,
      id_tipo_documento: this.document_type,
      id_municipio: this.city.id,
      id_genero: this.gender,
      id_estado_civil: this.civil_status,
      id_ocupacion: this.occupation,
      id_nivel_escolaridad: this.school_level,
      id_tipo_afiliacion: this.type_affiliation,
      id_grupo_etnico: this.ethnic_group,
      id_tipo_poblacion: this.population_type,
      documento: this.dni,
      nombre: this.names,
      apellidos: this.lastnames,
      direccion: this.address,
      barrio: this.neighborhood,
      telefono: this.phone,
      email: this.email,
      fecha_nacimiento: this.birth_date,
      num_personas_cargo: this.peopleBurden,
      vive_finca: this.live_in_farm,
      tiempo_lleva_finca: this.time_in_farm,
      id_finca: localStorage.getItem('farmId'),
      foto_documento: this.foto,
      extension_documento: this.extension_documento
    }
    this.request.postData('persona/api/save_persona', data, {}).then(data => {
      if(data.code == 0) {
        this.toast.presentToast(data.message, "success-toast", 3000);
        this.navCtrl.navigateForward('/farm');
      } else {
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  async takePhoto(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.foto = res.base64String;
        this.extension_documento = res.format;
        this.toast.presentToast("Imagen almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen", "error-toast", 3000);
      }
    });
  }
}