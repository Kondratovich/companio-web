import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  private dialog = inject(MatDialog);

  open(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMessage }
    });
  }
}