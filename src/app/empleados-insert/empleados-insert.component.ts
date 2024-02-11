import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { EmpleadosService } from "../data.service";

@Component({
  selector: "app-empleados-insert",
  templateUrl: "./empleados-insert.component.html",
  styleUrls: ["./empleados-insert.component.css"],
})
export class EmpleadosInsertComponent {
  IdPersona: number = 0;
  IdSucursal: number = 0;
  IdPuesto: number = 0;
  usuarioActualiza: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EmpleadosInsertComponent>,
    private empleadosService: EmpleadosService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoEmpleado = {
      IdPersona: this.IdPersona,
      IdSucursal: this.IdSucursal,
      IdPuesto: this.IdPuesto,
      usuarioActualiza: this.usuarioActualiza,
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.empleadosService.insertarEmpleado(nuevoEmpleado).subscribe({
      next: (response) => {
        // Puedes cerrar la modal y/o actualizar la tabla aquí si es necesario
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error("Hubo un error al insertar el almacen", error);
      },
    });
  }
}
