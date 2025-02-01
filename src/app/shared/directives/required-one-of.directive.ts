import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function requiredOneOf(
  controls: string[], 
  errorName: string = 'requiredOneOf'
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormGroup))
      throw new Error('requiredOneOf can only be used with FormGroup');

    const valid = controls.some(name => control.get(name)?.value?.length);
    return !valid ? { [errorName]: `At least one of ${controls.join(', ')} is required` } : null;
  };
}