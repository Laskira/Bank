import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { FormUsersComponent } from './components/form-users/form-users.component';
import { LoginComponent } from './components/login/login.component';
import { RutasGuard } from './guard/rutas.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'listar', component: ListUsersComponent, canActivate: [RutasGuard] },
  { path: 'registrar', component: FormUsersComponent },
  { path: 'usuario/editar/:id', component: FormUsersComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
