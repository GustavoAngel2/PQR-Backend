import { Component, OnInit, Inject } from '@angular/core';
import { UpdateUsuario } from '../models/usuarios.models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioSevice } from '../data.service';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {
  usuario: UpdateUsuario;
  constructor(
    public dialogRef: MatDialogRef<UsuarioUpdateComponent>,
    private usuarioService: UsuarioSevice,
    @Inject(MAT_DIALOG_DATA) public data: UpdateUsuario

  ) {
    // Clona los datos recibidos para evitar la mutación directa
    this.usuario = {...data};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.usuarioService.updateUsuarios(this.usuario).subscribe({
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
