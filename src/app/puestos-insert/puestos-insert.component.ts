import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { PuestosService } from "../data.service";

@Component({
  selector: "app-puestos-insert",
  templateUrl: "./puestos-insert.component.html",
  styleUrls: ["./puestos-insert.component.css"],
})
export class PuestosInsertComponent {
  nombre: string = "";
  descripcion: string = "";
  salario: number = 0;
  usuarioActualiza: number = 0;

  constructor(
    public dialogRef: MatDialogRef<PuestosInsertComponent>,
    private puestosService: PuestosService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoPuesto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      salario: this.salario,
      usuarioActualiza: this.usuarioActualiza,
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.puestosService.insertarPuestos(nuevoPuesto).subscribe({
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
