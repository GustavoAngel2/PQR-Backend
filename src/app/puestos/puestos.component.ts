import { Component } from "@angular/core";
import { PuestosService } from "../data.service";
import { Puesto } from "../models/puestos.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { PuestosInsertComponent } from "../puestos-insert/puestos-insert.component";
import { PuestosUpdateComponent } from "../puestos-update/puestos-update.component";

@Component({
  selector: "app-puestos",
  templateUrl: "./puestos.component.html",
  styleUrls: ["./puestos.component.css"],
})
export class PuestosComponent {
  displayedColumns: string[] = [
    "Id",
    "nombre",
    "descripcion",
    "salario",
    "usuarioActualiza",
    "fechaRegistro",
    "fechaActualiza",
    "Acciones",
  ];
  dataSource: MatTableDataSource<Puesto>;

  constructor(
    private puestosService: PuestosService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Puesto>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Puesto, filter: string) => {
      return (
        data.nombre.toLowerCase().includes(filter) ||
        data.descripcion.toLowerCase().includes(filter) ||
        data.Id.toString().includes(filter)
      ); // Puedes añadir más campos si es necesario
    };
    this.puestosService.getPuestos().subscribe({
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
    const dialogRef = this.dialog.open(PuestosInsertComponent, {
      width: "550px",
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarArticulo(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm("¿Estás seguro de que deseas eliminar este departamento?")) {
      this.puestosService.deletePuestos(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter(
            (articulo: Puesto) => articulo.Id !== Id
          );
        },
        error: (error) => {
          // Manejar el error aquí
          console.error("Hubo un error al eliminar el departamento", error);
        },
      });
    }
  }
  abrirEditarModal(articulos: Puesto) {
    const dialogRef = this.dialog.open(PuestosUpdateComponent, {
      width: "250px",
      data: articulos, // Pasa el objeto de departamento a la modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
