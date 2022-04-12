import { Injectable } from '@angular/core';
//import {auth}
import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '@shared/models/user.interface';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {RoleValidator} from '../helpers/roleValidator';

@Injectable({
  providedIn: 'root'
})
//con el extends tendremos acceso a los metodo de roleValidator desde el authService
export class AuthService extends RoleValidator {
  public user:User;
  public user$:Observable<User>;

  constructor(public afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) {
    super();
    //Recupera los datos del user logueado
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          //conectamos con firebase
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null); //devolvemos el null en modo de observable
      })
    );
   }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  } 


  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      await this.updateUserDatalogin(user);
      await localStorage.setItem('token','true');
      return user;
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }


  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      
      await this.updateUserData(user);
      await this.sendVerificationEmail(); //hacemos la verificacion del correo primeramente
      
      return user;
    } catch (error) {
      console.log(error);
    }
  }


  async logout(): Promise<void> {
    try {
      await localStorage.removeItem('token');
      this.router.navigate(['/login']);
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
    
  }


  //método que guarda el usuario en firebase y lo modifica
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      role: 'SUSCRIPTOR',
    };

    return userRef.set(data, { merge: true });
  }

  public updateUserDatalogin(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }
}
 