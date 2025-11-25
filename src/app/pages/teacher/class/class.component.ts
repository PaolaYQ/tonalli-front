import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ChipListComponent } from '../../../components/chip-list/chip-list.component';
import { DividerComponent } from '../../../components/divider/divider.component';
import { GameCardComponent } from '../../../components/game-card/game-card.component';
import { QrCodeDialogComponent } from '../../../components/qr-code/qr-code.component';
import { SimpleAvatarComponent } from '../../../components/simple-avatar/simple-avatar.component';
import { SubjectComponent } from '../../../components/subject/subject.component';
import { ClassService } from '../../../services/class.service';
import { ActivityResponse } from '../../../types/activities.types';
import { ChipConfig } from '../../../types/chip.types';
import { ClassInfo, CodeClass } from '../../../types/class.types';
import { AvatarResponse } from '../../../types/profile.types';
import { StudentInfo } from '../../../types/student.types';
import { GameCardConfig } from './../../../types/game.types';

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
    GameCardComponent,
  ],
})
export default class ClassComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly classService = inject(ClassService);
  private readonly dialog = inject(MatDialog);

  classInfo: ClassInfo = {
    nombreClase: '',
    codigoClase: '',
    grado: 0,
    totalAlumnos: 0,
  };
  topStudents: AvatarResponse[] = [];
  activities: ActivityResponse[] = [];

  allActivities: ActivityResponse[] = [];

  activitiesChips: ChipConfig[] = [
    { label: 'Pendientes', selected: true },
    { label: 'Asignadas', selected: false },
  ];

  games: GameCardConfig[] = [
    {
      title: 'Tabla del 4',
      topic: 'TABLA_4',
      icon: '4x5',
    },
    {
      title: 'Tabla del 7',
      topic: 'TABLA_7',
      icon: '7x8',
    },
    {
      title: 'Tabla del 9',
      topic: 'TABLA_9',
      icon: '9x2',
    },
    {
      title: 'Multiplicacion de Fracciones',
      topic: 'FRACCIONES',
      icon: '1/3 x 2/4',
    },
    {
      title: 'Restas con Punto decimal',
      topic: 'DECIMALES',
      icon: '7.5 - 2.2',
    },
    {
      title: 'Divisiones basicas',
      topic: 'DIVISION',
      icon: '4/2',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.initData();
  }

  goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  showCode() {
    const codeObject: CodeClass = { codigoClase: this.classCode };
    this.dialog.open(QrCodeDialogComponent, { data: codeObject });
  }

  changeTab(event: number) {
    if (event === 0) {
      this.activities = this.allActivities.filter((a) => a.asignada === false);
    }
    if (event === 1) {
      this.activities = this.allActivities.filter((a) => a.asignada === true);
    }
  }

  assigned(idActivity: number) {
    this.allActivities.forEach((a) => {
      if (a.idActividad === idActivity) a.asignada = true;
    });
    this.activities = this.allActivities.filter((a) => a.asignada === false);
  }

  private get classCode(): string {
    return this.route.snapshot.paramMap.get('id') as string;
  }

  private initData() {
    forkJoin({
      classData: this.classService.getClassInfo(this.classCode),
      studentsData: this.classService.getTopStudents(this.classCode),
      activitiesData: this.classService.getActivities(this.classCode),
    }).subscribe((result) => {
      this.classInfo = result.classData;
      result.studentsData.forEach((s) => {
        this.setStudent(s);
      });
      this.allActivities = result.activitiesData;
      this.activities = this.allActivities.filter((a) => a.asignada === false);
    });
  }

  private setStudent(student: StudentInfo) {
    const avatar: AvatarResponse = {
      nombre: student.nombre,
      avatarUrl: student.avatarUrl,
    };
    this.topStudents.push(avatar);
  }
}
