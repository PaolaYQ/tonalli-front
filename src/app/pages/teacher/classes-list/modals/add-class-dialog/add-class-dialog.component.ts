import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { InputComponent } from '../../../../../components/input/input.component';
import { QrCodeDialogComponent } from '../../../../../components/qr-code/qr-code.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Controllable } from '../../../../../util/controllable';
import { AddClassForm } from '../../../../../types/class.types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClassService } from '../../../../../services/class.service';

@Component({
  selector: 'app-add-class-dialog',
  templateUrl: './add-class-dialog.component.html',
  styleUrls: ['./add-class-dialog.component.scss'],
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class AddClassDialogComponent
  extends Controllable<AddClassForm>
  implements OnInit
{
  private readonly dialog = inject(MatDialog);
  private readonly classService = inject(ClassService);
  private readonly dialogRef = inject(MatDialogRef<AddClassDialogComponent>);

  constructor(private readonly fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  cancel() {
    this.dialogRef.close(undefined);
  }

  addClass() {
    this.classService
      .addClass(this.form.getRawValue())
      .subscribe((response) => {
        this.dialogRef.close(response);
        this.dialog.open(QrCodeDialogComponent, { data: response });
      });
  }

  private initForm() {
    this.form = this.fb.group<AddClassForm>({
      nombreClase: '',
      grado: 6,
    });
  }
}
