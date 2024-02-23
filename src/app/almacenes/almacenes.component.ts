import { Component, OnInit } from '@angular/core';
import { AlmacenesService } from '../data.service';
import { Almacen } from '../models/almacen.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AlmacenesInsertComponent } from '../almacenes-insert/almacenes-insert.component';
import { AlmacenesUpdateComponent } from '../almacenes-update/almacenes-update.component';


@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.css']
 })
export class AlmacenesComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion', 'Usuario', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Almacen>;

  constructor(private AlmacenesService: AlmacenesService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<Almacen>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Almacen, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.AlmacenesService.getAlmacenes().subscribe({
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
    const dialogRef = this.dialog.open(AlmacenesInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarAlmacen(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.AlmacenesService.deleteAlmacenes(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((almacen: Almacen) => almacen.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  abrirEditarModal(almacen: Almacen) {
    const dialogRef = this.dialog.open(AlmacenesUpdateComponent, {
      width: '550px',
      data: almacen // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}