import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-error-dialog',
    templateUrl: './error-dialog.component.html'
})
export class ErrorDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { errorMessage: string }) {}
}