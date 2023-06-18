import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public items: MenuItem[] = [];

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Ver usuarios',
        icon: 'pi pi-user',
        routerLink: '/listar'
      },
      {
        label: 'Salir',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
        }
        
      },
    ];
  }

  logout() {
    this.tokenService.logout();
  }
}