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


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'users',
    canActivate: [AdminGuard],
    children: [{
      path: 'new',
      component: UsuarioAltaComponent,
    }, {
      path: 'list',
      component: UsuarioListadoComponent
    }],
  }, {
    path: 'courses',
    children: [{
      path: 'new',
      component: CursoAltaComponent,
    }, {
      path: 'list',
      component: CursoListadoComponent
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
