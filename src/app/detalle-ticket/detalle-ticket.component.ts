import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Existencia } from '../models/existencia.model';
import { DetalleTicketService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetalleTicketInsertComponent } from '../detalle-ticket-insert/detalle-ticket-insert.component';
import { DetalleTicketUpdateComponent } from '../detalle-ticket-update/detalle-ticket-update.component';
import { DetalleTicket } from '../models/detalleTicket.model';

@Component({
  selector: 'app-detalle-ticket',
  templateUrl: './detalle-ticket.component.html',
  styleUrls: ['./detalle-ticket.component.css']
})
export class DetalleTicketComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'IdTicket', 'Codigo', 'Articulo', 'Cantidad', 'PrecioVenta', 'Total', 'Usuario', 'Estatus', 'Acciones'];
  dataSource: MatTableDataSource<DetalleTicket>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private detalleticketService: DetalleTicketService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<DetalleTicket>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: DetalleTicket, filter: string) => {
      return data.idTicket.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.detalleticketService.getDetalleTicket(0).subscribe({
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
    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    const dialogRef = this.dialog.open(DetalleTicketInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarExistencia(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar esta existencia?')) {
      this.detalleticketService.deleteDetalleTicket(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((detalleticket: DetalleTicket) => detalleticket.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  abrirEditarModal(detalleticket: DetalleTicket) {
    const dialogRef = this.dialog.open(DetalleTicketUpdateComponent, {
      width: '550px',
      data: detalleticket // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}
