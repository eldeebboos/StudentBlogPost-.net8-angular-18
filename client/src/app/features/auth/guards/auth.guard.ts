import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  let token = cookieService.get('auth');

  if (token) {
    token = token.replace('Bearer ', '');
    const decodedtoken: any = jwtDecode(token);
    if (decodedtoken.exp < Date.now() / 1000) {
      authService.logout();
      return router.createUrlTree(['/login']);
    } else {
      const user = authService.getuser();
      if (user && user.roles?.includes('Writer')) {
        return true;
      } else {
        console.log('You are not authorized to access this page');
        router.navigate(['/']);
        return false;
      }
    }
  } else {
    authService.logout();
    return router.createUrlTree(['/login']);
  }
};
