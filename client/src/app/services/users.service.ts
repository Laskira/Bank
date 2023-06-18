import { Injectable } from '@angular/core';
import { User } from '../Interfaces/IUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly usuariosApi = 'https://localhost:7017';

  constructor(private http: HttpClient) {}

  acceder(usuario: any) {
    return this.http.post(this.usuariosApi + '/login', usuario);
  }

  obtenerUsuarios(): Observable<User[]> {
    return this.http.get<any[]>(this.usuariosApi + '/listar');
  }

  obtenerUsuario(id: string) {
    return this.http.get(this.usuariosApi + '/' + id);
  }

  crearUsuario(usuario: any) {
    return this.http.post(this.usuariosApi + '/api/Usuario', usuario);
  }

  eliminarUsuario(id: string) {
    return this.http.delete(this.usuariosApi + '/' + id);
  }

  actualizarUsuario(usuario: any, id: string) {
    return this.http.put(this.usuariosApi + '/api/Usuario/' + id, usuario);
  }
}
