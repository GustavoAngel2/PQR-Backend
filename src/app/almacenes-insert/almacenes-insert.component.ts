import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlmacenesService } from '../data.service';

@Component({
  selector: 'app-almacenes-insert',
  templateUrl: './almacenes-insert.component.html',
  styleUrls: ['./almacenes-insert.component.css']
})
export class AlmacenesInsertComponent {
  nombreAlmacen: string = '';
  direccion: string = '';
  usuario: number = 0;
  encargado:number = 0;

  constructor(
    public dialogRef: MatDialogRef<AlmacenesInsertComponent>,
    private almacenesService: AlmacenesService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}

