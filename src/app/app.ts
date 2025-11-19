import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { LoaderService } from './services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSonnerToaster, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'tonalli-front';

  constructor(public loader: LoaderService) {}
}
