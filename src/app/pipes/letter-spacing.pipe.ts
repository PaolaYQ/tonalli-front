import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letterSpacing',
})
export class LetterSpacingPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    // Elimina espacios múltiples y añade uno entre cada carácter
    return value.split('').join(' ');
  }
}
