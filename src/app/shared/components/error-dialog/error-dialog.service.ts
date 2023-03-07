import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(errorMessage: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { errorMessage }
    });
  }
}