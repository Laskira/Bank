import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercetorService {

  constructor(private tokenService: TokenService) { }

  intercept(req: any, next: any) {
    let tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
