import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PersonasService } from '../data.service';
import { Personas,DeletePersonas } from '../models/personas.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersonasUpdateComponent } from '../personas-update/personas-update.component';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Nombre', 'ApPaterno','ApMaterno','Direccion', 'Usuario', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Personas>;
  nombre: string = '';
  ApPaterno : string = '';
  ApMaterno : string = '';
  direccion: string = '';
  usuario: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private PersonasService: PersonasService, public dialog:MatDialog, public toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<Personas>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.getData()
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

  getData(){
    this.dataSource.filterPredicate = (data: Personas, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.PersonasService.getPersonas().subscribe({
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

  abrirEditarModal(personas: Personas) {
    const dialogRef = this.dialog.open(PersonasUpdateComponent, {
      width: '550px',
      data: personas // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

  insertar(): void {
    const nuevaPersona = {
      nombre: this.nombre,
      ApPaterno:this.ApPaterno,
      ApMaterno:this.ApMaterno,
      direccion: this.direccion,  
      usuario: this.usuario  
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.PersonasService.insertarClientes(nuevaPersona).subscribe({
      next: (response) => {
        this.getData();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
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
        this.PersonasService.deletePersonas(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.message, 'Almacenes');
            } else {
              this.toastr.error(response.message,'Almacenes')
            }
            this.getData();
          },
          error: (error) => {
            console.error('Hubo un error al eliminar el almacén', error);
          }
        });
      }
    });
  }
}
