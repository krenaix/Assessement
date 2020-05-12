import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const PatternMustContainDigitValidatorFn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  let isValid = true;
  const regex: RegExp = new RegExp('/\d/');
  if (control.get('prPassword')) {
    const password = control.get('prPassword').value;

    // test the value of the control against the regexp supplied
    isValid = regex.test(control.value);

  }
  return !isValid ? { hasNumber: true } : null;

};


export const PatternMustContainUpperCaseValidatorFn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  let isValid = true;
  const regex: RegExp = new RegExp('/[A-Z]/');
  if (control.get('prPassword')) {
    const password = control.get('prPassword').value;

    // test the value of the control against the regexp supplied
    isValid = regex.test(control.value);

  }
  return !isValid ? { hasUpperCase: true } : null;

};

export const PatternMustContainLowerCaseValidatorFn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  let isValid = true;
  const regex: RegExp = new RegExp('/[a-z]/');
  if (control.get('prPassword')) {
    const password = control.get('prPassword').value;

    // test the value of the control against the regexp supplied
    isValid = regex.test(control.value);

  }
  return !isValid ? { hasLowerCase: true } : null;

};


export const PatternMustContainSpecialCharacterValidatorFn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  let isValid = true;
  const regex: RegExp = new RegExp('/[!@#$%^&*(),.?":{}|<>]/g');
  if (control.get('prPassword')) {
    const password = control.get('prPassword').value;

    // test the value of the control against the regexp supplied
    isValid = regex.test(control.value);

  }
  return !isValid ? { hasLowerCase: true } : null;
};

export const PasswordsMatchValidatorFn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  let isValid = true;
  if (control.get('prPassword') && control.get('prConfirmPassword')) {
    const password = control.get('prPassword').value;
    const confirmPassword = control.get('prConfirmPassword').value;
    isValid = password === confirmPassword;
  }
  return !isValid ? { hasLowerCase: true } : null;
};

