import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonasService } from '../data.service';
@Component({
  selector: 'app-personas-insert',
  templateUrl: './personas-insert.component.html',
  styleUrls: ['./personas-insert.component.css']
})
export class PersonasInsertComponent {
  nombre: string = '';
  ApPaterno : string = '';
  ApMaterno : string = '';
  direccion: string = '';
  usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<PersonasInsertComponent>,
    private PersonasService: PersonasService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevaPersona = {
      nombre: this.nombre,
      ApPaterno:this.ApPaterno,
      ApMaterno:this.ApMaterno,
      direccion: this.direccion,  
      usuario: this.usuario  
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.PersonasService.insertarClientes(nuevaPersona).subscribe({
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