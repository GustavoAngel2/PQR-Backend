import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Existencia, UpdateExistencia } from '../models/existencia.model';
import { ExistenciasService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { ArticulosService } from '../data.service';
import { AlmacenesService } from '../data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, currentUser } from '../auth.service';


@Component({
  selector: 'app-existencias',
  templateUrl: './existencias.component.html',
  styleUrls: ['./existencias.component.css']
})
export class ExistenciasComponent  implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Codigo', 'Almacen', 'Cantidad', 'Usuario', 'FechaRegistro', 'FechaActualiza', 'Acciones'];
  dataSource: MatTableDataSource<Existencia>;

  codigo: string = '';
  almacen: string = '' ;
  cantidad: number = 0;
  usuario: number = 0;
  ComboCodigo:any;
  ComboAlmacen:any;

  datosCargados: boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private existenciasService: ExistenciasService,
    public dialog:MatDialog,
    private authService: AuthService, 
    private ArticuloService: ArticulosService,
    private AlmacenesService : AlmacenesService,
    private toastr: ToastrService
  ) 
    {
    this.dataSource = new MatTableDataSource<Existencia>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  loggedInUser: currentUser = { Id: '', NombreUsuario: '' ,Rol:'', IdRol:''};

  existencias:UpdateExistencia ={
    Id:0,
    Codigo:'',
    Almacen:0,
    Cantidad:0,
    Usuario:0
  }


  ngOnInit() {
  this.getData();
  this.loggedInUser = this.authService.getCurrentUser(); // Obtener el usuario logeado
    console.log('Usuario logeado:', this.loggedInUser);
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

  insertar(): void {
    const nuevoExistencia = {
      codigo: this.codigo,
      almacen: this.almacen,  
      cantidad: this.cantidad,
      usuario: parseInt(this.loggedInUser.Id, 10),
      
    };

      this.existenciasService.insertExistencias(nuevoExistencia).subscribe({
        next: (response) => {
          this.getData();
          this.limpiar();
          console.log(response)
          if(response.StatusCode == 200){
            this.toastr.success(response.response.data, 'Almacenes');
          } else {
            this.toastr.error(response.response.data,'Almacenes')
          }
        },
        error: (error) => {
          console.error('Hubo un error al insertar el almacen', error);
        }
      });
  
  }


  getData() {
    this.dataSource.filterPredicate = (data: Existencia , filter: string) => {
      return data.Codigo.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter) || 
             data.Almacen.toLowerCase().includes(filter);
    };

    this.ArticuloService.getArticulos().subscribe((data: any) => {
      this.ComboCodigo = data;
      console.log(this.ComboCodigo)
    });
     this.AlmacenesService.getAlmacenes().subscribe((data2: any) => {
      this.ComboAlmacen = data2;
      console.log(this.ComboAlmacen)
    });
    this.dataSource.filterPredicate = (data: Existencia, filter: string) => {
      return data.Almacen.toLowerCase().includes(filter)// Puedes añadir más campos si es necesario
    };
    this.existenciasService.getExistencias(0).subscribe({
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
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });
    console.log(Id)
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.existenciasService.deleteExistencias(Id).subscribe({
          next: (response) => {
            console.log(response)
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Existencias');
            } else {
              this.toastr.error(response.response.data,'Existencias')
            }
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar la Existencia', error);
          }
        });
      }
    });
  }

  actualizar(): void {
    const existenciaActualizada: UpdateExistencia = {
      Id: this.existencias.Id,
      Codigo: this.codigo,
      Almacen: parseInt(this.almacen),
      Cantidad: this.cantidad,
      Usuario: parseInt(this.loggedInUser.Id, 10),
    };
  
    console.log('Actualizando existencia:', existenciaActualizada);
    this.existenciasService.updateExistencias(existenciaActualizada).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.getData(); // Actualizar datos después de la actualización
        this.limpiar();
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Existencias');
        } else {
          this.toastr.error(response.response.data,'Existencias')
        }
      },
      error: (error) => {
        console.error('Error al actualizar la Existencia', error);
      }
    });
  }

  cargarDatos(existencia: UpdateExistencia) {
    this.existencias.Id=existencia.Id
    this.datosCargados = true;
    this.codigo = existencia.Codigo.toString()
    this.cantidad = existencia.Cantidad
    console.log('Existencia a actualizar: ',this.existencias.Id)
  }

  limpiar(): void{
    this.codigo = '';
    this.almacen = '';
    this.cantidad= 0;
    this.datosCargados =false;
  }

}
