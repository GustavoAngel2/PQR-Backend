import { Component, Inject, OnInit } from "@angular/core";
import { updateEmpleado } from "../models/empleados.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EmpleadosService } from "../data.service";

@Component({
  selector: "app-empleados-update",
  templateUrl: "./empleados-update.component.html",
  styleUrls: ["./empleados-update.component.css"],
})
export class EmpleadosUpdateComponent {
  empleado: updateEmpleado;
  constructor(
    public dialogRef: MatDialogRef<EmpleadosUpdateComponent>,
    private empleadoService: EmpleadosService,
    @Inject(MAT_DIALOG_DATA) public data: updateEmpleado
  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.empleado = { ...data };
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.empleadoService.updateEmpleado(this.empleado).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
