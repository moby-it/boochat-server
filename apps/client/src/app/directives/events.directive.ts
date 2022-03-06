import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[oursocialEvents]',
})
export class EventsDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
