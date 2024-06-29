import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetalleTicketService, TicketsSevice, SucursalesService } from '../data.service';
import { DetalleTicketInsertComponent } from '../detalle-ticket-insert/detalle-ticket-insert.component';
import { SearchTicketsModel, tickets } from '../models/tickets.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-detalle-ticket',
  templateUrl: './detalle-ticket.component.html',
  styleUrls: ['./detalle-ticket.component.css']
})
export class DetalleTicketComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'Sucursal', 'Cliente', 'Vendedor', 'Fecha', 'Estatus', 'UsuarioActualiza', 'Acciones'];
  dataSource: MatTableDataSource<tickets>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  comboSucursal: any;
  idSucursal: number = 0;
  dateHandler: Date = new Date();
  dateHandler2: Date = new Date();
  fechaInicio: string = '';
  fechaFin: string = '';
  search: SearchTicketsModel = {
    IdSucursal: 0,
    FechaFin: '',
    FechaInicio: ''
  };

  constructor(
    private ticketsService: TicketsSevice,
    public dialog: MatDialog,
    public sucursaleService: SucursalesService,
  ) {
    this.dataSource = new MatTableDataSource<tickets>();
    this.dateHandler = new Date();
  }

  ngOnInit() {
    this.format();
    this.sucursaleService.getSucursales().subscribe((data2: any) => {
      this.comboSucursal = data2;
    });
    this.getTicket();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  format() {
    this.fechaInicio = this.formatDate(this.dateHandler);
    this.fechaFin = this.formatDate(this.dateHandler2);
  }

  formatDate(date: Date): string {
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  getTicket() {
    this.dataSource.filterPredicate = (data: tickets, filter: string) => {
      return data.Id.toString().includes(filter);
    };
    this.search.IdSucursal = this.idSucursal;
    this.search.FechaInicio = this.fechaInicio;
    this.search.FechaFin = this.fechaFin;
    this.ticketsService.getTickets(this.search).subscribe({
      next: (response) => {
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

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  verContTicket(Id: number) {
    this.dialog.open(DetalleTicketInsertComponent, {
      width: '900px',
      data: Id
    });
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    const columns = this.displayedColumns.filter(column => column !== 'Acciones').map(col => this.getColumnName(col));
    const rows = this.dataSource.filteredData.map(ticket => [
      ticket.Id,
      ticket.Sucursal,
      ticket.Cliente,
      ticket.Vendedor,
      this.formatDate(new Date(ticket.Fecha)),
      ticket.Estatus,
      ticket.Usuario
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows
    });

    doc.save('Tickets.pdf');
  }

  exportToExcel(): void {
    const data = this.dataSource.filteredData.map(ticket => ({
      'ID': ticket.Id,
      'Sucursal': ticket.Sucursal,
      'Cliente': ticket.Cliente,
      'Vendedor': ticket.Vendedor,
      'Fecha': this.formatDate(new Date(ticket.Fecha)),
      'Estatus': ticket.Estatus,
      'Usuario': ticket.Usuario
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Tickets': worksheet }, SheetNames: ['Tickets'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Tickets');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_export${EXCEL_EXTENSION}`);
  }

  private getColumnName(column: string): string {
    switch (column) {
      case 'Id': return 'ID';
      case 'Sucursal': return 'Sucursal';
      case 'Cliente': return 'Cliente';
      case 'Vendedor': return 'Vendedor';
      case 'Fecha': return 'Fecha';
      case 'Estatus': return 'Estatus';
      case 'UsuarioActualiza': return 'Usuario';
      default: return column;
    }
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
