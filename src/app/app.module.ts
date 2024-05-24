import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { AlmacenesComponent } from "./almacenes/almacenes.component";
import { HttpClientModule } from "@angular/common/http";
import { AlmacenesInsertComponent } from "./almacenes-insert/almacenes-insert.component";
import { AlmacenesUpdateComponent } from "./almacenes-update/almacenes-update.component";
import { DetalleMovimientoComponent } from "./detalle-movimiento/detalle-movimiento.component";
import { DetalleMoviemientoInsertComponent } from "./detalle-moviemiento-insert/detalle-moviemiento-insert.component";
import { DetalleMovimientoUpdateComponent } from "./detalle-movimiento-update/detalle-movimiento-update.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { TicketsInsertComponent } from "./tickets-insert/tickets-insert.component";
import { TicketsUpdateComponent } from "./tickets-update/tickets-update.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { UsuariosInsertComponent } from "./usuarios-insert/usuarios-insert.component";
import { UsuarioUpdateComponent } from "./usuario-update/usuario-update.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ArticulosComponent } from "./articulos/articulos.component";
import { PersonasComponent } from "./personas/personas.component";
import { RutasComponent } from "./rutas/rutas.component";
import { ClientesInsertComponent } from "./clientes-insert/clientes-insert.component";
import { ClientesUpdateComponent } from "./clientes-update/clientes-update.component";
import { ArticulosInsertComponent } from "./articulos-insert/articulos-insert.component";
import { ArticulosUpdateComponent } from "./articulos-update/articulos-update.component";
import { PersonasInsertComponent } from "./personas-insert/personas-insert.component";
import { PersonasUpdateComponent } from "./personas-update/personas-update.component";
import { RutasInsertComponent } from "./rutas-insert/rutas-insert.component";
import { RutasUpdateComponent } from "./rutas-update/rutas-update.component";
import { ExistenciasComponent } from "./existencias/existencias.component";
import { ExistenciasInsertComponent } from "./existencias-insert/existencias-insert.component";
import { ExistenciasUpdateComponent } from "./existencias-update/existencias-update.component";
import { MovInventarioComponent } from "./mov-inventario/mov-inventario.component";
import { MovInventarioInsertComponent } from "./mov-inventario-insert/mov-inventario-insert.component";
import { MovInventarioUpdateComponent } from "./mov-inventario-update/mov-inventario-update.component";
import { DetalleTicketComponent } from "./detalle-ticket/detalle-ticket.component";
import { DetalleTicketInsertComponent } from "./detalle-ticket-insert/detalle-ticket-insert.component";
import { DetalleTicketUpdateComponent } from "./detalle-ticket-update/detalle-ticket-update.component";
import { LoginComponent } from "./login/login.component";
import { InicioComponent } from './inicio/inicio.component';
import { ModulosComponent } from './modulos/modulos.component';
import { ModulosInsertComponent } from './modulos-insert/modulos-insert.component';
import { ModulosUpdateComponent } from './modulos-update/modulos-update.component';
import { EmpleadosComponent } from "./empleados/empleados.component";
import { EmpleadosInsertComponent } from "./empleados-insert/empleados-insert.component";
import { EmpleadosUpdateComponent } from "./empleados-update/empleados-update.component";
import { PuestosComponent } from "./puestos/puestos.component";
import { PuestosInsertComponent } from "./puestos-insert/puestos-insert.component";
import { PuestosUpdateComponent } from "./puestos-update/puestos-update.component";
import { CategoriaModuloComponent } from './categoria-modulo/categoria-modulo.component';
import { CategoriaModuloInsertComponent } from "./categoria-modulo-insert/categoria-modulo-insert.component";
import { CategoriaModuloUpdateComponent } from "./categoria-modulo-update/categoria-modulo-update.component";
import { DetallePerfilComponent } from './detalle-perfil/detalle-perfil.component';
import { DetallePerfilInsertComponent } from './detalle-perfil-insert-component/detalle-perfil-insert-component.component';
import { DetallePerfilUpdateComponent } from './detalle-perfil-update/detalle-perfil-update.component';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteMenuComponent } from './delete-menu/delete-menu.component';


const appRoutes: Routes = [

  { path: "inicio", component:InicioComponent },
  { path: "almacenes", component: AlmacenesComponent },
  { path: "clientes", component: ClientesComponent },
  { path: "articulos", component: ArticulosComponent },
  { path: "personas", component: PersonasComponent },
  { path: "rutas", component: RutasComponent },
  { path: "detallemovimiento", component: DetalleMovimientoComponent },
  { path: "tickets", component: TicketsComponent },
  { path: "usuarios", component: UsuariosComponent },
  { path: "existencias", component: ExistenciasComponent },
  { path: "movinventarios", component: MovInventarioComponent },
  /* { path: "detalleticket", component: DetalleTicketComponent }, */
  { path: "categoriamodulo", component: CategoriaModuloComponent },
  { path: "login", component: LoginComponent },
  { path: "modulos",component: ModulosComponent},
  { path:"empleados", component:EmpleadosComponent},
  { path:"puestos",component:PuestosComponent},
  { path: "categoriamodulo", component:PuestosComponent},
  { path: "detallePerfil", component: DetallePerfilComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AlmacenesComponent,
    AlmacenesUpdateComponent,
    AlmacenesInsertComponent,
    ClientesComponent,
    ClientesInsertComponent,
    ClientesUpdateComponent,
    ArticulosComponent,
    ArticulosInsertComponent,
    ArticulosUpdateComponent,
    PersonasComponent,
    PersonasInsertComponent,
    PersonasUpdateComponent,
    RutasComponent,
    RutasInsertComponent,
    RutasUpdateComponent,
    DetalleMovimientoComponent,
    DetalleMoviemientoInsertComponent,
    DetalleMovimientoUpdateComponent,
    TicketsComponent,
    TicketsInsertComponent,
    TicketsUpdateComponent,
    UsuariosComponent,
    UsuariosInsertComponent,
    UsuarioUpdateComponent,
    ExistenciasComponent,
    ExistenciasInsertComponent,
    ExistenciasUpdateComponent,
    MovInventarioComponent,
    MovInventarioInsertComponent,
    MovInventarioUpdateComponent,
    DetalleTicketComponent,
    DetalleTicketInsertComponent,
    DetalleTicketUpdateComponent,
    LoginComponent,
    InicioComponent,
    ModulosComponent,
    ModulosInsertComponent,
    ModulosUpdateComponent,
    EmpleadosComponent,
    EmpleadosInsertComponent,
    EmpleadosUpdateComponent,
    PuestosComponent,
    PuestosInsertComponent,
    PuestosUpdateComponent,
    CategoriaModuloComponent,
    CategoriaModuloInsertComponent,
    CategoriaModuloUpdateComponent,
    DetallePerfilComponent,
    DetallePerfilInsertComponent,
    DetallePerfilUpdateComponent,
    DeleteMenuComponent,
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatPaginatorModule 
  ],
  providers: [
    // Agrega el servicio en los providers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
