import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ColorCycleDirective } from '../../directives/color.directive';

@Component({
  selector: 'app-classes-wrapper',
  templateUrl: './classes-wrapper.component.html',
  styleUrls: ['./classes-wrapper.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ColorCycleDirective],
})
export class ClassesWrapperComponent implements OnInit {
  private readonly router = inject(Router);

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.router.navigate(['/clases/1']);
  }

  openMenu(event: Event) {
    event.stopPropagation();

  }
}
