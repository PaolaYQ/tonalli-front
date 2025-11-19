import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { filter, forkJoin } from 'rxjs';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { ChipListComponent } from '../../../components/chip-list/chip-list.component';
import { ClassesWrapperComponent } from '../../../components/classes-wrapper/classes-wrapper.component';
import { DividerComponent } from '../../../components/divider/divider.component';
import { UserService } from '../../../services/profile.service';
import { ChipConfig } from '../../../types/chip.types';
import { ClassCard } from '../../../types/class.types';
import { AvatarResponse } from '../../../types/profile.types';
import { AddClassDialogComponent } from './modals/add-class-dialog/add-class-dialog.component';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ClassesWrapperComponent,
    AvatarComponent,
    DividerComponent,
    MatButtonModule,
    MatIconModule,
    ChipListComponent,
  ],
})
export default class ClassesListComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly userService = inject(UserService);

  public teacherProfile!: AvatarResponse;
  public classes!: ClassCard[];

  classesChips: ChipConfig[] = [
    { label: 'Activas', selected: true },
    // { label: 'Archivadas', selected: false },
  ];

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  addClass() {
    const dialogRef = this.dialog.open(AddClassDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(filter((data) => data !== undefined))
      .subscribe((data) => {
        this.classes.push(data);
      });
  }

  private loadData() {
    forkJoin({
      profile: this.userService.getBasicInfoProfile(),
      classes: this.userService.getClassesFromTeacher(),
    }).subscribe((result) => {
      this.teacherProfile = result.profile;
      this.classes = result.classes;
    });
  }
}
