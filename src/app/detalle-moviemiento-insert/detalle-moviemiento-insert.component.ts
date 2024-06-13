import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateMovInventario } from '../models/movInventario.model';
import { movInventarioService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetalleMovService } from '../data.service';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { AlmacenesService } from '../data.service';
import { TiposMovService } from '../data.service';
import { ArticulosService } from '../data.service';
import { DetalleMov } from '../models/detalleMov.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-detalle-moviemiento-insert',
  templateUrl: './detalle-moviemiento-insert.component.html',
  styleUrls: ['./detalle-moviemiento-insert.component.css']
})
export class DetalleMoviemientoInsertComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'Codigo', 'Cantidad','Costo' , 'FechaActualiza', 'UsuarioActualiza'];
  dataSource: MatTableDataSource<DetalleMov>;
  id: number = 0;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DetalleMoviemientoInsertComponent>,
    public dialog: MatDialog,
    private detalleMovService: DetalleMovService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.id = data
    this.dataSource = new MatTableDataSource<DetalleMov>();
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.detalleMovService.getDetalleMov(this.id).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response)&&response.length>0) {
          this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
        } else {
          console.log('no contiene datos');
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
