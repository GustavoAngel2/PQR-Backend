import { Component, OnInit } from '@angular/core';
import { RutasService } from '../data.service';
import{Rutas, deleteRutas} from '../models/rutas.model'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { RutasInsertComponent } from '../rutas-insert/rutas-insert.component';
import { RutasUpdateComponent } from '../rutas-update/rutas-update.component';


@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Nombre', 'Usuario', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Rutas>;

  constructor(private RutasService: RutasService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<Rutas>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Rutas, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.RutasService.getRutas().subscribe({
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
    const dialogRef = this.dialog.open(RutasInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarRutas(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.RutasService.deleteRutas(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((rutas: Rutas) => rutas.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  abrirEditarModal(rutas: Rutas) {
    const dialogRef = this.dialog.open(RutasUpdateComponent, {
      width: '550px',
      data: rutas // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}
