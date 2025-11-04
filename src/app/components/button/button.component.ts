import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, CommonModule],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label: string = 'Button';

  @Input()
  disabled: boolean = false;

  @Input()
  type: 'primary' | 'secondary' = 'primary';
}
