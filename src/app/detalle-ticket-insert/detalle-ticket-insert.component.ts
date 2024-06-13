import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SearchTicketsModel } from '../models/tickets.model';
import { DetalleTicketService, TicketsSevice } from '../data.service';
import { DetalleTicket } from '../models/detalleTicket.model';

@Component({
  selector: 'app-detalle-ticket-insert',
  templateUrl: './detalle-ticket-insert.component.html',
  styleUrls: ['./detalle-ticket-insert.component.css']
})
export class DetalleTicketInsertComponent {
  dataSource: MatTableDataSource<DetalleTicket>;
  id: number = 0;
  displayedColumns: string[] = ['Id', 'idTicket', 'codigo','Articulo' , 'cantidad', 'precioVenta', 'Total', 'TotalTicket', 'usuario', 'Estatus'];

  constructor(
    public dialogRef: MatDialogRef<DetalleTicketInsertComponent>,
    public dialog: MatDialog,
    public detalleTicketService: DetalleTicketService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data
    this.dataSource = new MatTableDataSource<DetalleTicket>();
  }

  ngOnInit(): void {
    this.detalleTicketService.getDetalleTicket(this.id).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response)&&response.length>0) {
          this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
        } else {
          console.log('no contiene datos');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }    
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
