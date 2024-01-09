import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from '../data.service';


@Component({
  selector: 'app-clientes-insert',
  templateUrl: './clientes-insert.component.html',
  styleUrls: ['./clientes-insert.component.css']
})
export class ClientesInsertComponent {
  nombreCliente: string = '';
  direccion: string = '';
  usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ClientesInsertComponent>,
    private clientesService: ClientesService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoCliente = {
      nombre: this.nombreCliente,
      direccion: this.direccion,  
      usuario: this.usuario  
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.clientesService.insertarClientes(nuevoCliente).subscribe({
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
