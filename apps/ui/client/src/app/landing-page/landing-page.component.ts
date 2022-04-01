import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChatDirective, MeetupsDirective } from '../directives';

@Component({
  selector: 'boochat-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LandingPageComponent implements OnInit, OnDestroy {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @ViewChild(ChatDirective, { static: true }) chatHost!: ChatDirective;
  @ViewChild(MeetupsDirective, { static: true }) eventsHost!: MeetupsDirective;

  async ngOnInit() {
    this.loading$.next(true);
    await this.initializeChat();
    // await this.initializeEvents();
    this.loading$.next(false);
  }

  private async initializeEvents() {
    const viewContainerRef = this.eventsHost.viewContainerRef;
    viewContainerRef.clear();
    const { MeetUpsComponent } = await loadRemoteModule({
      remoteEntry: environment.remotes.meetups,
      remoteName: 'meetups',
      exposedModule: './Component'
    });
    console.log(MeetUpsComponent);
    viewContainerRef.createComponent(MeetUpsComponent);
  }

  private async initializeChat() {
    const viewContainerRef = this.chatHost.viewContainerRef;
    viewContainerRef.clear();
    const { ChatBoxComponent } = await loadRemoteModule({
      remoteEntry: environment.remotes.chat,
      remoteName: 'chat',
      exposedModule: './Component'
    });
    console.log(ChatBoxComponent);
    viewContainerRef.createComponent(ChatBoxComponent);
  }

  public ngOnDestroy() {
    this.chatHost.viewContainerRef.clear();
    this.eventsHost.viewContainerRef.clear();
  }
}
