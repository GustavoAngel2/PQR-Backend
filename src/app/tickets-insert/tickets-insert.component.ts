import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TicketsSevice } from '../data.service';

@Component({
  selector: 'app-tickets-insert',
  templateUrl: './tickets-insert.component.html',
  styleUrls: ['./tickets-insert.component.css']
})
export class TicketsInsertComponent {
  IdSucursal: number = 0;
  IdCliente: number = 0;
  IdVendedor: number = 0;
  Usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<TicketsInsertComponent>,
    private ticketServices: TicketsSevice
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoAlmacen = {
      IdSucursal: this.IdSucursal,
      IdCliente: this.IdCliente,
      IdVendedor: this.IdVendedor,  
      usuario: this.Usuario, 
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.ticketServices.insertarTickets(nuevoAlmacen).subscribe({
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

