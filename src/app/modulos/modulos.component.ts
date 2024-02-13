import { Component, OnInit } from '@angular/core';
import { AlmacenesService, ModulosService } from '../data.service';
import { Modulo } from '../models/modulo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModulosInsertComponent } from '../modulos-insert/modulos-insert.component';
import { ModulosUpdateComponent } from '../modulos-update/modulos-update.component';

@Component({
  selector: 'app-almacenes',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
 })
export class ModulosComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'NombreModulo', 'CategoriaModulo', 'Usuario', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Modulo>;

  constructor(private ModulosService: ModulosService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<Modulo>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Modulo, filter: string) => {
      return data.NombreModulo.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.ModulosService.getModulos().subscribe({
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
    const dialogRef = this.dialog.open(ModulosInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarModulo(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este modulo?')) {
      this.ModulosService.deleteModulos(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((modulo: Modulo) => modulo.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el modulo', error);
        }
      });
    }
  }
  abrirEditarModal(modulo: Modulo) {
    const dialogRef = this.dialog.open(ModulosUpdateComponent, {
      width: '250px',
      data: modulo // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}