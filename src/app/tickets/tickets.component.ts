import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ClientesService, TicketsSevice, DetalleTicketService, TiposMovService, ArticulosService, SucursalesService } from '../data.service';
import { tickets } from '../models/tickets.model';
import { TicketsUpdateComponent } from '../tickets-update/tickets-update.component';
import { DetalleTicket } from '../models/detalleTicket.model';


@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'IdTicket', 'Codigo', 'Articulo', 'Cantidad', 'PrecioVenta', 'Total', 'Usuario', 'Estatus', 'Acciones'];
  dataSource: MatTableDataSource<DetalleTicket>;

  // Tickets
  IdSucursal: number = 0;
  IdCliente: number = 0;
  IdVendedor: number = 0;
  Usuario: number = 0;

  // Detalle tickets
  idTicket: any;
  idArticulo: any;
  Codigo: any;
  Descripcion: any;
  cantidad: number = 0;
  precioVenta: number = 0;
  usuario: number = 0;
  ComboCodigo: any[] = [];
  ComboTicket: any;
  ComboSucursales: any;
  ComboTipoMov: any;
  filteredArticulos!: Observable<any[]>;
  ComboClientes: any[] = [];
  filteredClientes!: Observable<any[]>;
  filteredArticulosCod!: Observable<any[]>;
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
  CodigoControl = new FormControl('');
  CantidadControl = new FormControl('');
  PrecioControl = new FormControl('');
  IdUsuarioDetalleControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedArticulo: any;  // Declarar la propiedad selectedArticulo
  selectedCliente: any;  // Declarar la propiedad selectedCliente
  selectedCodigo:any ;

  constructor(
    private ticketsService: TicketsSevice,
    public dialog: MatDialog,
    private sucursalesService: SucursalesService,
    private articulosService: ArticulosService,
    private tiposMovService: TiposMovService,
    private detalleticketService: DetalleTicketService,
    private clientesService: ClientesService
  ) {
    this.dataSource = new MatTableDataSource<DetalleTicket>();
  }

  ngOnInit() {
    this.getData();
    this.filteredArticulos = this.IdArticuloControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterArticulos(value || ''))
    );

    this.filteredArticulosCod = this.CodigoControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterArticulosCod(value || ''))
    );

    this.IdArticuloControl.valueChanges.subscribe(value => {
      if (!value) {
        this.clearArticuloFields();
      }
    });

    this.CodigoControl.valueChanges.subscribe(value => {
      if (!value) {
        this.clearArticuloFields();
      }
    });

 /*    this.IdClienteControl.valueChanges.subscribe(value => {
      if (!value) {
        this.clearClienteFields();
      }
    }); */

    this.filteredClientes = this.IdClienteControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterClientes(value || ''))
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

    getData() {
      this.detalleticketService.getDetalleTicket(this.idTicket).subscribe({
        next: (data: any) => { this.ComboTicket = data;
          console.log(this.ComboTicket);},
        error: (error) => {console.error('Error al obtener detalle ticket:', error);
        }
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

      this.clientesService.getClientes().subscribe((data5: any) => {
        this.ComboClientes = data5;
        console.log(this.ComboClientes);
      });

      this.dataSource.filterPredicate = (data: DetalleTicket, filter: string) => {
        return data.Articulo.toString().includes(filter);
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
          this.dataSource.filterPredicate = (data: DetalleTicket, filter: string) => {
            return data.Articulo.toString().toLowerCase().includes(filter.toLowerCase());
          };
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
    console.log('IdCliente antes de insertar:', this.IdCliente);
    const nuevoAlmacen = {
      IdSucursal: this.IdSucursal,
      IdCliente: this.IdCliente,
      IdVendedor: this.IdVendedor,
      usuario: this.Usuario
    };
  
    this.ticketsService.insertarTickets(nuevoAlmacen).subscribe({
      next: (response) => {
        this.idTicket = response.response.data;
        this.getData(); // Llama a getData para obtener los detalles del ticket recién insertado
        this.toggleUI();
      },
      error: (error) => {
        console.error('Hubo un error al insertar el ticket', error);
      }
    });
  }

  insertarDetalleTicket() {
    console.log('27')
    const nuevoDetalleTicket = {
      idTicket: this.idTicket,
      codigo: this.Codigo,
      cantidad: this.cantidad,
      precioVenta: this.precioVenta,
      usuario: this.usuario
    };
    console.log(nuevoDetalleTicket)
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
      this.IdTicketControl.disable();
      this.IdArticuloControl.enable();
      this.CodigoControl.enable();
      this.PrecioControl.disable();
    } else {
      this.IdClienteControl.enable();
      this.IdSucursalControl.enable();
      this.IdUsusarioControl.enable();
      this.IdVendedorControl.enable();

      this.CantidadControl.disable();
      this.IdUsuarioDetalleControl.disable();
      this.IdTicketControl.disable();
      this.IdArticuloControl.disable();
      this.CodigoControl.disable();
      this.PrecioControl.disable();
    }
  }

  articuloSelected(event: any) {
    const articulo = event.option.value;
    console.log('Artículo seleccionado:', articulo);
    this.idArticulo = articulo.Id;
    this.Codigo = articulo.Codigo;  // Asegúrate de asignar el código del artículo aquí
    this.selectedCodigo = articulo;
    this.selectedArticulo = articulo;
    this.precioVenta = articulo.Precio;
    console.log('Id del artículo:', articulo.Id);
    console.log('Código del artículo:', articulo.Codigo);
    console.log('Precio del artículo:', articulo.Precio);
  }
  displayArticuloFn(articulo: any): string {
    return articulo ? articulo.Descripcion : '';
  }
  private _filterArticulos(value: any): any[] {
    const filterValue = (typeof value === 'string' ? value : '').toLowerCase();
    return this.ComboCodigo.filter(option => option.Descripcion.toLowerCase().includes(filterValue) || option.Codigo.toLowerCase().includes(filterValue));
  }
  clienteSelected(event: any) {
    const cliente = event.option.value;
    console.log(cliente);
    this.IdCliente = cliente.Id;
    console.log(cliente.Id);
    this.IdClienteControl.updateValueAndValidity();
    this.selectedCliente = cliente;
  }
  displayClienteFn(cliente: any): string {
    return cliente ? cliente.Nombre : '';
  }
  private _filterClientes(value: any): any[] {
    const filterValue = (typeof value === 'string' ? value : '').toLowerCase();
    return this.ComboClientes.filter(option => option.Nombre.toLowerCase().includes(filterValue));
  }

  articuloCodSelected(event: any) {
    const articuloCod = event.option.value;
    console.log('Artículo seleccionado:', articuloCod);
    this.selectedCodigo = articuloCod;
    this.selectedArticulo = articuloCod;
    this.Codigo = articuloCod.Codigo;
    this.precioVenta = articuloCod.Precio;
    console.log('Id del artículo:', articuloCod.Id);
    console.log('Código del artículo:', articuloCod.Codigo);
    console.log('Precio del artículo:', articuloCod.Precio);
  }
  
  displayArticuloCodFn(articulo: any): string {
    return articulo && articulo.Codigo ? articulo.Codigo : '';
  }
  
  private _filterArticulosCod(value: any): any[] {
    if (typeof value !== 'string') {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.ComboCodigo.filter(option => option.Codigo.toLowerCase().includes(filterValue));
  }

  private clearArticuloFields() {
    this.idArticulo = '';
    this.Codigo = '';
    this.selectedCodigo = null;
    this.selectedArticulo = null;
    this.precioVenta = 0;
  }
}
