import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[boochatMeetups]'
})
export class MeetupsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
