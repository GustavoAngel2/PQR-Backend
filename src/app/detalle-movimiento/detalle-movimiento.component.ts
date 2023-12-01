import { Component, OnInit } from '@angular/core';
import { DetalleMovService } from '../data.service';
import { DetalleMov, deleteDetalleMov} from '../models/detalleMov.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DetalleMoviemientoInsertComponent } from '../detalle-moviemiento-insert/detalle-moviemiento-insert.component';
import { DetalleMovimientoUpdateComponent } from '../detalle-movimiento-update/detalle-movimiento-update.component';
// import { InsertarComponent } from '../insertar/insertar.component';
// import { EditarDepartamentoComponent } from '../editar-departamento/editar-departamento.component';

@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
  styleUrls: ['./detalle-movimiento.component.css']
 })
export class DetalleMovimientoComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'NombreMovimiento', 'Cantidad', 'Costo', 'FechaActualiza','UsuarioActualiza','Acciones'];
  dataSource: MatTableDataSource<DetalleMov>;

  constructor(private DetalleMovService: DetalleMovService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<DetalleMov>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: DetalleMov, filter: string) => {
      return data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.DetalleMovService.getDetalleMov(0).subscribe({
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
    const dialogRef = this.dialog.open(DetalleMoviemientoInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarDetalleMov(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.DetalleMovService.deleteDetalleMov(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((detalleMov: DetalleMov) => detalleMov.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  abrirEditarModal(detalleMov: DetalleMov) {
    const dialogRef = this.dialog.open(DetalleMovimientoUpdateComponent, {
      width: '250px',
      data: detalleMov // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}