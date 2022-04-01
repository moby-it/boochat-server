import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';

@Component({
  selector: 'boochat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authStateReady$!: Observable<boolean>;

  constructor(private authService: SocialAuthService) {}

  public ngOnInit() {
    this.authStateReady$ = this.authService.initState;
  }
}
