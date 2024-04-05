import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DetallePerfilService } from '../data.service';
import { DetallePerfil } from '../models/detallePerfil.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetallePerfilInsertComponent } from '../detalle-perfil-insert-component/detalle-perfil-insert-component.component';
import { DetallePerfilUpdateComponent } from '../detalle-perfil-update/detalle-perfil-update.component';

@Component({
  selector: 'app-detalle-perfil',
  templateUrl: './detalle-perfil.component.html',
  styleUrls: ['./detalle-perfil.component.css']
})
export class DetallePerfilComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nombreModulo', 'rol', 'acceso', "fechaRegistro", 'fechaActualiza', "UsuarioActualiza",'Acciones'];
  dataSource: MatTableDataSource<DetallePerfil>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private DetallePerfilService: DetallePerfilService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<DetallePerfil>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: DetallePerfil, filter: string) => {
      return data.id.toString(0).includes(filter); // Puedes añadir más campos si es necesario
    };
    this.DetallePerfilService.getDetallePerfil().subscribe({
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
    const dialogRef = this.dialog.open(DetallePerfilInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarDetallePerfil(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar esta informacion del perfil?')) {
      this.DetallePerfilService.deleteDetallePerfil(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((DetallePerfil: DetallePerfil) => DetallePerfil.id !== Id);
          location.reload()
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar la informacion de este perfil... :', error);
        }
      });
    }
  }
  abrirEditarModal(DetallePerfil: DetallePerfil) {
    const dialogRef = this.dialog.open(DetallePerfilUpdateComponent, {
      width: '550px',
      data: DetallePerfil // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}