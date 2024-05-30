import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ngx-drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '@app/shared';

import { FormBuilderComponent } from './form-builder/form-builder.component';
import {createCustomElement} from "@angular/elements";
@NgModule({
  declarations: [AppComponent, FormBuilderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ColorPickerModule,
    DndModule,
    NgbModule,
    TranslateModule.forRoot(),
    SharedModule,
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap(appRef: ApplicationRef): void {
    const cuStdForms = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('cu-std-forms-external', cuStdForms);
  }
}
