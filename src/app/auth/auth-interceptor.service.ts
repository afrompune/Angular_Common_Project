import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, share } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authSvc: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.authSvc.user.pipe(take(1), exhaustMap(user => {
            if (!user)
                return next.handle(req);
            const newReq = req.clone({ params: new HttpParams().set('auth', user.Token) })
            return next.handle(newReq);
        }),
            share());
    }
}
