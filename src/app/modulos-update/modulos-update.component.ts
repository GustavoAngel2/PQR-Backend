import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateModulo } from '../models/modulo.model';
import { ModulosService } from '../data.service';
import { CategoriaModuloService } from '../data.service';

@Component({
  selector: 'app-modulos-update',
  templateUrl: './modulos-update.component.html',
  styleUrls: ['./modulos-update.component.css']
})
export class ModulosUpdateComponent implements OnInit {
  modulo: UpdateModulo;
  comboCatMod:any;
  categoriaModulo!: number;

  constructor(
    public dialogRef: MatDialogRef<ModulosUpdateComponent>,
    private modulosService: ModulosService,
    private catModService:CategoriaModuloService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateModulo

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.modulo = {...data};
  }

  ngOnInit(): void {
    this.catModService.getCategoriaModulo().subscribe((data: any) => {
      this.comboCatMod = data;
      console.log(this.comboCatMod)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
   dev(event: any): void {
    this.catModService = event.target.value;
  }

  guardar(): void {
  this.modulosService.updateModulos(this.modulo).subscribe({
    next: (response) => {
      console.log('Respuesta de la API:', response);
      this.dialogRef.close(response);
              location.reload();
    },
    error: (error) => {
      console.error('Error al actualizar:', error);
      // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
    }
  });
}
}




