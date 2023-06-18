import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent {
  FormUsuario = new FormGroup({
    Correo: new FormControl(null, [Validators.required]),
    Contrasenia: new FormControl(null, [Validators.required]),
  });
  constructor(
    private usuarioService: UsersService,
    private messageService: MessageService,
    private token: TokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.router.navigate(['/listar']);
    }
  }


  login() {
    if (this.FormUsuario.valid) {
      this.usuarioService.acceder(this.FormUsuario.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Message Content',
          });
          localStorage.setItem('token', (res as any).token);

        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Por favor, revisa si estas ingresando tu contraseña correctamente',
          });
          console.log(err);
        },
      });
    } else {
      alert('Por favor, rellena el formulario correctamente');
    }

    this.router.navigate(['/listar']);
  }
}
