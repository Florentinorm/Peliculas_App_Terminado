import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UsuarioModel} from '../../models/usuario.model'
import { AuthService } from '../../services/auth.service'

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  constructor( private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   /* this.usuario.email = 'evaquintero@gmail.com';*/

  }
  //con esto capturas la informacion del formulario
  onSubmit( form: NgForm){
  if( form.invalid){
    return;
  }

  Swal.fire({
    allowOutsideClick: false,
    // type: 'info',
    text: 'Espere por favor...',
  });
  Swal.showLoading();
  this.auth.nuevoUsuario(this.usuario).subscribe( resp =>{
    console.log(resp);
    Swal.close();
    if(this.recordarme){
      localStorage.setItem('email', this.usuario.email);
    }
    this.router.navigateByUrl('/home');
  }, (err)=>{
    console.log(err.error.error.message);
    Swal.fire({
      // type: 'info',
      title: 'Error al autenticar',
      text: err.error.error.message,
    });
  })
  // console.log('Formulado enviado');
  // console.log(this.usuario);
  // console.log(form);
  }

}
