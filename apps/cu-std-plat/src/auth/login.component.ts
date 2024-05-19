import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { BASE_FORMS_ERROR_MESSAGE_DICTIONARY } from '@cu-std-shared';
import { NgIf } from '@angular/common';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

@Component({
  selector: 'cu-form-normal-login',
  template: `
    <form
      nz-form
      [formGroup]="validateForm"
      class="login-form"
      (ngSubmit)="submitForm()"
    >
      <nz-form-item>
        <nz-form-control [nzErrorTip]="getControlErrorMessage('userName')">
          <nz-input-group nzPrefixIcon="user">
            <input
              type="text"
              nz-input
              formControlName="userName"
              placeholder="Username"
            />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control [nzErrorTip]="getControlErrorMessage('password')">
          <nz-input-group nzPrefixIcon="lock">
            <input
              type="password"
              nz-input
              formControlName="password"
              placeholder="Password"
            />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <div nz-row class="login-form-margin">
        <div nz-col [nzSpan]="12">
          <label nz-checkbox formControlName="remember">
            <span>Remember me</span>
          </label>
        </div>
        <div nz-col [nzSpan]="12">
          <a class="login-form-forgot">Forgot password</a>
        </div>
      </div>
      <nz-form-item *ngIf="getControlErrorMessage(null) as message">
        <nz-alert nzType="error" [nzMessage]="message" nzShowIcon></nz-alert>
      </nz-form-item>
      <button
        nz-button
        class="login-form-button login-form-margin"
        [nzType]="'primary'"
      >
        Log in
      </button>
      Or
      <a>register now!</a>
    </form>
  `,
  styles: [
    `
      .login-form {
        max-width: 300px;
      }

      .login-form-margin {
        margin-bottom: 16px;
      }

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    `,
  ],
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzInputDirective,
    NzRowDirective,
    NzColDirective,
    NzCheckboxComponent,
    NzButtonComponent,
    NgIf,
    NzAlertComponent,
  ],
  standalone: true,
})
export class CuFormNormalLoginComponent {
  protected readonly errorMessageDictionary: Record<string, string> = {
    ...BASE_FORMS_ERROR_MESSAGE_DICTIONARY,
  };
  protected readonly validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
    remember: [true],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      // this.validateForm.setErrors({
      //   userName: this.validateForm.value.userName,
      // });
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private readonly fb: NonNullableFormBuilder) {}
  protected getControlErrorMessage(controlName: string | null) {
    const errors = controlName
      ? this.validateForm.get(controlName)?.errors
      : this.validateForm?.errors;
    if (!errors) {
      return '';
    }
    const errorKey = Object.keys(errors)[0];
    return (
      this.errorMessageDictionary?.[errorKey] ||
      this.errorMessageDictionary['invalid']
    );
  }
}
