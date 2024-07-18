import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ArticulosService } from '../data.service';
import { articulos, updateArticulos } from '../models/articulo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { UMService } from '../data.service';
import { AuthService, currentUser } from '../auth.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit, AfterViewInit {
  articulo: updateArticulos = {
    Id: 0,
    Codigo: '', 
    Descripcion: '',
    UM: 0,
    Costo: 0,
    Precio: 0,
    Usuario: 0
  };
  datosCargados: boolean = false;

  displayedColumns: string[] = ['Id', 'Codigo', 'Descripcion', 'UM', 'Usuario', 'Costo', 'Precio', 'Fecha Registro', 'Fecha Actualiza', 'Acciones'];
  dataSource: MatTableDataSource<articulos>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private articulosService: ArticulosService, 
    public dialog: MatDialog,
    private umService: UMService,
    private authService: AuthService  
  ) {
    this.dataSource = new MatTableDataSource<articulos>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  Id: number = 0;
  descripcion: string = '';
  codigo: string = '';
  um: number = 0;
  costo: number = 0;
  precio: number = 0;
  usuario: number = 0;
  ComboUm: any[] = [];

  loggedInUser: currentUser = { Id: '', NombreUsuario: '', Rol: '', IdRol: '' };

  ngOnInit() {
    this.getData();
    this.loggedInUser = this.authService.getCurrentUser(); // Obtener el usuario logeado
    console.log('Usuario logeado:', this.loggedInUser);
  }

  insertar(): void {
    const nuevoArticulo = {
      descripcion: this.descripcion,
      codigo: this.codigo,
      UM: this.um, // Cambiar `um` a `UM`
      costo: this.costo,
      precio: this.precio,
      Usuario: parseInt(this.loggedInUser.Id, 10) // Cambiar `usuario` a `Usuario`
    };
    this.articulosService.insertarArticulos(nuevoArticulo).subscribe({
      next: (response) => {
        this.descripcion = "";
        this.codigo = "";
        this.um = 0;
        this.costo = 0;
        this.precio = 0;
        this.usuario = 0;
        this.getData();
      }
    });
  }

  getData() {
    this.umService.getUM().subscribe((data: any) => {
      this.ComboUm = data;
      console.log(this.ComboUm);
    });
    this.dataSource.filterPredicate = (data: articulos, filter: string) => {
      return data.Descripcion.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.articulosService.getArticulos().subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); 
        if (response && Array.isArray(response) && response.length > 0) {
          this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
        } else {
          console.log('No contiene datos');
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
    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.articulosService.deleteArticulos(Id).subscribe({
          next: (response) => {
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error: ', error);
          }
        });
      }
    });
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

  actualizar(): void {
    const articuloActualizado: updateArticulos = {
      Id: this.articulo.Id,
      Descripcion: this.descripcion,
      Codigo: this.codigo,
      UM: this.um,
      Costo: this.costo,
      Precio: this.precio,
      Usuario: parseInt(this.loggedInUser.Id, 10)
    };

    console.log('Actualizando articulo:', articuloActualizado);
    this.articulosService.updateArticulos(articuloActualizado).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.getData(); // Actualizar datos después de la actualización
        this.limpiar();
      },
      error: (error) => {
        console.error('Error al actualizar el artículo', error);
      }
    });
  }

  cargarDatos(articulo: updateArticulos) {
    this.articulo.Id = articulo.Id;
    this.codigo = articulo.Codigo;
    this.descripcion = articulo.Descripcion;
    this.um = articulo.UM;
    this.costo = articulo.Costo;
    this.precio = articulo.Precio;
    this.usuario = articulo.Usuario;
    this.datosCargados = true;
  }

  limpiar(): void {
    this.codigo = "";
    this.descripcion = "";
    this.um = 0;
    this.costo = 0;
    this.precio = 0;
    this.usuario = 0;
    this.datosCargados = false;

  }
}
