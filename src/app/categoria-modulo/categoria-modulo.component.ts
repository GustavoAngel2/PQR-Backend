import { Component, OnInit } from '@angular/core';
import { CategoriaModuloService } from '../data.service';
import { CategoriaModulo } from '../models/categoriaModulo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaModuloInsertComponent } from '../categoria-modulo-insert/categoria-modulo-insert.component';
import { CategoriaModuloUpdateComponent } from '../categoria-modulo-update/categoria-modulo-update.component';

@Component({
  selector: 'app-categoria-modulo',
  templateUrl: './categoria-modulo.component.html',
  styleUrls: ['./categoria-modulo.component.css']
})
export class CategoriaModuloComponent  implements OnInit{
  displayedColumns: string[] = ['Id', 'Nombre', 'Descripcion', 'FechaRegistro', 'FechaActualiza','Usuario','Acciones'];
  dataSource: MatTableDataSource<CategoriaModulo>;

  constructor(private CategoriaModuloService: CategoriaModuloService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<CategoriaModulo>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: CategoriaModulo, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.CategoriaModuloService.getCategoriaModulo().subscribe({
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
    const dialogRef = this.dialog.open(CategoriaModuloInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarCategoriaModulo(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar esta categoria de modulo?')) {
      this.CategoriaModuloService.deleteCategoriaModulo(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((catmodulo: CategoriaModulo) => catmodulo.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar la categoria del modulo', error);
        }
      });
    }
  }
  abrirEditarModal(catmodulo: CategoriaModulo) {
    const dialogRef = this.dialog.open(CategoriaModuloUpdateComponent, {
      width: '550px',
      data: catmodulo // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}
