import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[oursocialChat]',
})
export class ChatDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
