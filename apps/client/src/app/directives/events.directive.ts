import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[events]',
})
export class EventsDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
