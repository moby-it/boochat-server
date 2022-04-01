import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[boochatChat]',
})
export class ChatDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
