import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleTicketService } from '../data.service';
import { TicketsSevice } from '../data.service';
import { ArticulosService } from '../data.service';

@Component({
  selector: 'app-detalle-ticket-insert',
  templateUrl: './detalle-ticket-insert.component.html',
  styleUrls: ['./detalle-ticket-insert.component.css']
})
export class DetalleTicketInsertComponent {
  idTicket: number = 0;
  codigo: number=0 ;
  cantidad: number = 0;
  precioVenta: number = 0;
  usuario: number = 0;
  ComboCodigo:any;
  ComboTicket:any

  constructor(
    public dialogRef: MatDialogRef<DetalleTicketInsertComponent>,
    private TicketService :TicketsSevice,
    private articulosService:ArticulosService,
    private detalleticketService: DetalleTicketService
  ) {}



    ngOnInit(): void {
    this.TicketService.getTickets(0).subscribe((data: any) => {
      this.ComboTicket = data;
      console.log(this.ComboTicket)
    });
    this.articulosService.getArticulos().subscribe((data2: any) => {
      this.ComboCodigo = data2;
      console.log(this.ComboCodigo)
    });
  }    
  
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
