import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AvatarResponse } from '../../types/profile.types';
import { NoPhotoComponent } from '../no-photo/no-photo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NoPhotoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input()
  info!: AvatarResponse;

  constructor(private readonly router: Router) {}

  ngOnInit() {}

  logout() {
    // localStorage.removeItem('token');
    this.router.navigate(['student/detail']);
  }
}
