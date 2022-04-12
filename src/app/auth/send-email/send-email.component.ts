import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
})
export class SendEmailComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
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
          console.log('esto es', user)
          this.router.navigate(['/contenidos'])
        } else {
          this.router.navigate(['/home'])
        }
      });
      console.log(user)
  }

  //ngOnDestroy(){
    //this.authSvc.logout();
  //}


}
