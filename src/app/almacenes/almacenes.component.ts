import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlmacenesService } from '../data.service';
import { Almacen, UpdateAlmacen } from '../models/almacen.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { AuthService, currentUser } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { PersonasService } from '../data.service';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.css']
})

export class AlmacenesComponent implements OnInit, AfterViewInit {
  almacen: UpdateAlmacen = {
    Id: 0,
    Nombre: '',
    Direccion: '',
    Usuario: 0,
    Encargado: 0
  };
  datosCargados: boolean = false;

  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion', 'Encargado', 'Usuario', 'FechaAct', 'FechaReg', 'Acciones'];
  dataSource: MatTableDataSource<Almacen>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(
    private AlmacenesService: AlmacenesService, 
    private PersonasService: PersonasService,
    private authService: AuthService, 
    public dialog: MatDialog,
    private toastr: ToastrService
  ){
    this.dataSource = new MatTableDataSource<Almacen>();
  }

  nombreAlmacen: string = '';
  direccion: string = '';
  usuario: number = 0;
  encargado: number = 0;
  comboEncargado :any;

  loggedInUser: currentUser = { Id: '', NombreUsuario: '' ,Rol:'', IdRol:''};

  ngOnInit() {
    this.getData();
    this.loggedInUser = this.authService.getCurrentUser(); // Obtener el usuario logeado
    console.log('Usuario logeado:', this.loggedInUser);
  }


  insertar(): void {
    const nuevoAlmacen = {
      nombre: this.nombreAlmacen,
      direccion: this.direccion,
      usuario: parseInt(this.loggedInUser.Id, 10),
      encargado: this.encargado
    };
    

      this.AlmacenesService.insertarAlmacenes(nuevoAlmacen).subscribe({
        next: (response) => {
          console.log(response)
          console.log(nuevoAlmacen)
          this.getData();
          this.limpiar();
          if(response.StatusCode == 200){
            this.toastr.success(response.response.data.toString(), 'Almacenes');
          } else {
            this.toastr.error(response.response.data.toString(),'Almacenes')
          }
        },
        error: (error) => {
          console.error('Hubo un error al insertar el almacen', error);
        }
      });
    
  }

 

  getData() {
    this.dataSource.filterPredicate = (data: Almacen, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter);
    };
    this.PersonasService.getPersonas().subscribe((data: any) => {
      this.comboEncargado = data;
      console.log(this.comboEncargado)
    });
    this.AlmacenesService.getAlmacenes().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response) && response.length > 0) {
          this.dataSource.data = response;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirDeleteDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.AlmacenesService.deleteAlmacenes(Id).subscribe({
          next: (response) => {
            console.log(response)
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Almacenes');
            } else {
              this.toastr.error(response.response.data,'Almacenes')
            }
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el almacén', error);
          }
        });
      }
    });
  }

  actualizar(): void {
    const almacenActualizado: UpdateAlmacen = {
      Id: this.almacen.Id,
      Nombre: this.nombreAlmacen,
      Direccion: this.direccion,
      Usuario: parseInt(this.loggedInUser.Id, 10),
      Encargado: this.encargado
    };
  
    console.log('Actualizando almacen:', almacenActualizado);
    this.AlmacenesService.updateAlmacenes(almacenActualizado).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.getData(); // Actualizar datos después de la actualización
        this.limpiar();
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data.toString(), 'Almacenes');
        } else {
          this.toastr.error(response.response.data.toString(),'Almacenes')
        }
      },
      error: (error) => {
        console.error('Error al actualizar el almacen', error);
      }
    });
  }

  cargarDatos(almacen: UpdateAlmacen) {
    this.almacen.Id = almacen.Id; // Asignar el ID al objeto almacen
    this.nombreAlmacen = almacen.Nombre;
    this.direccion = almacen.Direccion;
    this.usuario = almacen.Usuario;
    this.encargado = almacen.Encargado;
    this.datosCargados = true;
  }

  limpiar(): void{
    this.nombreAlmacen = "";
    this.direccion = "";
    this.encargado = 0;
    this.datosCargados =false;
  }
}