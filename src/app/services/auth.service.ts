import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //crear nuevo usuario
 // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyCsF9l8sqAdu1upV5z4YYiSji1bcx802iU';

  // //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  userToken: string;

  constructor( private http: HttpClient) {
    this.leerToken();
   }
  //salirse
  logout(){

  }

  login( usuario: UsuarioModel){
    const authData = {
      ...usuario,
      returnSecureToken: true

      };
      return this.http.post(
        `${this.url}/verifyPassword?key=${this.apikey}`,
      authData
      ).pipe(
        map( resp =>{
          console.log('Entro en el mapa del RXJS')
          this.guardarToken(resp['idToken']);
          return resp;

        })

      );
  }
   nuevoUsuario (usuario: UsuarioModel){
   const authData = {
   ...usuario,
   returnSecureToken: true

   };
  return this.http.post(
    `${this.url}/signupNewUser?key=${this.apikey}`,
  authData
  ).pipe(
    map( resp =>{
      console.log('Entro en el mapa del RXJS')
      this.guardarToken(resp['idToken']);
      return resp;

    })
  );
   }
   private guardarToken(idToken: string){
     this.userToken = idToken;
     localStorage.setItem('token', idToken);
  }
  leerToken(){
    if (localStorage.getItem('token')){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }
}
