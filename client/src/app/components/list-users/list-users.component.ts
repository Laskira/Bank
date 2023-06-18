import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interfaces/IUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public users: User[] = [];

  //Pagination
  public totalRecords: number = 0;
  public rows: number = 10;

  constructor(private usuarioService: UsersService, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.subscription = this.usuarioService
      .obtenerUsuarios()
      .subscribe((data: User[]) => {
        this.users = data;
        this.totalRecords = data.length;
      });
  }

  deleteUser(id: string) {
    if (
      confirm(
        '¿Estás seguro de qué quieres eliminar este usuario? No podrás recuperar este usuario'
      )
    ) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: (res) => {
          this.users = this.users.filter((user) => user.Correo !== id);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  editUser(id: string) {
    this.router.navigate(['/usuario/editar/' + id]);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
