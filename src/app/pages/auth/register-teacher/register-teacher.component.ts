import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../components/input/input.component';
import { Controllable } from '../../../util/controllable';
import { RegisterTeacherRequest } from '../../../types/register.types';
import { ButtonComponent } from '../../../components/button/button.component';
import { FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.scss'],
  imports: [MatIconModule, InputComponent, ButtonComponent, MatButtonModule],
})
export default class RegisterTeacherComponent
  extends Controllable<RegisterTeacherRequest>
  implements OnInit
{
  constructor(
    private readonly fb: FormBuilder,
    private readonly renderer: Renderer2,
    private readonly router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.renderer.setStyle(
      document.body,
      'background-color',
      'var(--primary-color)'
    );
    this.initForm();
  }

  goBack() {
    this.router.navigate(['/auth/login'], {queryParams: {type: 'M'}})
  }

  register() {}

  private initForm() {
    this.form = this.fb.group<RegisterTeacherRequest>({
      username: '',
      password: '',
      name: '',
      rol: 'M',
    });
  }
}
