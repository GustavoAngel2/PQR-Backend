import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateAlmacen } from '../models/almacen.model';
import { AlmacenesService, ArticulosService } from '../data.service';
import { updateArticulos } from '../models/articulo.model';

@Component({
  selector: 'app-articulos-update',
  templateUrl: './articulos-update.component.html',
  styleUrls: ['./articulos-update.component.css']
})
export class ArticulosUpdateComponent {
  articulo: updateArticulos;
  constructor(
    public dialogRef: MatDialogRef<ArticulosUpdateComponent>,
    private articulosService: ArticulosService,
    @Inject(MAT_DIALOG_DATA) public data: updateArticulos

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.articulo = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.articulosService.updateArticulos(this.articulo).subscribe({
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
