import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardiaGuard } from './guardia.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate:[GuardiaGuard]
  },
  {
    path: 'modal-location',
    loadChildren: () => import('./pages/modal-location/modal-location.module').then( m => m.ModalLocationPageModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('./pages/organization/organization.module').then( m => m.OrganizationPageModule),
    canActivate:[GuardiaGuard]
  },
  {
    path: 'farm',
    loadChildren: () => import('./pages/farm/farm.module').then( m => m.FarmPageModule),
    canActivate:[GuardiaGuard]
  },
  {
    path: 'inquest',
    loadChildren: () => import('./pages/inquest/inquest.module').then( m => m.InquestPageModule),
    canActivate:[GuardiaGuard]
  },
  {
    path: 'organization-profile',
    loadChildren: () => import('./pages/organization-profile/organization-profile.module').then( m => m.OrganizationProfilePageModule),
    canActivate:[GuardiaGuard]
  },
  {
    path: 'attachment',
    loadChildren: () => import('./pages/attachment/attachment.module').then( m => m.AttachmentPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
