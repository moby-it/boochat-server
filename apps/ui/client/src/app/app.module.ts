import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveComponentModule } from "@ngrx/component";
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from "../environments/environment";
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app.routing.module";
import { ChatDirective, MeetupsDirective } from "./directives";
import { AuthGuard } from "./guards/auth.guard";
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


@NgModule({
  declarations: [AppComponent, ChatDirective, MeetupsDirective, UnauthorizedComponent, LandingPageComponent, HeaderComponent],
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
