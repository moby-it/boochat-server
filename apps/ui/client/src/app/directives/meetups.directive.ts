import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[oursocialMeetups]',
})
export class MeetupsDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
