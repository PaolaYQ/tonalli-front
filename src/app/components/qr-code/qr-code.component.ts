import { Component, OnInit } from "@angular/core";
import { QRCodeComponent } from 'angularx-qrcode';
import { LetterSpacingPipe } from "../../pipes/letter-spacing.pipe";
import { ButtonComponent } from "../button/button.component";


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  standalone: true,
  imports: [QRCodeComponent,ButtonComponent, LetterSpacingPipe]
})
export class QrCodeDialogComponent implements OnInit {


  code = "1A3BF4"

  constructor() { }

  ngOnInit() {
  }

}
