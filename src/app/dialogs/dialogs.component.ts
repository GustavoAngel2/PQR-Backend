import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { dialogParameters } from '../models/dialog.model';


@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit{
  elemento: dialogParameters
  constructor(
    public dialogRef: MatDialogRef<DialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogParameters
  ) {
    this.elemento = {...data}
  }

  buttonAction(action: string): void {
    console.log(this.elemento)
    this.dialogRef.close(action);
  }

  ngOnInit(): void {
    console.log(this.elemento)
  }
}