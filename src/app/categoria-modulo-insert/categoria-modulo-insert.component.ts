import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriaModuloService } from '../data.service';

@Component({
  selector: 'app-categoria-modulo-insert',
  templateUrl: './categoria-modulo-insert.component.html',
  styleUrls: ['./categoria-modulo-insert.component.css']
})
export class CategoriaModuloInsertComponent {
  nombreCatModulo: string = '';
  descripcion: string = '';
  usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<CategoriaModuloInsertComponent>,
    private categoriaModuloService: CategoriaModuloService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoCatModulo = {
      nombre: this.nombreCatModulo,
      descripcion: this.descripcion,  
      usuario: this.usuario  
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.categoriaModuloService.insertCategoriaModulo(nuevoCatModulo).subscribe({
      next: (response) => {
        // Puedes cerrar la modal y/o actualizar la tabla aquí si es necesario
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar la categoria del modulo', error);
      }
    });
  }
}
