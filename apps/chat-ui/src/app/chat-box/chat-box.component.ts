import { Component, NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'pokedexe-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent {
}

@NgModule({
  declarations: [ChatBoxComponent],
  imports: [BrowserModule],
  bootstrap: [ChatBoxComponent]
})
export class ChatComponentModule {
}
