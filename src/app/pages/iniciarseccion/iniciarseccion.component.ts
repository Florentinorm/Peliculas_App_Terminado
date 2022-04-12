import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciarseccion',
  templateUrl: './iniciarseccion.component.html',
  styleUrls: ['./iniciarseccion.component.css']
})
export class IniciarseccionComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit( ) {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm){
    if( form.invalid){ return;}
    //Es para que se muestre el mensaje de espere por favor
    Swal.fire({
      allowOutsideClick: false,
      // type: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe( resp => {
      console.log(resp);
      Swal.close();
    if(this.recordarme){
      localStorage.setItem('email', this.usuario.email);
    }

      this.router.navigateByUrl('/home');

    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        // type: 'info',
        title: 'Error al autenticar',
        text: err.error.error.message,
      });
    });


  // console.log('Imprimir si el formulario es valido');
  // console.log(this.usuario);
  // console.log(form);

  }



}
