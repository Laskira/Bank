import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss'],
  providers: [MessageService],
})
export class FormUsersComponent implements OnInit {
  public title: string = 'Crear';
  private edit = false;
  private id: string = '';
  private dataSubscription: Subscription = new Subscription();

  public FormUsuario = new FormGroup({
    Correo: new FormControl(),
    Contrasenia: new FormControl(),
    Nombre: new FormControl('', [Validators.required]),
    FechaNacimiento: new FormControl<Date | null>(null),
    Sexo: new FormControl('', [Validators.required]),
  });

  constructor(
    private usuarioService: UsersService,
    private messageService: MessageService,
    private router: Router,
    private routerActive: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.routerActive.snapshot.params['id'];

    if (this.id) {
      this.title = 'Actualizar';
      this.edit = true;

      this.dataSubscription = this.usuarioService
        .obtenerUsuario(this.id)
        .subscribe((res: any) => {
          if (res) {
            this.FormUsuario.patchValue({
              Correo: res.Correo,
              Contrasenia: res.Contrasenia,
              Nombre: res.Nombre,
              FechaNacimiento: res.FechaNacimiento,
              Sexo: res.Sexo,
            });
          }
        });
    }
  }

  Submit() {
    if (this.edit) {
      this.usuarioService
        .actualizarUsuario(this.FormUsuario.value, this.id)
        .subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Usuario actualizado existosamente',
            });
            this.router.navigate(['/listar']);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Por favor, ingresa los datos solicitados correctamente',
            });
            console.log(err);
          },
        });
    } else {
      if (this.FormUsuario.valid) {
        this.usuarioService.crearUsuario(this.FormUsuario.value).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Usuario registrado',
            });
            this.router.navigate(['/']);
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Por favor, ingresa los datos solicitados correctamente',
            });
            console.log(err);
          },
        });
      } else {
        alert('Por favor, rellena el formulario correctamente');
      }
    }
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
