import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  AssigmentDialogData,
  AssignmentRequest,
} from '../../../../../types/assignment.types';
import { ButtonComponent } from '../../../../../components/button/button.component';
import {
  MatTimepicker,
  MatTimepickerModule,
} from '@angular/material/timepicker';
import { AssignmentService } from '../../../../../services/assignment.service';

@Component({
  selector: 'app-assign-activity',
  templateUrl: './assign-activity.component.html',
  styleUrls: ['./assign-activity.component.scss'],
  imports: [
    MatDatepickerModule,
    MatTimepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput,
    ButtonComponent,
  ],
})
export class AssignActivityComponent implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AssigmentDialogData,
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AssignActivityComponent>,
    private readonly assignService: AssignmentService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      date: '',
      time: '',
    });
  }

  cancel() {
    this.dialogRef.close(undefined);
  }

  assign() {
    const assignmentRequest: AssignmentRequest = {
      idActividad: this.data.idActividad,
      codigoClase: this.data.codigoClase,
      fechaLimite: this.combineDateAndTime(
        this.dateControl.value,
        this.timeControl.value
      ),
    };
    this.assignService
      .assignActivity(assignmentRequest)
      .subscribe((response) => {
        this.dialogRef.close(this.data.idActividad);
      });
  }

  get dateControl(): FormControl {
    return this.form.get('date') as FormControl;
  }

  get timeControl(): FormControl {
    return this.form.get('time') as FormControl;
  }

  combineDateAndTime(dateIso: string, timeIso: string): string {
    const dateObj = new Date(dateIso);
    const timeObj = new Date(timeIso);

    dateObj.setHours(timeObj.getHours());
    dateObj.setMinutes(timeObj.getMinutes());
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);

    const tzOffset = dateObj.getTimezoneOffset() * 60000;
    const localISOTime = new Date(dateObj.getTime() - tzOffset).toISOString();

    return localISOTime.slice(0, 19);
  }
}
