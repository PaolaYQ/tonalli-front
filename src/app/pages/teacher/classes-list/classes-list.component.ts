import { Component, inject, OnInit } from '@angular/core';
import { ClassesWrapperComponent } from '../../../components/classes-wrapper/classes-wrapper.component';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { DividerComponent } from '../../../components/divider/divider.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChipListComponent } from '../../../components/chip-list/chip-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AddClassDialogComponent } from './modals/add-class-dialog/add-class-dialog.component';
import { ChipConfig } from '../../../types/chip.types';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
  standalone: true,
  imports: [
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

  classesChips: ChipConfig[] = [
    { label: 'Activas', selected: true },
    { label: 'Archivadas', selected: false },
  ];

  constructor() {}

  ngOnInit() {}

  addClass() {
    this.dialog.open(AddClassDialogComponent);
  }
}
