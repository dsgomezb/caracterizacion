import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/services/http/request.service';
import { ToastService } from 'src/app/services/toaster/toast.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  nameUser: any;
  typeUser: any;
  items: any;
  userAndPet: any;
  petsAssignment: boolean = true;
  constructor(
    public request: RequestService, 
    private toast: ToastService
  ) { }

}
