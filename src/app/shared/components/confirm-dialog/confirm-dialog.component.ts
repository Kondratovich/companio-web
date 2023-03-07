import { ChangeDetectionStrategy, Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: {
        cancelText: string,
        confirmText: string,
        message: string,
        title: string
    }, private mdDialogRef: MatDialogRef<ConfirmDialogComponent>) { }

    public cancel() {
        this.mdDialogRef.close(false);
    }

    public confirm() {
        this.mdDialogRef.close(true);
    }

    @HostListener("keydown.esc")
    public onEsc() {
        this.mdDialogRef.close(false);
    }
}