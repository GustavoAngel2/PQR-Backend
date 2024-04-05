import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Existencia } from '../models/existencia.model';
import { ExistenciasService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExistenciasInsertComponent } from '../existencias-insert/existencias-insert.component';
import { ExistenciasUpdateComponent } from '../existencias-update/existencias-update.component';

@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.css']
})
export class ExistenciasComponent  implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Codigo', 'Almacen', 'Cantidad', 'Usuario', 'FechaRegistro', 'FechaActualiza', 'Acciones'];
  dataSource: MatTableDataSource<Existencia>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private existenciasService: ExistenciasService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<Existencia>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Existencia, filter: string) => {
      return data.Almacen.toLowerCase().includes(filter)// Puedes añadir más campos si es necesario
    };
    this.existenciasService.getExistencias(0).subscribe({
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
    const dialogRef = this.dialog.open(ExistenciasInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarExistencia(id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar esta existencia?')) {
      this.existenciasService.deleteExistencias(id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((existencia: Existencia) => existencia.Id !== id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  abrirEditarModal(existencia: Existencia) {
    const dialogRef = this.dialog.open(ExistenciasUpdateComponent, {
      width: '550px',
      data: existencia // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}
