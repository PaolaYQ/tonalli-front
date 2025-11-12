import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ChipListComponent } from '../../../components/chip-list/chip-list.component';
import { DividerComponent } from '../../../components/divider/divider.component';
import { SimpleAvatarComponent } from '../../../components/simple-avatar/simple-avatar.component';
import { SubjectComponent } from '../../../components/subject/subject.component';
import { ChipConfig } from '../../../types/chip.types';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    DividerComponent,
    ChipListComponent,
    SubjectComponent,
    SimpleAvatarComponent,
  ],
})
export default class ClassComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  activitiesChips: ChipConfig[] = [
    { label: 'Pendientes', selected: true },
    { label: 'Vencidas', selected: false },
    { label: 'Completadas', selected: false },

  ];

  constructor() {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
