import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PuestosService } from "../data.service";
import { Puesto } from "../models/puestos.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PuestosUpdateComponent } from "../puestos-update/puestos-update.component";
import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { ToastrService } from 'ngx-toastr';

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
  nombre: string = "";
  descripcion: string = "";
  salario: number = 0;
  usuarioActualiza: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private toastr: ToastrService,
    private puestosService: PuestosService,
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

  abrirEditarModal(articulos: Puesto) {
    const dialogRef = this.dialog.open(PuestosUpdateComponent, {
      width: "550px",
      data: articulos, // Pasa el objeto de departamento a la modal
    });

    dialogRef.afterClosed().subscribe((result) => {
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
        this.puestosService.deletePuestos(Id).subscribe({
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

  getData(){
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
      usuarioActualiza: this.usuarioActualiza,
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.puestosService.insertarPuestos(nuevoPuesto).subscribe({
      next: (response) => {
        this.getData()
      },
      error: (error) => {
        // Manejar el error aquí
        console.error("Hubo un error al insertar el almacen", error);
      },
    });
  }
}

