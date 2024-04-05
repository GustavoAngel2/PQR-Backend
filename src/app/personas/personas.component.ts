import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ClientesService, PersonasService } from '../data.service';
import { Personas,DeletePersonas } from '../models/personas.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersonasInsertComponent } from '../personas-insert/personas-insert.component';
import { PersonasUpdateComponent } from '../personas-update/personas-update.component';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['Id', 'Nombre', 'ApPaterno','ApMaterno','Direccion', 'Usuario', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Personas>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private PersonasService: PersonasService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<Personas>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
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
  abrirInsertarModal() {
    const dialogRef = this.dialog.open(PersonasInsertComponent, {
      width: '550px',
      // Puedes pasar datos al componente de la modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejar los resultados cuando la modal se cierre
    });
  }
  eliminarPersona(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.PersonasService.deletePersonas(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((Persona: Personas) => Persona.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar a la persona', error);
        }
      });
    }
  }
  abrirEditarModal(personas: Personas) {
    const dialogRef = this.dialog.open(PersonasUpdateComponent, {
      width: '250px',
      data: personas // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}
