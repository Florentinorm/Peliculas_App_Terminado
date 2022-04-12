import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';
import { RegistroComponent } from './registro/registro.component';
import { MasvistosComponent } from './masvistos/masvistos.component';
import { IniciarseccionComponent } from './iniciarseccion/iniciarseccion.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EstrenosComponent } from './estrenos/estrenos.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { ContenidosComponent } from './admin/contenidos/contenidos.component';
import { EditarPeliculaComponent } from './admin/editar-pelicula/editar-pelicula.component';
import { EditarContenidosComponent } from './admin/editar-contenidos/editar-contenidos.component';
import { CollectionComponent } from './admin/collection/collection.component';


@NgModule({
  declarations: [
    HomeComponent,
    PeliculaComponent,
    BuscarComponent,
    RegistroComponent,
    MasvistosComponent,
    IniciarseccionComponent,
    CategoriasComponent,
    EstrenosComponent,
    ErrorNotFoundComponent,
    ContenidosComponent,
    EditarPeliculaComponent,
    EditarContenidosComponent,
    CollectionComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule,
    FormsModule
  ]
})
export class PagesModule { }
