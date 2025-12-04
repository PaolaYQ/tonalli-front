import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Controllable } from '../../../util/controllable';
import { RegisterTeacherRequest } from '../../../types/register.types';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../../../components/input/input.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { switchMap } from 'rxjs';
import { EnrollmentService } from '../../../services/enrollment.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
  imports: [MatIconModule, InputComponent, ButtonComponent, MatButtonModule],
})
export default class RegisterStudentComponent
  extends Controllable<RegisterTeacherRequest>
  implements OnInit, OnDestroy
{
  codeControl: FormControl = new FormControl('');

  constructor(
    private readonly fb: FormBuilder,
    private readonly renderer: Renderer2,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly enrollmentService: EnrollmentService
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
    this.router.navigate(['/auth/login'], { queryParams: { type: 'M' } });
  }

  register() {
    const data = this.form.getRawValue();
    const dataCodigo = {
      codigoClase: this.codeControl.value,
    };
    this.authService
      .register(data)
      .pipe(switchMap((response) => this.enrollmentService.enroll(dataCodigo)))
      .subscribe((r) => this.router.navigate(['student/classroom']));
  }

  private initForm() {
    this.form = this.fb.group<RegisterTeacherRequest>({
      username: '',
      password: '',
      name: '',
      rol: 'A',
    });
  }

  ngOnDestroy(): void {
    this.renderer.setStyle(document.body, 'background-color', 'var(--accent)');
  }
}
