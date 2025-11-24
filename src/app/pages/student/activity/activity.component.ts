import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Activity } from '../../../types/activities.types';
import { ButtonComponent } from '../../../components/button/button.component';
import { QuestionComponent } from '../../../components/question/question.component';

import { ActivatedRoute, Router } from '@angular/router';
import { SubmitAttemptRequest } from '../../../types/atemp.types';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ButtonComponent,
    QuestionComponent,
  ],
})
export default class ActivityComponent implements OnInit, OnDestroy {
  @ViewChild(QuestionComponent)
  questionComponent!: QuestionComponent;

  startTime!: number;
  correctAnswersCount: number = 0;

  activityResponse!: Activity;

  width: number = 0;
  currentQuestionIndex: number = 0;
  isAnswerChecked: boolean = false;
  isCorrectSelection: boolean = false;

  constructor(
    private readonly renderer: Renderer2,
    private readonly router: Router,
    private route: ActivatedRoute,
    private readonly studentService: StudentService
  ) {}

  ngOnInit() {
    this.renderer.setStyle(
      document.body,
      'background-color',
      'var(--primary-color)'
    );
    this.startTime = Date.now();
    this.activityResponse = this.route.snapshot.data['item'];
  }

  ngOnDestroy(): void {
    this.renderer.setStyle(document.body, 'background-color', 'var(--accent)');
  }

  updateProgress() {
    const total = this.activityResponse.preguntas.length;
    this.width = (this.currentQuestionIndex / total) * 100;
  }

  getButtonLabel(): string {
    if (!this.isAnswerChecked) return 'COMPROBAR';
    return this.currentQuestionIndex ===
      this.activityResponse.preguntas.length - 1
      ? 'TERMINAR'
      : 'SIGUIENTE';
  }

  handleMainAction() {
    if (this.isAnswerChecked) {
      this.nextQuestion();
      return;
    }

    if (!this.questionComponent.selectedAnswer) return;

    this.isCorrectSelection = this.questionComponent.validateSelected();
    this.isAnswerChecked = true;

    if (this.isCorrectSelection) {
      this.correctAnswersCount++;
    }

    const total = this.activityResponse.preguntas.length;
    this.width = ((this.currentQuestionIndex + 1) / total) * 100;
  }

  nextQuestion() {
    if (
      this.currentQuestionIndex <
      this.activityResponse.preguntas.length - 1
    ) {
      this.currentQuestionIndex++;
      this.isAnswerChecked = false;
    } else {
      this.finishActivity();
    }
  }

  finishActivity() {
    const endTime = Date.now();
    const durationSeconds = Math.floor((endTime - this.startTime) / 1000);

    const totalQuestions = this.activityResponse.preguntas.length;
    const scoreRaw = (this.correctAnswersCount / totalQuestions) * 100;
    const scorePercentage = Math.round(scoreRaw * 100) / 100;

    const attemptData: SubmitAttemptRequest = {
      idAsignacion: this.activityResponse.idAsignacion,
      resultadoPorcentaje: scorePercentage,
      duracionSegundos: durationSeconds,
    };

    // 4. Llamar al Servicio (Descomenta cuando inyectes el servicio)

    this.studentService.postAtemp(attemptData).subscribe({
      next: (response) => {
        this.router.navigate(['/student/classroom']);
      },
    });
  }

  goBack() {
    this.router.navigate(['/student/classroom']);
  }
}
