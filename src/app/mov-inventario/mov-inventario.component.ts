import { Component, OnInit } from '@angular/core';
import { MovInventario } from '../models/movInventario.model';

import { movInventarioService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MovInventarioInsertComponent } from '../mov-inventario-insert/mov-inventario-insert.component';
import { MovInventarioUpdateComponent } from '../mov-inventario-update/mov-inventario-update.component';

@Component({
  selector: 'app-mov-inventario',
  templateUrl: './mov-inventario.component.html',
  styleUrls: ['./mov-inventario.component.css']
})
export class MovInventarioComponent {
  displayedColumns: string[] = ['Id', 'IdTipoMov', 'IdAlmacen', 'fechaMovimiento', 'Usuario', 'FechaActualiza', 'Acciones'];
  dataSource: MatTableDataSource<MovInventario>;

  constructor(private movinventarioService: movInventarioService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<MovInventario>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: MovInventario, filter: string) => {
      return data.IdTipoMov.toLowerCase().includes(filter)// Puedes añadir más campos si es necesario
    };
    this.movinventarioService.getMovInventario().subscribe({
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
  // Método para realizar el filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  abrirInsertarModal() {
    const dialogRef = this.dialog.open(MovInventarioInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarExistencia(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar esta existencia?')) {
      this.movinventarioService.deleteMovInventario(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((movinventario: MovInventario) => movinventario.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  abrirEditarModal(movinventario: MovInventario) {
    const dialogRef = this.dialog.open(MovInventarioUpdateComponent, {
      width: '550px',
      data: movinventario // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}
