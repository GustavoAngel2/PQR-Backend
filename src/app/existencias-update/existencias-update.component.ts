import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateExistencia } from '../models/existencia.model';
import { ExistenciasService } from '../data.service';

@Component({
  selector: 'app-existencias-update',
  templateUrl: './existencias-update.component.html',
  styleUrls: ['./existencias-update.component.css']
})
export class ExistenciasUpdateComponent {
  existencia: UpdateExistencia;
  constructor(
    public dialogRef: MatDialogRef<ExistenciasUpdateComponent>,
    private existenciasService: ExistenciasService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateExistencia

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.existencia = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.existenciasService.updateExistencias(this.existencia).subscribe({
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
