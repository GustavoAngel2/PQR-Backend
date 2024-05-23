import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlmacenesService } from '../data.service';
import { Almacen } from '../models/almacen.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlmacenesUpdateComponent } from '../almacenes-update/almacenes-update.component';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.css']
})

export class AlmacenesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion','Encargado', 'Usuario', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Almacen>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private AlmacenesService: AlmacenesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Almacen>();
  }

  nombreAlmacen: string = '';
  direccion: string = '';
  usuario: number = 0;
  encargado:number = 0;

  insertar(): void {
    const nuevoAlmacen = {
      nombre: this.nombreAlmacen,
      direccion: this.direccion,  
      usuario: this.usuario,
      encargado: this.encargado
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.AlmacenesService.insertarAlmacenes(nuevoAlmacen).subscribe({
      next: (response) => {
        this.nombreAlmacen = "";
        this.direccion = "";
        this.usuario = 0;
        this.encargado = 0;
        this.getData();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  //lo que esta adentro de ngOnInit() se ejecutarà arrancando la pagina
  ngOnInit() {
    this.getData()
  }

  getData(){
    this.dataSource.filterPredicate = (data: Almacen, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter);
    };
    this.AlmacenesService.getAlmacenes().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response)&&response.length>0) {
          this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource si hay datos y si la respuesta es un array
        } else {
          console.log('no contiene datos');//De lo contrario no harà nada
        }
      },
      error: (error) => {
        console.error(error); 
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;//Obtiene los datos del buscador
    this.dataSource.filter = filterValue.trim().toLowerCase(); //el valor que se guarda en filterValue lo transforma en minusculas

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); 
    }
  }

  //esta funcion abre la modal de insertar 
  abrirDeleteDialog(Id: number , Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes"){
        this.AlmacenesService.deleteAlmacenes(Id).subscribe({
          next: (response) => {
            this.getData()
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el almacén', error);
          }
        });
        this.getData()
      }
    });
  }

  abrirEditarModal(almacen: Almacen) {
    const dialogRef = this.dialog.open(AlmacenesUpdateComponent, {
      width: '550px',
      data: almacen
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result == "reload") {
        this.getData()
      }
    });
  }
}
