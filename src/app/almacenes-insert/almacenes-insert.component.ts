import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlmacenesService } from '../data.service';

@Component({
  selector: 'app-almacenes-insert',
  templateUrl: './almacenes-insert.component.html',
  styleUrls: ['./almacenes-insert.component.css']
})
export class AlmacenesInsertComponent {
  nombreAlmacen: string = '';
  direccion: string = '';
  usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AlmacenesInsertComponent>,
    private almacenesService: AlmacenesService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoAlmacen = {
      nombre: this.nombreAlmacen,
      direccion: this.direccion,  
      usuario: this.usuario  
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.almacenesService.insertarAlmacenes(nuevoAlmacen).subscribe({
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

