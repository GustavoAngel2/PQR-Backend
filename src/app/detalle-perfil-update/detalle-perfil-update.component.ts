import { UpdateDetallePerfil } from '../models/detallePerfil.model';
import { DetallePerfilService } from '../data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-perfil-update',
  templateUrl: './detalle-perfil-update.component.html',
  styleUrls: ['./detalle-perfil-update.component.css']
})
export class DetallePerfilUpdateComponent implements OnInit{
  DetallePerfil: UpdateDetallePerfil;
  constructor(
    public dialogRef: MatDialogRef<DetallePerfilUpdateComponent>,
    private DetallePerfilService: DetallePerfilService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDetallePerfil

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.DetallePerfil = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.DetallePerfilService.updateDetallePerfil(this.DetallePerfil).subscribe({
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

