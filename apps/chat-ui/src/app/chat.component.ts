import { Component } from '@angular/core';

@Component({
  selector: 'pokedexe-chat-ui-entry',
  template: `<div class="remote-entry">
    <h2>chat-ui's Remote Entry Component changed!!</h2>
  </div>`,
  styles: [
    `
      .remote-entry {
        background-color: #143055;
        color: white;
        padding: 5px;
      }
    `,
  ],
})
export class ChatComponent {}
