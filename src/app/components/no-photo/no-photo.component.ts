import { Component, Input, OnInit } from '@angular/core';
import { ColorCycleDirective } from '../../directives/color.directive';

@Component({
  selector: 'app-no-photo',
  templateUrl: './no-photo.component.html',
  styleUrls: ['./no-photo.component.scss'],
  standalone: true,
  imports: [ColorCycleDirective],
})
export class NoPhotoComponent implements OnInit {
  @Input()
  name!: string;

  initial!: string;

  constructor() {}

  ngOnInit() {
    this.initial = this.name.charAt(0);
  }
}
