import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RutasService } from '../data.service';
import{Rutas} from '../models/rutas.model'
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RutasUpdateComponent } from '../rutas-update/rutas-update.component';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'Ruta', 'Conductor','NoLicencia', 'Matricula', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Rutas>;
  ruta: string = '';
  usuario: number = 0;
  matricula: string = '';
  nombreConductor: string = '';
  numLicencia: string = '';
  numSeguro: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private RutasService: RutasService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<Rutas>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Rutas, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.RutasService.getRutas().subscribe({
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
    const nuevaRuta = {
      nombre: this.ruta,
      matricula: this.matricula,
      conductor: this.nombreConductor,
      noLicencia: this.numLicencia,
      noSeguro: this.numSeguro,
      usuario: this.usuario,
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.RutasService.insertarRutas(nuevaRuta).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }
  eliminarRutas(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este departamento?')) {
      this.RutasService.deleteRutas(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((rutas: Rutas) => rutas.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el departamento', error);
        }
      });
    }
  }
  abrirEditarModal(rutas: Rutas) {
    const dialogRef = this.dialog.open(RutasUpdateComponent, {
      width: '550px',
      data: rutas // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
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
        this.RutasService.deleteRutas(Id).subscribe({
          next: (response) => {
            console.log(response);
            this.dataSource.data = this.dataSource.data.filter((rutas: Rutas) => rutas.Id !== Id);
          },
          error: (error) => {
            // Manejar el error aquí
            console.error('Hubo un error al eliminar el departamento', error);
          }
        });
      }
    });
  }
}
