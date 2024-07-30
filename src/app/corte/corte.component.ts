import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { corteGet,SearchCorteModel } from '../models/tickets.model';
import { currentUser,AuthService } from '../auth.service';
import { UsuarioService } from '../data.service';
import { TicketsSevice } from '../data.service';

@Component({
  selector: 'app-corte',
  templateUrl: './corte.component.html',
  styleUrls: ['./corte.component.css']
})
export class CorteComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'idMovimiento', 'idAlmacen', 'FechaMovimiento'];
  dataSource: MatTableDataSource<corteGet>;
  idVendedor:number = 1;
  dateHandler: Date = new Date();
  dateHandler2: Date = new Date();
  fechaInicio: string = '';
  fechaFin: string = '';
  ComboVendedor: any;
  events: string[] = [];
  day: number;
  month: number;
  year: number;
  search: SearchCorteModel = {
    vendedor: 1,
    FechaFin: '07-30-2024',
    FechaInicio: '07-29-204'
  };
  loggedInUser: currentUser = { Id: '', NombreUsuario: '' ,Rol:'', IdRol:''};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ticketService: TicketsSevice,
    private usuarioService: UsuarioService,
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {
    this.dataSource = new MatTableDataSource<corteGet>();
    this.dateHandler = new Date();
    this.day = this.dateHandler.getDate();
    this.month = this.dateHandler.getMonth();
    this.year = this.dateHandler.getFullYear();
    this.dateHandler2 = new Date();
  }

  ngOnInit() {
    this.loggedInUser = this.authService.getCurrentUser(); // Obtén el usuario logueado
    this.usuarioService.getUsuarios().subscribe((data2: any) => {
      this.ComboVendedor = data2.filter((vnd: any) => vnd.Rol == 'Vendedor');
      console.log(this.ComboVendedor);
    });
    this.setDate();
  }

  setDate() {
    this.fechaInicio = this.formatDate(this.dateHandler);
    this.fechaFin = this.formatDate(this.dateHandler2);
  }

  formatDate(date: Date): string {
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  getCorte() {
    this.dataSource.filterPredicate = (data: corteGet, filter: string) => {
      return data.Id.toString().includes(filter);
    };
    this.search.vendedor = this.idVendedor;
    this.search.FechaInicio = this.fechaInicio;
    this.search.FechaFin = this.fechaFin;

    console.log(this.search)
    this.ticketService.getCorte(this.search).subscribe({
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
