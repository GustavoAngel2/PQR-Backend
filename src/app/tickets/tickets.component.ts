import { Component, OnInit } from '@angular/core';
import { TicketsSevice } from '../data.service';
import { tickets } from '../models/tickets.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TicketsInsertComponent } from '../tickets-insert/tickets-insert.component';
import { TicketsUpdateComponent } from '../tickets-update/tickets-update.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'Sucursal', 'Cliente', 'Vendedor','Usuario', 'Fecha','Estatus','Acciones'];
  dataSource: MatTableDataSource<tickets>;

  constructor(private TicketsService: TicketsSevice, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<tickets>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: tickets, filter: string) => {
      return data.IdSucursal.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.TicketsService.getTickets(0).subscribe({
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
  // Método para realizar el filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  abrirInsertarModal() {
    const dialogRef = this.dialog.open(TicketsInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarAlmacen(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.TicketsService.deleteTickets(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((ticket: tickets) => ticket.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  abrirEditarModal(ticket: tickets) {
    const dialogRef = this.dialog.open(TicketsUpdateComponent, {
      width: '550px',
      data: ticket // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}


