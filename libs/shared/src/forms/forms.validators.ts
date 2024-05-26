import { AbstractControl, FormGroup } from '@angular/forms';

export function confirmPasswordValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: AbstractControl) => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    // Set error on matchingControl if validation fails
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      matchingControl?.setErrors(null);
      return null;
    }
  };
}
