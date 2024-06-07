import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DetalleMovService } from '../data.service';
import { DetalleMov, deleteDetalleMov} from '../models/detalleMov.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetalleMoviemientoInsertComponent } from '../detalle-moviemiento-insert/detalle-moviemiento-insert.component';
import { DetalleMovimientoUpdateComponent } from '../detalle-movimiento-update/detalle-movimiento-update.component';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { ArticulosService } from '../data.service';
import { movInventarioService } from '../data.service';
// import { InsertarComponent } from '../insertar/insertar.component';
// import { EditarDepartamentoComponent } from '../editar-departamento/editar-departamento.component';

@Component({
  selector: 'app-detalle-movimiento',
  templateUrl: './detalle-movimiento.component.html',
  styleUrls: ['./detalle-movimiento.component.css']
 })
export class DetalleMovimientoComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'NombreMovimiento', 'Cantidad', 'Costo', 'FechaActualiza','UsuarioActualiza','Acciones'];
  dataSource: MatTableDataSource<DetalleMov>;

  idMovimiento: number = 0;
  codigo: string = '';
  cantidad: number = 0;
  costo: number = 0;
  usuarioActualiza: number = 0;
  ComboMov:any;
  ComboCodigo:any;

  insertar():void{
    const nuevoDetMov ={
      idMovimiento: this.idMovimiento,
      codigo:this.codigo,
      cantidad:this.cantidad,
      costo:this.costo,
      usuarioActualiza:this.usuarioActualiza,
    }
    this.DetalleMovService.insertarDetalleMov(nuevoDetMov).subscribe({
      next :(response)=>{
        this.idMovimiento = 0;
        this.codigo = "";
        this.cantidad=0;
        this.costo=0;
        this.usuarioActualiza=0;
        this.getData();
      },
      error:(error)=>{
        console.error('Hbo un error al inertar el detalle',error);
      }
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private DetalleMovService: DetalleMovService, 
    public dialog:MatDialog,
    private movInventarioService:movInventarioService,  
    private articulosService: ArticulosService) {
    this.dataSource = new MatTableDataSource<DetalleMov>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.getData()
    this.combos()
  }

combos(){
  this.movInventarioService.getMovInventario().subscribe((data: any) => {
    this.ComboMov = data;
    console.log(this.ComboMov)
  });
   this.articulosService.getArticulos().subscribe((data2: any) => {
    this.ComboCodigo = data2;
    console.log(this.ComboCodigo)
  });
}

getData(){    
    this.dataSource.filterPredicate = (data: DetalleMov, filter: string) => {
    return data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
  };
  this.DetalleMovService.getDetalleMov(0).subscribe({
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

  abrirDeleteDialog(Id: number , Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes"){
        this.DetalleMovService.deleteDetalleMov(Id).subscribe({
          next: (response) => {
            this.getData()
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el Detalle', error);
          }
        });
        this.getData()
      }
    });
  }

  abrirInsertarModal() {
    const dialogRef = this.dialog.open(DetalleMoviemientoInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarDetalleMov(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.DetalleMovService.deleteDetalleMov(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((detalleMov: DetalleMov) => detalleMov.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  abrirEditarModal(detalleMov: DetalleMov) {
    const dialogRef = this.dialog.open(DetalleMovimientoUpdateComponent, {
      width: '550px',
      data: detalleMov // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}