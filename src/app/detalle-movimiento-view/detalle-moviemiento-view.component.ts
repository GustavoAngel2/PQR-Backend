import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetalleMovService } from '../data.service';
import { DetalleMov } from '../models/detalleMov.model';


@Component({
  selector: 'app-detalle-moviemiento-view',
  templateUrl: './detalle-moviemiento-view.component.html',
  styleUrls: ['./detalle-moviemiento-view.component.css']
})
export class DetalleMoviemientoViewComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'Codigo', 'Cantidad','Costo' , 'FechaActualiza', 'UsuarioActualiza'];
  dataSource: MatTableDataSource<DetalleMov>;
  id: number = 0;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<DetalleMoviemientoViewComponent>,
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
