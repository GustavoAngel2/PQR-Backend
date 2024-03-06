import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateDetalleMov } from '../models/detalleMov.model';
import { DetalleMovService } from '../data.service';
import { ArticulosService } from '../data.service';
import { movInventarioService } from '../data.service';


@Component({
  selector: 'app-detalle-movimiento-update',
  templateUrl: './detalle-movimiento-update.component.html',
  styleUrls: ['./detalle-movimiento-update.component.css']
})
export class DetalleMovimientoUpdateComponent implements OnInit{
  DetalleMov: UpdateDetalleMov;
  ComboMov:any;
  ComboCodigo:any;
  idMovimiento!:number;
  codigo!:number;

  
  constructor(
    public dialogRef: MatDialogRef<DetalleMovimientoUpdateComponent>,
    private detalleMovService: DetalleMovService,
    private ArticuloService: ArticulosService,
    private movInvService: movInventarioService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateDetalleMov

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.DetalleMov = {...data};
  }

  ngOnInit(): void {
      this.ArticuloService.getArticulos().subscribe((data: any) => {
      this.ComboCodigo = data;
      console.log("Combo Codigo")
      console.log(this.ComboCodigo)
    });
    this.movInvService.getMovInventario().subscribe((data2: any) => {
      this.ComboMov = data2;
      console.log("Combo MovInv")
      console.log(this.ComboMov)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  dev1(e:any):void{
    this.DetalleMov.codigo=e.target.value
  }
  
  dev2(e:any):void{
    this.DetalleMov.idMovimiento=e.target.value
  }

  guardar(): void {
    this.detalleMovService.updateDetalleMov(this.DetalleMov).subscribe({
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

