import { Component,Inject, OnInit } from '@angular/core';
import { UpdateClientes } from '../models/cliente.model';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { PersonasService } from '../data.service';
import { UpdatePersonas } from '../models/personas.model';

@Component({
  selector: 'app-personas-update',
  templateUrl: './personas-update.component.html',
  styleUrls: ['./personas-update.component.css']
})
export class PersonasUpdateComponent {
  personas: UpdatePersonas;
  constructor(
    public dialogRef: MatDialogRef<PersonasUpdateComponent>,
    private personasService: PersonasService,
    @Inject(MAT_DIALOG_DATA) public data: UpdatePersonas

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.personas = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.personasService.updatePersonas(this.personas).subscribe({
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