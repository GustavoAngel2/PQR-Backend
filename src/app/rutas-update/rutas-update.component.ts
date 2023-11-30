import { Component,Inject } from '@angular/core';
import { UpdateRutas } from '../models/ruta.model';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { RutasService } from '../data.service';

@Component({
  selector: 'app-rutas-update',
  templateUrl: './rutas-update.component.html',
  styleUrls: ['./rutas-update.component.css']
})
export class RutasUpdateComponent {
    Rutas: UpdateRutas;
    constructor(
      public dialogRef: MatDialogRef<RutasUpdateComponent>,
      private RutasService: RutasService,
      @Inject(MAT_DIALOG_DATA) public data: UpdateRutas
  
    ) {
      // Clona los datos recibidos para evitar la mutación directa
      this.Rutas = {...data};
    }
  
    ngOnInit(): void {
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    guardar(): void {
      this.RutasService.updateRutas(this.Rutas).subscribe({
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
  