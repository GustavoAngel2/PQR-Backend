import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenesComponent } from "./almacenes/almacenes.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ArticulosComponent } from "./articulos/articulos.component";
import { PersonasComponent } from "./personas/personas.component";
import { RutasComponent } from "./rutas/rutas.component";
import { DetalleMovimientoComponent } from "./detalle-movimiento/detalle-movimiento.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { ExistenciasComponent } from "./existencias/existencias.component";
import { MovInventarioComponent } from "./mov-inventario/mov-inventario.component";
import { DetalleTicketComponent } from "./detalle-ticket/detalle-ticket.component";
import { CategoriaModuloComponent } from './categoria-modulo/categoria-modulo.component';
import { LoginComponent } from "./login/login.component";
import { InicioComponent } from './inicio/inicio.component';
import { ModulosComponent } from './modulos/modulos.component';
import { EmpleadosComponent } from "./empleados/empleados.component";
import { PuestosComponent } from "./puestos/puestos.component";
import { DetallePerfilComponent } from './detalle-perfil/detalle-perfil.component';

import { AuthGuard } from './auth.guard'; // Importa AuthGuard

const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "inicio", component: InicioComponent, canActivate: [AuthGuard] },
  { path: "almacenes", component: AlmacenesComponent, canActivate: [AuthGuard] },
  { path: "clientes", component: ClientesComponent, canActivate: [AuthGuard] },
  { path: "articulos", component: ArticulosComponent, canActivate: [AuthGuard] },
  { path: "personas", component: PersonasComponent, canActivate: [AuthGuard] },
  { path: "rutas", component: RutasComponent, canActivate: [AuthGuard] },
  { path: "detallemovimiento", component: DetalleMovimientoComponent, canActivate: [AuthGuard] },
  { path: "tickets", component: TicketsComponent, canActivate: [AuthGuard] },
  { path: "usuarios", component: UsuariosComponent, canActivate: [AuthGuard] },
  { path: "existencias", component: ExistenciasComponent, canActivate: [AuthGuard] },
  { path: "movinventarios", component: MovInventarioComponent, canActivate: [AuthGuard] },
  { path: "detalleticket", component: DetalleTicketComponent, canActivate: [AuthGuard] },
  { path: "categoriamodulo", component: CategoriaModuloComponent, canActivate: [AuthGuard] },
  { path: "modulos", component: ModulosComponent, canActivate: [AuthGuard] },
  { path: "empleados", component: EmpleadosComponent, canActivate: [AuthGuard] },
  { path: "puestos", component: PuestosComponent, canActivate: [AuthGuard] },
  { path: "detallePerfil", component: DetallePerfilComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
