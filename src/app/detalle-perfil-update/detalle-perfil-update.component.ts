import { UpdateDetallePerfil } from '../models/detallePerfil.model';
import { DetallePerfilService } from '../data.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { RolesService } from '../data.service';
import { ModulosService } from '../data.service';


@Component({
  selector: 'app-detalle-perfil-update',
  templateUrl: './detalle-perfil-update.component.html',
  styleUrls: ['./detalle-perfil-update.component.css']
})
export class DetallePerfilUpdateComponent implements OnInit{
  DetallePerfil: UpdateDetallePerfil;
  ComboRol:any;
  ComboModulo:any;
  idPerfil!: number ;
  idModulo!:number;

  constructor(
    public dialogRef: MatDialogRef<DetallePerfilUpdateComponent>,
    private DetallePerfilService: DetallePerfilService,
    private rolesService: RolesService,
    private modulosService: ModulosService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDetallePerfil

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.DetallePerfil = {...data};
  }

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe((data: any) => {
    this.ComboRol = data;
      console.log(this.ComboRol);
      this.idPerfil = this.DetallePerfil.idPerfil;
    });
    
    this.modulosService.getModulos().subscribe((data2: any) => {
    this.ComboModulo = data2;
      console.log(this.ComboModulo);
      this.idModulo = this.DetallePerfil.idModulo;
    });

    this.idModulo = this.DetallePerfil.idModulo;
    this.idPerfil = this.DetallePerfil.idPerfil;
  }

     dev(event: any): void {
    this.idModulo = event.target.value;
    this.idPerfil = event.target.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.DetallePerfilService.updateDetallePerfil(this.DetallePerfil).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

