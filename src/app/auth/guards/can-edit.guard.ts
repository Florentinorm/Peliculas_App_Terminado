import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanEditGuard implements CanActivate {
  constructor(private authSvc: AuthService){

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      //validamos el editor
      map((user) => user && this.authSvc.isEditor(user)),
      tap((canEdit) => {
        //si el user no es editor en su propiedad role
        if (!canEdit) {
          window.alert('Access denied. Must have permission to edit.');
        }
        //si es editor sigue el flujo
      })
    );
  }
  
}
