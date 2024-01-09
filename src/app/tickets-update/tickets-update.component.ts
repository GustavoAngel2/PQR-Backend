import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateTickets } from '../models/tickets.model';
import { TicketsSevice } from '../data.service';

@Component({
  selector: 'app-tickets-update',
  templateUrl: './tickets-update.component.html',
  styleUrls: ['./tickets-update.component.css']
})
export class TicketsUpdateComponent {
  tickets: UpdateTickets;
  constructor(
    public dialogRef: MatDialogRef<TicketsUpdateComponent>,
    private ticketsService: TicketsSevice,
    @Inject(MAT_DIALOG_DATA) public data: UpdateTickets

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.tickets = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.ticketsService.updateTickets(this.tickets).subscribe({
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
