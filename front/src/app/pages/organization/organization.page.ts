import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';
import { ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.page.html',
  styleUrls: ['./organization.page.scss'],
})
export class OrganizationPage implements OnInit {
  //Arreglos para almacenar info del back para selects
  organization_types = [];

  //data ingreso ngModels
  name: any;
  nit: any;
  organization_type: any;
  constitution_date: any;
  object: any;
  address: any;
  phone: any;
  email: any;
  legal_representative_name: any;
  legal_representative_dni: any;
  legal_representative_phone: any;
  legal_representative_email: any;
  experience: any;

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

  ionViewWillEnter(){
    this.getCharacterization();
  }

  //Obtener la caracterización poblacional
  getCharacterization(){
    this.request.postData('organizacion/api/get_tipo_organizacion', null, {}).then(data => {
      if(data.code == 0){
        this.organization_types = data.data;
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  //Funcion para validar formulario de organizacion
  validateFormOrganization(){
    if(this.name == undefined){
      this.toast.presentToast('El Nombre de la Organización es Requerido', 'error-toast', 3000);
    }else{
      this.saveOrganizationQuiz();
    }
  }

  //Metodo para almacenar información de la encuensta de la organizacion
  saveOrganizationQuiz(){
    let data = {
      nombre: this.name,
      nit: this.nit,
      id_tipo_organizacion: this.organization_type,
      fecha_organizacion: this.constitution_date,
      objeto: this.object,
      direccion: this.address,
      telefono: this.phone,
      email: this.email,
      nombre_representante_legal: this.legal_representative_name,
      cedula_representante_legal: this.legal_representative_dni,
      telefono_representante_legal: this.legal_representative_phone,
      email_representante_legal: this.legal_representative_email,
      experiencia_organizacion: this.experience,
      id_finca: localStorage.getItem('farmId')
    }
    this.request.postData('organizacion/api/save_organizacion', data, {}).then(data => {
      if(data.code == 0) {
        this.toast.presentToast(data.message, "success-toast", 3000);
        this.navCtrl.navigateForward('/farm');
      } else {
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }
}
