import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TicketsSevice } from '../data.service';
import { DetalleTicketService } from '../data.service';
import { TiposMovService } from '../data.service';
import { tickets } from '../models/tickets.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TicketsUpdateComponent } from '../tickets-update/tickets-update.component';
import { ArticulosService } from '../data.service';
import { SucursalesService } from '../data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'Sucursal', 'Cliente', 'Vendedor', 'Usuario', 'Fecha', 'Estatus', 'Acciones'];
  dataSource: MatTableDataSource<tickets>;

  // Tickets
  IdSucursal: number = 0;
  IdCliente: number = 0;
  IdVendedor: number = 0;
  Usuario: number = 0;

  // Detalle tickets
  idTicket: any;
  codigo: number = 0;
  cantidad: number = 0;
  precioVenta: number = 0;
  usuario: number = 0;
  ComboCodigo: any[] = [];
  ComboTicket: any;
  ComboSucursales: any;
  ComboTipoMov: any;
  filteredArticulos!: Observable<any[]>;
  isOnStepOne = true;
  isOnStepTwo = false;

  // New ticket
  IdSucursalControl = new FormControl('');
  IdClienteControl = new FormControl('');
  IdVendedorControl = new FormControl('');
  IdUsusarioControl = new FormControl('');

  // New ticket detail
  IdTicketControl = new FormControl('');
  IdArticuloControl = new FormControl('');
  CantidadControl = new FormControl('');
  PrecioControl = new FormControl('');
  IdUsuarioDetalleControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ticketsService: TicketsSevice,
    public dialog: MatDialog,
    private ticketService: TicketsSevice,
    private sucursalesService: SucursalesService,
    private articulosService: ArticulosService,
    private tiposMovService: TiposMovService,
    private detalleticketService: DetalleTicketService
  ) {
    this.dataSource = new MatTableDataSource<tickets>();
  }

  ngOnInit() {
    this.getData();
    this.filteredArticulos = this.IdArticuloControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterArticulos(value))
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.refreshUI();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private _filterArticulos(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.ComboCodigo.filter(option => option.Descripcion.toLowerCase().includes(filterValue));
  }

  getData() {
    this.ticketService.getTickets(0).subscribe((data: any) => {
      this.ComboTicket = data;
      console.log(this.ComboTicket);
    });
    this.articulosService.getArticulos().subscribe((data2: any) => {
      this.ComboCodigo = data2;
      console.log(this.ComboCodigo);
    });
    this.sucursalesService.getSucursales().subscribe((data3: any) => {
      this.ComboSucursales = data3;
      console.log(this.ComboSucursales);
    });
    this.tiposMovService.getTiposMov().subscribe((data4: any) => {
      this.ComboTipoMov = data4;
      console.log(this.ComboTipoMov);
    });

    this.dataSource.filterPredicate = (data: tickets, filter: string) => {
      return data.IdSucursal.toString().includes(filter);
    };

    this.ticketsService.getTickets(0).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        if (response && Array.isArray(response) && response.length > 0) {
          this.dataSource.data = response;
        } else {
          console.log('no contiene datos');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  eliminarAlmacen(Id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.ticketsService.deleteTickets(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((ticket: tickets) => ticket.Id !== Id);
        },
        error: (error) => {
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }

  abrirEditarModal(ticket: tickets) {
    const dialogRef = this.dialog.open(TicketsUpdateComponent, {
      width: '550px',
      data: ticket
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  insertarTicket(): void {
    const nuevoAlmacen = {
      IdSucursal: this.IdSucursal,
      IdCliente: this.IdCliente,
      IdVendedor: this.IdVendedor,
      usuario: this.Usuario
    };

    this.ticketsService.insertarTickets(nuevoAlmacen).subscribe({
      next: (response) => {
        this.idTicket = response.response.data;
        this.getData();
        this.toggleUI();
      },
      error: (error) => {
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  insertarDetalleTicket() {
    const nuevoDetalleTicket = {
      idTicket: this.idTicket,
      codigo: this.codigo,
      cantidad: this.cantidad,
      precioVenta: this.precioVenta,
      usuario: this.usuario
    };

    this.detalleticketService.insertDetalleTicket(nuevoDetalleTicket).subscribe({
      next: (response) => {
        this.getData();
      },
      error: (error) => {
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  toggleUI() {
    this.isOnStepTwo = !this.isOnStepTwo;
    this.isOnStepOne = !this.isOnStepOne;
    this.refreshUI();
  }

  refreshUI() {
    if (this.isOnStepTwo) {
      this.IdClienteControl.disable();
      this.IdSucursalControl.disable();
      this.IdUsusarioControl.disable();
      this.IdVendedorControl.disable();

      this.CantidadControl.enable();
      this.IdUsuarioDetalleControl.enable();
      this.IdTicketControl.enable();
      this.IdArticuloControl.enable();
      this.PrecioControl.enable();
    } else {
      this.IdClienteControl.enable();
      this.IdSucursalControl.enable();
      this.IdUsusarioControl.enable();
      this.IdVendedorControl.enable();

      this.CantidadControl.disable();
      this.IdUsuarioDetalleControl.disable();
      this.IdTicketControl.disable();
      this.IdArticuloControl.disable();
      this.PrecioControl.disable();
    }
  }
}
