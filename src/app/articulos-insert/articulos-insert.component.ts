import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ArticulosService } from '../data.service';

@Component({
  selector: 'app-articulos-insert',
  templateUrl: './articulos-insert.component.html',
  styleUrls: ['./articulos-insert.component.css']
})
export class ArticulosInsertComponent {
  descripcion: string = '';
  codigo: string = '';
  um: string = '';
  costo: number = 0;
  precio: number = 0;
  usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ArticulosInsertComponent>,
    private articulosService: ArticulosService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoArticulo = {
      descripcion: this.descripcion,
      codigo: this.codigo,  
      UM: this.um,
      costo: this.costo,  
      precio: this.precio,  
      Usuario: this.usuario
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.articulosService.insertarArticulos(nuevoArticulo).subscribe({
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