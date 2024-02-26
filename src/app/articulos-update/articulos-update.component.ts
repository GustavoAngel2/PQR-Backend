import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateAlmacen } from '../models/almacen.model';
import { AlmacenesService, ArticulosService } from '../data.service';
import { updateArticulos } from '../models/articulo.model';
import { UMService } from '../data.service';

@Component({
  selector: 'app-articulos-update',
  templateUrl: './articulos-update.component.html',
  styleUrls: ['./articulos-update.component.css']
})
export class ArticulosUpdateComponent {
  articulo: updateArticulos;
  ComboUm: any;
  um!:number;

  constructor(
    public dialogRef: MatDialogRef<ArticulosUpdateComponent>,
    private articulosService: ArticulosService,
    private umService:UMService,
    @Inject(MAT_DIALOG_DATA) public data: updateArticulos

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.articulo = {...data};
  }

  ngOnInit(): void {
        this.umService.getUM().subscribe((data: any) => {
      this.ComboUm = data;
      console.log(this.ComboUm);
     
      
    });


  }

  onNoClick(): void {
    this.dialogRef.close();
  }
   dev(event: any): void {
    this.um = event.target.value;
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
