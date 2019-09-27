import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from './http.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _httpService: HttpService, private _router: Router) { }

  canActivate(): boolean {
    if (this._httpService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login'])
      return false;
    }
  }

}
