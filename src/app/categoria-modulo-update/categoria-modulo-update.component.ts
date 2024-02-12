import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateCategoriaModulo } from '../models/categoriaModulo.model';
import { CategoriaModuloService } from '../data.service';

@Component({
  selector: 'app-categoria-modulo-update',
  templateUrl: './categoria-modulo-update.component.html',
  styleUrls: ['./categoria-modulo-update.component.css']
})
export class CategoriaModuloUpdateComponent implements OnInit{
  catmodulo: UpdateCategoriaModulo;
  constructor(
    public dialogRef: MatDialogRef<CategoriaModuloUpdateComponent>,
    private categoriaModuloService: CategoriaModuloService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateCategoriaModulo

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.catmodulo = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.categoriaModuloService.updateCategoriaModulo(this.catmodulo).subscribe({
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
