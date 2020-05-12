import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export const MinimumSearchValidatorFn: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let isValid = false;
    if (control.get('entryName') && control.get('entryName').value) {
        isValid = true;
    }
    if (!isValid && control.get('entryNumber') && control.get('entryNumber').value) {
        isValid = true;
    }
    return !isValid ? { minimumSearch: true } : null;

};
