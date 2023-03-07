import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {

    dialogRef!: MatDialogRef<ConfirmDialogComponent>;

    constructor(private dialog: MatDialog) { }

    public open(options: any) {
        this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: options.title,
                message: options.message,
                cancelText: options.cancelText,
                confirmText: options.confirmText
            }
        });
    }

    public confirmed(): Observable<any> {
        return this.dialogRef.afterClosed().pipe(take(1), map(res => { return res; }));
    }
}