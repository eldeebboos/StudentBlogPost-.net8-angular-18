import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../features/auth/auth.service';
import { User } from '../../../features/auth/models/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  cookieService = inject(CookieService);
  authService = inject(AuthService);
  router = inject(Router);
  user?: User;

  ngOnInit(): void {
    this.authService.user().subscribe((user) => {
      this.user = user;
    });
    this.user = this.authService.getuser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log(this.user);
  }
}
