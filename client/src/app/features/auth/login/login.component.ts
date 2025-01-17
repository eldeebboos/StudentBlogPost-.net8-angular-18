import { Component, inject, OnInit } from '@angular/core';
import { LoginRequest } from '../models/LoginRequest';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  cookieService = inject(CookieService);
  router = inject(Router);

  model: LoginRequest = {
    email: '',
    password: '',
  };

  ngOnInit(): void {
    // if (this.cookieService.check('auth')) {
    //   this.router.navigate(['/']);
    // }
  }

  onSubmit() {
    this.authService.login(this.model).subscribe((response) => {
      this.cookieService.set(
        'auth',
        `Bearer ${response.token}`,
        undefined,
        '/',
        undefined,
        true,
        'Strict'
      );
      this.authService.setUser({
        email: response.email,
        roles: response.roles,
      });
      this.router.navigate(['/']);
    });
  }
}
