import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";
import { Router } from "@angular/router";

@Component({
  selector: 'pokedexe-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {
  socialUser: SocialUser | undefined;
  isLoggedIn = false;

  constructor(private socialAuthService: SocialAuthService, private router: Router) {
  }

  public ngOnInit() {
    this.socialAuthService.authState.subscribe(user => {
      console.log(user);
      if (user) {
        this.socialUser = user;
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      } else {
        this.isLoggedIn = false;
        this.socialUser = undefined;
        this.router.navigate(['/unauthorized']);
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }
}
