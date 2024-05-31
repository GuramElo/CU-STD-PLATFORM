import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import {DoBootstrap, Injector, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './chat/chat.component';
import {createCustomElement} from "@angular/elements";

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatGridListModule
  ],
  providers: [],
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {}

  public ngDoBootstrap(): void {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('cu-std-chat-external', el);
  }
}
