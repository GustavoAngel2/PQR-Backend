import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExistenciasService } from '../data.service';

@Component({
  selector: 'app-existencias-insert',
  templateUrl: './existencias-insert.component.html',
  styleUrls: ['./existencias-insert.component.css']
})
export class ExistenciasInsertComponent {
  codigo: string = '';
  almacen: number = 0 ;
  cantidad: number = 0;
  usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ExistenciasInsertComponent>,
    private existenciasService: ExistenciasService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoExistencia = {
      codigo: this.codigo,
      almacen: this.almacen,  
      cantidad: this.cantidad,
      usuario: this.usuario
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.existenciasService.insertExistencias(nuevoExistencia).subscribe({
      next: (response) => {
        // Puedes cerrar la modal y/o actualizar la tabla aquí si es necesario
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }
}
