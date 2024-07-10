import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadosInsertComponent } from "../empleados-insert/empleados-insert.component";
import { EmpleadosUpdateComponent } from "../empleados-update/empleados-update.component";
import { empleado } from "../models/empleados.model";
import { SucursalesService, PersonasService, PuestosService, EmpleadosService } from '../data.service';
import { dialogParameters } from '../models/dialog.model';
import { DialogsComponent } from '../dialogs/dialogs.component';




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
  ComboPersona:any;
  ComboSucursal:any;
  ComboPuesto:any;

  dialogBody: dialogParameters = {
    title:'test',
    message:'This is a test',
    buttons:'ok'
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private EmpleadosService: EmpleadosService,
    public dialog: MatDialog,
    private sucursalesService: SucursalesService,
    private puestoService:PuestosService,
    private personasService:PersonasService
  ) {
    this.dataSource = new MatTableDataSource<empleado>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.getData();
    this.personasService.getPersonas().subscribe((data: any) => {
      this.ComboPersona = data;
      console.log(this.ComboPersona)
    });
     this.sucursalesService.getSucursales().subscribe((data: any) => {
      this.ComboSucursal = data;
      console.log(this.ComboSucursal)
    });
       this.puestoService.getPuestos().subscribe((data: any) => {
      this.ComboPuesto = data;
      console.log(this.ComboPuesto)
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
    const dialogRef = this.dialog.open(EmpleadosInsertComponent, {
      width: "550px",
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Manejar los resultados cuando la modal se cierre
    });
  }

  insertar(): void {
    const nuevoEmpleado = {
      IdPersona: this.IdPersona,
      IdSucursal: this.IdSucursal,
      IdPuesto: this.IdPuesto,
      usuarioActualiza: this.usuarioActualiza,
    };

    this.EmpleadosService.insertarEmpleado(nuevoEmpleado).subscribe({
      next: (response) => {
        this.getData()
        this.dialogBody = {
          title : 'Empleados',
          message: 'Registro insertado correctamente!',
          buttons:'ok'
      }
      this.showDialog(this.dialogBody)
    },
    error: (error) => {
      console.error('Hubo un error al insertar el empleado', error);
    }
  });
}

  eliminarCliente(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm("¿Estás seguro de que deseas eliminar este departamento?")) {
      this.EmpleadosService.deleteEmpleado(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter(
            (empleado: empleado) => empleado.Id !== Id
          );
        },
        error: (error) => {
          // Manejar el error aquí
          console.error("Hubo un error al eliminar el cliente", error);
        },
      });
    }
  }



  abrirEditarModal(empleado: empleado) {
    const dialogRef = this.dialog.open(EmpleadosUpdateComponent, {
      width: "550px",
      data: empleado, // Pasa el objeto de departamento a la modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }


  showDialog(data:dialogParameters) {
    const dialogRef = this.dialog.open(DialogsComponent, {
      width: '550px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.getData();
      }
    });
  }

  getData(){
    this.dataSource.filterPredicate = (data: empleado, filter: string) => {
      return (
        data.Persona.toLowerCase().includes(filter) ||
        data.Id.toString().includes(filter)
      ); // Puedes añadir más campos si es necesario
    };
    this.EmpleadosService.getEmpleado().subscribe({
      next: (response) => {
        console.log("Respuesta del servidor:", response);
        if (response && Array.isArray(response) && response.length > 0) {
          this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
        } else {
          console.log("no contiene datos");
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
