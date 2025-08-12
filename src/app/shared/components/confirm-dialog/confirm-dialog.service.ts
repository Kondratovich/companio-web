import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private dialog = inject(MatDialog);
  dialogRef!: MatDialogRef<ConfirmDialogComponent>;

  public open(options: ConfirmDialogOptions) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }

  public confirmed(): Observable<undefined> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => { return res; }));
  }
}

interface ConfirmDialogOptions {
  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
}