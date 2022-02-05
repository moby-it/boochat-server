import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { Observable } from "rxjs";
import { io } from 'socket.io-client';

@Component({
  selector: 'pokedexe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  authStateReady$!: Observable<boolean>;
  socket = io('http://localhost/3333/chat');

  constructor(private authService: SocialAuthService) {
  }

  public ngOnInit() {
    this.socket.connect();
    this.authStateReady$ = this.authService.initState;
  }
}
