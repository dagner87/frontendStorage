import { Component, OnInit } from '@angular/core';
import { UsuarioLogueado } from 'src/app/shared/interfaces/usuario.interface';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public avatar = '';
  public usuario: UsuarioLogueado;

  constructor(private authService: AuthService) {
    this.avatar = authService.imagenUrl;
    this.usuario = authService.usuario;
  }

  ngOnInit() {}
}
