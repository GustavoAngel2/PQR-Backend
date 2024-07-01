import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent {
  elemento: string
  constructor(
    public dialogRef: MatDialogRef<DialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.elemento = data
  }

  buttonAction(action: string): void {
    this.dialogRef.close(action);
  }
}