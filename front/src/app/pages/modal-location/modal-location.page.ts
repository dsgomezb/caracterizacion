import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toaster/toast.service';
import { RequestService } from 'src/app/services/http/request.service';
import { ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.page.html',
  styleUrls: ['./modal-location.page.scss'],
})
export class ModalLocationPage implements OnInit {
  registerLocation: FormGroup;

  constructor(
    public request: RequestService,
    private toast: ToastService,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {
    this.setting_form();
   }

  ngOnInit() {
  }

  //Aqui se configuran las validaciones del formulario, requerido, maximo, minimo etc
  setting_form() {
    localStorage.clear();
    this.registerLocation = this.formBuilder.group({
      latitude: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(20)]],
      longitude: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });
  }

  //Se dirpara desde el formulario para asociar las validaciones
  validateFormLocation(){
    console.log("lega a validar");
    console.log(this.registerLocation.get('latitude').hasError('maxlength'));
    if (!this.registerLocation.invalid) {
      this.saveLocation();
    }else{
      if (this.registerLocation.get('latitude').invalid) {
        this.toast.presentToast('Campo Latitud obligatorio', 'error-toast', 3000);
      }else if (this.registerLocation.get('longitude').invalid) {
        this.toast.presentToast('Campo Longitud obligatorio', 'error-toast', 3000);
      }
    }
  }

  //Se guarda la localizacion temporalmente en el local storage
  saveLocation(){
    localStorage.setItem('latitude', this.registerLocation.get('latitude').value);
    localStorage.setItem('longitude', this.registerLocation.get('longitude').value);
  }

  // Función para colocar mensajes desde el html
  presentToast(message) {
    this.toast.presentToast(message, 'error-toast', 3000);
  }

  //Cerrar modal
  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
