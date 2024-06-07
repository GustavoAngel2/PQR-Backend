import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlmacenesService, ModulosService } from '../data.service';
import { Modulo } from '../models/modulo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModulosUpdateComponent } from '../modulos-update/modulos-update.component';

@Component({
  selector: 'app-almacenes',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
 })
export class ModulosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'NombreModulo', 'CategoriaModulo', 'Usuario', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Modulo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ModulosService: ModulosService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<Modulo>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.getData();
  }


  getData(){
    this.dataSource.filterPredicate = (data: Modulo, filter: string) => {
      // Convertir a minúsculas para evitar problemas de coincidencia
      const filterLowerCase = filter.toLowerCase();
      const nombreModulo = data.NombreModulo.toLowerCase();
      const categoria = data.CategoriaModulo.toString().toLowerCase();
      const Usuario = data.Usuario.toString().toLowerCase();
  
      // Comprobar ambas condiciones
      return nombreModulo.includes(filterLowerCase) || categoria.includes(filterLowerCase) || Usuario.includes(filterLowerCase);
      };
    this.ModulosService.getModulos().subscribe({
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
  // Método para realizar el filtrado
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarModulo(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este modulo?')) {
      this.ModulosService.deleteModulos(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((modulo: Modulo) => modulo.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el modulo', error);
        }
      });
    }
  }
  abrirEditarModal(modulo: Modulo) {
    const dialogRef = this.dialog.open(ModulosUpdateComponent, {
      width: '550px',
      data: modulo // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}