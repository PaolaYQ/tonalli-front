import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { InputComponent } from '../../../../../components/input/input.component';
import { QrCodeDialogComponent } from '../../../../../components/qr-code/qr-code.component';

@Component({
  selector: 'app-add-class-dialog',
  templateUrl: './add-class-dialog.component.html',
  styleUrls: ['./add-class-dialog.component.scss'],
  standalone: true,
  imports: [InputComponent, ButtonComponent],
})
export class AddClassDialogComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  constructor() {}

  ngOnInit() {}

  addClass() {
    this.dialog.open(QrCodeDialogComponent);
  }
}
