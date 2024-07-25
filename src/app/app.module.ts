//Materials

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

//Componentes

import { AlmacenesComponent } from "./almacenes/almacenes.component";
import { DetalleMovimientoComponent } from "./detalle-movimiento/detalle-movimiento.component";
import { DetalleMoviemientoViewComponent } from "./detalle-movimiento-view/detalle-moviemiento-view.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { UsuariosInsertComponent } from "./usuarios-insert/usuarios-insert.component";
import { UsuarioUpdateComponent } from "./usuario-update/usuario-update.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { ArticulosComponent } from "./articulos/articulos.component";
import { PersonasComponent } from "./personas/personas.component";
import { RutasComponent } from "./rutas/rutas.component";
import { PersonasInsertComponent } from "./personas-insert/personas-insert.component";
import { PersonasUpdateComponent } from "./personas-update/personas-update.component";
import { ExistenciasComponent } from "./existencias/existencias.component";
import { ExistenciasInsertComponent } from "./existencias-insert/existencias-insert.component";
import { ExistenciasUpdateComponent } from "./existencias-update/existencias-update.component";
import { MovInventarioComponent } from "./mov-inventario/mov-inventario.component";
import { DetalleTicketComponent } from "./detalle-ticket/detalle-ticket.component";
import { DetalleTicketInsertComponent } from "./detalle-ticket-insert/detalle-ticket-insert.component";
import { LoginComponent } from "./login/login.component";
import { InicioComponent } from './inicio/inicio.component';
import { ModulosComponent } from './modulos/modulos.component';
import { ModulosUpdateComponent } from './modulos-update/modulos-update.component';
import { EmpleadosComponent } from "./empleados/empleados.component";
import { PuestosComponent } from "./puestos/puestos.component";
import { PuestosInsertComponent } from "./puestos-insert/puestos-insert.component";
import { PuestosUpdateComponent } from "./puestos-update/puestos-update.component";
import { CategoriaModuloComponent } from './categoria-modulo/categoria-modulo.component';
import { CategoriaModuloUpdateComponent } from "./categoria-modulo-update/categoria-modulo-update.component";
import { DetallePerfilComponent } from './detalle-perfil/detalle-perfil.component';
import { DetallePerfilInsertComponent } from './detalle-perfil-insert-component/detalle-perfil-insert-component.component';
import { DetallePerfilUpdateComponent } from './detalle-perfil-update/detalle-perfil-update.component';
import { DeleteMenuComponent } from './delete-menu/delete-menu.component';
import { AuthGuard } from './auth.guard'; // Importa AuthGuard
import { AuthService } from './auth.service'; // Importa AuthService
import { AuthInterceptor } from "./auth.interceptor";
import { UserService } from "./user.service";
import { DialogsComponent } from './dialogs/dialogs.component';

@NgModule({
  declarations: [
    AppComponent,
    AlmacenesComponent,
    ClientesComponent,
    ArticulosComponent,
    PersonasComponent,
    PersonasInsertComponent,
    PersonasUpdateComponent,
    RutasComponent,
    DetalleMovimientoComponent,
    DetalleMoviemientoViewComponent,
    TicketsComponent,
    UsuariosComponent,
    UsuariosInsertComponent,
    UsuarioUpdateComponent,
    ExistenciasComponent,
    ExistenciasInsertComponent,
    ExistenciasUpdateComponent,
    MovInventarioComponent,
    DetalleTicketComponent,
    DetalleTicketInsertComponent,
    LoginComponent,
    InicioComponent,
    ModulosComponent,
    ModulosUpdateComponent,
    EmpleadosComponent,
    PuestosComponent,
    PuestosInsertComponent,
    PuestosUpdateComponent,
    CategoriaModuloComponent,
    CategoriaModuloUpdateComponent,
    DetallePerfilComponent,
    DetallePerfilInsertComponent,
    DetallePerfilUpdateComponent,
    DeleteMenuComponent,
    DialogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // Registro del interceptor
    AuthGuard, // Proveedor del AuthGuard
    AuthService, // Proveedor del AuthService
    UserService,
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      progressBar: true,
      preventDuplicates: false
    }),
    provideAnimations()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }