import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { UsuarioSevice } from "../data.service";
import { RolesService } from "../data.service"; 

@Component({
  selector: "app-usuarios-insert",
  templateUrl: "./usuarios-insert.component.html",
  styleUrls: ["./usuarios-insert.component.css"],
})
export class UsuariosInsertComponent {
  nombre: string = "";
  contrasena: string = "";
  rol: number = 0;
  usuario: number = 0;
  ComboRoles: any;

  constructor(
    public dialogRef: MatDialogRef<UsuariosInsertComponent>,
    private usuarioService: UsuarioSevice,
    private rolesService: RolesService
  ) {}
  
  ngOnInit(): void {
    this.rolesService.getRoles().subscribe((data: any) => {
      this.ComboRoles = data;
      console.log(this.ComboRoles)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dev(e:any):void{
    this.rol=e.target.value
  }

  insertar(): void {
    const nuevoUsuario = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      rol: this.rol,
      usuario: this.usuario,
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.usuarioService.insertarUsuario(nuevoUsuario).subscribe({
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
