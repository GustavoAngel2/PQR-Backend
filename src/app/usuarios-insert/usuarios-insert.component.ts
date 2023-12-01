import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioSevice } from '../data.service';

@Component({
  selector: 'app-usuarios-insert',
  templateUrl: './usuarios-insert.component.html',
  styleUrls: ['./usuarios-insert.component.css']
})
export class UsuariosInsertComponent {
  nombre: string = '';
  contrasena: string = '';
  rol: number = 0;
  usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<UsuariosInsertComponent>,
    private usuarioService: UsuarioSevice
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoUsuario = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      rol: this.rol,  
      usuario: this.usuario  
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.usuarioService.insertarUsuario(nuevoUsuario).subscribe({
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

