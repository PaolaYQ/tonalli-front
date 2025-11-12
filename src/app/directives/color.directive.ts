import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appColorCycle]',
})
export class ColorCycleDirective implements OnInit, OnDestroy {
  private static readonly elements: ElementRef[] = [];
  private static readonly colors = ['#9191FF', '#6ACEB1', '#FF6172', '#63D4FF', ];

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    ColorCycleDirective.elements.push(this.el);
    this.applyColors();
  }

  ngOnDestroy(): void {
    const index = ColorCycleDirective.elements.indexOf(this.el);
    if (index !== -1) ColorCycleDirective.elements.splice(index, 1);
    this.applyColors();
  }

  private applyColors(): void {
    ColorCycleDirective.elements.forEach((elem, idx) => {
      const color =
        ColorCycleDirective.colors[idx % ColorCycleDirective.colors.length];
      this.renderer.setStyle(elem.nativeElement, 'background-color', color);
    });
  }
}
