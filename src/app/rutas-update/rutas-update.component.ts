import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { UpdateRutas } from '../models/rutas.model';
import { RutasService } from '../data.service';

@Component({
  selector: 'app-rutas-update',
  templateUrl: './rutas-update.component.html',
  styleUrls: ['./rutas-update.component.css']
})
export class RutasUpdateComponent implements OnInit {
  rutas: UpdateRutas;
  constructor(
    public dialogRef: MatDialogRef<RutasUpdateComponent>,
    private rutasService: RutasService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateRutas

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.rutas = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.rutasService.updateRutas(this.rutas).subscribe({
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
