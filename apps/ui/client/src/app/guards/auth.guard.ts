import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { catchError, map, of } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: SocialAuthService) {}

  public canActivate() {
    return this.authService.authState.pipe(
      map((user) => {
        console.log(user);
        if (user) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );
  }
}
