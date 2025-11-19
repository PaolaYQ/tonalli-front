import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ColorCycleDirective } from '../../directives/color.directive';
import { ActivityResponse } from '../../types/activities.types';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  standalone: true,
  imports: [ColorCycleDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectComponent implements OnInit {
  @Input()
  data: ActivityResponse = {
    idActividad: 0,
    titulo: '',
    descripcion: '',
    tema: '',
    asignada: false
  }

  constructor() {}

  ngOnInit() {}
}
