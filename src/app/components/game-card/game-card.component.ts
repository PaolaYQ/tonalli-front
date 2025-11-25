import { Component, Input, OnInit } from '@angular/core';
import { GameCardConfig } from '../../types/game.types';
import { ColorCycleDirective } from '../../directives/color.directive';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  imports: [ColorCycleDirective],
})
export class GameCardComponent implements OnInit {
  @Input()
  data!: GameCardConfig;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  play() {
    if (!this.classCode) return;

    this.router.navigate(['papa-caliente', this.data.topic], {
      relativeTo: this.activatedRoute,
    });
  }

  private get classCode(): string {
    return this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
