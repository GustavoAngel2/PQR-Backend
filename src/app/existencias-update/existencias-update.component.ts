import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateExistencia } from '../models/existencia.model';
import { ExistenciasService } from '../data.service';
import { ArticulosService } from '../data.service';
import { AlmacenesService } from '../data.service';

@Component({
  selector: 'app-existencias-update',
  templateUrl: './existencias-update.component.html',
  styleUrls: ['./existencias-update.component.css']
})
export class ExistenciasUpdateComponent {
  existencia: UpdateExistencia;
  ComboCodigo: any;
  ComboAlmacen: any;
  codigo!: number;
  almacen!: number;

  constructor(
    public dialogRef: MatDialogRef<ExistenciasUpdateComponent>,
    private existenciasService: ExistenciasService,
    private ArticuloService: ArticulosService,
    private AlmacenesService: AlmacenesService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateExistencia
  ) {
    this.existencia = { ...data };
  }

  ngOnInit(): void {
    this.ArticuloService.getArticulos().subscribe((data: any) => {
      this.ComboCodigo = data;
      console.log(this.ComboCodigo)
    });
    this.AlmacenesService.getAlmacenes().subscribe((data2: any) => {
      this.ComboAlmacen = data2;
      console.log(this.ComboAlmacen)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dev1(e:any):void{
    this.codigo=e.target.value
  }
  dev2(e:any):void{
    this.almacen=e.target.value
  }

  guardar(): void {
    this.existenciasService.updateExistencias(this.existencia).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
/*         location.reload();*/
        console.log(this.existencia)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
