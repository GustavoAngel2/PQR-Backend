import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DetallePerfilService } from '../data.service';
import { DetallePerfil } from '../models/detallePerfil.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetallePerfilInsertComponent } from '../detalle-perfil-insert-component/detalle-perfil-insert-component.component';
import { DetallePerfilUpdateComponent } from '../detalle-perfil-update/detalle-perfil-update.component';
import { RolesService } from '../data.service';
import { ModulosService } from '../data.service';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { AuthService, currentUser } from '../auth.service';


@Component({
  selector: 'app-detalle-perfil',
  templateUrl: './detalle-perfil.component.html',
  styleUrls: ['./detalle-perfil.component.css']
})
export class DetallePerfilComponent implements OnInit, AfterViewInit {
  idPerfil: number = 0;
  idModulo: number = 0;
  acceso: number = 0;
  usuarioActualiza: number = 0;
  ComboRol : any;
  ComboModulo:any;
  displayedColumns: string[] = ['id', 'nombreModulo', 'rol', 'acceso', "fechaRegistro", 'fechaActualiza', "UsuarioActualiza",'Acciones'];
  dataSource: MatTableDataSource<DetallePerfil>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private DetallePerfilService: DetallePerfilService, 
    public dialog:MatDialog, 
    private modulosService: ModulosService, 
    private authService: AuthService  ,
    private rolesService :RolesService
    
  ) {
    this.dataSource = new MatTableDataSource<DetallePerfil>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  loggedInUser: currentUser = { Id: '', NombreUsuario: '' ,Rol:'', IdRol:''};


  ngOnInit() {
    this.getData();
    this.loggedInUser = this.authService.getCurrentUser(); // Obtener el usuario logeado
    console.log('Usuario logeado:', this.loggedInUser);
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

  getData(){

    this.rolesService.getRoles().subscribe((data: any) => {
      this.ComboRol = data;
      console.log(this.ComboRol)
    });
     this.modulosService.getModulos().subscribe((data2: any) => {
      this.ComboModulo = data2;
      console.log(this.ComboModulo)
    });

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
  abrirDeleteDialog(Id: number , Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes"){
        this.DetallePerfilService.deleteDetallePerfil(Id).subscribe({
          next: (response) => {
            this.getData()
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el Detalle', error);
          }
        });
        this.getData()
      }
    });
  }
  insertar(): void {
    const nuevoDetallePerfil = {
      idPerfil: this.idPerfil,
      idModulo: this.idModulo,
      acceso: this.acceso,
      usuarioActualiza: parseInt(this.loggedInUser.Id, 10),
    };

    this.DetallePerfilService.insertarDetallePerfil(nuevoDetallePerfil).subscribe({
      next: (response) => {
        this.getData();
        this.idPerfil = 0;
        this.idModulo = 0;
        this.acceso = 0;
      },
      error: (error) => {
        console.error('Hubo un error al insertar el almacen: ', error);
      }
    });
  }

  eliminarDetallePerfil(Id: number) {
    if (confirm(`¿Estás seguro de que deseas eliminar esta informacion del perfil con id: ${Id} ?`)) {
      this.DetallePerfilService.deleteDetallePerfil(Id).subscribe({
        next: (response) => {
          this.dataSource.data = this.dataSource.data.filter((DetallePerfil: DetallePerfil) => DetallePerfil.id !== Id);
          this.getData();
        },
        error: (error) => {
          
          console.error('Hubo un error al eliminar la informacion de este perfil :', error);
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