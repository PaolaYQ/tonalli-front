import {
  Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { Question } from '../../types/activities.types';
import { AnswerComponent } from '../answer/answer.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  imports: [AnswerComponent],
})
export class QuestionComponent implements OnChanges {
  @ViewChildren(AnswerComponent)
  options!: QueryList<AnswerComponent>;
  selectedAnswer!: AnswerComponent | null;

  @Input()
  questionData!: Question;
  confirmedSelection: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questionData']) {
      this.resetState();
    }
  }

  onSelect(selected: AnswerComponent) {
    if (this.confirmedSelection) return;
    this.selectedAnswer = selected;
    this.options.forEach((o) => {
      if (o === selected) {
        o.selected = true;
      } else {
        o.selected = false;
      }
    });
  }

  validateSelected(): boolean {
    this.confirmedSelection = true;
    let answeredCorrect = false;

    this.options.forEach((o) => {
      if (o.option === this.questionData.respuestaCorrecta) {
        o.correct = true;
      }

      if (o === this.selectedAnswer) {
        if (o.option === this.questionData.respuestaCorrecta) {
          answeredCorrect = true;
        } else {
          o.wrong = true;
        }
      }
    });

    return answeredCorrect;
  }

  resetState() {
    this.selectedAnswer = null;
    this.confirmedSelection = false;
    if (this.options) {
      this.options.forEach((option) => {
        option.selected = false;
        option.correct = false;
        option.wrong = false;
      });
    }
  }
}
