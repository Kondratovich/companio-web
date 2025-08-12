import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  public data = inject(MAT_DIALOG_DATA) as {
    cancelText: string;
    confirmText: string;
    message: string;
    title: string;
  };
  private mdDialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

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