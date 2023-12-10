import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./service/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isLoggedIn()
      ? true
      : inject(Router).createUrlTree(['/login']);
};
