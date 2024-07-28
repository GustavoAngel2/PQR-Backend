import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RutasService } from '../data.service';
import { Rutas, UpdateRutas } from '../models/rutas.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { AuthService, currentUser } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'Ruta', 'Conductor','NoLicencia', 'Matricula', 'NoSeguro', 'FechaAct','FechaReg','Acciones'];
  dataSource: MatTableDataSource<Rutas>;
  id: number = 0;
  ruta: string = '';
  usuario: number = 0;
  matricula: string = '';
  nombreConductor: string = '';
  numLicencia: string = '';
  numSeguro: string = '';
  isModifying: boolean = false;

  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', Rol: '' }


  rutas:UpdateRutas ={
    Id:0,
    Nombre: '',
    Matricula: '',
    Conductor: '',
    NoLicencia: '',
    NoSeguro: '',
    Usuario: parseInt(this.loggedUser.Id, 10)
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private RutasService: RutasService, public authService:AuthService, public toastr:ToastrService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<Rutas>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.loggedUser = this.authService.getCurrentUser();
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
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Rutas');
        } else {
          this.toastr.error(response.response.data,'Rutas')
        }
        this.getData()
      },
      error: (error) => {
        // Manejar el error aquí
        console.error('Hubo un error al insertar el almacen', error);
      }
    });
  }

  cargarDatos(rutas: UpdateRutas) {
    this.id = rutas.Id
    this.ruta = rutas.Nombre
    this.usuario = parseInt(this.loggedUser.Id, 10),
    this.matricula = rutas.Matricula
    this.nombreConductor = rutas.Conductor
    this.numLicencia = rutas.NoLicencia
    this.numSeguro = rutas.NoSeguro
    this.isModifying = true
  }

  limpiar(){
    this.id = 0
    this.ruta = ''
    this.usuario = parseInt(this.loggedUser.Id, 10),
    this.matricula = ''
    this.nombreConductor = ''
    this.numLicencia = ''
    this.numSeguro = ''
    this.isModifying = false
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
            if(response.StatusCode == 200){
              this.toastr.success(response.response.data, 'Rutas');
            } else {
              this.toastr.error(response.response.data,'Rutas')
            }
            console.log(response)
            this.getData()
          },
          error: (error) => {
            // Manejar el error aquí
            console.error('Hubo un error al eliminar el departamento', error);
          }
        });
      }
    });
  }

  update() {
    const Ruta: UpdateRutas =  {
      Id: this.id, // Asegúrate de que 'this.id' es un número
      Nombre: this.ruta,
      Matricula: this.matricula,
      Conductor: this.nombreConductor,
      NoLicencia: this.numLicencia,
      NoSeguro: this.numSeguro,
      Usuario: parseInt(this.loggedUser.Id, 10) // Convierte 'this.loggedUser.Id' a número
    };
  
    this.RutasService.updateRutas(Ruta).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Rutas');
        } else {
          this.toastr.error(response.response.data,'Rutas')
        }
        this.getData();
        this.limpiar();
        this.isModifying = false;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  
}
