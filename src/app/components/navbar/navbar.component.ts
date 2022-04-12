import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanSuscriptorGuard } from '@app/auth/guards/can-suscriptor.guard';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/shared/models/user.interface';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  public user$: Observable<User> = this.authSvc.afAuth.user;
  public enabled = false;
  constructor( private router: Router, private authSvc: AuthService) { }
 
 
  ngOnInit(): void {
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
          this.enabled = true;
        } else {
          this.enabled = false;
        }
      });
      console.log(user)
  }


  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  buscarPelicula( texto: string ) {

    texto = texto.trim();

    if ( texto.length === 0 ) {
      return;
    }

    this.router.navigate(['/buscar', texto ]);

  }

  verifiacado(){
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
          this.enabled = true;
        } else {
          this.enabled = false;
        }
      });
      console.log(user)
  }



}
