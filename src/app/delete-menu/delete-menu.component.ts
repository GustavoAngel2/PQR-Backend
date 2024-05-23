import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.css']
})

export class DeleteMenuComponent {
  elemento: string
  constructor(
    public dialogRef: MatDialogRef<DeleteMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.elemento = data
  }

  buttonAction(action: string): void {
    this.dialogRef.close(action);
  }


}

