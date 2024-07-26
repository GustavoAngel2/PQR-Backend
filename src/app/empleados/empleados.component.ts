import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { empleado, updateEmpleado } from "../models/empleados.model";
import { SucursalesService, PersonasService, PuestosService, EmpleadosService } from '../data.service';
import { AuthService, currentUser } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';

@Component({
  selector: "app-empleados",
  templateUrl: "./empleados.component.html",
  styleUrls: ["./empleados.component.css"],
})
export class EmpleadosComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [
    "Id",
    "Persona",
    "Sucursal",
    "Puesto",
    "usuarioActualiza",
    "fechaRegistro",
    "fechaActualiza",
    "Acciones",
  ];
  dataSource: MatTableDataSource<empleado>;
  IdPersona: number = 0;
  IdSucursal: number = 0;
  IdPuesto: number = 0;
  usuarioActualiza: number = 0;
  ComboPersona: any;
  ComboSucursal: any;
  ComboPuesto: any;

  datosCargados: boolean = false;

  loggedInUser: currentUser = { Id: '', NombreUsuario: '' ,Rol:'', IdRol:''};

  empleados: updateEmpleado = {
    Id: 0,
    IdPersona: 0,
    IdSucursal: 0,
    IdPuesto: 0,
    usuarioActualiza: 0
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private EmpleadosService: EmpleadosService,
    public dialog: MatDialog,
    private sucursalesService: SucursalesService,
    private puestoService: PuestosService,
    private authService: AuthService,
    private personasService: PersonasService,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<empleado>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.getData();
    this.loggedInUser = this.authService.getCurrentUser(); // Obtener el usuario logeado
    console.log('Usuario logeado:', this.loggedInUser);
    this.personasService.getPersonas().subscribe({
      next: (data) => {
        this.ComboPersona = data;
        console.log('ComboPersona:', this.ComboPersona);
      },
      error: (error) => {
        console.error('Error al obtener personas', error);
      }
    });

    this.sucursalesService.getSucursales().subscribe({
      next: (data) => {
        this.ComboSucursal = data;
        console.log('ComboSucursal:', this.ComboSucursal);
      },
      error: (error) => {
        console.error('Error al obtener sucursales', error);
      }
    });

    this.puestoService.getPuestos().subscribe({
      next: (data) => {
        this.ComboPuesto = data;
        console.log('ComboPuesto:', this.ComboPuesto);
      },
      error: (error) => {
        console.error('Error al obtener puestos', error);
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
    const nuevoEmpleado = {
      IdPersona: this.empleados.IdPersona,
      IdSucursal: this.empleados.IdSucursal,
      IdPuesto: this.empleados.IdPuesto,
      usuarioActualiza: parseInt(this.loggedInUser.Id, 10),
    };

    this.EmpleadosService.insertarEmpleado(nuevoEmpleado).subscribe({
      next: (response) => {
        this.getData();
        console.log(response)
        console.log ('ids: ',nuevoEmpleado)
        if (response.StatusCode === 200) {
          this.toastr.success(response.response.data, 'Empleados');
        } else {
          this.toastr.error(response.response.data, 'Empleados');
        }
      },
      error: (error) => {
        console.error('Hubo un error al insertar el empleado', error);
      }
    });
  }

  showDeleteDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.EmpleadosService.deleteEmpleado(Id).subscribe({
          next: (response) => {
            if (response.StatusCode === 200) {
              this.toastr.success(response.response.data, 'Empleados');
            } else {
              this.toastr.error(response.response.data, 'Empleados');
            }
            this.getData()
          },
          error: (error) => {
            console.error("Hubo un error al eliminar el empleado", error);
          },
        });
      }
    });
  }

  getData() {
    this.dataSource.filterPredicate = (data: empleado, filter: string) => {
      return (
        data.Persona.toLowerCase().includes(filter) ||
        data.Id.toString().includes(filter)
      );
    };
    this.EmpleadosService.getEmpleado().subscribe({
      next: (response) => {
        console.log("Respuesta del servidor:", response);
        if (response && Array.isArray(response) && response.length > 0) {
          this.dataSource.data = response;
        } else {
          console.log("no contiene datos");
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  cargarDatos(empleado: updateEmpleado) {

    this.empleados.Id= empleado.Id;
    this.datosCargados = true;
    console.log(this.empleados.Id)

  }


  actualizar(): void {
    const empleadoActualizado: updateEmpleado = {
      Id: this.empleados.Id,
      IdPersona: this.empleados.IdPersona,
      IdSucursal: this.empleados.IdSucursal,
      IdPuesto: this.empleados.IdPuesto,
      usuarioActualiza: parseInt(this.loggedInUser.Id, 10),
    };
  
    console.log('Actualizando Empleado:', empleadoActualizado);
    this.EmpleadosService.updateEmpleado(empleadoActualizado).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.getData(); // Actualizar datos después de la actualización
        this.limpiar();
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Empleados');
        } else {
          this.toastr.error(response.response.data,'Empleados')
        }
      },
      error: (error) => {
        console.error('Error al actualizar el almacen', error);
      }
    });
  }


  limpiar(): void{

    this.datosCargados =false;
  }
}
