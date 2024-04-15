import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { EmpleadosService } from "../data.service";
import { PersonasService } from "../data.service";
import { SucursalesService } from "../data.service";
import { PuestosService } from "../data.service";

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
  ComboPersona:any;
  ComboSucursal:any;
  ComboPuesto:any;

  constructor(
    public dialogRef: MatDialogRef<EmpleadosInsertComponent>,
    private empleadosService: EmpleadosService,
    private sucursalesService: SucursalesService,
    private puestoService:PuestosService,
    private personasService:PersonasService

  ) {}


   ngOnInit(): void {
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
