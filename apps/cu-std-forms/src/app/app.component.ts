import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormProjectEntryFacade } from '@cu-std-facade';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cu-std-forms';
  constructor() {
    this._initFormEntryWebElement();
  }
  private _initFormEntryWebElement(): void {
    inject(FormProjectEntryFacade);
  }
}
