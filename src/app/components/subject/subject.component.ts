import { Component, OnInit } from '@angular/core';
import { ColorCycleDirective } from '../../directives/color.directive';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  standalone: true,
  imports: [ColorCycleDirective],
})
export class SubjectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
