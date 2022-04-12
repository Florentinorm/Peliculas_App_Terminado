import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { MasvistosComponent } from './pages/masvistos/masvistos.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { EstrenosComponent } from './pages/estrenos/estrenos.component';
import { IniciarseccionComponent } from './pages/iniciarseccion/iniciarseccion.component';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';

import {CanEditGuard} from '@app/auth/guards/can-edit.guard'
import { CanSuscriptorGuard } from './auth/guards/can-suscriptor.guard';
import { CanAdminGuard } from './auth/guards/can-admin.guard';
import { CanVerifiedGuard } from './auth/guards/can-verified.guard';

//Imports Admin
import { ContenidosComponent } from './pages/admin/contenidos/contenidos.component';
import { EditarPeliculaComponent } from './pages/admin/editar-pelicula/editar-pelicula.component';
import { EditarContenidosComponent } from './pages/admin/editar-contenidos/editar-contenidos.component'

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'pelicula/:id',
    component: PeliculaComponent
  },
  {
    path: 'buscar/:texto',
    component: BuscarComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'masvistos',
    component: MasvistosComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: 'estrenos',
    component: EstrenosComponent
  },
  {
    path: 'ini',
    component: IniciarseccionComponent
  },
  {
    path: 'error404',
    component: ErrorNotFoundComponent
  },
  { path: 'form', loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', 
    loadChildren: () => import('./auth/register/register.module')
    .then(m => m.RegisterModule) },
  {
    path: 'verification-email',
    component: SendEmailComponent,
  },
  { path: 'forgot-password', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  //   canActivate: [CanAdminGuard],
  // },
  { path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule),
    canActivate: [CanEditGuard],
  },
  { path: 'suscriptor', loadChildren: () => import('./suscriptor/suscriptor.module').then(m => m.SuscriptorModule),
    canActivate: [CanSuscriptorGuard], 
  },
  // Admin
  {
    path: 'contenidos',
    component: ContenidosComponent,
    canActivate: [CanAdminGuard],
  },
  {
    path: 'edit', component: EditarContenidosComponent, children: [
      { path: 'pelicula/:id', component: EditarPeliculaComponent }
    ]
  },

  // error 404
  {
    path: '**',
    redirectTo: '/error404'
  }

];




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
