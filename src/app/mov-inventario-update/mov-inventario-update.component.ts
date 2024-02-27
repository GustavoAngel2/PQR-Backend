import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateMovInventario } from '../models/movInventario.model';
import { movInventarioService } from '../data.service';
import { AlmacenesService } from '../data.service';
import { TiposMovService } from '../data.service';

@Component({
  selector: 'app-mov-inventario-update',
  templateUrl: './mov-inventario-update.component.html',
  styleUrls: ['./mov-inventario-update.component.css']
})
export class MovInventarioUpdateComponent {
  movinventario: UpdateMovInventario;
  ComboTipoMov:any;
  ComboAlmacen:any;
  idTipoMov!: number;
  idAlmacen!: number;


  constructor(
    public dialogRef: MatDialogRef<MovInventarioUpdateComponent>,
    private movinventarioService: movInventarioService,
    private almacenesService:AlmacenesService,
    private tiposMovService:TiposMovService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateMovInventario

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.movinventario = {...data};
  }

   ngOnInit(): void {
    this.tiposMovService.getTiposMov().subscribe((data: any) => {
      this.ComboTipoMov = data;
      console.log(this.ComboTipoMov)
    });
     this.almacenesService.getAlmacenes().subscribe((data2: any) => {
      this.ComboAlmacen = data2;
      console.log(this.ComboAlmacen)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.movinventarioService.updateMovInventario(this.movinventario).subscribe({
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
