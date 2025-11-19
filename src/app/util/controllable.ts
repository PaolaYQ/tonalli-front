import { FormControl, FormGroup } from '@angular/forms';

export class Controllable<T> {
  form!: FormGroup;

  getControl(control: keyof T): FormControl {
    return this.form.get(control as string) as FormControl;
  }
}
