import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DetalleMovService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { movInventarioService } from '../data.service';
import { MovInventario } from '../models/movInventario.model';
import { MovInventarioInsertComponent } from '../mov-inventario-insert/mov-inventario-insert.component';
import { DetalleMoviemientoInsertComponent } from '../detalle-moviemiento-insert/detalle-moviemiento-insert.component';
@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
  styleUrls: ['./detalle-movimiento.component.css']
 })
export class DetalleMovimientoComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'idMovimiento', 'idAlmacen', 'FechaMovimiento','UsuarioActualiza','Acciones'];
  dataSource: MatTableDataSource<MovInventario>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private DetalleMovService: DetalleMovService, 
    public dialog:MatDialog,
    private movInventarioService:movInventarioService
  ) {
    this.dataSource = new MatTableDataSource<MovInventario>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.getMov()
  }

  getMov(){
    this.dataSource.filterPredicate = (data: MovInventario, filter: string) => {
      return data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.movInventarioService.getMovInventario().subscribe({
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

  verContMov(Id: number){
    this.dialog.open(DetalleMoviemientoInsertComponent, {
      width: '900px',
      data: Id
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

  abrirDeleteDialog(Id: number , Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes"){
        this.DetalleMovService.deleteDetalleMov(Id).subscribe({
          next: (response) => {
            this.getMov()
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el Detalle', error);
          }
        });
        this.getMov()
      }
    });
  }
}