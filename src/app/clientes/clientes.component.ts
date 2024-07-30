import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ClientesService } from '../data.service';
import { Clientes, UpdateClientes } from '../models/cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService, currentUser } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {
  cliente: UpdateClientes = {
    Id: 0,
    Nombre: "",
    Direccion: "",
    Usuario: 0,
    Telefono: 0,
    CURP: "",
    Email: "",
    RFC: "",
    Coordenadas: "",
  };
  datosCargados: boolean = false;
  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion', 'Usuario', 'FechaAct', 'FechaReg', 'Telefono', 'Curp', 'Rfc', 'Email', 'Coordenadas', 'Acciones'];
  dataSource: MatTableDataSource<Clientes>;

  // Campos para el insert
  nombreCliente: string = "";
  direccion: string = "";
  usuario: number = 0;
  telefono: number = 0;
  curp: string = "";
  email: string = "";
  rfc: string = "";
  coordenadas: string = "";

  loggedInUser: currentUser = { Id: '', NombreUsuario: '', Rol: '', IdRol: '' };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ClientesService: ClientesService, 
    private authService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ){
    this.dataSource = new MatTableDataSource<Clientes>();
  }

  ngOnInit() {
    this.getData();
    this.loggedInUser = this.authService.getCurrentUser();
    console.log('Usuario logeado:', this.loggedInUser);
  }

  getData() {
    this.dataSource.filterPredicate = (data: Clientes, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter);
    };
    this.ClientesService.getClientes().subscribe({
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

  insertar(): void {
    const nuevoCliente = {
      nombre: this.nombreCliente,
      direccion: this.direccion,
      usuario: parseInt(this.loggedInUser.Id, 10),
      telefono: this.telefono,
      curp: this.curp,
      rfc: this.rfc,
      email: this.email,
      coordenadas: this.coordenadas,
    };

    if (this.nombreCliente === '' && this.direccion === '' && this.usuario === 0 && this.telefono === 0 && this.curp === '' && this.rfc === '' && this.email === '' && this.coordenadas === '') {
      this.toastr.error('No deje los datos en blanco', 'Clientes');
    } else {
      this.ClientesService.insertarClientes(nuevoCliente).subscribe({
        next: (response) => {
          console.log(response);
          this.getData();
          this.limpiar();
          if (response.StatusCode === 200) {
            this.toastr.success(response.response.data, 'Clientes');
          } else {
            this.toastr.error(response.response.data, 'Clientes');
          }
        },
        error: (error) => {
          console.error("Hubo un error al insertar el cliente", error);
        },
      });
    }
  }

  abrirDeleteDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "yes") {
        this.ClientesService.deleteClientes(Id).subscribe({
          next: (response) => {
            this.getData();
            this.limpiar()
            if (response.StatusCode === 200) {
              this.toastr.success(response.response.data, 'Clientes');
            } else {
              this.toastr.error(response.response.data, 'Clientes');
            }
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el Cliente', error);
          }
        });
      }
    });
  }

  actualizar(): void {
    const clienteActualizado: UpdateClientes = {
      Id: this.cliente.Id,
      Nombre: this.nombreCliente,
      Direccion: this.direccion,
      Usuario: parseInt(this.loggedInUser.Id, 10),
      Telefono: this.telefono,
      CURP: this.curp,
      RFC: this.rfc,
      Email: this.email,
      Coordenadas: this.coordenadas
    };

    console.log('Actualizando cliente:', clienteActualizado);
    this.ClientesService.updateClientes(clienteActualizado).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.getData();
        this.limpiar();
        if (response.StatusCode === 200) {
          this.toastr.success(response.response.data, 'Clientes');
        } else {
          this.toastr.error(response.response.data, 'Clientes');
        }
      },
      error: (error) => {
        console.error('Error al actualizar el cliente', error);
      }
    });
  }

  cargarDatos(clientes: UpdateClientes) {
    this.cliente.Id = clientes.Id;
    this.nombreCliente = clientes.Nombre;
    this.direccion = clientes.Direccion;
    this.telefono = clientes.Telefono;
    this.curp = clientes.CURP;
    this.rfc = clientes.RFC;
    this.email = clientes.Email;
    this.coordenadas = clientes.Coordenadas;
    this.usuario = clientes.Usuario;
    this.datosCargados = true;
    console.log('Datos cargados:', clientes);
  }

  limpiar(): void {
    this.nombreCliente = '';
    this.direccion = '';
    this.telefono = 0;
    this.curp = '';
    this.rfc = '';
    this.email = '';
    this.coordenadas = '';
    this.datosCargados = false;
  }
}
