import { Component, OnInit } from '@angular/core';
import { UsuarioData } from 'src/app/shared/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/shared/service/usuarios.service';
import { userListDB } from 'src/app/shared/tables/list-users';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  public user_list: any;
  public totalUsers: number = 0;

  constructor(private usuariosService: UsuariosService) {
    //this.user_list = userListDB.list_user;
  }

  public settings = {
    actions: {
      position: 'right',
      add: false,
    },
    columns: {
      img: {
        title: 'Avatar',
        type: 'html',
        filter: false,
        valuePrepareFunction: (poster) => {
          return `<img src="${poster}" width="100px"/>`;
        },
      },
      name: {
        title: 'First Name',
      },

      email: {
        title: 'Email',
      },
      state: {
        title: 'State',
        filter: false,
      },
      role: {
        title: 'Role',
      },
    },
  };

  obtenerUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe((resp) => {
      this.totalUsers = resp.total;
      const [img, ...resto] = resp.usuarios;
      this.user_list = resto;
    });
  }

  ngOnInit() {
    this.obtenerUsuarios();
  }
}
