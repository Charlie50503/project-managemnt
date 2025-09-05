import { PrimarySpinnerService } from './commons/shared/spinner/primary-spinner/primary-spinner.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private primarySpinnerService: PrimarySpinnerService) {}
  isLoading$ = this.primarySpinnerService.isLoading$();
  ngOnInit(): void {}
}
