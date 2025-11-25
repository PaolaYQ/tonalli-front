import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { DividerComponent } from '../../../components/divider/divider.component';
import { StudentService } from '../../../services/student.service';
import { ProfileStudentDetail } from '../../../types/student.types';
import { NoPhotoComponent } from '../../../components/no-photo/no-photo.component';
import { ChipConfig } from '../../../types/chip.types';
import { ChipListComponent } from '../../../components/chip-list/chip-list.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [
    MatIconModule,
    MatButtonModule,
    DividerComponent,
    RouterLink
  ],
})
export default class DetailComponent implements OnInit {


  constructor(
    private readonly router: Router,
    private readonly renderer: Renderer2,
    private readonly studentService: StudentService
  ) {}

  data!: ProfileStudentDetail;

  ngOnInit() {
    this.renderer.setStyle(
      document.body,
      'background-color',
      'var(--primary-color)'
    );
    this.initData();
  }

  ngOnDestroy(): void {
    this.renderer.setStyle(document.body, 'background-color', 'var(--accent)');
  }

  goBack() {
    this.router.navigate(['/student/classroom']);
  }

  private initData() {
    this.studentService
      .getDetail()
      .subscribe((response) => (this.data = response));
  }
}
