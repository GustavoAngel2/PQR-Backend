/* import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModulosService } from '../data.service';
import { CategoriaModuloService } from '../data.service';

@Component({
  selector: 'app-almacenes-insert',
  templateUrl: './modulos-insert.component.html',
  styleUrls: ['./modulos-insert.component.css']
})
export class ModulosInsertComponent {
  nombreModulo: string='';
  categoriaModulo: number=0;
  usuario: number=0;
  comboCatMod:any;

  constructor(
    public dialogRef: MatDialogRef<ModulosInsertComponent>,
    private catModService: CategoriaModuloService,
    private moduloService: ModulosService
  ) {}

   ngOnInit(): void {
    this.catModService.getCategoriaModulo().subscribe((data: any) => {
      this.comboCatMod = data;
      console.log(this.comboCatMod)
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  insertar(): void {
    const nuevoModulo = {
      nombreModulo: this.nombreModulo,
      categoriaModulo: this.categoriaModulo, 
      usuario: this.usuario
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.moduloService.InsertModulos(nuevoModulo).subscribe({
      next: (response) => {
        // Puedes cerrar la modal y/o actualizar la tabla aquí si es necesario
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el modulo', error);
      }
    });
  }
}

 */