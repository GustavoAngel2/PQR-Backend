// import { Component,Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
// import { EditarAlmacenes } from '../models/almacen.model';
// import { AlmacenesService } from '../data.service';

// @Component({
//   selector: 'app-almacenes-update',
//   templateUrl: './almacenes-update.component.html',
//   styleUrls: ['./almacenes-update.component.css']
// })
// export class AlmacenesUpdateComponent implements OnInit {
//   departamento: EditarDepartamento;
//   constructor(
//     public dialogRef: MatDialogRef<EditarDepartamentoComponent>,
//     private departamentoService: DepartamentoService,
//     @Inject(MAT_DIALOG_DATA) public data: EditarDepartamento

//   ) {
//     // Clona los datos recibidos para evitar la mutación directa
//     this.departamento = {...data};
//   }

//   ngOnInit(): void {
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   guardar(): void {
//     this.departamentoService.actualizarDepartamento(this.departamento).subscribe({
//       next: (response) => {
//         // Cerrar la modal y posiblemente actualizar la tabla
//         this.dialogRef.close(this.departamento);
//       },
//       error: (error) => {
//         // Manejar errores aquí
//       }
//     });
//   }
// }



// //---------------------------------------------------------------------------
// import { EditarDepartamento } from '../models/departamento.models';
// import { DepartamentoService } from '../data.service';

// @Component({
//   selector: 'app-editar-departamento',
//   templateUrl: './editar-departamento.component.html',
//   //styleUrls: ['./editar-departamento.component.css']
// })
// export class EditarDepartamentoComponent implements OnInit {
//   departamento: EditarDepartamento;
//   constructor(
//     public dialogRef: MatDialogRef<EditarDepartamentoComponent>,
//     private departamentoService: DepartamentoService,
//     @Inject(MAT_DIALOG_DATA) public data: EditarDepartamento

//   ) {
//     // Clona los datos recibidos para evitar la mutación directa
//     this.departamento = {...data};
//   }

//   ngOnInit(): void {
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   guardar(): void {
//     this.departamentoService.actualizarDepartamento(this.departamento).subscribe({
//       next: (response) => {
//         // Cerrar la modal y posiblemente actualizar la tabla
//         this.dialogRef.close(this.departamento);
//       },
//       error: (error) => {
//         // Manejar errores aquí
//       }
//     });
//   }
// }
