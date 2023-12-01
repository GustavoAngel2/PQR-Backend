import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DetalleTicketService } from '../data.service';
import { UpdateDetalleTicket } from '../models/detalleTicket.model';

@Component({
  selector: 'app-detalle-ticket-update',
  templateUrl: './detalle-ticket-update.component.html',
  styleUrls: ['./detalle-ticket-update.component.css']
})
export class DetalleTicketUpdateComponent {
  detalleticket: UpdateDetalleTicket;
  constructor(
    public dialogRef: MatDialogRef<DetalleTicketUpdateComponent>,
    private detalleticketService: DetalleTicketService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDetalleTicket

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.detalleticket = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.detalleticketService.updateDetalleTicket(this.detalleticket).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
