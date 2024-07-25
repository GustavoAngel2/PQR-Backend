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
  almacen: number = 0 ;
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
          console.log(response)
          if(response.StatusCode == 200){
            this.toastr.success(response.response.data.toString(), 'Almacenes');
          } else {
            this.toastr.error(response.response.data.toString(),'Almacenes')
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
            if(response.StatusCode == 200){
              this.toastr.success(response.message, 'Existencias');
            } else {
              this.toastr.error(response.message,'Existencias')
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

  cargarDatos(existencia: UpdateExistencia) {
    
    this.datosCargados = true;
  }

  limpiar(): void{
    
    this.datosCargados =false;
  }

}
