import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
  NzFormTooltipIcon,
} from 'ng-zorro-antd/form';
import {
  BASE_FORMS_ERROR_MESSAGE_DICTIONARY,
  confirmPasswordValidator,
} from '@cu-std-shared';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'cu-form-register',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="email"
          >ელექტრონული ფოსტა
        </nz-form-label>
        <nz-form-control
          [nzSm]="14"
          [nzXs]="24"
          nzErrorTip="მეილი არავალიდურია"
        >
          <input nz-input formControlName="email" id="email" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="password" nzRequired
          >პაროლი
        </nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" nzErrorTip="შეიყვანეთ პაროლი">
          <input
            nz-input
            type="password"
            id="password"
            formControlName="password"
          />
          <!--          (ngModelChange)="updateConfirmValidator()"-->
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="checkPassword" nzRequired
          >დაადასტურეთ პაროლი
        </nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24" [nzErrorTip]="errorTpl">
          <input
            nz-input
            type="password"
            formControlName="confirmPassword"
            id="checkPassword"
          />
          <ng-template #errorTpl let-control>
            @if (control.errors?.['required']) { ველი სავალდებულოა } @if
            (control.errors?.['passwordMismatch']) { პაროლები ერთმანეთს არ
            ემთხვევა }
          </ng-template>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label
          [nzSm]="6"
          [nzXs]="24"
          nzFor="captcha"
          nzTooltipTitle="დაკლიკე და მიიღე Captcha"
          [nzTooltipIcon]="captchaTooltipIcon"
        >
          არ ვარ რობოტი
        </nz-form-label>
        <nz-form-control
          [nzSm]="14"
          [nzXs]="24"
          nzErrorTip="შეიყვანეთ ტექტსი სურათიდან"
          nzExtra="უნდა დავრწმუნდეთ, რომ ადამიანი ხართ"
        >
          <div nz-row [nzGutter]="8">
            <div nz-col [nzSpan]="12">
              <!--              formControlName="captcha"-->
              <input nz-input id="captcha" />
            </div>
            <div nz-col [nzSpan]="12">
              <button nz-button (click)="getCaptcha($event)">
                Get captcha
              </button>
            </div>
          </div>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row class="register-area">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <label nz-checkbox formControlName="acceptTerms">
            <span>
              გავეცანი
              <a>პირობებს</a>
            </span>
          </label>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nz-row class="register-area">
        <nz-form-control [nzSpan]="14" [nzOffset]="6">
          <button nz-button nzType="primary">რეგისტრაცია</button>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,

  styles: [
    `
      [nz-form] {
        max-width: 750px;
      }

      .ant-select.ant-select-in-form-item.phone-select {
        width: 70px;
      }

      .register-area {
        margin-bottom: 8px;
      }
    `,
  ],
  standalone: true,
  imports: [
    NzFormItemComponent,
    NzFormControlComponent,
    NzRowDirective,
    NzButtonComponent,
    NzColDirective,
    NzCheckboxComponent,
    ReactiveFormsModule,
    NzInputDirective,
    NzFormLabelComponent,
    NzOptionComponent,
    NzSelectComponent,
    NzInputGroupComponent,
    NzFormDirective,
  ],
})
export class CuFormRegisterComponent {
  protected readonly errorMessageDictionary: Record<string, string> = {
    ...BASE_FORMS_ERROR_MESSAGE_DICTIONARY,
  };
  validateForm: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
    acceptTerms: FormControl<boolean>;
  }>;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private readonly fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      { validators: [confirmPasswordValidator('password', 'confirmPassword')] }
    );
  }
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
