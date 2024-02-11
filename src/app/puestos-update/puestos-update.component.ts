import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UpdatePuesto } from "../models/puestos.model";
import { PuestosService } from "../data.service";

@Component({
  selector: "app-puestos-update",
  templateUrl: "./puestos-update.component.html",
  styleUrls: ["./puestos-update.component.css"],
})
export class PuestosUpdateComponent {
  puestos: UpdatePuesto;
  constructor(
    public dialogRef: MatDialogRef<PuestosUpdateComponent>,
    private puestosService: PuestosService,
    @Inject(MAT_DIALOG_DATA) public data: UpdatePuesto
  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.puestos = { ...data };
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.puestosService.updatePuestos(this.puestos).subscribe({
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
