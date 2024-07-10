import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlmacenesService, DetalleMovService, movInventarioService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { MovInventario } from '../models/movInventario.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DetalleMoviemientoViewComponent } from '../detalle-movimiento-view/detalle-moviemiento-view.component';
import { SearchMovModel } from '../models/detalleMov.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService, currentUser } from '../auth.service'; // Asegúrate de tener este servicio o el que utilices para autenticación

@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
  styleUrls: ['./detalle-movimiento.component.css'],
})
export class DetalleMovimientoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'idMovimiento', 'idAlmacen', 'FechaMovimiento', 'UsuarioActualiza', 'Acciones'];
  dataSource: MatTableDataSource<MovInventario>;
  idAlmacen: number = 0;
  dateHandler: Date = new Date();
  dateHandler2: Date = new Date();
  fechaInicio: string = '';
  fechaFin: string = '';
  ComboAlmacen: any;
  events: string[] = [];
  day: number;
  month: number;
  year: number;
  search: SearchMovModel = {
    IdAlmacen: 0,
    FechaFin: '',
    FechaInicio: ''
  };
  loggedInUser: currentUser = { Id: '', NombreUsuario: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private DetalleMovService: DetalleMovService,
    public dialog: MatDialog,
    private movInventarioService: movInventarioService,
    private almacenesService: AlmacenesService,
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {
    this.dataSource = new MatTableDataSource<MovInventario>();
    this.dateHandler = new Date();
    this.day = this.dateHandler.getDate();
    this.month = this.dateHandler.getMonth();
    this.year = this.dateHandler.getFullYear();
    this.dateHandler2 = new Date();
  }

  ngOnInit() {
    this.loggedInUser = this.authService.getCurrentUser(); // Obtén el usuario logueado
    this.almacenesService.getAlmacenes().subscribe((data2: any) => {
      this.ComboAlmacen = data2;
      console.log(this.ComboAlmacen);
    });
    this.setDate();
    this.getMov();
  }

  setDate() {
    this.fechaInicio = this.formatDate(this.dateHandler);
    this.fechaFin = this.formatDate(this.dateHandler2);
  }

  formatDate(date: Date): string {
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  getMov() {
    this.dataSource.filterPredicate = (data: MovInventario, filter: string) => {
      return data.Id.toString().includes(filter);
    };
    this.search.IdAlmacen = this.idAlmacen;
    this.search.FechaInicio = this.fechaInicio;
    this.search.FechaFin = this.fechaFin;
    this.movInventarioService.getMovInventario(this.search).subscribe({
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

  verContMov(Id: number) {
    this.dialog.open(DetalleMoviemientoViewComponent, {
      width: '900px',
      data: Id
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

  abrirDeleteDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.DetalleMovService.deleteDetalleMov(Id).subscribe({
          next: (response) => {
            this.getMov();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el Detalle', error);
          }
        });
        this.getMov();
      }
    });
  }

  exportToPDF(): void {

    
    const doc = new jsPDF();
  
    doc.setFont("times", "normal");
    doc.setFontSize(12);


    // Agrega el nombre del usuario logueado en la parte superior del documento PDF
    doc.text(`Folio: ${this.loggedInUser.Id}`, 10, 10);
    doc.text(`Nombre: ${this.loggedInUser.NombreUsuario}`, 10, 20);
    doc.text(`Fecha: ${this.fechaInicio} - ${this.fechaFin}`, 10, 30);


       // Añade la imagen de la marca de agua (Base64)
    
       const imgWidth = 200;
       const imgHeight = 200;
       const pageWidth = doc.internal.pageSize.getWidth();
       const pageHeight = doc.internal.pageSize.getHeight();
       const xPos = (pageWidth - imgWidth) / 2;
       const yPos = (pageHeight - imgHeight) / 2;
     
       doc.addImage( 'PNG', xPos, yPos, imgWidth, imgHeight, '', 'SLOW');
     

    // Define las columnas y las filas de la tabla
    const columns = this.displayedColumns.filter(column => column !== 'Acciones').map(col => this.getColumnName(col));
    const rows = this.dataSource.filteredData.map(mov => [
      mov.Id,
      mov.IdTipoMov,
      mov.IdAlmacen,
      this.formatDate(new Date(mov.fechaMovimiento)),
      mov.Usuario
    ]);
  
    // Agrega un espacio antes de la tabla
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 50 // Ajusta este valor para agregar espacio entre el texto del usuario y la tabla
    });
  
  
    doc.save('Movimientos.pdf');
  }

  private getColumnName(column: string): string {
    switch (column) {
      case 'Id': return 'ID';
      case 'idMovimiento': return 'ID Movimiento';
      case 'idAlmacen': return 'ID Almacén';
      case 'FechaMovimiento': return 'Fecha Movimiento';
      case 'UsuarioActualiza': return 'Usuario';
      default: return column;
    }
  }
}
