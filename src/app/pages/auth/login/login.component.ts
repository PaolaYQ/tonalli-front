import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Controllable } from '../../../util/controllable';
import { LoginRequest } from '../../../types/login.request';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ButtonComponent, InputComponent, MatButtonModule, MatIconModule],
})
export default class LoginComponent
  extends Controllable<LoginRequest>
  implements OnInit, OnDestroy
{
  userType!: string;

  constructor(
    private readonly renderer: Renderer2,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.renderer.setStyle(
      document.body,
      'background-color',
      'var(--primary-color)'
    );
    this.initForm();
    this.getUserType();
  }

  ngOnDestroy(): void {
    this.renderer.setStyle(document.body, 'background-color', 'var(--accent)');
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }

  login() {
    this.authService.login(this.form.value).subscribe((response) => {
      if (this.userType === 'M') {
        this.router.navigate(['/clases']);
      }
      if (this.userType === 'A') {
        this.router.navigate(['student/classroom']);
      }
    });
  }

  private initForm() {
    this.form = this.fb.group<LoginRequest>({
      username: '',
      password: '',
    });
  }

  private getUserType() {
    this.route.queryParamMap.subscribe((params) => {
      this.userType = params.get('type') as string;
    });
  }
}
