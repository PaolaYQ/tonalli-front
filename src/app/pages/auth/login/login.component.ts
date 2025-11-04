import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ButtonComponent, InputComponent, MatButtonModule, MatIconModule],
})
export default class LoginComponent implements OnInit, OnDestroy {
  constructor(private readonly renderer: Renderer2, private readonly router : Router) {}
  ngOnInit(): void {
    this.renderer.setStyle(
      document.body,
      'background-color',
      'var(--primary-color)'
    );
  }

  ngOnDestroy(): void {
     this.renderer.setStyle(
      document.body,
      'background-color',
      'var(--accent)'
    );
  }

  goBack(){
    this.router.navigate(['/welcome'])
  }
}
