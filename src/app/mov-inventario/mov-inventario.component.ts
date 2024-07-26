import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovInventario, UpdateMovInventario } from '../models/movInventario.model';
import { movInventarioService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MovInventarioInsertComponent } from '../mov-inventario-insert/mov-inventario-insert.component';
import { MovInventarioUpdateComponent } from '../mov-inventario-update/mov-inventario-update.component';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { AlmacenesService } from '../data.service';
import { TiposMovService } from '../data.service';
<<<<<<< HEAD
import { ArticulosService } from '../data.service';
import { DetalleMov } from '../models/detalleMov.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { SearchMovModel } from '../models/detalleMov.model';

=======
>>>>>>> origin/Arkan

@Component({
  selector: 'app-mov-inventario',
  templateUrl: './mov-inventario.component.html',
  styleUrls: ['./mov-inventario.component.css']
})
export class MovInventarioComponent implements OnInit, AfterViewInit {
<<<<<<< HEAD
  displayedColumns: string[] = ['Id', 'Codigo', 'Cantidad','Costo' , 'FechaActualiza', 'UsuarioActualiza'];
  dataSource: MatTableDataSource<DetalleMov>;
=======
  displayedColumns: string[] = ['Id', 'IdTipoMov', 'IdAlmacen', 'fechaMovimiento', 'Usuario', 'FechaActualiza', 'Acciones'];
  dataSource: MatTableDataSource<MovInventario>;
>>>>>>> origin/Arkan
  idTipoMov: number = 0;
  idAlmacen: number = 0 ;
  usuarioActualiza: number = 0;
  ComboTipoMov:any;
  ComboAlmacen:any;
  tipoMov: UpdateMovInventario = {
    Id: 0,
    idAlmacen: 0,
    idTipoMov:0,
    usuarioActualiza: 0,
  };
  datosCargados: boolean = false;


  search: SearchMovModel = {
    IdAlmacen : 0,
    FechaFin : '2024-01-01',
    FechaInicio : '2024-12-30'
  };
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private movinventarioService: movInventarioService,
    public dialog:MatDialog,
    private almacenesService:AlmacenesService,
    private tiposMovService:TiposMovService
  ) {
    this.dataSource = new MatTableDataSource<MovInventario>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.getData();
  }
    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Método para realizar el filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

<<<<<<< HEAD
  getData() {

    this.movInventarioService.getMovInventario(this.search).subscribe((data: any) => {
      this.ComboMov = data;
      console.log(this.ComboMov);
    });

    this.articulosService.getArticulos().subscribe((data2: any) => {
      this.ComboCodigo = data2;
      console.log(this.ComboCodigo);
    });

=======
  getData(){
>>>>>>> origin/Arkan
    this.tiposMovService.getTiposMov().subscribe((data: any) => {
      this.ComboTipoMov = data;
      console.log(this.ComboTipoMov)
    });
     this.almacenesService.getAlmacenes().subscribe((data2: any) => {
      this.ComboAlmacen = data2;
      console.log(this.ComboAlmacen)
    });

    this.dataSource.filterPredicate = (data: MovInventario, filter: string) => {
      return data.IdTipoMov.toLowerCase().includes(filter)// Puedes añadir más campos si es necesario
    };
    this.movinventarioService.getMovInventario().subscribe({
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

  abrirDeleteDialog(Id: number, Name: string) {
    this.limpiar();
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.movinventarioService.deleteMovInventario(Id).subscribe({
          next: (response) => {
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el almacén', error);
          }
        });
      }
    });
  }

  cargarDatos(elemento: any) {
    this.tipoMov.Id = elemento.Id;
    this.tipoMov.idAlmacen = elemento.IdAlmacen;
    this.tipoMov.idTipoMov = elemento.IdTipoMov;
    this.tipoMov.usuarioActualiza = elemento.Usuario;

    this.idTipoMov = elemento.IdTipoMov;
    this.idAlmacen = elemento.IdAlmacen;
    this.usuarioActualiza = elemento.Usuario;

    this.datosCargados = true;
    console.log(elemento);
  }


  insertar(): void {
    const nuevoMovInv = {
      idTipoMov: this.idTipoMov,
      idAlmacen: this.idAlmacen,  
      usuarioActualiza: this.usuarioActualiza
    };
<<<<<<< HEAD
    this.movInventarioService.insertMovInventario(nuevoMovInv).subscribe({
=======

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.movinventarioService.insertMovInventario(nuevoMovInv).subscribe({
>>>>>>> origin/Arkan
      next: (response) => {
        this.getData();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  limpiar(){
    this.idTipoMov = 0
    this.idAlmacen = 0
    this.usuarioActualiza = 0
    
    this.datosCargados = false
  }
 
  actualizar(){
    this.tipoMov.idAlmacen = this.idAlmacen
    this.tipoMov.idTipoMov = this.idTipoMov
    this.tipoMov.usuarioActualiza = this.usuarioActualiza
    this.movinventarioService.updateMovInventario(this.tipoMov).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.getData(); // Actualizar datos después de la actualización
        this.limpiar();
      },
      error: (error) => {
        console.error('Error al actualizar el almacen', error);
      }
    });
  }
<<<<<<< HEAD

  updateTable(){
    this.detalleMovService.getDetalleMov(this.idMovimiento).subscribe({
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

  articuloCodSelected(event: any) {
    const articuloCod = event.option.value;
    console.log('Artículo seleccionado:', articuloCod);
    this.selectedCodigo = articuloCod;
    this.selectedArticulo = articuloCod;
    this.codigo = articuloCod.Codigo;
    
  }
  
  displayArticuloCodFn(articulo: any): string {
    return articulo && articulo.Codigo ? articulo.Codigo : '';
  }
  
  private _filterArticulosCod(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.ComboCodigo.filter((option: any) => option.Codigo.toLowerCase().includes(filterValue));
  }

  private clearArticuloFields() {
    this.codigo = '';
    this.selectedCodigo = null;
    this.selectedArticulo = null;
  }

  reload(){
    location.reload();
  }

  articuloSelected(event: any) {
    const articulo = event.option.value;
    console.log(articulo);
    this.codigo = articulo.Codigo;  // Asegúrate de asignar el código del artículo aquí
    this.selectedCodigo = articulo;
    this.selectedArticulo = articulo;
    this.costo = articulo.Precio;
    console.log(articulo.Precio);
  }
  displayArticuloFn(articulo: any): string {
    return articulo ? articulo.Descripcion : '';
  }
  private _filterArticulos(value: any): any[] {
    const filterValue = (typeof value === 'string' ? value : '').toLowerCase();
    return this.ComboCodigo.filter((option:any) => option.Descripcion.toLowerCase().includes(filterValue));
  }
=======
>>>>>>> origin/Arkan
}
