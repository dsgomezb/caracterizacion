import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalVariablesService } from './services/global-variables/global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class GuardiaGuard implements CanActivate {
  constructor(private router: Router, public globalVariablesService: GlobalVariablesService) {
  }
  async canActivate(){
    if(this.globalVariablesService.idFarm){
      return true
    }else {
      this.router.navigateByUrl('/login')
    }
  }
  
}
