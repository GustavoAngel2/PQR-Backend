import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { movInventarioService } from '../data.service';

@Component({
  selector: 'app-mov-inventario-insert',
  templateUrl: './mov-inventario-insert.component.html',
  styleUrls: ['./mov-inventario-insert.component.css']
})
export class MovInventarioInsertComponent {
  idTipoMov: number = 0;
  idAlmacen: number = 0 ;
  usuarioActualiza: number = 0;

  constructor(
    public dialogRef: MatDialogRef<MovInventarioInsertComponent>,
    private movinventarioService: movInventarioService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoMovInv = {
      idTipoMov: this.idTipoMov,
      idAlmacen: this.idAlmacen,  
      usuarioActualiza: this.usuarioActualiza
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.movinventarioService.insertMovInventario(nuevoMovInv).subscribe({
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
