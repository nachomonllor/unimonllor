import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ModalsComponent } from './components/portfolio/modals/modals.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';


import { InscriptionComponent } from './pages/student/inscription/inscription.component';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';
import { MaterialModule } from './shared/material.module';
import { EmailDirective } from './directives/email.directive';
import { CommonModule } from '@angular/common';
import { UsuarioAltaComponent } from './pages/admin/users/usuario-alta/usuario-alta.component';
import { UsuarioTablaComponent } from './pages/admin/users/usuario-tabla/usuario-tabla.component';
import { CursoAltaComponent } from './pages/admin/courses/curso-alta/curso-alta.component';
import { CursoTablaComponent } from './pages/admin/courses/curso-tabla/curso-tabla.component';
import { CursoListadoComponent } from './pages/admin/courses/curso-listado/curso-listado.component';
import { UsuarioListadoComponent } from './pages/admin/users/usuario-listado/usuario-listado.component';
import { InscripcionAltaComponent } from './pages/admin/inscriptions/inscripcion-alta/inscripcion-alta.component';
import { InscripcionListadoComponent } from './pages/admin/inscriptions/inscripcion-listado/inscripcion-listado.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CuposDirective } from './directives/cupos.directive';
import { ExamenAltaComponent } from './pages/teacher/exams/examen-alta/examen-alta.component';
import { AlumnosListadoComponent } from './pages/teacher/exams/alumnos-listado/alumnos-listado.component';
import { MyCoursesComponent } from './pages/teacher/my-courses/mycourses.component';
import { ActasExamComponent } from './pages/teacher/actas-exam/actas-exam.component';
import { ListadoAprobacionDirectaComponent } from './pages/teacher/actas-exam/listado-aprobacion-directa/listado-aprobacion-directa.component';
import { ListadoNodirectaComponent } from './pages/teacher/actas-exam/listado-nodirecta/listado-nodirecta.component';
import { ListadoExamsComponent } from './pages/teacher/actas-exam/listado-exams/listado-exam.component';
import { AprobadoPipe } from './pipes/aprobado.pipe';
import { StudentsDeletedComponent } from './pages/admin/students-deleted/students-deleted.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    PortfolioComponent,
    ModalsComponent,
    AuthComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    InscriptionComponent,

    ExamenAltaComponent,
    MyCoursesComponent,
    AlumnosListadoComponent,

    UsuarioAltaComponent,
    UsuarioTablaComponent,
    UsuarioListadoComponent,
    CursoAltaComponent,
    CursoTablaComponent,
    CursoListadoComponent,
    InscripcionAltaComponent,
    InscripcionListadoComponent,

    FilterPipe,
    AprobadoPipe,
    EmailDirective,
    CuposDirective,
    ActasExamComponent,
    ListadoAprobacionDirectaComponent,
    ListadoNodirectaComponent,
    ListadoExamsComponent,
    StudentsDeletedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AuthService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
