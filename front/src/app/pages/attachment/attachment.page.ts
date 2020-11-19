import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { ToastService  } from '../../services/toaster/toast.service';
import { RequestService } from '../../services/http/request.service';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.page.html',
  styleUrls: ['./attachment.page.scss'],
})
export class AttachmentPage implements OnInit {
  photoDocumentPicture: any; //Documento
  extensionDocumentPicture: any;
  photoCover: any; //portada
  extensionCover: any;
  photoHouse: any; //casa principal
  extensionHouse: any;
  photoInfrastructure: any; //infraestructura
  extensionInfrastructure: any;
  photoColtive: any; //Cultivo
  extensionColtive: any;
  photoSoilAnalysis: any; //Analisis de suelo
  extensionSoilAnalysis: any;
  photoPrincipalProductAgricultural: any; //Producto principal agricola
  extensionPrincipalProductAgricultural: any;
  photoSecondaryProductAgricultural: any; //Producto secundario agricola
  extensionSecondaryProductAgricultural: any;
  photoPrincipalProductLivestock: any; //Producto principal Pecuario 
  extensionPrincipalProductLivestock: any;
  photoSecondaryProductLivestock: any; //Producto secundario Pecuario 
  extensionSecondaryProductLivestock: any;
  photoPrincipalProductAquaculture: any; //Producto principal Acuicultura
  extensionPrincipalProductAquaculture: any;
  photoSecondaryProductAquaculture: any; //Producto secundario Acuicultura 
  extensionSecondaryProductAquaculture: any;
  photoForest: any; //Foto Forestal 
  extensionForest: any;
  id_finca: any;
  constructor(
    private toast: ToastService,
    public request: RequestService,
    public navCtrl: NavController
  ) {
    this.id_finca = localStorage.getItem('farmId');
   }

  ngOnInit() {
  }

  //Foto Documento
  async takePhotoDocumentPicture(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoDocumentPicture = res.base64String;
        this.extensionDocumentPicture = res.format;
        this.toast.presentToast("Imagen de la cédula almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen de la Cédula", "error-toast", 3000);
      }
    });
  }

  //Foto Portada
  async takePhotoCover(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoCover = res.base64String;
        this.extensionCover = res.format;
        this.toast.presentToast("Imagen de la Portada almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen de la Portada", "error-toast", 3000);
      }
    });
  }

  //Foto casa principal
  async takePhotoHouse(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoHouse = res.base64String;
        this.extensionHouse = res.format;
        this.toast.presentToast("Imagen de la Casa Principal almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen de la Casa Principal", "error-toast", 3000);
      }
    });
  }

  //Foto Infraestructura
  async takePhotoInfrastructure(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoInfrastructure = res.base64String;
        this.extensionInfrastructure = res.format;
        this.toast.presentToast("Imagen de la Infraestructura almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen de la Infraestructura", "error-toast", 3000);
      }
    });
  }

  //Foto Cultivo
  async takePhotoColtive(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoColtive = res.base64String;
        this.extensionColtive = res.format;
        this.toast.presentToast("Imagen del Cultivo almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen del Cultivo", "error-toast", 3000);
      }
    });
  }

  //Foto Analisis de suelo
  async takePhotoSoilAnalysis(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoSoilAnalysis = res.base64String;
        this.extensionSoilAnalysis = res.format;
        this.toast.presentToast("Imagen del Analisis de suelo almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen del Analisis de suelo", "error-toast", 3000);
      }
    });
  }

  //Foto Producto principal agricola
  async takePhotoPrincipalProductAgricultural(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoPrincipalProductAgricultural = res.base64String;
        this.extensionPrincipalProductAgricultural = res.format;
        this.toast.presentToast("Imagen del Producto principal Agricola almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen del Producto principal Agricola", "error-toast", 3000);
      }
    });
  }

  //Foto Producto secundario agricola
  async takePhotoSecondaryProductAgricultural(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoSecondaryProductAgricultural = res.base64String;
        this.extensionSecondaryProductAgricultural = res.format;
        this.toast.presentToast("Imagen del Producto Secundario Agricola almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen del Producto Secundario Agricola", "error-toast", 3000);
      }
    });
  }

  //Foto Producto principal Pecuario
  async takePhotoPrincipalProductLivestock(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoPrincipalProductLivestock = res.base64String;
        this.extensionPrincipalProductLivestock = res.format;
        this.toast.presentToast("Imagen del Producto principal Pecuario almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen del Producto principal Pecuario", "error-toast", 3000);
      }
    });
  }

  //Foto Producto Secundario Pecuario
  async takePhotoSecondaryProductLivestock(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoSecondaryProductLivestock = res.base64String;
        this.extensionSecondaryProductLivestock = res.format;
        this.toast.presentToast("Imagen del Producto Secundario Pecuario almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen del Producto Secundario Pecuario", "error-toast", 3000);
      }
    });
  }

  //Foto Producto principal Acuicultura
  async takePhotoPrincipalProductAquaculture(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoPrincipalProductAquaculture = res.base64String;
        this.extensionPrincipalProductAquaculture = res.format;
        this.toast.presentToast("Imagen del Producto principal Acuicultura almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen del Producto principal Acuicultura", "error-toast", 3000);
      }
    });
  }
  
  //Foto Producto secundario Acuicultura
  async takePhotoSecondaryProductAquaculture(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoSecondaryProductAquaculture = res.base64String;
        this.extensionSecondaryProductAquaculture = res.format;
        this.toast.presentToast("Imagen del Producto secundario Acuicultura almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la imagen del Producto secundario Acuicultura", "error-toast", 3000);
      }
    });
  }

  //Foto Forestal
  async takePhotoForest(){
    await Plugins.Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Imagen"
    }).then(res=>{
      if(res){
        this.photoForest = res.base64String;
        this.extensionForest = res.format;
        this.toast.presentToast("Foto Forestal almacenada correctamente", "success-toast", 3000);
      }
    }).catch(err=>{
      if(err){
        this.toast.presentToast("Error al guardar la Foto Forestal", "error-toast", 3000);
      }
    });
  }

  //Metodo para almacenar las imagenes de la encuesta de adjuntos
  saveAttachmentForm(){
    let data = {
      id_finca: this.id_finca,
      photoDocumentPicture: this.photoDocumentPicture,
      extensionDocumentPicture: this.extensionDocumentPicture,
      photoCover: this.photoCover,
      extensionCover: this.extensionCover,
      photoHouse: this.photoHouse,
      extensionHouse: this.extensionHouse,
      photoInfrastructure: this.photoInfrastructure,
      extensionInfrastructure: this.extensionInfrastructure,
      photoColtive: this.photoColtive,
      extensionColtive: this.extensionColtive,
      photoSoilAnalysis: this.photoSoilAnalysis,
      extensionSoilAnalysis: this.extensionSoilAnalysis,
      photoPrincipalProductAgricultural: this.photoPrincipalProductAgricultural,
      extensionPrincipalProductAgricultural: this.extensionPrincipalProductAgricultural,
      photoSecondaryProductAgricultural: this.photoSecondaryProductAgricultural,
      extensionSecondaryProductAgricultural: this.extensionSecondaryProductAgricultural,
      photoPrincipalProductLivestock: this.photoPrincipalProductLivestock,
      extensionPrincipalProductLivestock: this.extensionPrincipalProductLivestock,
      photoSecondaryProductLivestock: this.photoSecondaryProductLivestock,
      extensionSecondaryProductLivestock: this.extensionSecondaryProductLivestock,
      photoPrincipalProductAquaculture: this.photoPrincipalProductAquaculture,
      extensionPrincipalProductAquaculture: this.extensionPrincipalProductAquaculture,
      photoSecondaryProductAquaculture: this.photoSecondaryProductAquaculture,
      extensionSecondaryProductAquaculture: this.extensionSecondaryProductAquaculture,
      photoForest: this.photoForest,
      extensionForest: this.extensionForest
    }
    this.request.postData('finca/api/save_attachments', data, {}).then(data => {
      if(data.code == 0) {
        this.toast.presentToast(data.message, "success-toast", 3000);
        this.navCtrl.navigateForward('');
      } else {
        this.toast.presentToast(data.error, "error-toast", 3000);
      }
    });
  }

}
