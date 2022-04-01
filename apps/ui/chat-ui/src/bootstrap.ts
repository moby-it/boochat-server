import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { ChatComponentModule } from './app/chat-box/chat-box.component';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(ChatComponentModule, {
    defaultEncapsulation: ViewEncapsulation.Emulated,
  })
  .catch((err) => console.error(err));
