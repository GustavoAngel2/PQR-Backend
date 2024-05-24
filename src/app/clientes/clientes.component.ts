import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ClientesService } from '../data.service';
import { Clientes } from '../models/cliente.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientesUpdateComponent } from '../clientes-update/clientes-update.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Id', 'Nombre', 'Direccion', 'Usuario', 'FechaAct','FechaReg','Telefono','Curp','Rfc','Email','Coordenadas','Acciones'];
  dataSource: MatTableDataSource<Clientes>;
  
  //Campos para el insert
  nombreCliente: string = "";
  direccion: string = "";
  usuario: number = 0;
  telefono: number = 0;
  curp: string= "";
  email: string ="";
  rfc : string ="";
  coordenadas :string ="";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ClientesService: ClientesService, public dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<Clientes>(); // Inicializa dataSource como una instancia de MatTableDataSource
  }

  ngOnInit() {
    this.getData()
  }
  
  getData(){
    this.dataSource.filterPredicate = (data: Clientes, filter: string) => {
      return data.Nombre.toLowerCase().includes(filter) || 
             data.Id.toString().includes(filter); // Puedes añadir más campos si es necesario
    };
    this.ClientesService.getClientes().subscribe({
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
  insertar(): void {
    const nuevoCliente = {
      nombre: this.nombreCliente,
      direccion: this.direccion,
      usuario: this.usuario,
      telefono:this.telefono,
      curp : this.curp,
      rfc : this.rfc,
      email : this.email,
      coordenadas :this.coordenadas,
    };

    // Aquí asumo que tienes un método en tu servicio para insertar el departamento
    this.ClientesService.insertarClientes(nuevoCliente).subscribe({
      next: (response) => {
        this.getData();
      },
      error: (error) => {
        // Manejar el error aquí
        console.error("Hubo un error al insertar el almacen", error);
      },
    });
  }
  eliminarCliente(Id: number) {
    // Aquí puedes agregar una confirmación antes de eliminar si lo deseas
    if (confirm('¿Estás seguro de que deseas eliminar este Cliente?')) {
      this.ClientesService.deleteClientes(Id).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = this.dataSource.data.filter((cliente: Clientes) => cliente.Id !== Id);
        },
        error: (error) => {
          // Manejar el error aquí
          console.error('Hubo un error al eliminar el cliente', error);
        }
      });
    }
  }
  abrirEditarModal(Cliente: Clientes) {
    const dialogRef = this.dialog.open(ClientesUpdateComponent, {
      width: '550px',
      data: Cliente // Pasa el objeto de departamento a la modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }
}
