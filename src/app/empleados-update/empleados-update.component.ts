import { Component, Inject, OnInit } from "@angular/core";
import { updateEmpleado } from "../models/empleados.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EmpleadosService, PersonasService, PuestosService } from "../data.service";
import { SucursalesService } from "../data.service";
import { Personas } from "../models/personas.model";
import { Puesto } from "../models/puestos.model";

@Component({
  selector: "app-empleados-update",
  templateUrl: "./empleados-update.component.html",
  styleUrls: ["./empleados-update.component.css"],
})
export class EmpleadosUpdateComponent {
  empleado: updateEmpleado;
  ComboPuesto:any;
  ComboSucursal:any;
  ComboPersona:any;
  puesto!:number;
  sucursal!:number;
  persona!:number;


  constructor(
    public dialogRef: MatDialogRef<EmpleadosUpdateComponent>,
    private empleadoService: EmpleadosService,
    private puestosService:PuestosService,
    private sucursalesService:SucursalesService,
    private personasService:PersonasService,
    @Inject(MAT_DIALOG_DATA) public data: updateEmpleado
  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.empleado = { ...data };
  }

    ngOnInit(): void {
    this.personasService.getPersonas().subscribe((data: any) => {
      this.ComboPersona = data;
      console.log(this.ComboPersona)
    });
     this.sucursalesService.getSucursales().subscribe((data: any) => {
      this.ComboSucursal = data;
      console.log(this.ComboSucursal)
    });
       this.puestosService.getPuestos().subscribe((data: any) => {
      this.ComboPuesto = data;
      console.log(this.ComboPuesto)
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  
  dev(event: any): void {
    this.persona = event.target.value;
  }

  dev2(event: any): void {
    this.sucursal = event.target.value;
  }

  dev3(event: any): void {
    this.puesto = event.target.value;
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
