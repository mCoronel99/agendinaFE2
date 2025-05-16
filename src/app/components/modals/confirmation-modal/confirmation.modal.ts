import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation.modal.html',
  styleUrls: ['./confirmation.modal.css'],
})
export class ConfirmationModal {

  constructor(private dialogRef: MatDialogRef<ConfirmationModal>) {}

  confirm() {
    this.dialogRef.close(true);
  }

  annulla() {
    this.dialogRef.close();
  }
}
