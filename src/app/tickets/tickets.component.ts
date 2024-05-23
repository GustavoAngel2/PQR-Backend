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

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Sucursal', 'Cliente', 'Vendedor','Usuario', 'Fecha','Estatus','Acciones'];
  dataSource: MatTableDataSource<tickets>;
  //tickets
  IdSucursal: number = 0;
  IdCliente: number = 0;
  IdVendedor: number = 0;
  Usuario: number = 0;
  //detalle-tickets
  idTicket: any;
  codigo: number=0 ;
  cantidad: number = 0;
  precioVenta: number = 0;
  usuario: number = 0;
  ComboCodigo:any;
  ComboTicket:any;
  ComboSucursales:any;
  ComboTipoMov: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private TicketsService: TicketsSevice,
    public dialog:MatDialog,
    private TicketService :TicketsSevice,
    private SucursalesService: SucursalesService,
    private articulosService:ArticulosService,
    private TiposMovService: TiposMovService,
    private detalleticketService: DetalleTicketService
  ) {
    this.dataSource = new MatTableDataSource<tickets>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.getData()
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

  getData(){
    this.TicketService.getTickets(0).subscribe((data: any) => {
      this.ComboTicket = data;
      console.log(this.ComboTicket)
    });
    this.articulosService.getArticulos().subscribe((data2: any) => {
      this.ComboCodigo = data2;
      console.log(this.ComboCodigo)
    });
    this.SucursalesService.getSucursales().subscribe((data3: any) =>{
      this.ComboSucursales =data3;
      console.log(this.ComboSucursales)
    });
    this.TiposMovService.getTiposMov().subscribe((data4: any)=>{
      this.ComboTipoMov =data4;
      console.log(this.ComboTipoMov)
    });
    this.dataSource.filterPredicate = (data: tickets, filter: string) => {
      return data.IdSucursal.toString().includes(filter); // Puedes añadir más campos si es necesario
    }

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

  insertarTicket(): void {
    const nuevoAlmacen = {
      IdSucursal: this.IdSucursal,
      IdCliente: this.IdCliente,
      IdVendedor: this.IdVendedor,  
      usuario: this.Usuario, 
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.TicketsService.insertarTickets(nuevoAlmacen).subscribe({
      next: (response) => {
        this.idTicket = response.response.data;
        this.getData();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  insertarDetalleTicket(){
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
        this.getData();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }
}


