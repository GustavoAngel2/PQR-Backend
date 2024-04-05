import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlmacenesService } from '../data.service';
import { Almacen } from '../models/almacen.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlmacenesInsertComponent } from '../almacenes-insert/almacenes-insert.component';
import { AlmacenesUpdateComponent } from '../almacenes-update/almacenes-update.component';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.css']
})
export class AlmacenesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion', 'Usuario', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Almacen>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private AlmacenesService: AlmacenesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Almacen>();
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Almacen, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter);
    };
    this.AlmacenesService.getAlmacenes().subscribe({
      next: (response) => {
        if (response && Array.isArray(response) && response.length > 0) {
          this.dataSource.data = response;
        } else {
          console.log('No contiene datos');
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

  abrirInsertarModal() {
    const dialogRef = this.dialog.open(AlmacenesInsertComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }

  eliminarAlmacen(Id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.AlmacenesService.deleteAlmacenes(Id).subscribe({
        next: (response) => {
          this.dataSource.data = this.dataSource.data.filter((almacen: Almacen) => almacen.Id !== Id);
        },
        error: (error) => {
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }

  abrirEditarModal(almacen: Almacen) {
    const dialogRef = this.dialog.open(AlmacenesUpdateComponent, {
      width: '550px',
      data: almacen
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Realizar acciones si es necesario
      }
    });
  }
}
