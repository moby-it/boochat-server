import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatDirective, EventsDirective } from "./directives";
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from "./guards/auth.guard";
import { AppRoutingModule } from "./app.routing.module";
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from "../environments/environment";
import { ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { ReactiveComponentModule } from "@ngrx/component";

@NgModule({
  declarations: [AppComponent, ChatDirective, EventsDirective, UnauthorizedComponent, LandingPageComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, SocialLoginModule, ReactiveComponentModule,],
  providers: [AuthGuard, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.GoogleClientId
          )
        }
      ],
      onError: (error => {
        console.error('Failed to login');
        console.error(error);
      })
    } as SocialAuthServiceConfig
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
