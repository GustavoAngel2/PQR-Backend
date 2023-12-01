import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleTicketService } from '../data.service';

@Component({
  selector: 'app-detalle-ticket-insert',
  templateUrl: './detalle-ticket-insert.component.html',
  styleUrls: ['./detalle-ticket-insert.component.css']
})
export class DetalleTicketInsertComponent {
  idTicket: number = 0;
  codigo: string = '' ;
  cantidad: number = 0;
  precioVenta: number = 0;
  usuario: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DetalleTicketInsertComponent>,
    private detalleticketService: DetalleTicketService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoDetalleTicket = {
      idTicket: this.idTicket,
      codigo: this.codigo,
      cantidad: this.cantidad,
      precioVenta: this.precioVenta,
      usuario: this.usuario
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.detalleticketService.insertDetalleTicket(nuevoDetalleTicket).subscribe({
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
