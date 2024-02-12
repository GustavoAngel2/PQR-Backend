import { Component, OnInit } from '@angular/core';
import { ModUsuarioService } from '../data.service';
import { ModuloUsuario } from '../models/modusuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModUsuarioInsertComponent } from '../mod-usuario-insert/mod-usuario-insert.component';
import { ModUsuarioUpdateComponent } from '../mod-usuario-update/mod-usuario-update.component';

@Component({
  selector: 'app-almacenes',
  templateUrl: './mod-usuario.component.html',
  styleUrls: ['./mod-usuario.component.css']
 })
export class ModUsuarioComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Modulo', 'Usuario', 'FechaRegistro','FechaActualiza','Acciones'];
  dataSource: MatTableDataSource<ModuloUsuario>;

  constructor(private ModuloUsuarioService: ModUsuarioService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<ModuloUsuario>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: ModuloUsuario, filter: string) => {
      return data.Modulo.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.ModuloUsuarioService.getModulosUsuario().subscribe({
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
    const dialogRef = this.dialog.open(ModUsuarioInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarModuloUsuario(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este modulo?')) {
      this.ModuloUsuarioService.deleteModulosUsuario(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((ModuloUsuario: ModuloUsuario) => ModuloUsuario.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el modulo', error);
        }
      });
    }
  }
  abrirEditarModal(ModUsuario: ModuloUsuario) {
    const dialogRef = this.dialog.open(ModUsuarioUpdateComponent, {
      width: '250px',
      data: ModUsuario // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}