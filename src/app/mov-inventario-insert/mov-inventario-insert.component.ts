import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { movInventarioService } from '../data.service';
import { AlmacenesService } from '../data.service';
import { TiposMovService } from '../data.service';

@Component({
  selector: 'app-mov-inventario-insert',
  templateUrl: './mov-inventario-insert.component.html',
  styleUrls: ['./mov-inventario-insert.component.css']
})
export class MovInventarioInsertComponent {
  idTipoMov: number = 0;
  idAlmacen: number = 0 ;
  usuarioActualiza: number = 0;
  ComboTipoMov:any;
  ComboAlmacen:any;

  constructor(
    public dialogRef: MatDialogRef<MovInventarioInsertComponent>,
    private almacenesService:AlmacenesService,
    private tiposMovService:TiposMovService,
    private movinventarioService: movInventarioService
  ) {}

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

  insertar(): void {
    const nuevoMovInv = {
      idTipoMov: this.idTipoMov,
      idAlmacen: this.idAlmacen,  
      usuarioActualiza: this.usuarioActualiza
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.movinventarioService.insertMovInventario(nuevoMovInv).subscribe({
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
