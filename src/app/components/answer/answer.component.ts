import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  imports: [CommonModule],
})
export class AnswerComponent implements OnInit {
  @Input()
  label!: string;

  @Input()
  option!: string;

  selected: boolean = false;

  wrong!: boolean;
  correct!: boolean;

  constructor() {}

  ngOnInit() {
    
  }
}
