import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetallePerfilService } from '../data.service'; 
import { RolesService } from '../data.service';
import { ModulosService } from '../data.service';
import { Modulo } from '../models/modulo.model';

@Component({
  selector: 'app-detalle-perfil-insert-component',
  templateUrl: './detalle-perfil-insert-component.component.html',
  styleUrls: ['./detalle-perfil-insert-component.component.css']
})
export class DetallePerfilInsertComponent {
  idPerfil: number = 0;
  idModulo: number = 0;
  acceso: number = 0;
  usuarioActualiza: number = 0;
  ComboRol : any;
  ComboModulo:any;

  constructor(
    public dialogRef: MatDialogRef<DetallePerfilInsertComponent>,
    private DetallePerfilService: DetallePerfilService,
    private modulosService: ModulosService,
    private rolesService :RolesService
  ) {}

     ngOnInit(): void {
    this.rolesService.getRoles().subscribe((data: any) => {
      this.ComboRol = data;
      console.log(this.ComboRol)
    });
     this.modulosService.getModulos().subscribe((data2: any) => {
      this.ComboModulo = data2;
      console.log(this.ComboModulo)
    });
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoDetallePerfil = {
      idPerfil: this.idPerfil,
      idModulo: this.idModulo,
      acceso: this.acceso,
      usuarioActualiza: this.usuarioActualiza
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.DetallePerfilService.insertarDetallePerfil(nuevoDetallePerfil).subscribe({
      next: (response) => {
        // Puedes cerrar la modal y/o actualizar la tabla aquí si es necesario
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }
}
