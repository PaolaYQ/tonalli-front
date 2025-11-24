import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChipConfig } from '../../types/chip.types';
import { ChipComponent } from '../chip/chip.component';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  standalone: true,
  imports: [ChipComponent, CommonModule],
})
export class ChipListComponent implements OnInit {
  @Output()
  onChipChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() chips: ChipConfig[] = [];

  selectedChipIndex: number = 0;

  constructor() {}

  ngOnInit() {}

  toggleSelected(chip: ChipConfig) {
    this.selectedChipIndex = this.chips.indexOf(chip);
    this.chips.forEach((c, index) => {
      c.selected = index === this.selectedChipIndex;
    });
    this.onChipChange.emit(this.selectedChipIndex);
  }
}
