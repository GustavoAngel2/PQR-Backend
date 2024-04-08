import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateAlmacen } from '../models/almacen.model';
import { AlmacenesService } from '../data.service';

@Component({
  selector: 'app-almacenes-update',
  templateUrl: './almacenes-update.component.html',
  styleUrls: ['./almacenes-update.component.css']
})
export class AlmacenesUpdateComponent implements OnInit {
  almacen: UpdateAlmacen;
  constructor(
    public dialogRef: MatDialogRef<AlmacenesUpdateComponent>,
    private almacenesService: AlmacenesService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateAlmacen

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.almacen = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.almacenesService.updateAlmacenes(this.almacen).subscribe({
      next: (response) => {
        this.dialogRef.close("reload");
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}




