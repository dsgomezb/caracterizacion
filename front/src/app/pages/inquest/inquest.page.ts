import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

import { Platform, MenuController, NavController } from '@ionic/angular';
import { RequestService } from '../../services/http/request.service';
import { ToastService  } from '../../services/toaster/toast.service';
import { StorageService } from '../../services/storage/storage.service';
import { ModalController  } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

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
    public modalCtrl: ModalController,
    public fileChooser: FileChooser,
    public filePath: FilePath,
    public base64: Base64
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
    console.log("FINAL:");
    console.log(this.data_questions);
  }

  setValue(id_pregunta, event, tipo_pregunta){
    this.data_questions[id_pregunta] = event.detail.value;
    console.log(this.data_questions);
  }

  image_base(id_pregunta,  tipo_pregunta){
    this.fileChooser.open().then((fileuri)=>{
      this.filePath.resolveNativePath(fileuri).then((nativepath)=>{
        this.base64.encodeFile(nativepath).then((base64string)=>{
          this.data_questions[id_pregunta] = base64string;
        })
      })
    })
  }
}
