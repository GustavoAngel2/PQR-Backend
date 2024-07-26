import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UsuarioSevice } from '../data.service';
import { usuarios } from '../models/usuarios.models';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioUpdateComponent } from '../usuario-update/usuario-update.component';
import { RolesService } from '../data.service';


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
  usuario: number = 0;
  ComboRoles: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private UsuarioService: UsuarioSevice, 
    public dialog:MatDialog,
    private rolesService: RolesService) {
    this.dataSource = new MatTableDataSource<usuarios>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: usuarios, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.rolesService.getRoles().subscribe((data: any) => {
      this.ComboRoles = data;
      console.log(this.ComboRoles)
    });
    this.getData();
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
  eliminarAlmacen(Id: number) {
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
  abrirEditarModal(usuario: usuarios) {
    const dialogRef = this.dialog.open(UsuarioUpdateComponent, {
      width: '550px',
      data: usuario // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

  dev(e:any):void{
    this.rol=e.target.value
  }

  insertar(): void {
    const nuevoUsuario = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      rol: this.rol,
      usuario: this.usuario,
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.UsuarioService.insertarUsuario(nuevoUsuario).subscribe({
      next: (response) => {
        this.getData()
      },
      error: (error) => {
        // Manejar el error aquí
        console.error("Hubo un error al insertar el almacen", error);
      },
    });
  }
}

