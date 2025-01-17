import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from './models/LoginRequest';
import { LoginResponse } from './models/LoginResponse';
import { User } from './models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);
  baseUrl = environment.apiUrl + '/api/auth';
  user$: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);

  login(model: LoginRequest) {
    return this.http.post<LoginResponse>(this.baseUrl + '/login', model);
  }

  register(model: LoginRequest) {
    return this.http.post(this.baseUrl + '/register', model);
  }

  setUser(user: User) {
    this.user$.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  getuser() {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    if (!email || !roles) {
      return undefined;
    }
    const user: User = {
      email,
      roles: roles.split(','),
    };
    this.user$.next(user);
    return user;
  }

  user(): Observable<User | undefined> {
    return this.user$.asObservable();
  }

  logout() {
    localStorage.clear();
    this.cookiesService.delete('auth', '/');
    this.user$.next(undefined);
  }
}
