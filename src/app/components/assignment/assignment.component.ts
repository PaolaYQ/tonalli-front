import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ColorCycleDirective } from '../../directives/color.directive';
import { Assignment } from '../../types/assignment.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  imports: [ColorCycleDirective, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignmentComponent implements OnInit {
  @Input()
  data: Assignment = {
    idActividad: 0,
    titulo: '',
    descripcion: '',
    tema: '',
    idAsignacion: 0,
    fechaLimite: new Date(),
  };

  @Input()
  clasCode!: string;

  constructor(private readonly router: Router) {}

  ngOnInit() {}

  action() {
    this.router.navigate([`/student/activity/${this.data.idAsignacion}`]);
  }
}
