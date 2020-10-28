import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';
import { ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.page.html',
  styleUrls: ['./organization-profile.page.scss'],
})
export class OrganizationProfilePage implements OnInit {
  data_questions = {};
  id_finca : any;
  inquestData: any;

  constructor(
    public navCtrl: NavController,
    public request: RequestService,
    private toast: ToastService,
    public storageService: StorageService,
    private platform: Platform,
    private router: Router,
    public modalCtrl: ModalController,
  ) { 
    this.id_finca = localStorage.getItem('farmId');
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getInquest();
  }

    //Obtener preguntas y respuestas dinamicas para formulario de encuesta
    getInquest(){
      this.request.postData('encuesta/api/get_pregutas_perfil_organizacion', {}, {}).then(data => {
        if(data.code == 0){
          this.inquestData = data.data;
        }else{
          this.toast.presentToast(data.error, "error-toast", 3000);
        }
      });
    }

    validateFormInquest(){
      this.saveFormInquest();
    }

    saveFormInquest(){
      let data = {
        "id_finca": this.id_finca,
        "answers": this.data_questions
      };
      this.request.postData('encuesta/api/save_encuesta', data, {}).then(data => {
        if(data.code == 0){
          this.toast.presentToast(data.message, "success-toast", 3000);
          this.navCtrl.navigateForward('/inquest');
        }else{
          this.toast.presentToast(data.error, "error-toast", 3000);
        }
      });
    }
  
    setValue(id_pregunta, event){
      this.data_questions[id_pregunta] = event.detail.value;
    }
  
    setValueIonSelectable(id_pregunta, event){
      this.data_questions[id_pregunta] = [];
      for(let item of event.value){
        this.data_questions[id_pregunta].push(item.id.toString());
      }
    }

}
