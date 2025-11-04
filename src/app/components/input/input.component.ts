import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class InputComponent implements OnInit {
  @Input()
  label!: string;

  @Input()
  prefix!: string;

  @Input()
  suffix!: string;

  @Input()
  placeholder: string = 'Placeholder goes here';

  @Input()
  type: string = 'text';

  @Input()
  alternate: boolean = false;

  showPassword: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggleVisibiliy() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
}
