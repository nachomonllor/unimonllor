import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { RegisterComponent } from './auth/register/register.component';
import { UsuarioAltaComponent } from './pages/admin/users/usuario-alta/usuario-alta.component';
import { UsuarioTablaComponent } from './pages/admin/users/usuario-tabla/usuario-tabla.component';
import { CursoTablaComponent } from './pages/admin/courses/curso-tabla/curso-tabla.component';
import { CursoAltaComponent } from './pages/admin/courses/curso-alta/curso-alta.component';
import { CursoListadoComponent } from './pages/admin/courses/curso-listado/curso-listado.component';
import { UsuarioListadoComponent } from './pages/admin/users/usuario-listado/usuario-listado.component';
import { AdminGuard } from './services/guards/admin.guard';
import { InscripcionAltaComponent } from './pages/admin/inscriptions/inscripcion-alta/inscripcion-alta.component';
import { InscripcionListadoComponent } from './pages/admin/inscriptions/inscripcion-listado/inscripcion-listado.component';
import { LoginGuard } from './services/guards/login.guard';
import { TeacherGuard } from './services/guards/teacher.guard';
import { ExamenAltaComponent } from './pages/teacher/exams/examen-alta/examen-alta.component';
import { MyCoursesComponent } from './pages/teacher/my-courses/mycourses.component';
import { ActasExamComponent } from './pages/teacher/actas-exam/actas-exam.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', canActivate: [LoginGuard], component: HomeComponent },
  {
    path: 'users',
    canActivate: [AdminGuard],
    children: [{
      path: 'new',
      component: UsuarioAltaComponent,
    }, {
      path: 'list',
      component: UsuarioListadoComponent
    }, {
      path: ':id',
      component: UsuarioAltaComponent,
    }],
  }, {
    path: 'courses',
    canActivate: [AdminGuard],
    children: [{
      path: 'new',
      component: CursoAltaComponent,
    }, {
      path: 'list',
      component: CursoListadoComponent
    }]
  }, {
    path: 'inscriptions',
    canActivate: [AdminGuard],
    children: [{
      path: 'new',
      component: InscripcionAltaComponent,
    }, {
      path: 'list',
      component: InscripcionListadoComponent
    }],
  },
  {
    path: 'my-courses',
    canActivate: [TeacherGuard],
    component: MyCoursesComponent,
  },
  {
    path: 'actas-exam',
    canActivate: [TeacherGuard],
    component: ActasExamComponent,
  },
  {
    path: 'exams',
    canActivate: [TeacherGuard],
    children: [{
      path: 'new',
      component: ExamenAltaComponent,
    }, {
      path: 'acta',
      component: ExamenAltaComponent,
    }],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
