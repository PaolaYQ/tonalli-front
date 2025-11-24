import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ClassesWrapperComponent } from '../../../components/classes-wrapper/classes-wrapper.component';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { DividerComponent } from '../../../components/divider/divider.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChipListComponent } from '../../../components/chip-list/chip-list.component';
import { ActivatedRoute } from '@angular/router';
import { AvatarResponse } from '../../../types/profile.types';
import { ChipConfig } from '../../../types/chip.types';
import { forkJoin } from 'rxjs';
import { UserService } from '../../../services/profile.service';
import { Assignment, AssignmentsList } from '../../../types/assignment.types';
import { StudentService } from '../../../services/student.service';
import { AssignmentComponent } from '../../../components/assignment/assignment.component';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
  imports: [
    CommonModule,
    AssignmentComponent,
    AvatarComponent,
    DividerComponent,
    MatButtonModule,
    MatIconModule,
    ChipListComponent,
  ],
})
export default class ClassroomComponent implements OnInit {
  studentProfile!: AvatarResponse;

  private readonly userService = inject(UserService);
  private readonly studentService = inject(StudentService);

  actividadesChips: ChipConfig[] = [
    { label: 'Pendientes', selected: true },
    { label: 'Vencidas', selected: false },
    { label: 'Completadas', selected: false },
  ];

  shownActivities!: Assignment[];

  allActivities!: AssignmentsList;

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  changeTab(event: number) {
    if (event === 0) {
      this.shownActivities = this.allActivities.pendientes;
    }
    if (event === 1) {
      this.shownActivities = this.allActivities.vencidas;
    }
    if (event === 2) {
      this.shownActivities = this.allActivities.completadas;
    }
  }

  private loadData() {
    forkJoin({
      profile: this.userService.getBasicInfoProfile(),
      activities: this.studentService.getAssignedActivities(),
    }).subscribe((result) => {
      this.studentProfile = result.profile;
      this.allActivities = result.activities;
      this.shownActivities = result.activities.pendientes;
      console.log(this.allActivities);
    });
  }
}
