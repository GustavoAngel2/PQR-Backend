import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Existencia } from '../models/existencia.model';
import { DetalleTicketService, TicketsSevice } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetalleTicketInsertComponent } from '../detalle-ticket-insert/detalle-ticket-insert.component';
import { DetalleTicketUpdateComponent } from '../detalle-ticket-update/detalle-ticket-update.component';
import { DetalleTicket } from '../models/detalleTicket.model';
import { SearchTicketsModel, tickets } from '../models/tickets.model';
import { SucursalesService } from '../data.service';

@Component({
  selector: 'app-detalle-ticket',
  templateUrl: './detalle-ticket.component.html',
  styleUrls: ['./detalle-ticket.component.css']
})
export class DetalleTicketComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Sucursal', 'Codigo', 'Articulo', 'Cantidad', 'PrecioVenta', 'Total', 'Usuario', 'Estatus', 'Acciones'];
  dataSource: MatTableDataSource<tickets>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  comboSucursal:any;
  idSucursal: number = 0;
  dateHandler: Date = new Date();
  dateHandler2: Date = new Date();
  fechaInicio: string = '';
  fechaFin: string = '';
  ComboAlmacen: any;
  events: string[] = [];
  day: number;
  month: number;
  year: number;
  search: SearchTicketsModel = {
    IdSucursal : 0,
    FechaFin : '',
    FechaInicio : ''
  };



  constructor(
    private tiketsService: TicketsSevice, 
    public dialog:MatDialog,
    public sucursaleService:SucursalesService,
  ) 
    {
    this.dataSource = new MatTableDataSource<tickets>(); // Inicializa dataSource como una instancia de MatTableDataSource
    this.dataSource = new MatTableDataSource<tickets>(); // Inicializa dataSource como una instancia de MatTableDataSource
    this.dateHandler = new Date();
    this.day = this.dateHandler.getDate();
    this.month = this.dateHandler.getMonth(); // Sumamos 1 porque los meses empiezan en 0
    this.year = this.dateHandler.getFullYear();
    this.dateHandler2 = new Date();
  }

  ngOnInit() {
    this.sucursaleService.getSucursales().subscribe((data2: any) => {
      this.comboSucursal = data2;
      console.log(this.comboSucursal);
    });
    this.getTicket();
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
/*   eliminarExistencia(Id: number) {
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
  } */
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

  format() {
    this.fechaInicio = this.formatDate(this.dateHandler);
    this.fechaFin = this.formatDate(this.dateHandler2);
    console.log(this.fechaInicio + " - " + this.fechaFin);
  }

  formatDate(date: Date): string {
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1); // Sumamos 1 porque los meses empiezan en 0
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  
  getTicket() {
    this.dataSource.filterPredicate = (data: tickets, filter: string) => {
      return data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.search.IdSucursal = this.idSucursal
    this.search.FechaInicio = this.fechaInicio
    this.search.FechaFin = this.fechaFin
    this.tiketsService.getTickets(this.search).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        if (response && Array.isArray(response) && response.length > 0) {
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
}
