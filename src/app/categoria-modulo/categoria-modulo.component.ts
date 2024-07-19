import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoriaModuloService } from '../data.service';
import { CategoriaModulo, UpdateCategoriaModulo } from '../models/categoriaModulo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { AuthService, currentUser } from '../auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-categoria-modulo',
  templateUrl: './categoria-modulo.component.html',
  styleUrls: ['./categoria-modulo.component.css']
})
export class CategoriaModuloComponent  implements OnInit, AfterViewInit {
  categoriaModulo:UpdateCategoriaModulo ={
    Id :0,
    Nombre:"",
    Descripcion:"",
    Usuario :0,
  }
  datosCargados: boolean = false;


  displayedColumns: string[] = ['Id', 'Nombre', 'Descripcion', 'FechaRegistro', 'FechaActualiza','Usuario','Acciones'];
  dataSource: MatTableDataSource<CategoriaModulo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private CategoriaModuloService: CategoriaModuloService, 
    private authService: AuthService ,
    public dialog:MatDialog, 
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<CategoriaModulo>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }


  nombreCatModulo: string ='';
  descripcion:string ='';
  usuario:number =0;
  loggedInUser: currentUser = { Id: '', NombreUsuario: '' ,Rol:'', IdRol:''};

  ngOnInit() {
    this.getData()
    this.loggedInUser = this.authService.getCurrentUser(); // Obtener el usuario logeado
    console.log('Usuario logeado:', this.loggedInUser);
  }

  insertar():void{
    const nuevoCatMod ={
      nombre:this.nombreCatModulo,
      descripcion:this.descripcion,
      usuario: parseInt(this.loggedInUser.Id, 10),
    };

    this.CategoriaModuloService.insertCategoriaModulo(nuevoCatMod).subscribe({
      next:(response) => {
        this.nombreCatModulo ="";
        this.descripcion ="";
        this.usuario = 0 ;
        if(response.StatusCode == 200){
          this.toastr.success(response.message, 'Categorias de modulos');
        } else {
          this.toastr.error(response.message,'Categorias de modulos')
        }
        this.getData();
      },
      error: (error) => {
        console.error('Hubo un error al insertar la categoria', error);
      }
    });
  }




getData(){
  this.dataSource.filterPredicate = (data: CategoriaModulo, filter: string) => {
    return data.Nombre.toLowerCase().includes(filter) || 
           data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
  };
  this.CategoriaModuloService.getCategoriaModulo().subscribe({
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



  actualizar(): void {
    const CatModAct: UpdateCategoriaModulo = {
      Id: this.categoriaModulo.Id,
      Descripcion: this.descripcion,
      Nombre: this.nombreCatModulo,
      Usuario: parseInt(this.loggedInUser.Id, 10)
    };

    console.log('Actualizando Categoria:', CatModAct);
    this.CategoriaModuloService.updateCategoriaModulo(CatModAct).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        if(response.StatusCode == 200){
          this.toastr.success(response.message, 'Categorias de modulos');
        } else {
          this.toastr.error(response.message,'Categorias de modulos')
        }
        this.getData(); // Actualizar datos después de la actualización
        this.limpiar();
      },
      error: (error) => {
        console.error('Error al actualizar la categoria', error);
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
  
 //esta funcion abre la modal de insertar 
 abrirDeleteDialog(Id: number , Name: string) {
  const dialogRef = this.dialog.open(DeleteMenuComponent, {
    width: '550px',
    data: Name
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result == "yes"){
      this.CategoriaModuloService.deleteCategoriaModulo(Id).subscribe({
        next: (response) => {
          if(response.StatusCode == 200){
            this.toastr.success(response.message, 'Categorias de modulos');
          } else {
            this.toastr.error(response.message,'Categorias de modulos')
          }
          this.getData()
        },
        error: (error) => {
          console.error('Hubo un error al eliminar la categoria', error);
        }
      });
      this.getData()
    }
  });
}

cargarDatos(categoriaModulo: UpdateCategoriaModulo) {
  this.categoriaModulo.Id = categoriaModulo.Id;
  this.nombreCatModulo = categoriaModulo.Nombre;
  this.descripcion = categoriaModulo.Descripcion;
  this.usuario = parseInt(categoriaModulo.Descripcion);
  this.datosCargados = true;

}
 
limpiar():void {
  this.nombreCatModulo = "";
  this.descripcion =""
  this.datosCargados = false;
}

}
