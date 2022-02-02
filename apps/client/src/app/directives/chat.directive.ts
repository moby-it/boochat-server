import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[chat]',
})
export class ChatDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
