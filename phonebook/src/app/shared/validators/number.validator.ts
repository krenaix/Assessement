import { ValidatorFn, AbstractControl, ValidationErrors, FormGroup, FormControl } from '@angular/forms';

export const NumberValidatorFn: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
        let integerVal = control.value.toString();
        if (integerVal.startsWith('+')) {
            integerVal = control.value.substring(1);
        }

        const isNumber = !isNaN(parseFloat(control.value)) && isFinite(control.value);

        if (!isNumber) {
            return { invalidDataType: true };
        }
    }


    return null;

};
