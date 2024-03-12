import { Component, OnInit } from "@angular/core";
import { EmpleadosService } from "../data.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { EmpleadosInsertComponent } from "../empleados-insert/empleados-insert.component";
import { EmpleadosUpdateComponent } from "../empleados-update/empleados-update.component";
import { empleado } from "../models/empleados.model";

@Component({
  selector: "app-empleados",
  templateUrl: "./empleados.component.html",
  styleUrls: ["./empleados.component.css"],
})
export class EmpleadosComponent implements OnInit {
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

  constructor(
    private EmpleadosService: EmpleadosService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<empleado>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
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
}
