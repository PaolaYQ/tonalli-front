import { Component, Input, OnInit } from '@angular/core';
import { ChipConfig } from '../../types/chip.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ChipComponent implements OnInit {
  @Input() config!: ChipConfig;

  constructor() {}

  ngOnInit() {}
}
