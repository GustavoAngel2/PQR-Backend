import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateDetalleMov } from '../models/detalleMov.model';
import { DetalleMovService } from '../data.service';


@Component({
  selector: 'app-detalle-movimiento-update',
  templateUrl: './detalle-movimiento-update.component.html',
  styleUrls: ['./detalle-movimiento-update.component.css']
})
export class DetalleMovimientoUpdateComponent implements OnInit{
  DetalleMov: UpdateDetalleMov;
  constructor(
    public dialogRef: MatDialogRef<DetalleMovimientoUpdateComponent>,
    private detalleMovService: DetalleMovService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDetalleMov

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.DetalleMov = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.detalleMovService.updateDetalleMov(this.DetalleMov).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

