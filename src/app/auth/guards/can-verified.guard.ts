import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanVerifiedGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router){

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      //validamos el editor
      map((user) => user && user.emailVerified),
      tap((canEdit) => {
        console.log(canEdit)
        if (!canEdit) {
          window.alert('ESTE EMAIL NO SE HA VERIFICADO');
          this.router.navigate(['/verification-email'])
        }
        //si es editor sigue el flujo
      })
    );
  }
  
}
