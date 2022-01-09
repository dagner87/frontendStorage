import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public avatar = '';

  constructor(private authService: AuthService) {
    this.avatar = authService.imagenUrl;
  }

  ngOnInit() {}
}
