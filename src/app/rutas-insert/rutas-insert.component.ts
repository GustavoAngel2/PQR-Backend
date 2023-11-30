import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RutasService } from '../data.service';

@Component({
  selector: 'app-rutas-insert',
  templateUrl: './rutas-insert.component.html',
  styleUrls: ['./rutas-insert.component.css']
})
export class RutasInsertComponent {
  nombreRuta: string = '';
  direccion: string = '';
  usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<RutasInsertComponent>,
    private RutasService: RutasService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoRuta = {
      nombre: this.nombreRuta, 
      usuario: this.usuario  
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.RutasService.insertarRutas(nuevoRuta).subscribe({
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
