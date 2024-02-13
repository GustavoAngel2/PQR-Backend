import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateModulo } from '../models/modulo.model';
import { ModulosService } from '../data.service';

@Component({
  selector: 'app-modulos-update',
  templateUrl: './modulos-update.component.html',
  styleUrls: ['./modulos-update.component.css']
})
export class ModulosUpdateComponent implements OnInit {
  modulo: UpdateModulo;
  constructor(
    public dialogRef: MatDialogRef<ModulosUpdateComponent>,
    private modulosService: ModulosService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateModulo

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.modulo = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.modulosService.updateModulos(this.modulo).subscribe({
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




