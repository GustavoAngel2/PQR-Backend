import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovInventario, UpdateMovInventario } from '../models/movInventario.model';
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

@Component({
  selector: 'app-mov-inventario',
  templateUrl: './mov-inventario.component.html',
  styleUrls: ['./mov-inventario.component.css']
})
export class MovInventarioComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'IdTicket', 'Codigo', 'Articulo', 'Cantidad', 'Total','Usuario' , 'Estatus' ,'Acciones'];
  dataSource: MatTableDataSource<MovInventario>;
  idTipoMov: number = 0;
  idAlmacen: number = 0;
  idDestino: number = 0;
  usuarioActualiza: number = 0;
  ComboTipoMov:any;
  ComboAlmacen:any;
  tipoMov: UpdateMovInventario = {
    Id: 0,
    idAlmacen: 0,
    idTipoMov: 0,
    usuarioActualiza: 0,
  };
  datosCargados: boolean = false;
  isOnStepTwo: boolean = false;

  idMovimiento: any;
  codigo: string = '';
  cantidad: number = 0;
  costo: number = 0;
  ComboMov:any;
  ComboCodigo:any;
  filteredArticulos: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private movInventarioService: movInventarioService,
    public dialog: MatDialog,
    private almacenesService: AlmacenesService,
    private tiposMovService: TiposMovService,
    private detalleMovService: DetalleMovService,
    private articulosService: ArticulosService
  ) {
    this.dataSource = new MatTableDataSource<MovInventario>();
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData() {
    this.movInventarioService.getMovInventario().subscribe((data: any) => {
      this.ComboMov = data;
      console.log(this.ComboMov);
    });
    this.articulosService.getArticulos().subscribe((data2: any) => {
      this.ComboCodigo = data2;
      console.log(this.ComboCodigo);
    });
    this.tiposMovService.getTiposMov().subscribe((data: any) => {
      this.ComboTipoMov = data;
      console.log(this.ComboTipoMov);
    });
    this.almacenesService.getAlmacenes().subscribe((data2: any) => {
      this.ComboAlmacen = data2;
      console.log(this.ComboAlmacen);
    });

    this.dataSource.filterPredicate = (data: MovInventario, filter: string) => {
      return data.IdTipoMov.toString().toLowerCase().includes(filter);
    };
  }

  abrirDeleteDialog(Id: number, Name: string) {
    this.limpiar();
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.detalleMovService.deleteDetalleMov(Id).subscribe({
          next: (response) => {
            this.updateTable();
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

  insertarMov(): void {
    const nuevoMovInv = {
      idTipoMov: this.idTipoMov,
      idAlmacen: this.idAlmacen,
      idDestino: this.idDestino,
      usuarioActualiza: this.usuarioActualiza
    };

    this.movInventarioService.insertMovInventario(nuevoMovInv).subscribe({
      next: (response) => {
        this.idMovimiento = response.response.data;
        console.log(nuevoMovInv)
        this.isOnStepTwo = true
        this.getData();
      },
      error: (error) => {
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  insertarDetalleMov() {
    const nuevoDetalleMov = {
      idMovimiento: this.idMovimiento,
      codigo: this.codigo,
      cantidad: this.cantidad,
      costo: this.costo,
      usuarioActualiza: this.usuarioActualiza
    };

    this.detalleMovService.insertarDetalleMov(nuevoDetalleMov).subscribe({
      next: (response) => {
        this.updateTable();
      },
      error: (error) => {
        console.error('Hubo un error al insertar el detalle del movimiento', error);
      }
    });
  }

  filterArticulos() {
    const filterValue = this.codigo.toLowerCase();
    this.filteredArticulos = this.ComboCodigo.filter((articulo: any) =>
      articulo.Descripcion.toLowerCase().includes(filterValue)
    );
  }

  limpiar() {
    this.idTipoMov = 0;
    this.idAlmacen = 0;
    this.usuarioActualiza = 0;
    this.datosCargados = false;
  }

  actualizar() {
    this.tipoMov.idAlmacen = this.idAlmacen;
    this.tipoMov.idTipoMov = this.idTipoMov;
    this.tipoMov.usuarioActualiza = this.usuarioActualiza;
    this.movInventarioService.updateMovInventario(this.tipoMov).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.getData();
        this.limpiar();
      },
      error: (error) => {
        console.error('Error al actualizar el almacen', error);
      }
    });
  }

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

}
