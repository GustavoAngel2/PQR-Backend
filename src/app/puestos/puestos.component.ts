import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PuestosService } from "../data.service";
import { Puesto } from "../models/puestos.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService, currentUser } from '../auth.service';

@Component({
  selector: "app-puestos",
  templateUrl: "./puestos.component.html",
  styleUrls: ["./puestos.component.css"],
})
export class PuestosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "Id",
    "nombre",
    "descripcion",
    "salario",
    "fechaRegistro",
    "fechaActualiza",
    "Acciones",
  ];
  dataSource: MatTableDataSource<Puesto>;
  id: number = 0;
  nombre: string = "";
  descripcion: string = "";
  salario: number = 0;
  loggedUser: currentUser = { Id: '', NombreUsuario: '', IdRol: '', Rol: '' }
  isModifying: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: ToastrService,
    private puestosService: PuestosService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<Puesto>(); // Inicializa dataSource como una instancia de MatTableDataSource
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

  abrirDeleteDialog(Id: number, Name: string) {
    const dialogRef = this.dialog.open(DeleteMenuComponent, {
      width: '550px',
      data: Name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "yes") {
        this.puestosService.deletePuestos(Id).subscribe({
          next: (response) => {
            if(response.StatusCode == 200){
              this.toastr.success(response.message, 'Puestos');
            } else {
              this.toastr.error(response.message,'Puestos')
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

  getData(){
    this.loggedUser = this.authService.getCurrentUser();
    this.dataSource.filterPredicate = (data: Puesto, filter: string) => {
      return (
        data.nombre.toLowerCase().includes(filter) ||
        data.descripcion.toLowerCase().includes(filter) ||
        data.Id.toString().includes(filter)
      ); // Puedes añadir más campos si es necesario
    };
    this.puestosService.getPuestos().subscribe({
      next: (response) => {
        console.log("Respuesta del servidor:", response);
        if (response && Array.isArray(response) && response.length > 0) {
          this.dataSource.data = response; // Asigna los datos al atributo 'data' de dataSource
        } else {
          console.log("no contiene datos");
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  insertar(){
    const nuevoPuesto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      salario: this.salario,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.puestosService.insertarPuestos(nuevoPuesto).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Puestos');
        } else {
          this.toastr.error(response.response.data,'Puestos')
        }
        this.getData()
        this.limpiar()
      },
      error: (error) => {
        // Manejar el error aquí
        console.error("Hubo un error al insertar el almacen", error);
      },
    });
  }

  cargarDatos(elemento:Puesto){
    this.id = elemento.Id;
    this.nombre = elemento.nombre
    this.descripcion = elemento.descripcion
    this.salario = elemento.salario
    this.isModifying = true
  }

  update(){
    const Puesto = {
      Id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      salario: this.salario,
      usuarioActualiza: parseInt(this.loggedUser.Id,10)
    };
    

    this.puestosService.updatePuestos(Puesto).subscribe({
      next: (response) => {
        if(response.StatusCode == 200){
          this.toastr.success(response.response.data, 'Puestos');
        } else {
          this.toastr.error(response.response.data,'Puestos')
        }
        this.getData()
        this.limpiar()

      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  limpiar(){
    this.id = 0;
    this.nombre = ''
    this.descripcion = ''
    this.salario = 0
    this.isModifying = false
  }
}

