import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormioForm, FormioModule } from '@formio/angular';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-form-entry-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-entry-container.component.html',
  styleUrl: './form-entry-container.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FormEntryContainerComponent {
  // formJSON: FormioForm = { display: 'form', components: [] };
  form = {
    components: [
      {
        type: 'textfield',
        key: 'firstName',
        label: 'First Name',
        input: true,
      },
      {
        type: 'textfield',
        key: 'lastName',
        label: 'Last Name',
        input: true,
      },
      {
        type: 'button',
        action: 'submit',
        label: 'Submit',
        theme: 'primary',
      },
    ],
  };
}
