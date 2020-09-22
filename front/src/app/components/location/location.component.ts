import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController  } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController,
  ) { }

  @ViewChild('#inputId', {static: false}) ionInput: { setFocus: () => void; };

  ngOnInit() {}

  ionViewWillEnter() {
    setTimeout(() => this.ionInput.setFocus(), 300);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
