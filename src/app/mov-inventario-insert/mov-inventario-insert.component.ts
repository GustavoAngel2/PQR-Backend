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

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}
