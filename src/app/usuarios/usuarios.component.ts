import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../data.service';
import { UpdateUsuario, usuarios } from '../models/usuarios.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioUpdateComponent } from '../usuario-update/usuario-update.component';
import { RolesService } from '../data.service';
import { AuthService, currentUser } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from '../data.service';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'Nombre', 'Rol', 'Usuario', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<usuarios>;
  nombre: string = "";
  contrasena: string = "";
  rol: number = 0;
  idPersona:number = 0;
  usuario: number = 0;
  ComboRoles: any;
  ComboPersonas:any;
  loggedInUser: currentUser = { Id: '', NombreUsuario: '' ,Rol:'', IdRol:''};
  datosCargados: boolean = false;


  usuarios:UpdateUsuario ={
    Id:0,
    Nombre:'',
    Contrasena:'',
    Rol:'',
    idPersona:'',
    Usuario:0
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private UsuarioService: UsuarioService, 
    public dialog:MatDialog,
    private authService: AuthService, 
    private toastr: ToastrService,
    private rolesService: RolesService,
    private empleadosService:EmpleadosService) {
    this.dataSource = new MatTableDataSource<usuarios>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

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
    this.dataSource.filterPredicate = (data: usuarios, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.rolesService.getRoles().subscribe((data: any) => {
      this.ComboRoles = data;
      console.log(this.ComboRoles)
    });
    this.empleadosService.getEmpleado().subscribe((data: any) => {
      this.ComboPersonas = data;
      console.log(this.ComboPersonas)
    });
    this.UsuarioService.getUsuarios().subscribe({
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


  eliminarUsuario(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.UsuarioService.deleteUsuarios(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((usuario: usuarios) => usuario.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }

  actualizar(): void {
    const usuarioActualizado: UpdateUsuario = {
      Id: this.usuarios.Id,
      Nombre: this.nombre,
      Contrasena: this.contrasena,
      Rol: this.rol.toString(),
      idPersona: this.idPersona.toString(),
      Usuario: parseInt(this.loggedInUser.Id, 10),
    };
  
    console.log('Actualizando existencia:', usuarioActualizado);
    this.UsuarioService.updateUsuarios(usuarioActualizado).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.getData(); // Actualizar datos después de la actualización
        this.limpiar();
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Usuarios');
        } else {
          this.toastr.error(response.response.data,'Usuarios')
        }
      },
      error: (error) => {
        console.error('Error al actualizar la Existencia', error);
      }
    });
  }

 insertar(): void {
    const nuevoUsuario = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      rol: this.rol,
      idPersona: this.idPersona,  // Asegúrate de que el nombre coincida
      usuario: parseInt(this.loggedInUser.Id, 10),
    };
    console.log(nuevoUsuario);
    this.UsuarioService.insertarUsuario(nuevoUsuario).subscribe({
      next: (response) => {
        this.getData();
        console.log(response);
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Usuarios');
        } else {
          this.toastr.error(response.response.data,'Usuarios')
        }
      },
      error: (error) => {
        console.error("Hubo un error al insertar el usuario", error);
      },
    });
  }


  
  cargarDatos(usuario: UpdateUsuario) {
    this.usuarios.Id =usuario.Id
    this.datosCargados = true;
    this.nombre = usuario.Nombre;
    this.contrasena = '';
    this.rol= parseInt(usuario.Rol);
    this.idPersona = parseInt(usuario.idPersona)
    console.log('Usuario a actualizar: ',this.usuarios.Id)
  }

  limpiar(): void{
    this.nombre = '';
    this.contrasena = '';
    this.rol= 0;
    this.idPersona=0;
    this.datosCargados =false;
  }
}

