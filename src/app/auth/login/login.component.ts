import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/shared/models/user.interface';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (user) {
        console.log('entro')
        this.checkUserIsVerified(user);
        //const ti = await this.verified();
        
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  private checkUserIsVerified(user: User) {

    if (user && user.emailVerified) {
      const user =  this.authSvc.user$.pipe(
        take(1),
        map((user) => this.authSvc.isAdmin(user)),
        tap((canEdit) => {
          if (canEdit) {
            console.log(canEdit)
            return canEdit
          }
        })
        ).subscribe(user => {
          if(user){
            console.log('esto es', user)
            this.router.navigate(['/contenidos'])
          } else {
            this.router.navigate(['/home'])
          }
        });
        console.log(user)
    } else if (user) {
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }

}
