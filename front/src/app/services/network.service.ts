// Importar los Módulos Necesarios
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { Observable, fromEvent, merge, of, BehaviorSubject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastService  } from './toaster/toast.service';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {

    private online: Observable<boolean> = null;
    private hasConnection = new BehaviorSubject(false);

    constructor(
        private network: Network,
        private platform: Platform,
        private http: HttpClient,
        private toast: ToastService
    ) {

        if (this.platform.is('cordova')) {
            // on Device
            this.network.onConnect().subscribe(() => {
                this.toast.presentToast("Dispositivo Conectado Internet", "info-toast", 3000);
                this.hasConnection.next(true);
                return;
            });
            this.network.onDisconnect().subscribe(() => {
                this.toast.presentToast("Dispositivo no cuenta con acceso a Internet", "error-toast", 3000);
                this.hasConnection.next(false);
                return;
            });
        } else {
            // on Browser
            this.online = merge(
            of(navigator.onLine),
            fromEvent(window, 'online').pipe(mapTo(true)),
            fromEvent(window, 'offline').pipe(mapTo(false))
            );

            this.online.subscribe((isOnline) =>{
                if (isOnline) {
                    this.hasConnection.next(true);
                } else {
                    this.hasConnection.next(false);
                  }
              });
        }
        this.testNetworkConnection();
    }

    public getNetworkType(): string {
        return this.network.type;
    }

    public getNetworkStatus(): Observable<boolean> {
        return this.hasConnection.asObservable();
    }

    private getNetworkTestRequest(): Observable<any> {
        return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
    }

    public async testNetworkConnection() {
        try {
            this.getNetworkTestRequest().subscribe(
            success => {
                    this.hasConnection.next(true);
                return;
            }, error => {
                this.hasConnection.next(false);
                return;
            });
        } catch (err) {
            this.hasConnection.next(false);
            return;
       }
    }

}