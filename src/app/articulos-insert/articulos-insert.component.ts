import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ArticulosService } from '../data.service';
import { UMService } from '../data.service';

@Component({
  selector: 'app-articulos-insert',
  templateUrl: './articulos-insert.component.html',
  styleUrls: ['./articulos-insert.component.css']
})
export class ArticulosInsertComponent {
  descripcion: string = '';
  codigo: string = '';
  um: number = 0;
  costo: number = 0;
  precio: number = 0;
  usuario: number = 0;
  ComboUm: any;
  

  constructor(
    public dialogRef: MatDialogRef<ArticulosInsertComponent>,
    private articulosService: ArticulosService,
    private umService : UMService
  ) {}

   ngOnInit(): void {
    this.umService.getUM().subscribe((data: any) => {
      this.ComboUm = data;
      console.log(this.ComboUm)
    });
  }

    onNoClick(): void {
    this.dialogRef.close();
  }

   dev(e:any):void{
    this.um=e.target.value
  }

  insertar(): void {
    const nuevoArticulo = {
      descripcion: this.descripcion,
      codigo: this.codigo,  
      UM: this.um,
      costo: this.costo,  
      precio: this.precio,  
      Usuario: this.usuario
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.articulosService.insertarArticulos(nuevoArticulo).subscribe({
      next: (response) => {
        // Puedes cerrar la modal y/o actualizar la tabla aquí si es necesario
        this.dialogRef.close('reload');
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }
}