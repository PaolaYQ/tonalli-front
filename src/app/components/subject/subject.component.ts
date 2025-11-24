import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ColorCycleDirective } from '../../directives/color.directive';
import { AssignActivityComponent } from '../../pages/teacher/classes-list/modals/assign-activity/assign-activity.component';
import { ActivityResponse } from '../../types/activities.types';
import { AssigmentDialogData } from '../../types/assignment.types';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  standalone: true,
  imports: [ColorCycleDirective, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectComponent implements OnInit {
  @Output()
  onAssign: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  data: ActivityResponse = {
    idActividad: 0,
    titulo: '',
    descripcion: '',
    tema: '',
    asignada: false,
  };

  @Input()
  clasCode!: string;

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit() {}

  action() {
    if (!this.data.asignada) {
      const request: AssigmentDialogData = {
        idActividad: this.data.idActividad,
        codigoClase: this.clasCode,
        title: this.data.titulo,
      };
      const dialogRef = this.dialog.open(AssignActivityComponent, {
        data: request,
      });
      dialogRef.afterClosed().subscribe((data) => this.onAssign.emit(data));
    }
  }
}
