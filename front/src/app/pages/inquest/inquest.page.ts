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
  data_questions = {};
  constructor(
    public navCtrl: NavController,
    public request: RequestService,
    private toast: ToastService,
    public storageService: StorageService,
    private platform: Platform,
    private router: Router,
    public modalCtrl: ModalController
  ) { }
  inquestData: any;
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getInquest();
  }

  //Obtener preguntas y respuestas dinamicas para formulario de encuesta
  getInquest(){
    let data = {
      id_finca: localStorage.getItem('farmId'),
    }
    this.request.postData('encuesta/api/get_pregutas_respuestas_separado', data, {}).then(data => {
      if(data.code == 0){
        this.inquestData = data.data;
        console.log(this.inquestData);
      }else{
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

  validateFormInquest(){
    this.saveFormInquest();
  }

  saveFormInquest(){
    console.log(this.data_questions);
    this.toast.presentToast("Encuesta almacenada satisfactoriamente", "success-toast", 3000);
    //this.navCtrl.navigateForward('');
  }

  setValue(id_pregunta, event){
    this.data_questions[id_pregunta] = event.detail.value;
  }
}
