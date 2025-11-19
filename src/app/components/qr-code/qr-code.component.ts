import { Component, inject, Inject, OnInit } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { LetterSpacingPipe } from '../../pipes/letter-spacing.pipe';
import { ButtonComponent } from '../button/button.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CodeClass } from '../../types/class.types';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  standalone: true,
  imports: [QRCodeComponent, ButtonComponent, LetterSpacingPipe],
})
export class QrCodeDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<QrCodeDialogComponent>);

  code = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: CodeClass) {}

  ngOnInit() {
    this.code = this.data.codigoClase;
  }

  close() {
    this.dialogRef.close(undefined);
  }
}
