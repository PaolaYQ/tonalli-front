import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AvatarResponse } from '../../types/profile.types';
import { NoPhotoComponent } from '../no-photo/no-photo.component';

@Component({
  selector: 'app-simple-avatar',
  templateUrl: './simple-avatar.component.html',
  styleUrls: ['./simple-avatar.component.scss'],
  standalone: true,
  imports: [NoPhotoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleAvatarComponent implements OnInit {
  @Input()
  info!: AvatarResponse;

  constructor() {}

  ngOnInit() {}
}
