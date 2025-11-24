import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [ButtonComponent, CommonModule],
})
export default class WelcomeComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {}

  navigateToAuth(type: string) {
    this.router.navigate(['/auth'], { queryParams: { type } });
  }
}
