import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExistenciasService } from '../data.service';
import { ArticulosService } from '../data.service';
import { AlmacenesService } from '../data.service';

@Component({
  selector: 'app-existencias-insert',
  templateUrl: './existencias-insert.component.html',
  styleUrls: ['./existencias-insert.component.css']
})
export class ExistenciasInsertComponent {
  codigo: string = '';
  almacen: number = 0 ;
  cantidad: number = 0;
  usuario: number = 0;
  ComboCodigo:any;
  ComboAlmacen:any;

  constructor(
    public dialogRef: MatDialogRef<ExistenciasInsertComponent>,
    private existenciasService: ExistenciasService,
    private ArticuloService: ArticulosService,
    private AlmacenesService : AlmacenesService
  ) {}


  
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
}
