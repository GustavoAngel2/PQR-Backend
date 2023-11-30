import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AlmacenesComponent } from './almacenes/almacenes.component';
import { HttpClientModule } from '@angular/common/http';
import { AlmacenesInsertComponent } from './almacenes-insert/almacenes-insert.component';
import {AlmacenesUpdateComponent} from './almacenes-update/almacenes-update.component';


const appRoutes: Routes =[
  {path: 'almacenes', component: AlmacenesComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    AlmacenesComponent,
    AlmacenesUpdateComponent,
    AlmacenesInsertComponent
    
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:true}
    ),
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
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
