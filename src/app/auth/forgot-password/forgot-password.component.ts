import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  userEmail = new FormControl('');


  constructor(private authSvc: AuthService, private router: Router) { }


  async onReset(){
    try {
      const email = this.userEmail.value;
      console.log(this.userEmail.value)
      await this.authSvc.resetPassword(email);
      window.alert('Correo electrónico enviado, revisa tu bandeja de entrada!');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}

