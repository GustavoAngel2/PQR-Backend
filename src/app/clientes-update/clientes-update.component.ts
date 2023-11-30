import { Component,Inject, OnInit } from '@angular/core';
import { UpdateClientes } from '../models/cliente.model';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from '../data.service';

@Component({
  selector: 'app-clientes-update',
  templateUrl: './clientes-update.component.html',
  styleUrls: ['./clientes-update.component.css']
})
export class ClientesUpdateComponent {
  clientes: UpdateClientes;
  constructor(
    public dialogRef: MatDialogRef<ClientesUpdateComponent>,
    private clientesService: ClientesService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateClientes

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.clientes = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.clientesService.updateClientes(this.clientes).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
        location.reload();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
